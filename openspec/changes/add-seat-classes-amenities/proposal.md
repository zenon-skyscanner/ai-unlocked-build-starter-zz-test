# Change: Add Seat Classes, Amenities, and Route Punctuality

## Why
Travelers need detailed information to make informed booking decisions beyond just route and price. Currently, users cannot see what type of seating is available, what amenities each train offers (power sockets, wifi quality), or how reliable the service is. Without seat class options (solo, double, table, compartment, first class), travelers cannot choose seating that fits their comfort and privacy needs. Without visibility into amenities and historical punctuality data, users cannot assess whether a route meets their connectivity needs or reliability expectations. This enhancement provides transparency and choice, enabling travelers to select routes that best match their preferences and requirements.

## What Changes
- Add seat class types to database with individual pricing
- Add train amenities information (power sockets, wifi availability, wifi reliability rating)
- Add historical punctuality percentage to routes
- Update database schema with new fields for seat classes and route metadata
- Seed database with realistic seat class pricing and amenity data for all routes
- Display available seat classes with pricing on trip cards and detail pages
- Show amenity icons/badges on trip cards
- Display punctuality percentage as a trust indicator
- Add seat class selection UI on detail pages
- Filter trips by required amenities

## Impact
- Affected specs: `rail-search` (modified capability)
- Affected code:
  - `db/config.ts` - Add columns for amenities, punctuality; create new SeatClass table
  - `db/seed.ts` - Add seat class data and amenity/punctuality info to all routes
  - `src/components/RailTripCard.tsx` - Display amenities and punctuality badges
  - `src/components/RailSearchFilters.tsx` - Add amenity filters
  - `src/pages/rail-search/[id].astro` - Show seat class options with pricing and full amenity details
  - `src/components/SeatClassSelector.tsx` - New component for seat class selection (optional)
- Database schema changes: 
  - Adding amenity columns to RailTrip (non-breaking additions)
  - Creating SeatClass table with foreign key to RailTrip
- User experience: Enhanced decision-making with transparency on seating, amenities, and reliability
