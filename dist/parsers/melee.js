"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMeleeData = parseMeleeData;
exports.getMeleeHistoryForGrower = getMeleeHistoryForGrower;
const ROUND_RANK = {
    R16: 1,
    QF: 2,
    SF: 3,
    Final: 4,
    Champion: 5,
};
function deeper(current, candidate) {
    if (!current)
        return candidate;
    return ROUND_RANK[candidate] > ROUND_RANK[current] ? candidate : current;
}
/** True if the grower's full name appears anywhere in a bracket participant string.
 *  Handles substitution notes like "Tom Rosencrans (Ryan Herrick)" gracefully. */
function nameMatch(participant, growerName) {
    return participant.includes(growerName);
}
/**
 * Parse raw melee JSON (already parsed from JSON.parse) into MeleeData.
 * This is a simple pass-through with type assertion — the JSON shape
 * is trusted to match MeleeData as it comes from the data repo.
 */
function parseMeleeData(json) {
    return json;
}
/**
 * Returns the Melee bracket history for a given grower across all years.
 *
 * @param data        Parsed MeleeData (from parseMeleeData)
 * @param growerName  Full name of the grower (e.g. "Cory Lesley")
 */
function getMeleeHistoryForGrower(data, growerName) {
    const results = [];
    for (const yearData of data.years) {
        let deepest = null;
        for (const side of [yearData.bracket.left, yearData.bracket.right]) {
            for (const region of [side.topRegion, side.bottomRegion]) {
                // Round of 16
                for (const match of region.r16) {
                    if (nameMatch(match.p1, growerName) || nameMatch(match.p2, growerName)) {
                        deepest = deeper(deepest, 'R16');
                        if (nameMatch(match.winner, growerName)) {
                            deepest = deeper(deepest, 'QF');
                        }
                    }
                }
                // Quarterfinal
                if (nameMatch(region.qf.p1, growerName) || nameMatch(region.qf.p2, growerName)) {
                    deepest = deeper(deepest, 'QF');
                    if (nameMatch(region.qf.winner, growerName)) {
                        deepest = deeper(deepest, 'SF');
                    }
                }
            }
            // Semifinal
            if (nameMatch(side.sf.p1, growerName) || nameMatch(side.sf.p2, growerName)) {
                deepest = deeper(deepest, 'SF');
                if (nameMatch(side.sf.winner, growerName)) {
                    deepest = deeper(deepest, 'Final');
                }
            }
        }
        // Championship
        if (nameMatch(yearData.bracket.final.p1, growerName) ||
            nameMatch(yearData.bracket.final.p2, growerName)) {
            deepest = deeper(deepest, 'Final');
            if (nameMatch(yearData.bracket.final.winner, growerName)) {
                deepest = deeper(deepest, 'Champion');
            }
        }
        if (deepest) {
            results.push({ year: yearData.year, deepestRound: deepest, isChampion: deepest === 'Champion' });
        }
    }
    return results.sort((a, b) => a.year - b.year);
}
//# sourceMappingURL=melee.js.map