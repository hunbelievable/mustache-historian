"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyOmahaNameCorrection = exports.getOmahaMeleeHistory = exports.loadOmahaYears = exports.loadOmahaCompanyAwards = exports.loadOmahaAwards = exports.loadOmahaYearTotals = exports.loadOmahaData = void 0;
/**
 * Server-side entry point for mustache-historian.
 * Import from 'mustache-historian/server' in Node.js environments only
 * (Next.js API routes, getStaticProps, getServerSideProps, etc.).
 *
 * Do NOT import this in client-side code — it uses the Node.js `fs` module.
 */
var omaha_1 = require("./loaders/omaha");
Object.defineProperty(exports, "loadOmahaData", { enumerable: true, get: function () { return omaha_1.loadOmahaData; } });
Object.defineProperty(exports, "loadOmahaYearTotals", { enumerable: true, get: function () { return omaha_1.loadOmahaYearTotals; } });
Object.defineProperty(exports, "loadOmahaAwards", { enumerable: true, get: function () { return omaha_1.loadOmahaAwards; } });
Object.defineProperty(exports, "loadOmahaCompanyAwards", { enumerable: true, get: function () { return omaha_1.loadOmahaCompanyAwards; } });
Object.defineProperty(exports, "loadOmahaYears", { enumerable: true, get: function () { return omaha_1.loadOmahaYears; } });
Object.defineProperty(exports, "getOmahaMeleeHistory", { enumerable: true, get: function () { return omaha_1.getOmahaMeleeHistory; } });
Object.defineProperty(exports, "applyOmahaNameCorrection", { enumerable: true, get: function () { return omaha_1.applyOmahaNameCorrection; } });
//# sourceMappingURL=server.js.map