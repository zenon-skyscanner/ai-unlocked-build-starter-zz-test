# Change: Enhance Rail Search with Pricing and Interactive Results

## Why
The current rail search displays basic trip information but lacks critical user features for making booking decisions. Users need to see prices, compare options within a budget range, and navigate to detailed views to complete bookings. Additionally, users currently see nothing until they perform a search, missing the opportunity to browse available options immediately. Without pricing information, pre-search browsing, and dynamic filtering capabilities, users cannot quickly evaluate options or find trips within their budget. This enhancement will make the rail search more practical and user-friendly for actual booking scenarios.

## What Changes
- Add price information to rail trips in the database schema and seed data
- Display all available trips on initial page load (before any search)
- Show price, departure time, duration, and other key details for each trip card
- Implement interactive min/max price sliders for filtering results
- Add real-time dynamic filtering as users update origin, destination, date, and price
- Make all trip cards clickable to navigate to detailed route pages
- Add route detail page showing comprehensive trip information
- Enhance UI to clearly indicate clickable results
- Implement client-side filtering for responsive interactions without page reloads

## Impact
- Affected specs: `rail-search` (modified capability)
- Affected code:
  - `db/config.ts` - Add price column to RailTrip table schema
  - `db/seed.ts` - Add realistic price data to rail trip seeds
  - `src/pages/rail-search.astro` - Load all trips initially, pass to client component
  - `src/pages/rail-search/[id].astro` - New detail page for individual trips
  - `src/components/RailSearchFilters.tsx` - New React component for dynamic filtering (origin, destination, date, price)
  - `src/components/RailTripCard.tsx` - New React component for displaying individual trip cards
- Database schema change: Adding `price` column (non-breaking addition)
- User experience: Significantly improved with filtering and navigation capabilities
