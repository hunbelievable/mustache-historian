import type { FundraisingRecord } from '../types/fundraising';
import type {
  AggregatedLifetime,
  YearlyTotals,
  RookieYearEntry,
  ThresholdYearEntry,
} from '../types/aggregation';

export function aggregateLifetime(data: FundraisingRecord[]): AggregatedLifetime[] {
  const map = new Map<string, AggregatedLifetime>();

  for (const row of data) {
    const key = `${row.firstName} ${row.lastName}`;
    if (!map.has(key)) {
      map.set(key, {
        firstName: row.firstName,
        lastName: row.lastName,
        totalDollars: 0,
        top10Finishes: 0,
        firstYear: row.year,
      });
    }
    const entry = map.get(key)!;
    entry.totalDollars += row.totalDollars ?? 0;
    if (row.positionFinished <= 10) entry.top10Finishes += 1;
    entry.firstYear = Math.min(entry.firstYear, row.year);
  }

  return Array.from(map.values()).sort((a, b) => b.totalDollars - a.totalDollars);
}

export function aggregateYearlyTotals(data: FundraisingRecord[]): YearlyTotals[] {
  const map = new Map<number, number>();
  for (const row of data) {
    map.set(row.year, (map.get(row.year) ?? 0) + (row.totalDollars ?? 0));
  }
  return Array.from(map.entries())
    .map(([year, total]) => ({ year, total }))
    .sort((a, b) => a.year - b.year);
}

export function bestSingleYearPerformances(data: FundraisingRecord[], limit = 10): FundraisingRecord[] {
  return [...data].sort((a, b) => (b.totalDollars ?? 0) - (a.totalDollars ?? 0)).slice(0, limit);
}

export function getNiceFinishers(data: FundraisingRecord[]): { year: number; finisher: FundraisingRecord | null }[] {
  const years = Array.from(new Set(data.map(r => r.year))).sort();
  return years.map(year => ({
    year,
    finisher: data.find(r => r.year === year && r.positionFinished === 69) ?? null,
  }));
}

export function getRookiesByYear(data: FundraisingRecord[]): RookieYearEntry[] {
  const years = Array.from(new Set(data.map(r => r.year))).sort();
  const seen = new Set<string>();

  return years.map(year => {
    const yearData = data.filter(r => r.year === year);
    const rookies = yearData.filter(r => !seen.has(`${r.firstName} ${r.lastName}`));
    yearData.forEach(r => seen.add(`${r.firstName} ${r.lastName}`));

    const top = [...rookies].sort((a, b) => b.totalDollars - a.totalDollars)[0] ?? null;
    return {
      year,
      topRookie: top
        ? { firstName: top.firstName, lastName: top.lastName, totalDollars: top.totalDollars, positionFinished: top.positionFinished }
        : null,
      rookieCount: rookies.length,
    };
  });
}

export function getThresholdGrowthByYear(data: FundraisingRecord[]): ThresholdYearEntry[] {
  const years = Array.from(new Set(data.map(r => r.year))).sort();
  return years.map(year => {
    const yearData = data.filter(r => r.year === year);
    return {
      year,
      totalGrowers: yearData.length,
      count1k: yearData.filter(r => r.totalDollars >= 1000).length,
      count10k: yearData.filter(r => r.totalDollars >= 10000).length,
    };
  });
}
