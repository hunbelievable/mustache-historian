export type ChapterSlug = 'omaha' | (string & {});
export interface ChapterMetadata {
    slug: ChapterSlug;
    name: string;
    city: string;
    state: string;
    firstYear: number;
    availableYears: number[];
}
export interface ChapterDefinition extends ChapterMetadata {
    /** GitHub raw URL for a specific year's fundraising CSV */
    fundraisingUrl: (year: number) => string;
    /** GitHub raw URL for the name corrections JSON */
    nameCorrectionUrl: () => string;
    /** GitHub raw URL for the melee bracket JSON */
    meleeUrl: () => string;
    /** GitHub raw URL for the Stachey awards CSV */
    awardsUrl: () => string;
}
//# sourceMappingURL=chapter.d.ts.map