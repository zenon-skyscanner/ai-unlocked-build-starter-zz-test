import { useState, useMemo } from 'react';
import RailTripCard from './RailTripCard';

interface Trip {
  id: number;
  origin: string;
  destination: string;
  departureDateTime: Date;
  arrivalDateTime: Date;
  carrier: string;
  duration: number;
  stops: string;
  price: number;
  hasPowerSockets: boolean;
  hasWifi: boolean;
  wifiReliability: number | null;
  punctuality: number;
}

interface RailSearchFiltersProps {
  allTrips: Trip[];
  cities: string[];
}

export default function RailSearchFilters({ allTrips, cities }: RailSearchFiltersProps) {
  const [originFilter, setOriginFilter] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const [requirePower, setRequirePower] = useState(false);
  const [requireWifi, setRequireWifi] = useState(false);

  // Calculate actual price range from all trips
  const priceRange = useMemo(() => {
    if (allTrips.length === 0) return { min: 0, max: 200 };
    const prices = allTrips.map(t => t.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, [allTrips]);

  // Initialize price sliders to full range on mount
  useMemo(() => {
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
  }, [priceRange]);

  // Filter trips based on all criteria
  const filteredTrips = useMemo(() => {
    return allTrips.filter(trip => {
      // Origin filter (case-insensitive, partial match)
      if (originFilter && !trip.origin.toLowerCase().includes(originFilter.toLowerCase())) {
        return false;
      }

      // Destination filter (case-insensitive, partial match)
      if (destinationFilter && !trip.destination.toLowerCase().includes(destinationFilter.toLowerCase())) {
        return false;
      }

      // Date filter (on or after selected date)
      if (dateFilter) {
        const filterDate = new Date(dateFilter);
        const tripDate = new Date(trip.departureDateTime);
        filterDate.setHours(0, 0, 0, 0);
        tripDate.setHours(0, 0, 0, 0);
        if (tripDate < filterDate) {
          return false;
        }
      }

      // Price filter (inclusive range)
      if (trip.price < minPrice || trip.price > maxPrice) {
        return false;
      }

      // Amenity filters
      if (requirePower && !trip.hasPowerSockets) {
        return false;
      }
      
      if (requireWifi && !trip.hasWifi) {
        return false;
      }

      return true;
    });
  }, [allTrips, originFilter, destinationFilter, dateFilter, minPrice, maxPrice, requirePower, requireWifi]);

  const handleReset = () => {
    setOriginFilter('');
    setDestinationFilter('');
    setDateFilter('');
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
    setRequirePower(false);
    setRequireWifi(false);
  };

  return (
    <div>
      {/* Filter Controls */}
      <section className="max-w-6xl mx-auto mb-12 px-4">
        <div className="glass rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-white/50">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black heading-gradient">Filter Trips</h2>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-sm transition-colors"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Origin Filter */}
            <div className="group">
              <label htmlFor="origin" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <span className="text-xl">📍</span>
                <span>From</span>
              </label>
              <input
                type="text"
                id="origin"
                value={originFilter}
                onChange={(e) => setOriginFilter(e.target.value)}
                list="cities"
                placeholder="e.g., Rome"
                className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-lg font-medium focus:ring-0 focus:border-purple-400 transition-all hover:border-purple-300"
              />
            </div>

            {/* Destination Filter */}
            <div className="group">
              <label htmlFor="destination" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <span className="text-xl">🎯</span>
                <span>To</span>
              </label>
              <input
                type="text"
                id="destination"
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                list="cities"
                placeholder="e.g., Milan"
                className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-lg font-medium focus:ring-0 focus:border-purple-400 transition-all hover:border-purple-300"
              />
            </div>

            {/* Date Filter */}
            <div className="group">
              <label htmlFor="departureDate" className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                <span className="text-xl">📅</span>
                <span>Departure</span>
              </label>
              <input
                type="date"
                id="departureDate"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-lg font-medium focus:ring-0 focus:border-purple-400 transition-all hover:border-purple-300"
              />
            </div>
          </div>

          {/* Price Range Sliders */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
              <span className="text-xl">💰</span>
              <span>Price Range</span>
            </label>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Min Price */}
              <div>
                <label htmlFor="minPrice" className="block text-sm font-medium text-gray-600 mb-2">
                  Minimum: €{minPrice}
                </label>
                <input
                  type="range"
                  id="minPrice"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={minPrice}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value <= maxPrice) {
                      setMinPrice(value);
                    }
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              {/* Max Price */}
              <div>
                <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-600 mb-2">
                  Maximum: €{maxPrice}
                </label>
                <input
                  type="range"
                  id="maxPrice"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={maxPrice}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= minPrice) {
                      setMaxPrice(value);
                    }
                  }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>
            </div>

            <div className="text-center text-sm text-gray-600 font-medium mt-4">
              Showing trips between €{minPrice} and €{maxPrice}
            </div>
          </div>

          {/* Amenity Filters */}
          <div className="mt-8 pt-8 border-t-2 border-gray-200">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-4">
              <span className="text-xl">✨</span>
              <span>Required Amenities</span>
            </label>
            
            <div className="flex flex-wrap gap-4">
              {/* Power Socket Filter */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={requirePower}
                  onChange={(e) => setRequirePower(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  <span className="text-xl">⚡</span>
                  <span className="font-medium text-blue-700">Power Sockets</span>
                </span>
              </label>

              {/* WiFi Filter */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={requireWifi}
                  onChange={(e) => setRequireWifi(e.target.checked)}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
                />
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 group-hover:bg-purple-100 transition-colors">
                  <span className="text-xl">📶</span>
                  <span className="font-medium text-purple-700">WiFi Available</span>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Datalist for city suggestions */}
        <datalist id="cities">
          {cities.map(city => <option key={city} value={city} />)}
        </datalist>
      </section>

      {/* Results Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black heading-gradient">
            {filteredTrips.length} {filteredTrips.length === 1 ? 'trip' : 'trips'} available ✨
          </h2>
          {filteredTrips.length > 0 && (
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-200">
              <span className="text-green-700 font-bold text-sm">🎉 Available Now</span>
            </div>
          )}
        </div>

        {filteredTrips.length > 0 ? (
          <div className="space-y-6">
            {filteredTrips.map((trip, index) => (
              <RailTripCard key={trip.id} trip={trip} index={index} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-3xl p-12 text-center border-2 border-orange-200">
            <div className="text-6xl mb-6">😕</div>
            <h3 className="text-3xl font-black text-gray-800 mb-4">
              No trips found
            </h3>
            <p className="text-xl text-gray-600 mb-2">
              We couldn't find any trains matching your filters.
            </p>
            <p className="text-gray-500">
              Try adjusting your search parameters or resetting the filters.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
