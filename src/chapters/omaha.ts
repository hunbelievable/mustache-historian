import type { ChapterDefinition } from '../types/chapter';

// Update this to your actual GitHub repo URL after publishing
const BASE = 'https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/mustache-historian/main';

export const omaha: ChapterDefinition = {
  slug: 'omaha',
  name: 'Omaha',
  city: 'Omaha',
  state: 'NE',
  firstYear: 2009,
  availableYears: [
    2009, 2010, 2011, 2012, 2013, 2014, 2015,
    2016, 2017, 2018, 2019, 2020, 2021, 2022,
    2023, 2024, 2025,
  ],
  fundraisingUrl: (year) => `${BASE}/data/chapters/omaha/fundraising-${year}.csv`,
  nameCorrectionUrl: () => `${BASE}/data/chapters/omaha/name-corrections.json`,
  meleeUrl: () => `${BASE}/data/chapters/omaha/melee.json`,
  awardsUrl: () => `${BASE}/data/chapters/omaha/stachey-awards.csv`,
};
