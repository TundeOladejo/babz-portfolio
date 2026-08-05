import prisma from '../prisma.js';

/**
 * LeadService — CRUD operations on leads with deduplication, filtering, and pagination.
 */

/**
 * Create a new lead with deduplication.
 * If a lead with the same posterProfileUrl + postContent already exists,
 * the duplicate is silently skipped (returns null).
 *
 * @param {object} data - Lead data fields
 * @returns {object|null} The created lead, or null if duplicate
 */
export async function createLead(data) {
  try {
    const lead = await prisma.lead.create({
      data: {
        platformSource: data.platformSource,
        posterName: data.posterName,
        posterHeadline: data.posterHeadline || null,
        posterProfileUrl: data.posterProfileUrl,
        postContent: data.postContent,
        postDate: data.postDate || null,
        repositoryName: data.repositoryName || null,
        discoveredAt: data.discoveredAt || new Date(),
        outreachStatus: data.outreachStatus || 'new',
        archived: data.archived || false,
        scrapeJobId: data.scrapeJobId || null,
      },
    });
    return lead;
  } catch (error) {
    // Prisma unique constraint violation — lead already exists
    if (error.code === 'P2002') {
      return null;
    }
    throw error;
  }
}

/**
 * Find leads with pagination, platform filter, date range filter, and archive exclusion.
 *
 * @param {object} filters
 * @param {number} [filters.page=1] - Page number (1-indexed)
 * @param {number} [filters.pageSize=20] - Number of leads per page
 * @param {string} [filters.platformSource] - Filter by platform ("linkedin" | "github" | "twitter")
 * @param {Date|string} [filters.startDate] - Start of date range filter (inclusive)
 * @param {Date|string} [filters.endDate] - End of date range filter (inclusive)
 * @returns {{ leads: object[], total: number, page: number, pageSize: number, totalPages: number }}
 */
export async function findLeads(filters = {}) {
  const page = Math.max(1, filters.page || 1);
  const pageSize = Math.max(1, filters.pageSize || 20);
  const skip = (page - 1) * pageSize;

  const where = {
    archived: false,
  };

  if (filters.platformSource) {
    where.platformSource = filters.platformSource;
  }

  if (filters.startDate || filters.endDate) {
    where.discoveredAt = {};
    if (filters.startDate) {
      where.discoveredAt.gte = new Date(filters.startDate);
    }
    if (filters.endDate) {
      where.discoveredAt.lte = new Date(filters.endDate);
    }
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { discoveredAt: 'desc' },
      skip,
      take: pageSize,
    }),
    prisma.lead.count({ where }),
  ]);

  return {
    leads,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

/**
 * Get a single lead by ID. Returns the lead even if archived.
 *
 * @param {string} id - Lead ID
 * @returns {object|null} The lead or null if not found
 */
export async function getLeadById(id) {
  return prisma.lead.findUnique({
    where: { id },
  });
}

/**
 * Archive a lead by setting archived = true.
 *
 * @param {string} id - Lead ID
 * @returns {object} The updated lead
 */
export async function archiveLead(id) {
  return prisma.lead.update({
    where: { id },
    data: { archived: true },
  });
}

/**
 * Update the outreach status of a lead.
 *
 * @param {string} id - Lead ID
 * @param {string} status - New outreach status ("new" | "contacted" | "archived")
 * @returns {object} The updated lead
 */
export async function updateOutreachStatus(id, status) {
  return prisma.lead.update({
    where: { id },
    data: { outreachStatus: status },
  });
}
