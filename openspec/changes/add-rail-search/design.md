# Design: Rail Search Feature

## Context
The application currently supports static travel product browsing and a blog system. We're adding a specialized rail search feature to enable users to find specific rail journeys based on origin, destination, and departure date. This aligns with the project's focus on rail travel products (as noted in project.md).

## Goals / Non-Goals

### Goals
- Enable users to search for rail trips by origin, destination, and date
- Store rail trip data in Astro DB alongside existing Article data
- Provide a clean, intuitive search interface consistent with existing design
- Support multiple rail carriers and routes with schedule information
- Seed database with consistent, repeatable data covering 10 Italian cities with 100 example trips

### Non-Goals
- Real-time integration with external rail APIs (use static seed data)
- Booking or payment functionality (search only)
- User accounts or saved searches
- Multi-leg journey planning
- Price comparison or filtering

## Decisions

### Database Schema
**Decision**: Add `RailTrip` table to Astro DB with the following structure:
```typescript
RailTrip = {
  id: number (primary key)
  origin: text
  destination: text
  departureDateTime: date
  arrivalDateTime: date
  carrier: text
  duration: number (minutes)
  stops: text (comma-separated or JSON string)
}
```

**Rationale**:
- Follows existing Astro DB pattern (similar to Article table)
- Simple flat structure suitable for demo/starter purposes
- Duration stored in minutes for easy calculation and display
- Stops stored as string for flexibility (can be parsed client-side)

**Alternatives considered**:
- Separate tables for stations, carriers, routes → Too complex for starter template
- Store times as strings → Harder to filter and sort by date
- JSON column for stops → Less portable, harder to query

### Search Implementation
**Decision**: Server-side filtering using Astro DB queries on the rail-search page

**Rationale**:
- Consistent with existing SSR architecture (`output: 'server'`)
- Simpler than client-side state management for search
- Enables direct database queries without additional API layer

**Alternatives considered**:
- Client-side filtering with React → Requires loading all data upfront, less scalable
- Separate API endpoint → Adds complexity without clear benefit for this use case

### UI Component Strategy
**Decision**: Use Astro component for page structure with inline filtering logic

**Rationale**:
- Matches existing pattern (blog pages use Astro with inline queries)
- Search form submission can use standard HTML forms
- Results can be server-rendered on page load

**Alternatives considered**:
- React component for full search UI → More complexity, better for highly interactive features
- Hybrid approach (Astro + React) → Overkill for simple search form

### Date Filtering Strategy
**Decision**: Search by departure date (day only, ignore time) with exact match or "on or after" logic

**Rationale**:
- Simpler UX - users pick a date from input
- Most common use case - "show me trains leaving on or after this date"
- Can be enhanced later if needed

## Risks / Trade-offs

### Risk: Limited Search Flexibility
- **Impact**: Users can only search by exact origin/destination strings
- **Mitigation**: Use consistent city names in seed data; consider adding autocomplete in future

### Risk: Date Filtering Edge Cases
- **Impact**: Timezone handling, date parsing differences
- **Mitigation**: Store dates in ISO format; document expected timezone behavior

### Trade-off: Stops as String
- **Benefit**: Simple storage, flexible display
- **Cost**: Can't easily query by intermediate stops
- **Decision**: Acceptable for MVP; can normalize later if needed

## Migration Plan

### Implementation Steps
1. Add schema to `db/config.ts` (no migration needed for new tables)
2. Add seed data to `db/seed.ts`
3. Create search page and test with seed data
4. Add navigation link

### Rollback
- Remove RailTrip table from schema
- Remove seed data
- Delete rail-search page
- Remove navigation link

No data migration needed as this is a new feature with seed data only.

## Open Questions
- Should we support partial matching for origin/destination (e.g., "Rom" matches "Rome")? → **Decision**: Start with exact match, add fuzzy search if needed
- Display format for stops? → **Decision**: Show as comma-separated list in results
- How many example routes needed? → **Decision**: 100 example trips covering 10 major Italian cities
- Which Italian cities? → **Decision**: Rome, Milan, Venice, Florence, Naples, Turin, Bologna, Verona, Genoa, Palermo
