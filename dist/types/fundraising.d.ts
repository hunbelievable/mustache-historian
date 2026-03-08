import type { ChapterSlug } from './chapter';
export interface FundraisingRecord {
    chapter: ChapterSlug;
    year: number;
    positionFinished: number;
    firstName: string;
    lastName: string;
    totalDollars: number;
}
/** Raw name corrections map: "Wrong Name" -> "Correct Name" */
export type NameCorrections = Record<string, string>;
//# sourceMappingURL=fundraising.d.ts.map