import type { ChapterSlug } from './chapter';

export interface StacheyAwardRecord {
  chapter: ChapterSlug;
  year: number;
  awardName: string;
  firstName: string | null;
  lastName: string | null;
  nickname?: string | null;
}
