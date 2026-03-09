/**
 * Server-side entry point for mustache-historian.
 * Import from 'mustache-historian/server' in Node.js environments only
 * (Next.js API routes, getStaticProps, getServerSideProps, etc.).
 *
 * Do NOT import this in client-side code — it uses the Node.js `fs` module.
 */
export { loadOmahaData, loadOmahaYearTotals, loadOmahaAwards, loadOmahaCompanyAwards, loadOmahaYears, getOmahaMeleeHistory, applyOmahaNameCorrection, } from './loaders/omaha';
//# sourceMappingURL=server.d.ts.map