"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadOmahaData = loadOmahaData;
exports.loadOmahaYearTotals = loadOmahaYearTotals;
exports.loadOmahaAwards = loadOmahaAwards;
exports.loadOmahaCompanyAwards = loadOmahaCompanyAwards;
exports.getOmahaMeleeHistory = getOmahaMeleeHistory;
exports.applyOmahaNameCorrection = applyOmahaNameCorrection;
exports.loadOmahaYears = loadOmahaYears;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fundraising_1 = require("../parsers/fundraising");
const awards_1 = require("../parsers/awards");
const melee_1 = require("../parsers/melee");
// __dirname = mustache-historian/dist/loaders/ when compiled
// data dir  = mustache-historian/data/chapters/omaha/
const DATA_DIR = path_1.default.resolve(__dirname, '../../data/chapters/omaha');
function readText(filename) {
    return fs_1.default.readFileSync(path_1.default.join(DATA_DIR, filename), 'utf-8');
}
function csvYears() {
    return fs_1.default
        .readdirSync(DATA_DIR)
        .map(f => f.match(/fundraising-(\d{4})\.csv/)?.[1] ?? null)
        .filter(Boolean);
}
// ─── Caches ────────────────────────────────────────────────────────────────
let _corrections = null;
let _data = null;
let _yearTotals = null;
let _awards = null;
let _companyAwards = null;
let _melee = null;
// ─── Internal helpers ──────────────────────────────────────────────────────
function getCorrections() {
    if (!_corrections) {
        _corrections = JSON.parse(readText('name-corrections.json'));
    }
    return _corrections;
}
function getOmahaMeleeData() {
    if (!_melee)
        _melee = (0, melee_1.parseMeleeData)(JSON.parse(readText('melee.json')));
    return _melee;
}
// ─── Public loaders ────────────────────────────────────────────────────────
/**
 * All Omaha fundraising records across all years.
 * John Doe placeholder rows (unattributed dollars) are excluded.
 */
function loadOmahaData() {
    if (_data)
        return _data;
    const corrections = getCorrections();
    _data = csvYears()
        .flatMap(year => (0, fundraising_1.parseFundraisingCSV)(readText(`fundraising-${year}.csv`), parseInt(year), 'omaha', corrections))
        .filter(r => !(r.firstName === 'John' && r.lastName === 'Doe'));
    return _data;
}
/**
 * Official total dollars raised per year, including John Doe placeholder rows.
 * Use this for displayed event totals so they match official figures.
 */
function loadOmahaYearTotals() {
    if (_yearTotals)
        return _yearTotals;
    const corrections = getCorrections();
    _yearTotals = {};
    for (const year of csvYears()) {
        const rows = (0, fundraising_1.parseFundraisingCSV)(readText(`fundraising-${year}.csv`), parseInt(year), 'omaha', corrections, true);
        _yearTotals[parseInt(year)] = rows.reduce((sum, r) => sum + r.totalDollars, 0);
    }
    return _yearTotals;
}
/** All Stachey Award records for the Omaha chapter. */
function loadOmahaAwards() {
    if (!_awards)
        _awards = (0, awards_1.parseAwardsCSV)(readText('stachey-awards.csv'), 'omaha');
    return _awards;
}
/** All company award records for the Omaha chapter. */
function loadOmahaCompanyAwards() {
    if (!_companyAwards)
        _companyAwards = (0, awards_1.parseCompanyAwardsCSV)(readText('company-awards.csv'), 'omaha');
    return _companyAwards;
}
/** Melee bracket history for a named grower. */
function getOmahaMeleeHistory(growerName) {
    return (0, melee_1.getMeleeHistoryForGrower)(getOmahaMeleeData(), growerName);
}
/**
 * Apply Omaha name corrections to a first/last name pair.
 * Useful when cross-referencing award records against fundraising grower names.
 */
function applyOmahaNameCorrection(firstName, lastName) {
    return (0, fundraising_1.applyNameCorrection)(firstName, lastName, getCorrections());
}
/** Sorted list of available Omaha data years. */
function loadOmahaYears() {
    return csvYears().map(Number).sort((a, b) => a - b);
}
//# sourceMappingURL=omaha.js.map