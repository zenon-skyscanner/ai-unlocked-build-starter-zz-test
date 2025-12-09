# Implementation Tasks

## Database Schema Changes
- [x] Create `SeatClass` table with columns: id, tripId, className, description, priceModifier
- [x] Add amenity columns to `RailTrip` table: hasPowerSockets, hasWifi, wifiReliability (1-5 scale)
- [x] Add `punctuality` column to `RailTrip` table (percentage 0-100)

## Database Seed Data
- [x] Define seat class types: Standard, Solo, Double Seat, Table Seat, Compartment, First Class
- [x] Create seat class entries for all 100 trips with appropriate price modifiers
- [x] Add realistic amenity data to all trips (power sockets, wifi, wifi quality)
- [x] Add historical punctuality percentages to all trips (based on route/carrier)

## Backend/Page Logic
- [x] Update trip queries to include amenity and punctuality data
- [x] Create query to fetch seat classes for specific trip
- [x] Update detail page to load and display seat class options

## Frontend Components - Trip Cards
- [x] Add amenity icons to `RailTripCard.tsx` (power socket, wifi indicators)
- [x] Add punctuality badge to trip cards with percentage and visual indicator
- [x] Add "from €X" pricing that reflects base seat class price
- [x] Ensure card layout accommodates new information without overcrowding

## Frontend Components - Filters
- [x] Add amenity filter checkboxes to `RailSearchFilters.tsx` (power required, wifi required)
- [ ] Add minimum punctuality slider to filters (optional - not implemented)
- [x] Update filter logic to include amenity and punctuality criteria
- [x] Show filter counts when amenity/punctuality filters are active

## Frontend Components - Detail Page
- [x] Display all available seat classes with descriptions and prices on detail page
- [x] Show full amenity details (power sockets per seat, wifi speed/reliability rating)
- [x] Display punctuality chart/indicator with historical context
- [x] Add seat class selector with visual representation
- [x] Update booking button to reflect selected seat class price
- [ ] (Optional) Create `SeatClassSelector.tsx` component for seat selection UI (not implemented - used inline display)

## Styling & UI/UX
- [x] Design amenity icons/badges (⚡ power, 📶 wifi, with quality indicators)
- [x] Create punctuality indicator (🎯 with color coding: green >90%, yellow 80-90%, red <80%)
- [x] Ensure seat class pricing is clear and prominent
- [x] Add tooltips/explanations for wifi reliability ratings
- [x] Responsive design for seat class selector on mobile

## Testing
- [x] Verify seat classes display correctly for all trips
- [x] Test amenity filtering works correctly (AND logic for multiple amenities)
- [x] Verify punctuality displays accurately and with correct color coding
- [x] Test seat class selection updates pricing correctly on detail page
- [x] Verify all 100 trips have complete amenity and seat class data
- [x] Test edge cases (trips with no wifi, low punctuality, etc.)
- [x] Verify performance with additional database queries
- [x] Test responsive design on mobile devices
