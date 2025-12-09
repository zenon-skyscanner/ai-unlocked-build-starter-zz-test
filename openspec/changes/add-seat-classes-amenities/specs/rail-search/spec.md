# Rail Search Capability (Delta)

## MODIFIED Requirements

### Requirement: Rail Trip Data Storage
The system SHALL store rail trip information in the database including origin, destination, departure time, arrival time, carrier, duration, stops, price, **amenity information, and historical punctuality data**.

#### Scenario: Rail trip data structure
- **WHEN** a rail trip is stored in the database
- **THEN** it MUST include origin city, destination city, departure datetime, arrival datetime, carrier name, duration in minutes, a list of stops, price in euros as a numeric value, **power socket availability (boolean), wifi availability (boolean), wifi reliability rating (1-5 scale), and punctuality percentage (0-100)**

#### Scenario: Database seeding with seat classes
- **WHEN** the development server starts
- **THEN** each of the 100 trips SHALL have associated seat class options with different pricing tiers and descriptions

### Requirement: Search Results Display
The system SHALL display all available trips on initial page load and show relevant trip information including price, **amenities, and punctuality** in a clear, readable format with interactive elements.

#### Scenario: Result information display
- **WHEN** trips are displayed (initial load or after filtering)
- **THEN** each result SHALL show origin, destination, departure time, arrival time, carrier name, duration, stops, price prominently displayed, **amenity indicators (power, wifi with quality), and punctuality percentage with visual indicator**

#### Scenario: Amenity indicators on cards
- **WHEN** a trip card is displayed
- **THEN** it SHALL show visual badges or icons indicating availability of power sockets and wifi, with wifi quality rating visible

#### Scenario: Punctuality indicator on cards
- **WHEN** a trip card is displayed
- **THEN** it SHALL show the historical punctuality percentage with color-coded visual indicator (green for ≥90%, yellow for 80-89%, red for <80%)

### Requirement: Trip Detail Page
The system SHALL provide a dedicated detail page for each rail trip accessible via a unique identifier, **displaying seat class options with pricing**.

#### Scenario: Comprehensive trip information
- **WHEN** a user views a trip detail page
- **THEN** it SHALL display all trip information: origin, destination, departure time, arrival time, carrier, duration, price, stops (with times if available), **all available seat classes with descriptions and prices, detailed amenity information, and punctuality history**

#### Scenario: Seat class display
- **WHEN** a user views a trip detail page
- **THEN** all available seat classes SHALL be displayed with clear names (e.g., Standard, Solo, Double Seat, Table Seat, Compartment, First Class), descriptions, and individual pricing

#### Scenario: Detailed amenity information
- **WHEN** a user views a trip detail page
- **THEN** detailed amenity information SHALL be displayed including power socket availability and location, wifi availability, wifi speed/reliability rating with explanation

#### Scenario: Punctuality history display
- **WHEN** a user views a trip detail page
- **THEN** historical punctuality data SHALL be displayed with percentage and visual representation (chart or indicator) showing reliability over time

## ADDED Requirements

### Requirement: Seat Class Options
The system SHALL provide multiple seat class options for each rail trip with varying prices and amenities.

#### Scenario: Seat class types
- **WHEN** seat classes are defined in the system
- **THEN** they SHALL include at minimum: Standard, Solo, Double Seat, Table Seat, Compartment, and First Class

#### Scenario: Seat class pricing
- **WHEN** a seat class is displayed
- **THEN** it SHALL show a price modifier or total price relative to the base trip price

#### Scenario: Seat class descriptions
- **WHEN** seat classes are displayed
- **THEN** each SHALL include a description explaining the seating configuration, privacy level, and included amenities

#### Scenario: Base price representation
- **WHEN** a trip card shows pricing
- **THEN** it SHALL indicate "from €X" where X is the lowest available seat class price for that trip

### Requirement: Amenity Information Display
The system SHALL display amenity information for each trip including power sockets, wifi availability, and wifi quality.

#### Scenario: Power socket indicator
- **WHEN** a trip has power sockets available
- **THEN** a clear visual indicator (icon/badge) SHALL be displayed on the trip card and detail page

#### Scenario: Wifi availability indicator
- **WHEN** a trip has wifi available
- **THEN** a clear visual indicator SHALL be displayed with the wifi reliability rating (1-5 scale)

#### Scenario: Wifi reliability display
- **WHEN** wifi is available on a trip
- **THEN** the reliability rating SHALL be shown using a visual scale (e.g., signal bars, stars, or numeric rating out of 5)

#### Scenario: No amenity indicator
- **WHEN** a trip does not have a specific amenity
- **THEN** the indicator for that amenity SHALL either be absent or clearly marked as unavailable

### Requirement: Historical Punctuality Display
The system SHALL display historical punctuality data for each route to inform travelers of service reliability.

#### Scenario: Punctuality percentage display
- **WHEN** a trip is displayed
- **THEN** it SHALL show the historical on-time arrival percentage (0-100%)

#### Scenario: Punctuality color coding
- **WHEN** punctuality is displayed
- **THEN** it SHALL use color coding: green for ≥90%, yellow for 80-89%, red for <80%

#### Scenario: Punctuality on trip cards
- **WHEN** a trip card is displayed in search results
- **THEN** the punctuality percentage SHALL be visible as a badge or indicator

#### Scenario: Detailed punctuality on detail page
- **WHEN** a user views a trip detail page
- **THEN** more detailed punctuality information SHALL be shown, such as historical trend or explanation

### Requirement: Amenity-Based Filtering
The system SHALL allow users to filter trips based on required amenities.

#### Scenario: Power socket filter
- **WHEN** a user activates the power socket filter
- **THEN** only trips with power sockets available SHALL be displayed

#### Scenario: Wifi filter
- **WHEN** a user activates the wifi filter
- **THEN** only trips with wifi available SHALL be displayed

#### Scenario: Wifi quality filter
- **WHEN** a user sets a minimum wifi reliability rating
- **THEN** only trips meeting or exceeding that rating SHALL be displayed

#### Scenario: Combined amenity filters
- **WHEN** a user activates multiple amenity filters
- **THEN** only trips meeting ALL selected amenity criteria SHALL be displayed (AND logic)

#### Scenario: Amenity filter indicators
- **WHEN** amenity filters are active
- **THEN** the filter UI SHALL clearly indicate which amenities are required and the filtered trip count SHALL update

### Requirement: Seat Class Selection
The system SHALL allow users to view and select seat classes on the trip detail page.

#### Scenario: Seat class selector display
- **WHEN** a user views a trip detail page
- **THEN** a seat class selector SHALL be displayed showing all available classes

#### Scenario: Seat class price update
- **WHEN** a user selects a different seat class
- **THEN** the displayed total price SHALL update to reflect the selected class pricing

#### Scenario: Seat class visual representation
- **WHEN** seat classes are displayed
- **THEN** each option SHALL have a visual representation or icon indicating the seating type (e.g., single seat icon, table icon, compartment icon)

#### Scenario: Default seat class
- **WHEN** a trip detail page loads
- **THEN** the default selected seat class SHALL be the lowest-priced available option

### Requirement: Seat Class and Amenity Data Integrity
The system SHALL ensure all trips have complete seat class and amenity information.

#### Scenario: Minimum seat class availability
- **WHEN** a trip is stored in the database
- **THEN** it SHALL have at least one seat class option available

#### Scenario: Amenity data completeness
- **WHEN** a trip is stored in the database
- **THEN** it SHALL have defined values for all amenity fields (power sockets, wifi availability, wifi reliability if applicable)

#### Scenario: Punctuality data availability
- **WHEN** a trip is stored in the database
- **THEN** it SHALL have a punctuality percentage value between 0 and 100
