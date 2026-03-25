import { useState } from 'react';
import LocationSearch from './LocationSearch';

function formatTime(dt: any) {
  if (!dt) return '--:--';
  const h = String(dt.hour ?? 0).padStart(2, '0');
  const m = String(dt.minute ?? 0).padStart(2, '0');
  return `${h}:${m}`;
}

function formatDuration(minutes: number) {
  if (!minutes) return '';
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

export default function FlightsSearch() {
  const [originEntityId, setOriginEntityId] = useState('');
  const [destinationEntityId, setDestinationEntityId] = useState('');
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [cabinClass, setCabinClass] = useState('CABIN_CLASS_ECONOMY');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: {
            market: 'UK',
            locale: 'en-GB',
            currency: 'GBP',
            queryLegs: [
              {
                originPlaceId: { entityId: originEntityId },
                destinationPlaceId: { entityId: destinationEntityId },
                date: {
                  year: parseInt(date.split('-')[0]),
                  month: parseInt(date.split('-')[1]),
                  day: parseInt(date.split('-')[2]),
                },
              },
            ],
            adults,
            childrenAges: [],
            cabinClass,
            excludedAgentsIds: [],
            excludedCarriersIds: [],
            includedAgentsIds: [],
            includedCarriersIds: [],
          },
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const itineraries = (result as any)?.content?.results?.itineraries;
  const legs = (result as any)?.content?.results?.legs ?? {};
  const places = (result as any)?.content?.results?.places ?? {};
  const carriers = (result as any)?.content?.results?.carriers ?? {};
  const hasCards = itineraries && Object.keys(itineraries).length > 0;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <LocationSearch
              id="origin"
              label="Origin"
              autosuggestEndpoint="/api/autosuggest/flights"
              onSelect={(place) => setOriginEntityId(place.entityId)}
              placeholder="e.g. London"
            />
          </div>
          <div>
            <LocationSearch
              id="destination"
              label="Destination"
              autosuggestEndpoint="/api/autosuggest/flights"
              onSelect={(place) => setDestinationEntityId(place.entityId)}
              placeholder="e.g. New York"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-700 font-semibold mb-2">
              Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="adults" className="block text-gray-700 font-semibold mb-2">
              Adults
            </label>
            <input
              id="adults"
              type="number"
              min={1}
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value))}
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="cabin" className="block text-gray-700 font-semibold mb-2">
              Cabin Class
            </label>
            <select
              id="cabin"
              value={cabinClass}
              onChange={(e) => setCabinClass(e.target.value)}
              className="w-full border rounded px-4 py-2"
            >
              <option value="CABIN_CLASS_ECONOMY">Economy</option>
              <option value="CABIN_CLASS_PREMIUM_ECONOMY">Premium Economy</option>
              <option value="CABIN_CLASS_BUSINESS">Business</option>
              <option value="CABIN_CLASS_FIRST">First</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search Flights'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      {result && hasCards && (
        <div>
          <p className="text-gray-600 mb-4">{Object.keys(itineraries).length} itineraries found</p>
          <div className="grid gap-4">
            {Object.entries(itineraries).map(([id, it]: [string, any]) => {
              const leg = legs[it.legIds?.[0]] ?? {};
              const originPlace = places[leg.originPlaceId];
              const destPlace = places[leg.destinationPlaceId];
              const carrier = carriers[leg.carriersIds?.[0]];
              const price = it.pricingOptions?.[0]?.price?.amount;
              const stops = leg.stopCount ?? 0;

              return (
                <div key={id} className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xl font-bold">
                      {originPlace?.name ?? leg.originPlaceId} → {destPlace?.name ?? leg.destinationPlaceId}
                    </div>
                    {price && (
                      <div className="text-blue-600 font-bold text-xl">
                        £{(parseFloat(price) / 1000).toFixed(2)}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-6 text-gray-700 text-sm">
                    <span>{formatTime(leg.departureDateTime)} → {formatTime(leg.arrivalDateTime)}</span>
                    {leg.durationInMinutes && <span>{formatDuration(leg.durationInMinutes)}</span>}
                    <span>{stops === 0 ? 'Direct' : `${stops} stop${stops > 1 ? 's' : ''}`}</span>
                    {carrier && <span>{carrier.name}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {result && !hasCards && (
        <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-auto text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
