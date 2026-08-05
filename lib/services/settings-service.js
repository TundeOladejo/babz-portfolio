import OpenAI from 'openai';
import prisma from '../prisma.js';

const SETTINGS_KEYS = {
  GROQ_API_KEY: 'groq_api_key',
  LLM_MODEL: 'llm_model',
  PORTFOLIO_SKILLS: 'portfolio_skills',
};

const DEFAULT_MODEL = 'llama-3.1-70b-versatile';
const GROQ_BASE_URL = 'https://api.groq.com/openai/v1';

/**
 * Retrieve a single setting by key.
 *
 * @param {string} key - The setting key to look up
 * @returns {string|null} The setting value, or null if not found
 */
export async function getSetting(key) {
  const setting = await prisma.settings.findUnique({
    where: { key },
  });
  return setting ? setting.value : null;
}

/**
 * Retrieve all relevant settings (Groq API key status, model, portfolio skills).
 * The API key value is masked for security — only indicates whether it's set.
 *
 * @returns {object} Settings object with apiKeyConfigured, apiKeySource, model, portfolioSkills
 */
export async function getSettings() {
  const [apiKeySetting, modelSetting, skillsSetting] = await Promise.all([
    prisma.settings.findUnique({ where: { key: SETTINGS_KEYS.GROQ_API_KEY } }),
    prisma.settings.findUnique({ where: { key: SETTINGS_KEYS.LLM_MODEL } }),
    prisma.settings.findUnique({ where: { key: SETTINGS_KEYS.PORTFOLIO_SKILLS } }),
  ]);

  const envKey = process.env.GROQ_API_KEY;
  const dbKey = apiKeySetting?.value;

  return {
    apiKeyConfigured: !!(dbKey || envKey),
    apiKeySource: dbKey ? 'database' : envKey ? 'environment' : 'none',
    model: modelSetting?.value || DEFAULT_MODEL,
    portfolioSkills: skillsSetting?.value || '',
  };
}

/**
 * Get the effective API key, preferring database override over environment variable.
 *
 * @returns {string|null} The API key or null if not configured
 */
export function getEffectiveApiKey() {
  // Database override is checked synchronously via a provided value,
  // but for async retrieval we need a separate method
  return null;
}

/**
 * Get the effective API key asynchronously (database override takes priority).
 *
 * @returns {Promise<string|null>} The API key or null if not configured
 */
export async function getEffectiveApiKeyAsync() {
  const dbKey = await getSetting(SETTINGS_KEYS.GROQ_API_KEY);
  if (dbKey) return dbKey;
  return process.env.GROQ_API_KEY || null;
}

/**
 * Save settings configuration. Stores model selection and portfolio skills.
 * For the API key, stores in the database as an override (env var is used by default).
 *
 * @param {object} config - Settings to save
 * @param {string} [config.apiKey] - Groq API key (stored in database as override)
 * @param {string} [config.model] - LLM model identifier
 * @param {string} [config.portfolioSkills] - Portfolio owner's skills description
 * @returns {object} Result with { success, error }
 */
export async function saveSettings(config) {
  if (!config || typeof config !== 'object') {
    return { success: false, error: 'Configuration object is required' };
  }

  try {
    const updates = [];

    if (config.apiKey !== undefined) {
      updates.push(
        prisma.settings.upsert({
          where: { key: SETTINGS_KEYS.GROQ_API_KEY },
          update: { value: config.apiKey },
          create: { key: SETTINGS_KEYS.GROQ_API_KEY, value: config.apiKey },
        })
      );
    }

    if (config.model !== undefined) {
      updates.push(
        prisma.settings.upsert({
          where: { key: SETTINGS_KEYS.LLM_MODEL },
          update: { value: config.model },
          create: { key: SETTINGS_KEYS.LLM_MODEL, value: config.model },
        })
      );
    }

    if (config.portfolioSkills !== undefined) {
      updates.push(
        prisma.settings.upsert({
          where: { key: SETTINGS_KEYS.PORTFOLIO_SKILLS },
          update: { value: config.portfolioSkills },
          create: { key: SETTINGS_KEYS.PORTFOLIO_SKILLS, value: config.portfolioSkills },
        })
      );
    }

    if (updates.length === 0) {
      return { success: false, error: 'No valid settings provided' };
    }

    await Promise.all(updates);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message || 'Failed to save settings' };
  }
}

/**
 * Test a Groq API key by making a minimal chat completion request.
 *
 * @param {string} key - The API key to test
 * @returns {object} Result with { success, error }
 */
export async function testApiKey(key) {
  if (!key || typeof key !== 'string' || key.trim() === '') {
    return { success: false, error: 'API key is required' };
  }

  try {
    const client = new OpenAI({
      baseURL: GROQ_BASE_URL,
      apiKey: key.trim(),
    });

    await client.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [{ role: 'user', content: 'test' }],
      max_tokens: 1,
    });

    return { success: true, error: null };
  } catch (error) {
    const message = error.message || 'API key validation failed';

    if (error.status === 401 || message.includes('auth') || message.includes('Unauthorized')) {
      return { success: false, error: 'Invalid API key' };
    }

    if (error.status === 429) {
      return { success: false, error: 'Rate limit exceeded. Please try again later.' };
    }

    return { success: false, error: `API key validation failed: ${message}` };
  }
}
