"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAwardsCSV = parseAwardsCSV;
const sync_1 = require("csv-parse/sync");
function normalizeName(name) {
    if (!name)
        return '';
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
function parseAwardsCSV(text, chapter) {
    const records = (0, sync_1.parse)(text, {
        columns: false,
        skip_empty_lines: true,
    });
    return records.map((row) => ({
        chapter,
        year: parseInt(row[0]),
        awardName: row[1],
        firstName: row[2] ? normalizeName(row[2]) : null,
        lastName: row[3] ? normalizeName(row[3]) : null,
        nickname: row[4] || null,
    }));
}
//# sourceMappingURL=awards.js.map