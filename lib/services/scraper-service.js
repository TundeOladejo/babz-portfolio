import prisma from '../prisma.js';
import { createLead } from './lead-service.js';
import * as linkedinScraper from '../scrapers/linkedin-scraper.js';
import * as githubScraper from '../scrapers/github-scraper.js';
import * as twitterScraper from '../scrapers/twitter-scraper.js';

/**
 * ScraperService — orchestrates multi-platform scraping with failure isolation.
 *
 * Responsibilities:
 * - Creates and manages ScrapeJob records
 * - Runs platform scrapers in parallel with isolation
 * - Stores discovered leads via LeadService (with deduplication)
 * - Tracks per-platform results and errors
 */

const PLATFORM_SCRAPERS = {
  linkedin: linkedinScraper,
  github: githubScraper,
  twitter: twitterScraper,
};

/**
 * Run a full scrape job across selected platforms.
 *
 * @param {object} config
 * @param {string[]} config.keywords - Search keywords
 * @param {string[]} [config.roleTypes] - Role type filters
 * @param {boolean} [config.remoteOnly] - Remote-only filter
 * @param {string[]} config.platforms - Platforms to scrape (e.g., ["linkedin", "github", "twitter"])
 * @returns {Promise<object>} The completed ScrapeJob record
 */
export async function runScrapeJob(config) {
  const { keywords, roleTypes, remoteOnly, platforms } = config;

  // 1. Create ScrapeJob record with status "running"
  const scrapeJob = await prisma.scrapeJob.create({
    data: {
      status: 'running',
      platforms: JSON.stringify(platforms),
      startedAt: new Date(),
    },
  });

  const platformResults = {};
  const errors = [];
  let totalLeadsCreated = 0;

  // 2. Run each platform scraper with failure isolation
  const criteria = { keywords, roleTypes, remoteOnly };

  const scrapePromises = platforms.map(async (platform) => {
    const scraper = PLATFORM_SCRAPERS[platform];

    if (!scraper) {
      const error = `Unknown platform: ${platform}`;
      errors.push({ platform, error });
      platformResults[platform] = { found: 0, created: 0, errors: 1, error };
      return;
    }

    try {
      const results = await scraper.scrape(criteria);
      let created = 0;

      // 3. Store discovered leads via createLead (handles deduplication)
      for (const leadData of results) {
        const lead = await createLead({
          ...leadData,
          scrapeJobId: scrapeJob.id,
        });

        if (lead !== null) {
          created++;
        }
      }

      totalLeadsCreated += created;
      platformResults[platform] = {
        found: results.length,
        created,
        duplicates: results.length - created,
        errors: 0,
      };
    } catch (error) {
      // Platform failure isolation: log error but continue with other platforms
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      errors.push({ platform, error: errorMessage });
      platformResults[platform] = {
        found: 0,
        created: 0,
        errors: 1,
        error: errorMessage,
      };
    }
  });

  await Promise.allSettled(scrapePromises);

  // 4. Determine final job status
  const platformCount = platforms.length;
  const failedCount = errors.length;
  let finalStatus;

  if (failedCount === 0) {
    finalStatus = 'completed';
  } else if (failedCount < platformCount) {
    finalStatus = 'partial_failure';
  } else {
    finalStatus = 'failed';
  }

  // 5. Update ScrapeJob with results summary
  const updatedJob = await prisma.scrapeJob.update({
    where: { id: scrapeJob.id },
    data: {
      status: finalStatus,
      results: JSON.stringify(platformResults),
      errorLog: errors.length > 0 ? JSON.stringify(errors) : null,
      completedAt: new Date(),
    },
  });

  return updatedJob;
}

/**
 * Get the status of a scrape job by ID.
 *
 * @param {string} jobId - ScrapeJob ID
 * @returns {Promise<object|null>} The ScrapeJob record or null
 */
export async function getJobStatus(jobId) {
  return prisma.scrapeJob.findUnique({
    where: { id: jobId },
  });
}

/**
 * Get recent scrape jobs with optional limit.
 *
 * @param {number} [limit=10] - Maximum number of jobs to return
 * @returns {Promise<object[]>} Array of ScrapeJob records
 */
export async function getRecentJobs(limit = 10) {
  return prisma.scrapeJob.findMany({
    orderBy: { startedAt: 'desc' },
    take: limit,
  });
}
