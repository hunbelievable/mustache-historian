import type { ChapterSlug } from '../types/chapter';
import type { StacheyAwardRecord } from '../types/awards';
/**
 * Parse a Stachey awards CSV string into StacheyAwardRecord[].
 *
 * @param text     Raw CSV text content
 * @param chapter  The chapter slug (e.g. 'omaha')
 */
export declare function parseAwardsCSV(text: string, chapter: ChapterSlug): StacheyAwardRecord[];
//# sourceMappingURL=awards.d.ts.map