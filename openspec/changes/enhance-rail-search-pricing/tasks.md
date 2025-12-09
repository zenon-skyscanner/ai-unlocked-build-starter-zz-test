# Implementation Tasks

## Database Changes
- [x] Add `price` column to `RailTrip` table in `db/config.ts` (type: number, representing price in euros)
- [x] Update seed data in `db/seed.ts` to include realistic price values for all 100 trips
- [x] Run database reset to apply schema changes

## Backend/Page Logic
- [x] Update `src/pages/rail-search.astro` to load ALL trips on initial page load
- [x] Pass all trip data to client-side React component for filtering
- [x] Create `src/pages/rail-search/[id].astro` for individual trip detail pages
- [x] Implement trip detail page with full information display

## Frontend Components
- [x] Create `src/components/RailTripCard.tsx` React component for individual trip display
- [x] Display price, departure time, arrival time, duration, and carrier on each card
- [x] Make trip cards clickable links to detail pages
- [x] Create `src/components/RailSearchFilters.tsx` React component with dynamic filtering
- [x] Implement origin/destination text inputs with real-time filtering
- [x] Implement date picker with real-time filtering
- [x] Implement dual-range price sliders with real-time filtering
- [x] Add visual indicators (hover effects, cursor pointer) for clickable elements
- [x] Style price information prominently (size, color, position)
- [x] Show filtered trip count dynamically as filters change

## UI/UX Enhancements
- [x] Display all available trips immediately on page load (no empty state)
- [x] Add clear min/max price labels above or below sliders
- [x] Display current filter values dynamically as users type/adjust
- [x] Show total count of results matching ALL active filters
- [x] Add "Reset Filters" button to clear all filter constraints
- [x] Ensure responsive design works on mobile devices
- [x] Add smooth transitions when trips are filtered in/out
- [x] Provide visual feedback when no trips match current filters

## Testing
- [x] Verify all trips display on initial page load
- [x] Test dynamic filtering responds instantly to input changes
- [x] Verify price filtering works correctly (inclusive ranges)
- [x] Test origin/destination filtering (partial matches, case-insensitive)
- [x] Test date filtering (on or after selected date)
- [x] Test combined filters work correctly together
- [x] Test navigation to detail pages with correct trip IDs
- [x] Confirm sliders work smoothly with proper min/max constraints
- [x] Test edge cases (no results matching filters, all results match, etc.)
- [x] Verify accessibility of interactive elements
- [x] Test reset filters button clears all criteria
