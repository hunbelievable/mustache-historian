import type { ChapterSlug } from '../types/chapter';
import type { FundraisingRecord, NameCorrections } from '../types/fundraising';
export declare function applyNameCorrection(firstName: string, lastName: string, corrections: NameCorrections): [string, string];
/**
 * Parse a fundraising CSV string into FundraisingRecord[].
 *
 * @param text      Raw CSV text content
 * @param year      The year this data represents
 * @param chapter   The chapter slug (e.g. 'omaha')
 * @param corrections  Name corrections map (from name-corrections.json). Defaults to empty.
 * @param includeJohnDoe  Set true to include placeholder "John Doe" rows. Defaults to false.
 */
export declare function parseFundraisingCSV(text: string, year: number, chapter: ChapterSlug, corrections?: NameCorrections, includeJohnDoe?: boolean): FundraisingRecord[];
export declare function formatDollars(n: number): string;
//# sourceMappingURL=fundraising.d.ts.map