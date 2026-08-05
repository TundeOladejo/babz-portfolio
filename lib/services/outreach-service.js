import OpenAI from 'openai';
import prisma from '../prisma.js';

const DEFAULT_MODEL = 'llama-3.1-70b-versatile';
const DEFAULT_SKILLS = 'full-stack developer with React, Next.js, Node.js, Python';
const REQUEST_TIMEOUT = 30000; // 30 seconds

/**
 * Get configured OpenAI client pointing to Groq API.
 */
function getClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY environment variable is not configured');
  }
  return new OpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey,
  });
}

/**
 * Get the portfolio owner's skills description from Settings or use defaults.
 */
async function getPortfolioSkills() {
  try {
    const setting = await prisma.settings.findUnique({
      where: { key: 'portfolio_skills' },
    });
    if (setting && setting.value) {
      return setting.value;
    }
  } catch {
    // Fall through to default
  }
  return DEFAULT_SKILLS;
}

/**
 * Get the configured LLM model from Settings or use default.
 */
async function getModel() {
  try {
    const setting = await prisma.settings.findUnique({
      where: { key: 'llm_model' },
    });
    if (setting && setting.value) {
      return setting.value;
    }
  } catch {
    // Fall through to default
  }
  return DEFAULT_MODEL;
}

/**
 * Fetch repository tech context from GitHub API for GitHub-sourced leads.
 * Returns a summary of languages/tech stack for the repository.
 *
 * @param {string} repositoryName - Full repository name (e.g., "owner/repo")
 * @returns {string|null} Tech context string, or null if unavailable
 */
async function fetchRepoContext(repositoryName) {
  if (!repositoryName) return null;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repositoryName}/languages`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
      }
    );

    if (!response.ok) return null;

    const languages = await response.json();
    const languageList = Object.keys(languages);

    if (languageList.length === 0) return null;

    return `Repository "${repositoryName}" uses: ${languageList.join(', ')}`;
  } catch {
    return null;
  }
}

/**
 * Build the system prompt for outreach message generation.
 *
 * @param {string} format - Message format ("email" | "linkedin")
 * @param {string} skills - Portfolio owner's skills description
 * @returns {string} System prompt
 */
function buildSystemPrompt(format, skills) {
  const formatInstructions =
    format === 'email'
      ? 'Write a professional email message with a subject line and body. Keep the tone warm but professional. Include a clear subject line on the first line prefixed with "Subject: ".'
      : 'Write a short, personalized LinkedIn connection message. Keep it concise (under 300 characters for the connection note) and professional but conversational.';

  return `You are an expert outreach message writer for a ${skills}. Your job is to craft personalized messages to recruiters and hiring managers based on their recent posts about open roles.

${formatInstructions}

Guidelines:
- Reference specific details from their post to show genuine interest
- Briefly highlight relevant skills that match the role they posted about
- Keep the message concise and actionable
- Do not be overly flattering or generic
- Sound human and authentic, not like a template
- End with a clear call to action (e.g., suggesting a call or sharing a portfolio link)`;
}

/**
 * Build the user prompt with lead context.
 *
 * @param {object} lead - Lead object
 * @param {string|null} repoContext - Optional repository tech context
 * @param {string} skills - Portfolio owner's skills
 * @returns {string} User prompt
 */
function buildUserPrompt(lead, repoContext, skills) {
  let prompt = `Generate a personalized outreach message for the following lead:\n\n`;
  prompt += `Platform: ${lead.platformSource}\n`;
  prompt += `Name: ${lead.posterName}\n`;

  if (lead.posterHeadline) {
    prompt += `Headline: ${lead.posterHeadline}\n`;
  }

  prompt += `Profile: ${lead.posterProfileUrl}\n`;
  prompt += `Post Content: "${lead.postContent}"\n`;

  if (lead.postDate) {
    prompt += `Post Date: ${new Date(lead.postDate).toLocaleDateString()}\n`;
  }

  if (lead.repositoryName) {
    prompt += `Repository: ${lead.repositoryName}\n`;
  }

  if (repoContext) {
    prompt += `\nTechnical Context: ${repoContext}\n`;
  }

  prompt += `\nMy background: I am a ${skills}. Write the message from my perspective, highlighting skills relevant to their posting.`;

  return prompt;
}

/**
 * Generate a personalized outreach message for a lead.
 *
 * @param {object} lead - Lead object from the database
 * @param {string} format - Message format ("email" | "linkedin")
 * @returns {object} Object with { success, message, error }
 */
export async function generateMessage(lead, format) {
  if (!lead) {
    return { success: false, message: null, error: 'Lead is required' };
  }

  if (!format || !['email', 'linkedin'].includes(format)) {
    return { success: false, message: null, error: 'Format must be "email" or "linkedin"' };
  }

  try {
    const client = getClient();
    const skills = await getPortfolioSkills();
    const model = await getModel();

    // Fetch repo context for GitHub leads
    let repoContext = null;
    if (lead.platformSource === 'github' && lead.repositoryName) {
      repoContext = await fetchRepoContext(lead.repositoryName);
    }

    const systemPrompt = buildSystemPrompt(format, skills);
    const userPrompt = buildUserPrompt(lead, repoContext, skills);

    const completion = await client.chat.completions.create(
      {
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      { timeout: REQUEST_TIMEOUT }
    );

    const content = completion.choices?.[0]?.message?.content;

    if (!content) {
      return { success: false, message: null, error: 'LLM returned empty response' };
    }

    // Determine the version number for this lead+format
    const existingCount = await prisma.outreachMessage.count({
      where: { leadId: lead.id, format },
    });

    // Save the generated message
    const outreachMessage = await prisma.outreachMessage.create({
      data: {
        leadId: lead.id,
        content,
        format,
        version: existingCount + 1,
        sent: false,
      },
    });

    return { success: true, message: outreachMessage, error: null };
  } catch (error) {
    const errorMessage = error.message || 'Failed to generate message';
    return {
      success: false,
      message: null,
      error: errorMessage,
      retryable: true,
    };
  }
}

/**
 * Regenerate a new outreach message for a lead, retaining all previous versions.
 * Uses the format of the most recent message, or defaults to "email".
 *
 * @param {object} lead - Lead object from the database
 * @returns {object} Object with { success, message, error }
 */
export async function regenerateMessage(lead) {
  if (!lead) {
    return { success: false, message: null, error: 'Lead is required' };
  }

  // Find the most recent message to determine format
  const lastMessage = await prisma.outreachMessage.findFirst({
    where: { leadId: lead.id },
    orderBy: { version: 'desc' },
  });

  const format = lastMessage ? lastMessage.format : 'email';

  return generateMessage(lead, format);
}
