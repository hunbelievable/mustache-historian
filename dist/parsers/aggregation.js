"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregateLifetime = aggregateLifetime;
exports.aggregateYearlyTotals = aggregateYearlyTotals;
exports.bestSingleYearPerformances = bestSingleYearPerformances;
exports.getNiceFinishers = getNiceFinishers;
exports.getRookiesByYear = getRookiesByYear;
exports.getThresholdGrowthByYear = getThresholdGrowthByYear;
exports.getRookiesByFiveYearClass = getRookiesByFiveYearClass;
function aggregateLifetime(data) {
    const map = new Map();
    for (const row of data) {
        const key = `${row.firstName} ${row.lastName}`;
        if (!map.has(key)) {
            map.set(key, {
                firstName: row.firstName,
                lastName: row.lastName,
                totalDollars: 0,
                top10Finishes: 0,
                firstYear: row.year,
            });
        }
        const entry = map.get(key);
        entry.totalDollars += row.totalDollars ?? 0;
        if (row.positionFinished <= 10)
            entry.top10Finishes += 1;
        entry.firstYear = Math.min(entry.firstYear, row.year);
    }
    return Array.from(map.values()).sort((a, b) => b.totalDollars - a.totalDollars);
}
function aggregateYearlyTotals(data) {
    const map = new Map();
    for (const row of data) {
        map.set(row.year, (map.get(row.year) ?? 0) + (row.totalDollars ?? 0));
    }
    return Array.from(map.entries())
        .map(([year, total]) => ({ year, total }))
        .sort((a, b) => a.year - b.year);
}
function bestSingleYearPerformances(data, limit = 10) {
    return [...data].sort((a, b) => (b.totalDollars ?? 0) - (a.totalDollars ?? 0)).slice(0, limit);
}
function getNiceFinishers(data) {
    const years = Array.from(new Set(data.map(r => r.year))).sort();
    return years.map(year => ({
        year,
        finisher: data.find(r => r.year === year && r.positionFinished === 69) ?? null,
    }));
}
function getRookiesByYear(data) {
    const years = Array.from(new Set(data.map(r => r.year))).sort();
    const seen = new Set();
    return years.map(year => {
        const yearData = data.filter(r => r.year === year);
        const rookies = yearData.filter(r => !seen.has(`${r.firstName} ${r.lastName}`));
        yearData.forEach(r => seen.add(`${r.firstName} ${r.lastName}`));
        const top = [...rookies].sort((a, b) => b.totalDollars - a.totalDollars)[0] ?? null;
        return {
            year,
            topRookie: top
                ? { firstName: top.firstName, lastName: top.lastName, totalDollars: top.totalDollars, positionFinished: top.positionFinished }
                : null,
            rookieCount: rookies.length,
        };
    });
}
function getThresholdGrowthByYear(data) {
    const years = Array.from(new Set(data.map(r => r.year))).sort();
    return years.map(year => {
        const yearData = data.filter(r => r.year === year);
        return {
            year,
            totalGrowers: yearData.length,
            count1k: yearData.filter(r => r.totalDollars >= 1000).length,
            count10k: yearData.filter(r => r.totalDollars >= 10000).length,
        };
    });
}
function getRookiesByFiveYearClass(data) {
    const mostRecentYear = Math.max(...data.map(r => r.year));
    // Determine each grower's first year, last year, and lifetime total
    const growerMap = new Map();
    for (const row of data) {
        const key = `${row.firstName} ${row.lastName}`;
        if (!growerMap.has(key)) {
            growerMap.set(key, { firstName: row.firstName, lastName: row.lastName, firstYear: row.year, lastYear: row.year, totalDollars: 0 });
        }
        const entry = growerMap.get(key);
        entry.totalDollars += row.totalDollars ?? 0;
        entry.firstYear = Math.min(entry.firstYear, row.year);
        entry.lastYear = Math.max(entry.lastYear, row.year);
    }
    // Group by rookie year — each year's cohort is a "5y class"
    const classMap = new Map();
    for (const grower of growerMap.values()) {
        const year = grower.firstYear;
        const isActive = grower.lastYear === mostRecentYear;
        if (!classMap.has(year)) {
            classMap.set(year, {
                classYear: year,
                classLabel: `Class of ${year}`,
                members: [],
                memberCount: 0,
                retainedCount: 0,
                retainedPct: 0,
                classTotalDollars: 0,
            });
        }
        const cls = classMap.get(year);
        cls.members.push({
            firstName: grower.firstName,
            lastName: grower.lastName,
            totalDollars: grower.totalDollars,
            isActive,
        });
        cls.memberCount = cls.members.length;
        cls.classTotalDollars += grower.totalDollars;
    }
    // Compute retention stats after all members are grouped
    for (const cls of classMap.values()) {
        cls.retainedCount = cls.members.filter(m => m.isActive).length;
        cls.retainedPct = cls.memberCount > 0 ? Math.round((cls.retainedCount / cls.memberCount) * 100) : 0;
    }
    return Array.from(classMap.values()).sort((a, b) => a.classYear - b.classYear);
}
//# sourceMappingURL=aggregation.js.map