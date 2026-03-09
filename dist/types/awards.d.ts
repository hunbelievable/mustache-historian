import type { ChapterSlug } from './chapter';
export interface StacheyAwardRecord {
    chapter: ChapterSlug;
    year: number;
    awardName: string;
    firstName: string | null;
    lastName: string | null;
    nickname?: string | null;
}
export interface CompanyAwardRecord {
    chapter: ChapterSlug;
    year: number;
    awardName: string;
    company: string;
}
//# sourceMappingURL=awards.d.ts.map