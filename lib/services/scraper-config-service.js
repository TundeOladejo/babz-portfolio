import prisma from '../prisma.js';

const VALID_PLATFORMS = ['linkedin', 'github', 'twitter'];
const VALID_SCHEDULE_INTERVALS = ['daily', '12h', '6h'];

/**
 * Validate a scraper configuration object.
 *
 * @param {object} config - The configuration to validate
 * @returns {{ valid: boolean, errors: string[] }} Validation result
 */
export function validateConfig(config) {
  const errors = [];

  if (!config || typeof config !== 'object') {
    return { valid: false, errors: ['Configuration object is required'] };
  }

  // Validate keywords: at least one non-empty keyword required
  if (!Array.isArray(config.keywords) || config.keywords.filter(k => typeof k === 'string' && k.trim() !== '').length === 0) {
    errors.push('At least one non-empty keyword is required');
  }

  // Validate platforms: at least one valid platform required
  if (!Array.isArray(config.platforms) || config.platforms.length === 0) {
    errors.push('At least one platform is required');
  } else {
    const invalidPlatforms = config.platforms.filter(p => !VALID_PLATFORMS.includes(p));
    if (invalidPlatforms.length > 0) {
      errors.push(`Invalid platform(s): ${invalidPlatforms.join(', ')}. Valid platforms are: ${VALID_PLATFORMS.join(', ')}`);
    }
    if (config.platforms.filter(p => VALID_PLATFORMS.includes(p)).length === 0) {
      errors.push('At least one platform is required');
    }
  }

  // Validate scheduleInterval if scheduleEnabled is true
  if (config.scheduleEnabled && (!config.scheduleInterval || !VALID_SCHEDULE_INTERVALS.includes(config.scheduleInterval))) {
    errors.push(`When scheduling is enabled, scheduleInterval must be one of: ${VALID_SCHEDULE_INTERVALS.join(', ')}`);
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Save scraper configuration. Validates input and upserts a single config record.
 *
 * @param {object} config - The scraper configuration to save
 * @param {string[]} config.keywords - Search keywords
 * @param {string[]} [config.roleTypes] - Role type filters
 * @param {boolean} [config.remoteOnly] - Whether to filter for remote only
 * @param {string[]} config.platforms - Target platforms
 * @param {boolean} [config.scheduleEnabled] - Whether scheduled scraping is enabled
 * @param {string} [config.scheduleInterval] - Schedule interval
 * @returns {object} Result with { success, data?, error? }
 */
export async function saveConfig(config) {
  const validation = validateConfig(config);
  if (!validation.valid) {
    return { success: false, error: validation.errors.join('; '), errors: validation.errors };
  }

  try {
    // Filter out empty keywords
    const keywords = config.keywords.filter(k => typeof k === 'string' && k.trim() !== '').map(k => k.trim());
    const roleTypes = Array.isArray(config.roleTypes) ? config.roleTypes.filter(r => typeof r === 'string' && r.trim() !== '').map(r => r.trim()) : [];
    const platforms = config.platforms.filter(p => VALID_PLATFORMS.includes(p));

    const data = {
      keywords: JSON.stringify(keywords),
      roleTypes: JSON.stringify(roleTypes),
      remoteOnly: config.remoteOnly !== undefined ? Boolean(config.remoteOnly) : true,
      platforms: JSON.stringify(platforms),
      scheduleEnabled: Boolean(config.scheduleEnabled),
      scheduleInterval: config.scheduleEnabled ? config.scheduleInterval : null,
    };

    // Upsert: find the first config or create one (single-user app, only one config)
    const existing = await prisma.scraperConfig.findFirst();

    let saved;
    if (existing) {
      saved = await prisma.scraperConfig.update({
        where: { id: existing.id },
        data,
      });
    } else {
      saved = await prisma.scraperConfig.create({ data });
    }

    return {
      success: true,
      data: parseConfig(saved),
    };
  } catch (error) {
    return { success: false, error: error.message || 'Failed to save scraper configuration' };
  }
}

/**
 * Load the current scraper configuration.
 * Returns the config with JSON fields parsed, or null if no config exists.
 *
 * @returns {object|null} Parsed configuration or null
 */
export async function getConfig() {
  try {
    const config = await prisma.scraperConfig.findFirst();
    if (!config) return null;
    return parseConfig(config);
  } catch (error) {
    return null;
  }
}

/**
 * Parse a raw database config record into a usable object.
 *
 * @param {object} raw - Raw database record
 * @returns {object} Parsed configuration
 */
function parseConfig(raw) {
  return {
    id: raw.id,
    keywords: JSON.parse(raw.keywords),
    roleTypes: JSON.parse(raw.roleTypes),
    remoteOnly: raw.remoteOnly,
    platforms: JSON.parse(raw.platforms),
    scheduleEnabled: raw.scheduleEnabled,
    scheduleInterval: raw.scheduleInterval,
    updatedAt: raw.updatedAt,
    createdAt: raw.createdAt,
  };
}
