import type { MeleeData, MeleeAppearance } from '../types/melee';
/**
 * Parse raw melee JSON (already parsed from JSON.parse) into MeleeData.
 * This is a simple pass-through with type assertion — the JSON shape
 * is trusted to match MeleeData as it comes from the data repo.
 */
export declare function parseMeleeData(json: unknown): MeleeData;
/**
 * Returns the Melee bracket history for a given grower across all years.
 *
 * @param data        Parsed MeleeData (from parseMeleeData)
 * @param growerName  Full name of the grower (e.g. "Cory Lesley")
 */
export declare function getMeleeHistoryForGrower(data: MeleeData, growerName: string): MeleeAppearance[];
//# sourceMappingURL=melee.d.ts.map