// Types
export type {
  ChapterSlug,
  ChapterMetadata,
  ChapterDefinition,
  FundraisingRecord,
  NameCorrections,
  MeleeRound,
  MeleeAppearance,
  MeleeMatch,
  MeleeRegion,
  MeleeSide,
  MeleeBracket,
  MeleePlayInGroup,
  MeleePlayIn,
  MeleeYearEntry,
  MeleeData,
  StacheyAwardRecord,
  CompanyAwardRecord,
  AggregatedLifetime,
  YearlyTotals,
  RookieYearEntry,
  ThresholdYearEntry,
  FiveYearClassEntry,
} from './types';

// Parsers
export {
  parseFundraisingCSV,
  applyNameCorrection,
  formatDollars,
} from './parsers/fundraising';

export { parseAwardsCSV, parseCompanyAwardsCSV } from './parsers/awards';

export {
  parseMeleeData,
  getMeleeHistoryForGrower,
} from './parsers/melee';

export {
  aggregateLifetime,
  aggregateYearlyTotals,
  bestSingleYearPerformances,
  getNiceFinishers,
  getRookiesByYear,
  getThresholdGrowthByYear,
  getRookiesByFiveYearClass,
} from './parsers/aggregation';

// Chapter definitions
export { chapters, omaha } from './chapters/registry';
