import { retryWithBackoff } from './retry-with-backoff.js';

/**
 * GitHub Scraper — uses GitHub REST API (search/issues) to find
 * hiring-related issues and discussions.
 */

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Scrape GitHub for issues/discussions matching the given criteria.
 *
 * @param {object} criteria
 * @param {string[]} criteria.keywords - Search keywords
 * @param {string[]} [criteria.roleTypes] - Role type filters
 * @param {boolean} [criteria.remoteOnly] - Whether to filter for remote roles
 * @returns {Promise<Array<{platformSource: string, posterName: string, posterHeadline: string|null, posterProfileUrl: string, postContent: string, postDate: Date|null, repositoryName: string|null}>>}
 */
export async function scrape(criteria) {
  const results = await retryWithBackoff(
    () => searchGitHubIssues(criteria),
    {
      maxRetries: 3,
      baseDelay: 1000,
      onRetry: (error, attempt, delay) => {
        console.warn(
          `[GitHub Scraper] Retry attempt ${attempt} after ${delay}ms: ${error.message}`
        );
      },
    }
  );

  return results;
}

/**
 * Internal function to search GitHub issues using the REST API.
 */
async function searchGitHubIssues(criteria) {
  const token = process.env.GITHUB_TOKEN;

  const query = buildGitHubQuery(criteria);
  const url = `${GITHUB_API_BASE}/search/issues?q=${encodeURIComponent(query)}&sort=created&order=desc&per_page=30`;

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'recruiter-scraper/1.0',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });

  if (response.status === 403) {
    const rateLimitReset = response.headers.get('X-RateLimit-Reset');
    throw new Error(
      `GitHub API rate limited. Resets at: ${rateLimitReset ? new Date(rateLimitReset * 1000).toISOString() : 'unknown'}`
    );
  }

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data.items || !Array.isArray(data.items)) {
    return [];
  }

  return data.items.map((item) => extractLeadFromIssue(item));
}

/**
 * Build a GitHub search query string from criteria.
 */
function buildGitHubQuery(criteria) {
  const parts = [];

  // Combine keywords into the search
  if (criteria.keywords && criteria.keywords.length > 0) {
    parts.push(criteria.keywords.join(' '));
  }

  // Add role types as additional search terms
  if (criteria.roleTypes && criteria.roleTypes.length > 0) {
    parts.push(criteria.roleTypes.join(' '));
  }

  // Add remote keyword if filtering for remote
  if (criteria.remoteOnly) {
    parts.push('remote');
  }

  // Add hiring-related qualifiers
  parts.push('hiring OR "looking for" OR "we are hiring"');

  return parts.join(' ');
}

/**
 * Extract a lead-like object from a GitHub issue/discussion item.
 */
function extractLeadFromIssue(item) {
  const user = item.user || {};
  const repoUrl = item.repository_url || '';
  const repositoryName = extractRepoName(repoUrl);

  return {
    platformSource: 'github',
    posterName: user.login || 'unknown',
    posterHeadline: null,
    posterProfileUrl: user.html_url || `https://github.com/${user.login || ''}`,
    postContent: truncateContent(`${item.title || ''}\n\n${item.body || ''}`),
    postDate: item.created_at ? new Date(item.created_at) : null,
    repositoryName,
  };
}

/**
 * Extract repository name from a GitHub API repository URL.
 * e.g., "https://api.github.com/repos/owner/repo" → "owner/repo"
 */
function extractRepoName(repoUrl) {
  if (!repoUrl) return null;
  const match = repoUrl.match(/repos\/(.+)$/);
  return match ? match[1] : null;
}

/**
 * Truncate content to a reasonable length for storage.
 */
function truncateContent(content) {
  const maxLength = 2000;
  if (!content) return '';
  if (content.length <= maxLength) return content.trim();
  return content.substring(0, maxLength).trim() + '...';
}
