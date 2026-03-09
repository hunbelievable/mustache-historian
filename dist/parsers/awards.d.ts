import type { ChapterSlug } from '../types/chapter';
import type { StacheyAwardRecord, CompanyAwardRecord } from '../types/awards';
/**
 * Parse a Stachey awards CSV string into StacheyAwardRecord[].
 *
 * @param text     Raw CSV text content
 * @param chapter  The chapter slug (e.g. 'omaha')
 */
export declare function parseAwardsCSV(text: string, chapter: ChapterSlug): StacheyAwardRecord[];
/**
 * Parse a company awards CSV string into CompanyAwardRecord[].
 * Format: year, awardName, company
 *
 * @param text     Raw CSV text content
 * @param chapter  The chapter slug (e.g. 'omaha')
 */
export declare function parseCompanyAwardsCSV(text: string, chapter: ChapterSlug): CompanyAwardRecord[];
//# sourceMappingURL=awards.d.ts.map