import { retryWithBackoff } from './retry-with-backoff.js';

/**
 * LinkedIn Scraper — uses Puppeteer to scrape LinkedIn posts matching search criteria.
 *
 * Note: LinkedIn actively blocks automated scraping. This implementation uses
 * sensible error handling and retry logic. In production, consider using
 * LinkedIn's official APIs or third-party data providers.
 */

/**
 * Scrape LinkedIn for posts matching the given criteria.
 *
 * @param {object} criteria
 * @param {string[]} criteria.keywords - Search keywords
 * @param {string[]} [criteria.roleTypes] - Role type filters
 * @param {boolean} [criteria.remoteOnly] - Whether to filter for remote roles
 * @returns {Promise<Array<{platformSource: string, posterName: string, posterHeadline: string|null, posterProfileUrl: string, postContent: string, postDate: Date|null}>>}
 */
export async function scrape(criteria) {
  const results = await retryWithBackoff(
    () => scrapeLinkedInPosts(criteria),
    {
      maxRetries: 3,
      baseDelay: 2000,
      onRetry: (error, attempt, delay) => {
        console.warn(
          `[LinkedIn Scraper] Retry attempt ${attempt} after ${delay}ms: ${error.message}`
        );
      },
    }
  );

  return results;
}

/**
 * Internal function to perform the actual LinkedIn scraping.
 */
async function scrapeLinkedInPosts(criteria) {
  let browser = null;

  try {
    const puppeteer = await import('puppeteer');
    browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Set a realistic user agent
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    // Build search query from criteria
    const searchQuery = buildSearchQuery(criteria);
    const searchUrl = `https://www.linkedin.com/search/results/content/?keywords=${encodeURIComponent(searchQuery)}`;

    await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    // Check if we got blocked or need authentication
    const pageContent = await page.content();
    if (
      pageContent.includes('authwall') ||
      pageContent.includes('login') ||
      pageContent.includes('sign in')
    ) {
      throw new Error(
        'LinkedIn requires authentication. Unable to scrape without valid session.'
      );
    }

    // Wait for post elements to load
    await page.waitForSelector('[data-urn]', { timeout: 10000 }).catch(() => {
      // No posts found or page structure changed
    });

    // Extract post data from the page
    const posts = await page.evaluate(() => {
      const postElements = document.querySelectorAll(
        '.feed-shared-update-v2, [data-urn*="activity"]'
      );
      const results = [];

      postElements.forEach((el) => {
        try {
          const nameEl = el.querySelector(
            '.update-components-actor__name span, .feed-shared-actor__name span'
          );
          const headlineEl = el.querySelector(
            '.update-components-actor__description, .feed-shared-actor__description'
          );
          const profileLinkEl = el.querySelector(
            'a.update-components-actor__container-link, a.feed-shared-actor__container-link'
          );
          const contentEl = el.querySelector(
            '.feed-shared-update-v2__description, .update-components-text, .feed-shared-text'
          );
          const dateEl = el.querySelector(
            '.update-components-actor__sub-description span, time'
          );

          const posterName = nameEl?.textContent?.trim() || '';
          const posterHeadline = headlineEl?.textContent?.trim() || null;
          const posterProfileUrl = profileLinkEl?.href || '';
          const postContent = contentEl?.textContent?.trim() || '';
          const postDateText = dateEl?.textContent?.trim() || null;

          if (posterName && postContent && posterProfileUrl) {
            results.push({
              posterName,
              posterHeadline,
              posterProfileUrl,
              postContent,
              postDateText,
            });
          }
        } catch {
          // Skip malformed post elements
        }
      });

      return results;
    });

    return posts.map((post) => ({
      platformSource: 'linkedin',
      posterName: post.posterName,
      posterHeadline: post.posterHeadline,
      posterProfileUrl: normalizeLinkedInUrl(post.posterProfileUrl),
      postContent: post.postContent,
      postDate: parseLinkedInDate(post.postDateText),
    }));
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Build a LinkedIn search query from criteria.
 */
function buildSearchQuery(criteria) {
  const parts = [...(criteria.keywords || [])];

  if (criteria.roleTypes && criteria.roleTypes.length > 0) {
    parts.push(...criteria.roleTypes);
  }

  if (criteria.remoteOnly) {
    parts.push('remote');
  }

  return parts.join(' ');
}

/**
 * Normalize a LinkedIn profile URL to a clean format.
 */
function normalizeLinkedInUrl(url) {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    // Remove query params and hash
    return `${parsed.origin}${parsed.pathname}`.replace(/\/$/, '');
  } catch {
    return url;
  }
}

/**
 * Parse a LinkedIn relative date string (e.g., "2d", "1w", "3h") into a Date.
 * Returns null if parsing fails.
 */
function parseLinkedInDate(dateText) {
  if (!dateText) return null;

  const now = new Date();
  const match = dateText.match(/(\d+)\s*(h|d|w|mo|yr)/i);

  if (!match) return null;

  const value = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();

  switch (unit) {
    case 'h':
      return new Date(now.getTime() - value * 60 * 60 * 1000);
    case 'd':
      return new Date(now.getTime() - value * 24 * 60 * 60 * 1000);
    case 'w':
      return new Date(now.getTime() - value * 7 * 24 * 60 * 60 * 1000);
    case 'mo':
      return new Date(now.getTime() - value * 30 * 24 * 60 * 60 * 1000);
    case 'yr':
      return new Date(now.getTime() - value * 365 * 24 * 60 * 60 * 1000);
    default:
      return null;
  }
}
