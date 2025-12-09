# Change: Add Rail Search Functionality

## Why
Users need to search for rail trips based on their travel requirements (origin, destination, and departure date). Currently, the application only displays static travel products without specialized rail journey search capabilities. This feature will enable users to find specific rail routes and schedules.

## What Changes
- Add new `/rail-search` page with search form and results display
- Create database schema for rail trips including routes, schedules, and carrier information
- Implement search functionality filtering trips by origin, destination, and departure date
- Seed database with example rail routes to power the search
- Add navigation link to rail search page

## Impact
- Affected specs: `rail-search` (new capability)
- Affected code:
  - `db/config.ts` - Add RailTrip table schema
  - `db/seed.ts` - Add sample rail trip data
  - `src/pages/rail-search.astro` - New search page
  - `src/components/Navigation.astro` - Add rail search link
  - `src/components/RailSearch.tsx` - New React component for search interface (optional)
