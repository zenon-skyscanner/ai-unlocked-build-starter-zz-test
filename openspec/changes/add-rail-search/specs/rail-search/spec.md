# Rail Search Capability

## ADDED Requirements

### Requirement: Rail Trip Data Storage
The system SHALL store rail trip information in the database including origin, destination, departure time, arrival time, carrier, duration, and stops.

#### Scenario: Rail trip data structure
- **WHEN** a rail trip is stored in the database
- **THEN** it MUST include origin city, destination city, departure datetime, arrival datetime, carrier name, duration in minutes, and a list of stops

#### Scenario: Database seeding with Italian cities
- **WHEN** the development server starts
- **THEN** the database SHALL be seeded with exactly 100 example rail trips covering 10 Italian cities: Rome, Milan, Venice, Florence, Naples, Turin, Bologna, Verona, Genoa, and Palermo

#### Scenario: Consistent seed data
- **WHEN** the development server starts
- **THEN** the database SHALL be cleared and reseeded with the same 100 trips to ensure consistent starting data

### Requirement: Rail Search Page
The system SHALL provide a dedicated rail search page accessible at `/rail-search` where users can search for rail trips.

#### Scenario: Page accessibility
- **WHEN** a user navigates to `/rail-search`
- **THEN** the page SHALL display with a search form and any existing results

#### Scenario: Navigation link
- **WHEN** a user views the main navigation
- **THEN** a "Rail Search" link SHALL be visible and navigate to `/rail-search`

### Requirement: Search Form
The system SHALL provide a search form with inputs for origin, destination, and departure date.

#### Scenario: Search form inputs
- **WHEN** the rail search page loads
- **THEN** the form SHALL display three input fields: origin (text), destination (text), and departure date (date picker)

#### Scenario: Form submission
- **WHEN** a user submits the search form with valid inputs
- **THEN** the page SHALL reload with filtered results matching the search criteria

### Requirement: Search Results Filtering
The system SHALL filter rail trips based on user-provided search criteria for origin, destination, and departure date.

#### Scenario: Exact origin and destination match
- **WHEN** a user searches for origin "Rome" and destination "Milan"
- **THEN** only trips with matching origin and destination SHALL be displayed

#### Scenario: Departure date filtering
- **WHEN** a user searches with a specific departure date
- **THEN** only trips departing on or after that date SHALL be displayed

#### Scenario: Combined filter criteria
- **WHEN** a user provides origin, destination, and departure date
- **THEN** trips MUST match all three criteria to be displayed

### Requirement: Search Results Display
The system SHALL display search results showing relevant trip information in a clear, readable format.

#### Scenario: Result information display
- **WHEN** search results are displayed
- **THEN** each result SHALL show origin, destination, departure time, arrival time, carrier name, duration, and stops

#### Scenario: No results found
- **WHEN** a search returns no matching trips
- **THEN** the page SHALL display a user-friendly message indicating no trips were found

#### Scenario: Results layout
- **WHEN** search results are displayed
- **THEN** they SHALL be presented in a responsive layout using Tailwind CSS consistent with the existing design patterns

### Requirement: Trip Duration Display
The system SHALL display trip duration in a human-readable format.

#### Scenario: Duration formatting
- **WHEN** a trip duration is displayed
- **THEN** it SHALL be shown in hours and minutes (e.g., "2h 30m")

### Requirement: Stops Information Display
The system SHALL display intermediate stops for each rail trip.

#### Scenario: Stops display
- **WHEN** a trip includes intermediate stops
- **THEN** the stops SHALL be displayed in order as a readable list or comma-separated string
