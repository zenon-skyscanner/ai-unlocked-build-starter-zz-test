import { useState, useEffect } from 'react';
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

function useLondonTheme() {
  const [isLondon, setIsLondon] = useState(false);

  useEffect(() => {
    setIsLondon(document.documentElement.classList.contains('london-theme'));

    const handler = (e: Event) => {
      setIsLondon((e as CustomEvent).detail.isLondon);
    };
    window.addEventListener('theme-change', handler);
    return () => window.removeEventListener('theme-change', handler);
  }, []);

  return isLondon;
}

// === Shared state & logic ===

function useFlightsState() {
  const [originEntityId, setOriginEntityId] = useState('');
  const [destinationEntityId, setDestinationEntityId] = useState('');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [cabinClass, setCabinClass] = useState('CABIN_CLASS_ECONOMY');
  const [tripType, setTripType] = useState<'return' | 'oneway'>('return');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const queryLegs = [
        {
          originPlaceId: { entityId: originEntityId },
          destinationPlaceId: { entityId: destinationEntityId },
          date: {
            year: parseInt(date.split('-')[0]),
            month: parseInt(date.split('-')[1]),
            day: parseInt(date.split('-')[2]),
          },
        },
      ];

      if (tripType === 'return' && returnDate) {
        queryLegs.push({
          originPlaceId: { entityId: destinationEntityId },
          destinationPlaceId: { entityId: originEntityId },
          date: {
            year: parseInt(returnDate.split('-')[0]),
            month: parseInt(returnDate.split('-')[1]),
            day: parseInt(returnDate.split('-')[2]),
          },
        });
      }

      const response = await fetch('/api/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: {
            market: 'UK',
            locale: 'en-GB',
            currency: 'GBP',
            queryLegs,
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

  return {
    originEntityId, setOriginEntityId,
    destinationEntityId, setDestinationEntityId,
    date, setDate,
    returnDate, setReturnDate,
    adults, setAdults,
    cabinClass, setCabinClass,
    tripType, setTripType,
    loading, result, error,
    handleSubmit,
  };
}

// === Results (shared between both modes) ===

function FlightResults({ result, isLondon }: { result: unknown; isLondon: boolean }) {
  const itineraries = (result as any)?.content?.results?.itineraries;
  const legs = (result as any)?.content?.results?.legs ?? {};
  const places = (result as any)?.content?.results?.places ?? {};
  const carriers = (result as any)?.content?.results?.carriers ?? {};
  const hasCards = itineraries && Object.keys(itineraries).length > 0;

  if (!result) return null;

  if (!hasCards) {
    return (
      <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-auto text-sm mt-8">
        {JSON.stringify(result, null, 2)}
      </pre>
    );
  }

  return (
    <div className="mt-8">
      <p className={isLondon ? 'text-gray-400 mb-4' : 'text-gray-600 mb-4'}>
        {Object.keys(itineraries).length} itineraries found
      </p>
      <div className="grid gap-4">
        {Object.entries(itineraries).map(([id, it]: [string, any]) => {
          const leg = legs[it.legIds?.[0]] ?? {};
          const originPlace = places[leg.originPlaceId];
          const destPlace = places[leg.destinationPlaceId];
          const carrier = carriers[leg.carriersIds?.[0]];
          const price = it.pricingOptions?.[0]?.price?.amount;
          const stops = leg.stopCount ?? 0;

          return (
            <div
              key={id}
              className={`rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border ${
                isLondon
                  ? ''
                  : 'bg-white border-gray-200'
              }`}
              style={isLondon ? { backgroundColor: '#1e2a3a', borderColor: '#2a3a4a' } : undefined}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`text-xl font-bold ${isLondon ? 'text-white' : ''}`}>
                  {originPlace?.name ?? leg.originPlaceId} → {destPlace?.name ?? leg.destinationPlaceId}
                </div>
                {price && (
                  <div
                    className={`font-bold text-xl ${isLondon ? '' : 'text-blue-600'}`}
                    style={isLondon ? { color: '#FFD300' } : undefined}
                  >
                    £{(parseFloat(price) / 1000).toFixed(2)}
                  </div>
                )}
              </div>
              <div className={`flex gap-6 text-sm ${isLondon ? 'text-gray-400' : 'text-gray-700'}`}>
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
  );
}

// === Default (normal) form ===

function DefaultForm({ state }: { state: ReturnType<typeof useFlightsState> }) {
  return (
    <div className="w-full">
      <form onSubmit={state.handleSubmit} className="bg-gray-100 p-6 rounded-lg mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <LocationSearch
              id="origin"
              label="Origin"
              autosuggestEndpoint="/api/autosuggest/flights"
              onSelect={(place) => state.setOriginEntityId(place.entityId)}
              placeholder="e.g. London"
            />
          </div>
          <div>
            <LocationSearch
              id="destination"
              label="Destination"
              autosuggestEndpoint="/api/autosuggest/flights"
              onSelect={(place) => state.setDestinationEntityId(place.entityId)}
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
              value={state.date}
              onChange={(e) => state.setDate(e.target.value)}
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
              value={state.adults}
              onChange={(e) => state.setAdults(parseInt(e.target.value))}
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="cabin" className="block text-gray-700 font-semibold mb-2">
              Cabin Class
            </label>
            <select
              id="cabin"
              value={state.cabinClass}
              onChange={(e) => state.setCabinClass(e.target.value)}
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
          disabled={state.loading}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {state.loading ? 'Searching...' : 'Search Flights'}
        </button>
      </form>

      {state.error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{state.error}</div>
      )}

      <FlightResults result={state.result} isLondon={false} />
    </div>
  );
}

// === London bus form ===

const busInputClass =
  'w-full bg-transparent text-gray-700 placeholder-gray-400 outline-none text-base';
const busFieldBox =
  'bg-[#e8f4fd] border-2 border-[#1a1a2e] rounded-lg px-4 py-3';
const busFieldLabel =
  'block text-[#E32017] text-xs font-bold uppercase tracking-wider mb-1';

function LondonBusForm({ state }: { state: ReturnType<typeof useFlightsState> }) {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl px-4 py-12" style={{ backgroundColor: '#1a1a2e' }}>
      {/* London-inspired heading */}
      <h1
        className="text-center text-3xl md:text-5xl font-bold mb-2"
        style={{ color: '#e8f4fd', fontFamily: 'Georgia, serif' }}
      >
        Next Stop: Your Dream Destination
      </h1>
      <p className="text-center text-base mb-8" style={{ color: '#FFD300', fontFamily: 'Georgia, serif' }}>
        All aboard — mind the gap between you and your next adventure
      </p>

      {/* === BUS BODY === */}
      <form onSubmit={state.handleSubmit} className="relative">
        {/* Red bus container */}
        <div
          className="relative rounded-t-[2.5rem] overflow-hidden"
          style={{ backgroundColor: '#E32017' }}
        >
          {/* Top bar: airplane badge + trip type toggle */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4">
            <div
              className="flex items-center justify-center w-14 h-12 rounded-md"
              style={{ backgroundColor: '#FFD300' }}
            >
              <span className="text-2xl" role="img" aria-label="airplane">✈️</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => state.setTripType('return')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                  state.tripType === 'return'
                    ? 'bg-white text-[#1a1a2e]'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Return
              </button>
              <button
                type="button"
                onClick={() => state.setTripType('oneway')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                  state.tripType === 'oneway'
                    ? 'bg-[#FFD300] text-[#1a1a2e]'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                One-way
              </button>
            </div>
          </div>

          {/* Row 1: Departure, Return, Passengers */}
          <div className="px-6 pb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={busFieldBox}>
                <label htmlFor="bus-departure" className={busFieldLabel}>
                  <span className="mr-1">📅</span> Departure
                </label>
                <input
                  id="bus-departure"
                  type="date"
                  value={state.date}
                  onChange={(e) => state.setDate(e.target.value)}
                  required
                  className={busInputClass}
                />
              </div>
              <div className={`${busFieldBox} ${state.tripType === 'oneway' ? 'opacity-40' : ''}`}>
                <label htmlFor="bus-return" className={busFieldLabel}>
                  <span className="mr-1">📅</span> Return
                </label>
                <input
                  id="bus-return"
                  type="date"
                  value={state.returnDate}
                  onChange={(e) => state.setReturnDate(e.target.value)}
                  disabled={state.tripType === 'oneway'}
                  className={busInputClass}
                />
              </div>
              <div className={busFieldBox}>
                <label htmlFor="bus-passengers" className={busFieldLabel}>
                  <span className="mr-1">👥</span> Passengers
                </label>
                <select
                  id="bus-passengers"
                  value={state.adults}
                  onChange={(e) => state.setAdults(parseInt(e.target.value))}
                  className={`${busInputClass} cursor-pointer`}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} Adult{n > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Thin divider */}
          <div className="mx-6 border-t border-[#c41a12]" />

          {/* Row 2: From, To, Class */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={busFieldBox}>
                <LocationSearch
                  id="bus-origin"
                  label="📍 From"
                  autosuggestEndpoint="/api/autosuggest/flights"
                  onSelect={(place) => state.setOriginEntityId(place.entityId)}
                  placeholder="London (LHR)"
                  labelClassName={busFieldLabel}
                  inputClassName={busInputClass}
                />
              </div>
              <div className={busFieldBox}>
                <LocationSearch
                  id="bus-destination"
                  label="✈️ To"
                  autosuggestEndpoint="/api/autosuggest/flights"
                  onSelect={(place) => state.setDestinationEntityId(place.entityId)}
                  placeholder="New York (JFK)"
                  labelClassName={busFieldLabel}
                  inputClassName={busInputClass}
                />
              </div>
              <div className={busFieldBox}>
                <label htmlFor="bus-cabin" className={busFieldLabel}>
                  <span className="mr-1">✈️</span> Class
                </label>
                <select
                  id="bus-cabin"
                  value={state.cabinClass}
                  onChange={(e) => state.setCabinClass(e.target.value)}
                  className={`${busInputClass} cursor-pointer`}
                >
                  <option value="CABIN_CLASS_ECONOMY">Economy</option>
                  <option value="CABIN_CLASS_PREMIUM_ECONOMY">Premium Economy</option>
                  <option value="CABIN_CLASS_BUSINESS">Business</option>
                  <option value="CABIN_CLASS_FIRST">First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search button area */}
          <div className="flex items-center justify-center gap-4 px-6 pb-6 pt-2">
            <div className="flex items-center justify-center w-16 h-16 rounded-full border-[3px] border-white/60">
              <span className="text-sm font-black tracking-wider" style={{ color: '#FFD300' }}>
                FLY
              </span>
            </div>
            <button
              type="submit"
              disabled={state.loading}
              className="flex items-center gap-3 px-10 py-4 rounded-xl text-lg font-black tracking-wide transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              style={{ backgroundColor: '#FFD300', color: '#1a1a2e' }}
            >
              <span className="text-xl">🔍</span>
              {state.loading ? 'SEARCHING...' : 'SEARCH FLIGHTS'}
            </button>
          </div>
        </div>

        {/* === BUS BOTTOM === */}
        <div className="relative" style={{ backgroundColor: '#1a1a2e' }}>
          <div className="flex items-center justify-between px-6 h-8" style={{ backgroundColor: '#111' }}>
            <div className="w-4 h-2.5 rounded-sm" style={{ backgroundColor: '#FFD300' }} />
            <div className="w-4 h-2.5 rounded-sm" style={{ backgroundColor: '#FFD300' }} />
          </div>
          <div className="flex items-end justify-between px-16 pb-2 -mt-1">
            {[0, 1].map((i) => (
              <div key={i} className="relative">
                <div
                  className="w-20 h-20 rounded-full border-[6px] flex items-center justify-center"
                  style={{ borderColor: '#333', backgroundColor: '#222' }}
                >
                  <div
                    className="w-10 h-10 rounded-full border-4 flex items-center justify-center"
                    style={{ borderColor: '#555', backgroundColor: '#333' }}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#555' }} />
                  </div>
                  {[0, 45, 90, 135].map((deg) => (
                    <div
                      key={deg}
                      className="absolute w-0.5 h-8"
                      style={{ backgroundColor: '#555', transform: `rotate(${deg}deg)` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>

      {state.error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 mt-8">{state.error}</div>
      )}

      <FlightResults result={state.result} isLondon={true} />
    </div>
  );
}

// === Main component ===

export default function FlightsSearch() {
  const isLondon = useLondonTheme();
  const state = useFlightsState();

  if (isLondon) {
    return <LondonBusForm state={state} />;
  }

  return <DefaultForm state={state} />;
}
