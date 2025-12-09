# Implementation Tasks

## 1. Database Schema
- [x] 1.1 Add RailTrip table to `db/config.ts` with columns: id, origin, destination, departureDateTime, arrivalDateTime, carrier, duration, stops
- [x] 1.2 Create sample rail trip data in `db/seed.ts` with 100 example trips covering 10 Italian cities (Rome, Milan, Venice, Florence, Naples, Turin, Bologna, Verona, Genoa, Palermo)
- [x] 1.3 Ensure database is cleared and reseeded on each dev server start for consistent data

## 2. Search Page Implementation
- [x] 2.1 Create `/rail-search` page at `src/pages/rail-search.astro`
- [x] 2.2 Add search form with inputs for origin, destination, and departure date
- [x] 2.3 Implement server-side query to filter rail trips based on search criteria
- [x] 2.4 Display search results with trip details (times, carrier, duration, stops)
- [x] 2.5 Handle empty results state with user-friendly message

## 3. Navigation Updates
- [x] 3.1 Add "Rail Search" link to main navigation in `src/components/Navigation.astro`

## 4. Styling and UX
- [x] 4.1 Style search form with Tailwind CSS following existing design patterns
- [x] 4.2 Style results display with responsive grid/list layout
- [x] 4.3 Add loading states for search (if applicable)

## 5. Testing and Validation
- [x] 5.1 Test search with various origin/destination combinations
- [x] 5.2 Test date filtering
- [x] 5.3 Test empty search results
- [x] 5.4 Verify responsive design on mobile and desktop
