import type { ChapterSlug, ChapterDefinition } from '../types/chapter';
import { omaha } from './omaha';

/** Registry of all known chapters. Add new chapters here as their data is contributed. */
export const chapters: Record<ChapterSlug, ChapterDefinition> = {
  omaha,
};

export { omaha };
