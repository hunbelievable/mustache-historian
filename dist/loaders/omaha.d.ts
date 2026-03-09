/**
 * Server-side loaders for the Omaha chapter.
 *
 * These functions read from the data files bundled with this package and are
 * intended for use in Node.js server environments (Next.js API routes,
 * getStaticProps, etc.). They use module-level caching so files are parsed
 * only once per process.
 *
 * Import path: 'mustache-historian' (re-exported from main index)
 */
import type { FundraisingRecord } from '../types/fundraising';
import type { StacheyAwardRecord, CompanyAwardRecord } from '../types/awards';
import type { MeleeAppearance } from '../types/melee';
/**
 * All Omaha fundraising records across all years.
 * John Doe placeholder rows (unattributed dollars) are excluded.
 */
export declare function loadOmahaData(): FundraisingRecord[];
/**
 * Official total dollars raised per year, including John Doe placeholder rows.
 * Use this for displayed event totals so they match official figures.
 */
export declare function loadOmahaYearTotals(): Record<number, number>;
/** All Stachey Award records for the Omaha chapter. */
export declare function loadOmahaAwards(): StacheyAwardRecord[];
/** All company award records for the Omaha chapter. */
export declare function loadOmahaCompanyAwards(): CompanyAwardRecord[];
/** Melee bracket history for a named grower. */
export declare function getOmahaMeleeHistory(growerName: string): MeleeAppearance[];
/**
 * Apply Omaha name corrections to a first/last name pair.
 * Useful when cross-referencing award records against fundraising grower names.
 */
export declare function applyOmahaNameCorrection(firstName: string, lastName: string): [string, string];
/** Sorted list of available Omaha data years. */
export declare function loadOmahaYears(): number[];
//# sourceMappingURL=omaha.d.ts.map