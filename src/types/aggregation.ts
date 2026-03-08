export interface AggregatedLifetime {
  firstName: string;
  lastName: string;
  totalDollars: number;
  top10Finishes: number;
  firstYear: number;
}

export interface YearlyTotals {
  year: number;
  total: number;
}

export interface RookieYearEntry {
  year: number;
  topRookie: {
    firstName: string;
    lastName: string;
    totalDollars: number;
    positionFinished: number;
  } | null;
  rookieCount: number;
}

export interface ThresholdYearEntry {
  year: number;
  totalGrowers: number;
  count1k: number;
  count10k: number;
}
