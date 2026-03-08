import type { FundraisingRecord } from '../types/fundraising';
import type { AggregatedLifetime, YearlyTotals, RookieYearEntry, ThresholdYearEntry } from '../types/aggregation';
export declare function aggregateLifetime(data: FundraisingRecord[]): AggregatedLifetime[];
export declare function aggregateYearlyTotals(data: FundraisingRecord[]): YearlyTotals[];
export declare function bestSingleYearPerformances(data: FundraisingRecord[], limit?: number): FundraisingRecord[];
export declare function getNiceFinishers(data: FundraisingRecord[]): {
    year: number;
    finisher: FundraisingRecord | null;
}[];
export declare function getRookiesByYear(data: FundraisingRecord[]): RookieYearEntry[];
export declare function getThresholdGrowthByYear(data: FundraisingRecord[]): ThresholdYearEntry[];
//# sourceMappingURL=aggregation.d.ts.map