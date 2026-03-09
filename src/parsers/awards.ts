import { parse } from 'csv-parse/sync';
import type { ChapterSlug } from '../types/chapter';
import type { StacheyAwardRecord, CompanyAwardRecord } from '../types/awards';

function normalizeName(name: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Parse a Stachey awards CSV string into StacheyAwardRecord[].
 *
 * @param text     Raw CSV text content
 * @param chapter  The chapter slug (e.g. 'omaha')
 */
export function parseAwardsCSV(text: string, chapter: ChapterSlug): StacheyAwardRecord[] {
  const records = parse(text, {
    columns: false,
    skip_empty_lines: true,
  });

  return records.map((row: string[]) => ({
    chapter,
    year: parseInt(row[0]),
    awardName: row[1],
    firstName: row[2] ? normalizeName(row[2]) : null,
    lastName: row[3] ? normalizeName(row[3]) : null,
    nickname: row[4] || null,
  }));
}

/**
 * Parse a company awards CSV string into CompanyAwardRecord[].
 * Format: year, awardName, company
 *
 * @param text     Raw CSV text content
 * @param chapter  The chapter slug (e.g. 'omaha')
 */
export function parseCompanyAwardsCSV(text: string, chapter: ChapterSlug): CompanyAwardRecord[] {
  const records = parse(text, {
    columns: false,
    skip_empty_lines: true,
  });

  return records.map((row: string[]) => ({
    chapter,
    year: parseInt(row[0]),
    awardName: row[1],
    company: row[2],
  }));
}
