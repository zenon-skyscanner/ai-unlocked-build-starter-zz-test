# Rail Search Capability (Delta)

## MODIFIED Requirements

### Requirement: Rail Trip Data Storage
The system SHALL store rail trip information in the database including origin, destination, departure time, arrival time, carrier, duration, stops, **and price**.

#### Scenario: Rail trip data structure
- **WHEN** a rail trip is stored in the database
- **THEN** it MUST include origin city, destination city, departure datetime, arrival datetime, carrier name, duration in minutes, a list of stops, **and price in euros as a numeric value**

#### Scenario: Database seeding with Italian cities
- **WHEN** the development server starts
- **THEN** the database SHALL be seeded with exactly 100 example rail trips covering 10 Italian cities: Rome, Milan, Venice, Florence, Naples, Turin, Bologna, Verona, Genoa, and Palermo, **with prices ranging from €15 to €150**

### Requirement: Search Results Display
The system SHALL display **all available trips on initial page load** and show relevant trip information **including price** in a clear, readable format **with interactive elements**.

#### Scenario: Initial page load with all trips
- **WHEN** a user navigates to the rail search page without any search parameters
- **THEN** all available trips SHALL be displayed immediately without requiring a search

#### Scenario: Result information display
- **WHEN** trips are displayed (initial load or after filtering)
- **THEN** each result SHALL show origin, destination, departure time, arrival time, carrier name, duration, stops, **and price prominently displayed**

#### Scenario: Clickable search results
- **WHEN** a user views search results
- **THEN** each result card SHALL be clickable and navigate to a detailed route page with the specific trip ID

#### Scenario: Visual indication of interactivity
- **WHEN** a user hovers over a search result
- **THEN** the result SHALL display visual feedback (cursor change, hover effect) indicating it is clickable

#### Scenario: Price display formatting
- **WHEN** a trip price is displayed
- **THEN** it SHALL be formatted as currency (e.g., "€45.00" or "€45") and positioned prominently within the result card

## ADDED Requirements

### Requirement: Dynamic Real-Time Filtering
The system SHALL provide interactive filter controls that update displayed trips in real-time as users adjust origin, destination, date, and price criteria.

#### Scenario: Client-side filtering without page reload
- **WHEN** a user adjusts any filter control (origin, destination, date, or price)
- **THEN** the displayed trips SHALL update immediately without requiring page reload or form submission

#### Scenario: Origin filtering
- **WHEN** a user types in the origin field
- **THEN** only trips matching the origin (case-insensitive, partial match acceptable) SHALL be displayed

#### Scenario: Destination filtering
- **WHEN** a user types in the destination field
- **THEN** only trips matching the destination (case-insensitive, partial match acceptable) SHALL be displayed

#### Scenario: Date filtering
- **WHEN** a user selects a departure date
- **THEN** only trips departing on or after that date SHALL be displayed

#### Scenario: Combined real-time filtering
- **WHEN** a user has multiple active filters (e.g., origin, destination, and price range)
- **THEN** only trips matching ALL criteria SHALL be displayed, updating instantly as any filter changes

### Requirement: Price Range Filtering
The system SHALL provide interactive price range sliders allowing users to filter displayed trips by minimum and maximum price.

#### Scenario: Price slider controls
- **WHEN** the rail search page displays trips
- **THEN** dual-range price sliders SHALL be visible allowing users to set minimum and maximum price thresholds

#### Scenario: Dynamic price filtering
- **WHEN** a user adjusts the price range sliders
- **THEN** displayed trips SHALL update in real-time to show only trips within the selected price range (inclusive)

#### Scenario: Price range display
- **WHEN** price sliders are adjusted
- **THEN** the current min and max values SHALL be displayed clearly near the sliders

#### Scenario: Default price range
- **WHEN** the rail search page loads with results
- **THEN** the price sliders SHALL default to the full range of available trip prices (minimum to maximum in results)

#### Scenario: No results in price range
- **WHEN** a user sets a price range that excludes all trips
- **THEN** a message SHALL indicate no trips match the selected price range

#### Scenario: Reset all filters
- **WHEN** a user clicks a "Reset Filters" or similar button
- **THEN** ALL filter controls (origin, destination, date, and price sliders) SHALL return to their default state and all available trips SHALL be displayed

#### Scenario: Filter result count display
- **WHEN** filters are active and trips are being filtered
- **THEN** the number of trips matching the current filter criteria SHALL be displayed dynamically

### Requirement: Trip Detail Page
The system SHALL provide a dedicated detail page for each rail trip accessible via a unique identifier.

#### Scenario: Detail page route
- **WHEN** a user clicks on a search result
- **THEN** they SHALL be navigated to `/rail-search/[id]` where `[id]` is the unique trip identifier

#### Scenario: Comprehensive trip information
- **WHEN** a user views a trip detail page
- **THEN** it SHALL display all trip information: origin, destination, departure time, arrival time, carrier, duration, price, stops (with times if available), and amenities or additional details

#### Scenario: Detail page for non-existent trip
- **WHEN** a user navigates to a detail page with an invalid trip ID
- **THEN** a 404 error or "Trip not found" message SHALL be displayed

#### Scenario: Navigation back to search
- **WHEN** a user is on a trip detail page
- **THEN** a clear link or button SHALL allow them to return to the rail search page

### Requirement: Trip Card Display
The system SHALL display each trip as an individual card showing essential booking information.

#### Scenario: Essential trip information on card
- **WHEN** a trip is displayed as a card
- **THEN** it SHALL prominently show price, departure time, arrival time, duration, origin, destination, and carrier name

#### Scenario: Trip card layout
- **WHEN** multiple trips are displayed
- **THEN** they SHALL be arranged in a grid or list layout with consistent spacing and visual hierarchy

#### Scenario: Visual distinction between trips
- **WHEN** trips are displayed
- **THEN** each card SHALL have clear visual boundaries (borders, shadows, or spacing) to distinguish individual trips
