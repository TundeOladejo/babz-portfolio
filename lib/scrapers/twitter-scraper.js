import { retryWithBackoff } from './retry-with-backoff.js';

/**
 * Twitter Scraper — uses Twitter API v2 search endpoint for tweet search.
 */

const TWITTER_API_BASE = 'https://api.twitter.com/2';

/**
 * Scrape Twitter for tweets matching the given criteria.
 *
 * @param {object} criteria
 * @param {string[]} criteria.keywords - Search keywords
 * @param {string[]} [criteria.roleTypes] - Role type filters
 * @param {boolean} [criteria.remoteOnly] - Whether to filter for remote roles
 * @returns {Promise<Array<{platformSource: string, posterName: string, posterHeadline: string|null, posterProfileUrl: string, postContent: string, postDate: Date|null}>>}
 */
export async function scrape(criteria) {
  const results = await retryWithBackoff(
    () => searchTweets(criteria),
    {
      maxRetries: 3,
      baseDelay: 1000,
      onRetry: (error, attempt, delay) => {
        console.warn(
          `[Twitter Scraper] Retry attempt ${attempt} after ${delay}ms: ${error.message}`
        );
      },
    }
  );

  return results;
}

/**
 * Internal function to search tweets using Twitter API v2.
 */
async function searchTweets(criteria) {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  if (!bearerToken) {
    throw new Error(
      'Twitter API bearer token not configured. Set TWITTER_BEARER_TOKEN environment variable.'
    );
  }

  const query = buildTwitterQuery(criteria);
  const params = new URLSearchParams({
    query,
    max_results: '30',
    'tweet.fields': 'created_at,author_id,text',
    expansions: 'author_id',
    'user.fields': 'name,username,description,profile_image_url',
  });

  const url = `${TWITTER_API_BASE}/tweets/search/recent?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 429) {
    const resetTime = response.headers.get('x-rate-limit-reset');
    throw new Error(
      `Twitter API rate limited. Resets at: ${resetTime ? new Date(resetTime * 1000).toISOString() : 'unknown'}`
    );
  }

  if (!response.ok) {
    const errorBody = await response.text().catch(() => '');
    throw new Error(
      `Twitter API error: ${response.status} ${response.statusText}${errorBody ? ` - ${errorBody}` : ''}`
    );
  }

  const data = await response.json();

  if (!data.data || !Array.isArray(data.data)) {
    return [];
  }

  // Build a map of user ID to user info from includes
  const userMap = buildUserMap(data.includes);

  return data.data.map((tweet) => extractLeadFromTweet(tweet, userMap));
}

/**
 * Build a Twitter search query from criteria.
 */
function buildTwitterQuery(criteria) {
  const parts = [];

  // Combine keywords with OR for broader matching
  if (criteria.keywords && criteria.keywords.length > 0) {
    const keywordQuery = criteria.keywords
      .map((kw) => `"${kw}"`)
      .join(' OR ');
    parts.push(`(${keywordQuery})`);
  }

  // Add role types
  if (criteria.roleTypes && criteria.roleTypes.length > 0) {
    const roleQuery = criteria.roleTypes
      .map((role) => `"${role}"`)
      .join(' OR ');
    parts.push(`(${roleQuery})`);
  }

  // Add remote filter
  if (criteria.remoteOnly) {
    parts.push('remote');
  }

  // Add hiring context
  parts.push('(hiring OR "looking for" OR "open role" OR "join our team")');

  // Exclude retweets for cleaner results
  parts.push('-is:retweet');

  // Only English tweets
  parts.push('lang:en');

  return parts.join(' ');
}

/**
 * Build a map of user IDs to user objects from the includes section.
 */
function buildUserMap(includes) {
  const map = new Map();

  if (includes && includes.users && Array.isArray(includes.users)) {
    includes.users.forEach((user) => {
      map.set(user.id, user);
    });
  }

  return map;
}

/**
 * Extract a lead-like object from a tweet and associated user data.
 */
function extractLeadFromTweet(tweet, userMap) {
  const user = userMap.get(tweet.author_id) || {};

  return {
    platformSource: 'twitter',
    posterName: user.name || user.username || 'unknown',
    posterHeadline: user.description || null,
    posterProfileUrl: user.username
      ? `https://twitter.com/${user.username}`
      : '',
    postContent: tweet.text || '',
    postDate: tweet.created_at ? new Date(tweet.created_at) : null,
  };
}
