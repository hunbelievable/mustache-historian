# mustache-historian

Data and TypeScript utilities for the Mustache Historian fundraising tracker. Currently covers the **Omaha** chapter (2009–present), with a structure that supports adding additional chapters for cross-chapter comparison.

## Installation

```bash
npm install mustache-historian
```

## How it works

This package ships two things:

1. **TypeScript types and parser utilities** — installed via npm, versioned
2. **Raw data files** — hosted in this GitHub repo, fetched at runtime

Apps fetch data directly from GitHub raw URLs, which means **you get new data (new seasons, corrections) without rebuilding or updating the package**.

## Usage

```ts
import { chapters, parseFundraisingCSV, aggregateLifetime } from 'mustache-historian'
import type { FundraisingRecord } from 'mustache-historian'

const omaha = chapters.omaha

// Fetch name corrections and a year's data at runtime
const corrections = await fetch(omaha.nameCorrectionUrl()).then(r => r.json())
const csv = await fetch(omaha.fundraisingUrl(2025)).then(r => r.text())
const records = parseFundraisingCSV(csv, 2025, 'omaha', corrections)

// Aggregate lifetime totals
const lifetime = aggregateLifetime(records)
```

### Available exports

**Chapters**
```ts
import { chapters, omaha } from 'mustache-historian'

chapters.omaha.availableYears          // [2009, 2010, ..., 2025]
chapters.omaha.fundraisingUrl(2025)    // GitHub raw URL
chapters.omaha.nameCorrectionUrl()     // GitHub raw URL
chapters.omaha.meleeUrl()             // GitHub raw URL
chapters.omaha.awardsUrl()            // GitHub raw URL
```

**Parsers**
```ts
import {
  parseFundraisingCSV,   // (text, year, chapter, corrections?) => FundraisingRecord[]
  parseAwardsCSV,        // (text, chapter) => StacheyAwardRecord[]
  parseMeleeData,        // (json) => MeleeData
  getMeleeHistoryForGrower, // (data, name) => MeleeAppearance[]
  formatDollars,         // (n) => string
} from 'mustache-historian'
```

**Aggregation utilities**
```ts
import {
  aggregateLifetime,          // lifetime totals per grower
  aggregateYearlyTotals,      // total raised per year
  bestSingleYearPerformances, // top N single-year performances
  getNiceFinishers,           // position #69 each year
  getRookiesByYear,           // first-year growers per year
  getThresholdGrowthByYear,   // $1k/$10k threshold counts per year
} from 'mustache-historian'
```

## Data structure

```
data/
└── chapters/
    └── omaha/
        ├── metadata.json
        ├── fundraising-YYYY.csv   (2009–2025)
        ├── name-corrections.json
        ├── melee.json
        └── stachey-awards.csv
```

### FundraisingRecord

```ts
interface FundraisingRecord {
  chapter: string        // 'omaha'
  year: number
  positionFinished: number
  firstName: string
  lastName: string
  totalDollars: number
}
```

All records include a `chapter` field, so data from multiple chapters can be merged and compared naturally.

## Adding a new chapter

1. Create `data/chapters/<slug>/` with the same file structure as Omaha
2. Add `src/chapters/<slug>.ts` following the same pattern as `omaha.ts`
3. Register it in `src/chapters/registry.ts`
4. Bump the version and publish

## Setup: update your GitHub URL

After publishing this repo, update the `BASE` constant in `src/chapters/omaha.ts` with your actual GitHub username/org:

```ts
const BASE = 'https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/mustache-historian/main'
```

Then rebuild (`npm run build`) before publishing to npm.
