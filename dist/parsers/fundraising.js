"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyNameCorrection = applyNameCorrection;
exports.parseFundraisingCSV = parseFundraisingCSV;
exports.formatDollars = formatDollars;
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
function applyNameCorrection(firstName, lastName, corrections) {
    const full = `${firstName} ${lastName}`;
    const corrected = corrections[full];
    if (!corrected)
        return [firstName, lastName];
    const parts = corrected.split(' ');
    return [parts.slice(0, -1).join(' '), parts[parts.length - 1]];
}
/**
 * Parse a fundraising CSV string into FundraisingRecord[].
 *
 * @param text      Raw CSV text content
 * @param year      The year this data represents
 * @param chapter   The chapter slug (e.g. 'omaha')
 * @param corrections  Name corrections map (from name-corrections.json). Defaults to empty.
 * @param includeJohnDoe  Set true to include placeholder "John Doe" rows. Defaults to false.
 */
function parseFundraisingCSV(text, year, chapter, corrections = {}, includeJohnDoe = false) {
    // Normalize line endings: some CSVs mix CRLF with LF
    const normalized = text.replace(/\r\n/g, '\n');
    const columns = ['POSITIONFINISHED', 'FIRSTNAME', 'LASTNAME', 'TOTALDOLLARS'];
    const records = (0, sync_1.parse)(normalized, {
        columns,
        skip_empty_lines: true,
        relax_quotes: true,
        relax_column_count: true,
    });
    const rows = records.map((record) => {
        const cleanValue = parseFloat((record.TOTALDOLLARS || '').replace(/[^0-9.]/g, ''));
        const [firstName, lastName] = applyNameCorrection(normalizeName(record.FIRSTNAME), normalizeName(record.LASTNAME), corrections);
        return {
            chapter,
            year,
            positionFinished: parseInt(record.POSITIONFINISHED),
            firstName,
            lastName,
            totalDollars: isNaN(cleanValue) ? 0 : cleanValue,
        };
    });
    if (includeJohnDoe)
        return rows;
    return rows.filter(r => !(r.firstName === 'John' && r.lastName === 'Doe'));
}
function formatDollars(n) {
    return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
//# sourceMappingURL=fundraising.js.map