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

import fs from 'fs';
import path from 'path';
import { parseFundraisingCSV, applyNameCorrection as _applyNameCorrection } from '../parsers/fundraising';
import { parseAwardsCSV, parseCompanyAwardsCSV } from '../parsers/awards';
import { parseMeleeData, getMeleeHistoryForGrower as _getMeleeHistoryForGrower } from '../parsers/melee';
import type { FundraisingRecord, NameCorrections } from '../types/fundraising';
import type { StacheyAwardRecord, CompanyAwardRecord } from '../types/awards';
import type { MeleeData, MeleeAppearance } from '../types/melee';

// __dirname = mustache-historian/dist/loaders/ when compiled
// data dir  = mustache-historian/data/chapters/omaha/
const DATA_DIR = path.resolve(__dirname, '../../data/chapters/omaha');

function readText(filename: string): string {
  return fs.readFileSync(path.join(DATA_DIR, filename), 'utf-8');
}

function csvYears(): string[] {
  return fs
    .readdirSync(DATA_DIR)
    .map(f => f.match(/fundraising-(\d{4})\.csv/)?.[1] ?? null)
    .filter(Boolean) as string[];
}

// ─── Caches ────────────────────────────────────────────────────────────────

let _corrections: NameCorrections | null = null;
let _data: FundraisingRecord[] | null = null;
let _yearTotals: Record<number, number> | null = null;
let _awards: StacheyAwardRecord[] | null = null;
let _companyAwards: CompanyAwardRecord[] | null = null;
let _melee: MeleeData | null = null;

// ─── Internal helpers ──────────────────────────────────────────────────────

function getCorrections(): NameCorrections {
  if (!_corrections) {
    _corrections = JSON.parse(readText('name-corrections.json')) as NameCorrections;
  }
  return _corrections;
}

function getOmahaMeleeData(): MeleeData {
  if (!_melee) _melee = parseMeleeData(JSON.parse(readText('melee.json')));
  return _melee;
}

// ─── Public loaders ────────────────────────────────────────────────────────

/**
 * All Omaha fundraising records across all years.
 * John Doe placeholder rows (unattributed dollars) are excluded.
 */
export function loadOmahaData(): FundraisingRecord[] {
  if (_data) return _data;
  const corrections = getCorrections();
  _data = csvYears()
    .flatMap(year =>
      parseFundraisingCSV(readText(`fundraising-${year}.csv`), parseInt(year), 'omaha', corrections),
    )
    .filter(r => !(r.firstName === 'John' && r.lastName === 'Doe'));
  return _data;
}

/**
 * Official total dollars raised per year, including John Doe placeholder rows.
 * Use this for displayed event totals so they match official figures.
 */
export function loadOmahaYearTotals(): Record<number, number> {
  if (_yearTotals) return _yearTotals;
  const corrections = getCorrections();
  _yearTotals = {};
  for (const year of csvYears()) {
    const rows = parseFundraisingCSV(
      readText(`fundraising-${year}.csv`),
      parseInt(year),
      'omaha',
      corrections,
      true, // include John Doe
    );
    _yearTotals[parseInt(year)] = rows.reduce((sum, r) => sum + r.totalDollars, 0);
  }
  return _yearTotals;
}

/** All Stachey Award records for the Omaha chapter. */
export function loadOmahaAwards(): StacheyAwardRecord[] {
  if (!_awards) _awards = parseAwardsCSV(readText('stachey-awards.csv'), 'omaha');
  return _awards;
}

/** All company award records for the Omaha chapter. */
export function loadOmahaCompanyAwards(): CompanyAwardRecord[] {
  if (!_companyAwards) _companyAwards = parseCompanyAwardsCSV(readText('company-awards.csv'), 'omaha');
  return _companyAwards;
}

/** Melee bracket history for a named grower. */
export function getOmahaMeleeHistory(growerName: string): MeleeAppearance[] {
  return _getMeleeHistoryForGrower(getOmahaMeleeData(), growerName);
}

/**
 * Apply Omaha name corrections to a first/last name pair.
 * Useful when cross-referencing award records against fundraising grower names.
 */
export function applyOmahaNameCorrection(firstName: string, lastName: string): [string, string] {
  return _applyNameCorrection(firstName, lastName, getCorrections());
}

/** Sorted list of available Omaha data years. */
export function loadOmahaYears(): number[] {
  return csvYears().map(Number).sort((a, b) => a - b);
}
