# Mustache Historian — Data Guide

This guide is for anyone who knows the M4K Omaha data well and wants to help
keep it accurate — no GitHub account setup, no coding, no NPM required beyond
a regular web browser.

---

## Where everything lives

All raw data is inside the `data/chapters/omaha/` folder on GitHub:

```
data/chapters/omaha/
├── fundraising-2009.csv   ← one file per year
├── fundraising-2010.csv
│   ...
├── fundraising-2025.csv
├── stachey-awards.csv     ← all Stachey award history
├── name-corrections.json  ← canonical name mappings (the #1 fix tool)
├── melee.json             ← Mustache Melee bracket data
└── metadata.json          ← chapter basics (first year, etc.)
```

You can browse and edit any of these files directly in the GitHub web interface
— no software to install.

---

## How to edit a file on GitHub (no git required)

1. Go to the repository on GitHub and navigate into `data/chapters/omaha/`
2. Click the file you want to edit
3. Click the **pencil icon** (✏️) in the top-right of the file view
4. Make your changes in the editor
5. Scroll to the bottom — fill in a short description of what you changed
   (e.g. *"Fix spelling of Neil Macleod in 2019"*)
6. Click **"Commit changes"**

That's it. The change is saved. The app will pick it up on the next deployment.

---

## File formats

### 1. Fundraising CSVs — `fundraising-YYYY.csv`

One file per year. Each row is one grower's result for that year.

**Format:** `rank, firstName, lastName, totalDollars`

```
1,Cory,Lesley,"$46,554.00"
2,Brian,Moore,"$29,715.00"
3,Samuel,Snider,"$25,017.00"
69,Russell,Holiday,"$1,234.00"
```

**Rules:**
- Column 1 is the **final rank** for that year (1 = top fundraiser)
- Dollar amounts must be wrapped in quotes and include `$` and commas:
  `"$1,234.00"` ✅ &nbsp;&nbsp; `1234` ❌ &nbsp;&nbsp; `$1234` ❌
- No header row — the first line is already data
- Rank 69 is the traditional "Nice Finish" spot — don't skip it if someone
  earned it

**Common errors to look for:**
- A grower listed under two slightly different names across years
  (e.g. `Sam Snider` one year, `Samuel Snider` another) — fix via
  `name-corrections.json` (see below), not by editing every CSV
- A dollar amount missing its quotes, causing a parse error
- Someone ranked twice (duplicate rows)
- Rank gaps or rank jumps (e.g. 1, 2, 4 — missing rank 3)

---

### 2. Name Corrections — `name-corrections.json`

This is the **most important tool for fixing identity errors**. Instead of
hunting through 17 years of CSVs, you add one line here and the app
automatically treats both names as the same person everywhere — leaderboard,
grower profiles, 5Y classes, trophy cases, all of it.

**Format:** `"Wrong Name": "Correct Name"`

```json
{
  "Samuel Snider":   "Sam Snider",
  "Bryon Steffensmeier": "Byron Steffensmeier",
  "Nick Bellenbaum": "Nicolas Bellenbaum"
}
```

**When to use it:**
- A grower appears as a rookie in a year they've clearly competed before
  (the app thinks they're a new person because the name changed)
- A grower's profile shows fewer years than they actually participated
- Stachey awards or Melee appearances aren't showing up on the right profile
- You know a name in one year is misspelled vs. other years

**How to add a correction:**

1. Open `name-corrections.json`
2. Add a new line before the last `}`:
   ```json
   "Wrong Version": "Correct Version"
   ```
3. Make sure you add a comma after the previous entry if one isn't there
4. The "Correct Version" should be whatever name is most consistently used
   across the majority of years

**Things to watch out for:**
- Both names must be spelled exactly as they appear in the CSV files
  (including capitalization)
- If the same person has appeared under three different names, add two
  correction lines — both pointing to the same canonical name
- Don't "correct" a name to itself — that does nothing

---

### 3. Stachey Awards — `stachey-awards.csv`

All award history in a single file. Each row is one award given in one year.

**Format:** `year, awardName, firstName, lastName, notes`

```
2025,Sweetest Stache,Andrew,Cumbee,Lazerwolf
2024,Rookie of the Year,Jordan,Pietzmeier,
2020,Best Costume,,,No winner due to Covid
2017,Best Mustache Name,Bern,Mendick,The Nard Dog
```

**Rules:**
- `notes` is optional — leave it blank (just end the line with a comma) or
  omit the comma entirely if there's nothing to add
- For years with no winner, leave first/last name blank but keep the row so
  the year shows up correctly: `2020,Sweetest Stache,,,No winner due to Covid`
- Award names must match exactly year-over-year — the app groups by award
  name, so a typo creates a phantom new award category

**Current award names (copy these exactly):**
- `Sweetest Stache`
- `Most Fundraisingest`
- `Most Testosterone`
- `Best Costume`
- `Rookie of the Year`
- `Best Mustache Name`
- `Jen Rudd Lady of the Year`
- `Nastiest Stache`

**Common errors to look for:**
- Award winner name doesn't match the fundraising CSV name → add a
  name-correction entry so the trophy shows up on their profile
- Missing year for an award category (e.g. Nastiest Stache has no 2014 row)
- Duplicate rows for the same award + year

---

### 4. Melee Bracket — `melee.json`

The Mustache Melee tournament data. This one is more complex — it's a
structured JSON file with bracket matchups for each year the Melee has run
(2020 onward).

**Structure overview:**
```
year
└── bracket
    ├── left
    │   ├── topRegion    (name, r16 matches, qf match)
    │   ├── bottomRegion (name, r16 matches, qf match)
    │   └── sf match
    └── right
        ├── topRegion
        ├── bottomRegion
        └── sf match
└── final match
└── champion name
```

Each match looks like:
```json
{ "p1": "Ryan Saunders", "p2": "Tom Brantley", "winner": "Ryan Saunders" }
```

**Common errors to look for:**
- A player name in the bracket doesn't match their fundraising CSV name →
  add a name-correction so their Melee history shows on their grower profile
- `winner` value doesn't exactly match either `p1` or `p2`
- A player appears in two regions in the same year

**Recommendation:** For Melee edits, flag the issue and let a developer make
the change — the nested structure is easy to break with a small formatting
mistake.

---

## How to spot data errors in the app

The live app is the best error-detection tool you have. Here are specific
places to look:

| Symptom | Likely cause | Fix |
|---|---|---|
| A grower appears as a rookie in a year they've competed before | Name spelled differently that year | `name-corrections.json` |
| A grower's profile is missing years | Same as above | `name-corrections.json` |
| Two grower profiles that are the same person | Name variation not yet corrected | `name-corrections.json` |
| Stachey award not showing on a grower's trophy case | Award CSV name ≠ fundraising CSV name | `name-corrections.json` |
| Melee appearance not on a grower's profile | Bracket name ≠ fundraising CSV name | `name-corrections.json` |
| A grower's lifetime total looks wrong | Duplicate or incorrect row in a year's CSV | Check the specific year's CSV |
| A class (5Y Classes page) has the wrong member count | Name variation making one person look like two people | `name-corrections.json` |

---

## Adding a new year

When a new Movember season wraps up:

1. **Create** `fundraising-YYYY.csv` — copy the format from last year's file,
   replace all the data, make sure ranks are sequential and dollar amounts are
   quoted
2. **Update** `stachey-awards.csv` — add a row for each award at the top of
   its section (newest year first isn't required, but it keeps things readable)
3. **Update** `melee.json` — add a new entry to the `years` array
4. **Check** `metadata.json` — the `firstYear` field never changes, but verify
   the app's `availableYears` list gets updated too (that's in the code, not
   the data — flag it for a developer)
5. **Scan** the new CSV for name variants — if any returning grower is spelled
   differently this year, add them to `name-corrections.json`

---

## Quick-reference checklist for reviewing a year's data

- [ ] Rank column is sequential with no gaps or duplicates
- [ ] Dollar amounts all use `"$X,XXX.XX"` format
- [ ] Every returning grower's name matches prior years (or has a correction)
- [ ] Stachey award winners' names match their fundraising CSV entry
- [ ] No grower appears twice in the same year's file
- [ ] If rank 69 was earned, that row is present
