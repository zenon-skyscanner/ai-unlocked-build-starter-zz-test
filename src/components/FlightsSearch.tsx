import { useState, useEffect } from 'react';
import LocationSearch from './LocationSearch';
import { type CityTheme, getThemeById, STORAGE_KEY } from '../data/cityThemes';

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

function useCityTheme() {
  const [theme, setTheme] = useState<CityTheme | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved !== 'none') setTheme(getThemeById(saved));

    const handler = (e: Event) => {
      const id = (e as CustomEvent).detail.cityId;
      setTheme(id ? getThemeById(id) : null);
    };
    window.addEventListener('theme-change', handler);
    return () => window.removeEventListener('theme-change', handler);
  }, []);

  return theme;
}

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
          date: { year: parseInt(date.split('-')[0]), month: parseInt(date.split('-')[1]), day: parseInt(date.split('-')[2]) },
        },
      ];
      if (tripType === 'return' && returnDate) {
        queryLegs.push({
          originPlaceId: { entityId: destinationEntityId },
          destinationPlaceId: { entityId: originEntityId },
          date: { year: parseInt(returnDate.split('-')[0]), month: parseInt(returnDate.split('-')[1]), day: parseInt(returnDate.split('-')[2]) },
        });
      }
      const response = await fetch('/api/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: { market: 'UK', locale: 'en-GB', currency: 'GBP', queryLegs, adults, childrenAges: [], cabinClass, excludedAgentsIds: [], excludedCarriersIds: [], includedAgentsIds: [], includedCarriersIds: [] } }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { originEntityId, setOriginEntityId, destinationEntityId, setDestinationEntityId, date, setDate, returnDate, setReturnDate, adults, setAdults, cabinClass, setCabinClass, tripType, setTripType, loading, result, error, handleSubmit };
}

// === Results ===
function FlightResults({ result, themed }: { result: unknown; themed: boolean }) {
  const itineraries = (result as any)?.content?.results?.itineraries;
  const legs = (result as any)?.content?.results?.legs ?? {};
  const places = (result as any)?.content?.results?.places ?? {};
  const carriers = (result as any)?.content?.results?.carriers ?? {};
  const hasCards = itineraries && Object.keys(itineraries).length > 0;
  if (!result) return null;
  if (!hasCards) return <pre className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-auto text-sm mt-8">{JSON.stringify(result, null, 2)}</pre>;
  return (
    <div className="mt-8">
      <p className={themed ? 'text-gray-400 mb-4' : 'text-gray-600 mb-4'}>{Object.keys(itineraries).length} itineraries found</p>
      <div className="grid gap-4">
        {Object.entries(itineraries).map(([id, it]: [string, any]) => {
          const leg = legs[it.legIds?.[0]] ?? {};
          const originPlace = places[leg.originPlaceId];
          const destPlace = places[leg.destinationPlaceId];
          const carrier = carriers[leg.carriersIds?.[0]];
          const price = it.pricingOptions?.[0]?.price?.amount;
          const stops = leg.stopCount ?? 0;
          return (
            <div key={id} className={`rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border ${themed ? '' : 'bg-white border-gray-200'}`} style={themed ? { backgroundColor: '#1e2a3a', borderColor: '#2a3a4a' } : undefined}>
              <div className="flex items-center justify-between mb-3">
                <div className={`text-xl font-bold ${themed ? 'text-white' : ''}`}>{originPlace?.name ?? leg.originPlaceId} → {destPlace?.name ?? leg.destinationPlaceId}</div>
                {price && <div className={`font-bold text-xl ${themed ? '' : 'text-blue-600'}`} style={themed ? { color: '#FFD300' } : undefined}>£{(parseFloat(price) / 1000).toFixed(2)}</div>}
              </div>
              <div className={`flex gap-6 text-sm ${themed ? 'text-gray-400' : 'text-gray-700'}`}>
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

// === Default form ===
function DefaultForm({ s }: { s: ReturnType<typeof useFlightsState> }) {
  return (
    <div className="w-full">
      <form onSubmit={s.handleSubmit} className="bg-gray-100 p-6 rounded-lg mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <LocationSearch id="origin" label="Origin" autosuggestEndpoint="/api/autosuggest/flights" onSelect={(p) => s.setOriginEntityId(p.entityId)} placeholder="e.g. London" />
          <LocationSearch id="destination" label="Destination" autosuggestEndpoint="/api/autosuggest/flights" onSelect={(p) => s.setDestinationEntityId(p.entityId)} placeholder="e.g. New York" />
          <div><label htmlFor="date" className="block text-gray-700 font-semibold mb-2">Date</label><input id="date" type="date" value={s.date} onChange={(e) => s.setDate(e.target.value)} required className="w-full border rounded px-4 py-2" /></div>
          <div><label htmlFor="adults" className="block text-gray-700 font-semibold mb-2">Adults</label><input id="adults" type="number" min={1} value={s.adults} onChange={(e) => s.setAdults(parseInt(e.target.value))} className="w-full border rounded px-4 py-2" /></div>
          <div><label htmlFor="cabin" className="block text-gray-700 font-semibold mb-2">Cabin Class</label><select id="cabin" value={s.cabinClass} onChange={(e) => s.setCabinClass(e.target.value)} className="w-full border rounded px-4 py-2"><option value="CABIN_CLASS_ECONOMY">Economy</option><option value="CABIN_CLASS_PREMIUM_ECONOMY">Premium Economy</option><option value="CABIN_CLASS_BUSINESS">Business</option><option value="CABIN_CLASS_FIRST">First</option></select></div>
        </div>
        <button type="submit" disabled={s.loading} className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">{s.loading ? 'Searching...' : 'Search Flights'}</button>
      </form>
      {s.error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{s.error}</div>}
      <FlightResults result={s.result} themed={false} />
    </div>
  );
}

// === Shared form fields inside vehicles ===
function VehicleFormFields({ s, theme }: { s: ReturnType<typeof useFlightsState>; theme: CityTheme }) {
  const c = theme.colors;
  const inputCls = 'w-full bg-transparent text-gray-700 placeholder-gray-400 outline-none text-base';
  const boxCls = `rounded-lg px-4 py-3`;
  const boxStyle = { backgroundColor: c.fieldBg, border: `2px solid ${c.fieldBorder}` };
  const labelCls = 'block text-xs font-bold uppercase tracking-wider mb-1';
  const labelStyle = { color: c.labelColor };

  return (
    <>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <div className="flex items-center justify-center w-14 h-12 rounded-md" style={{ backgroundColor: c.accent }}>
          <span className="text-2xl">✈️</span>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => s.setTripType('return')} className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${s.tripType === 'return' ? 'bg-white text-gray-900' : 'bg-white/20 text-white hover:bg-white/30'}`}>Return</button>
          <button type="button" onClick={() => s.setTripType('oneway')} className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${s.tripType === 'oneway' ? 'text-gray-900' : 'bg-white/20 text-white hover:bg-white/30'}`} style={s.tripType === 'oneway' ? { backgroundColor: c.accent } : undefined}>One-way</button>
        </div>
      </div>

      {/* Row 1 */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={boxCls} style={boxStyle}>
            <label htmlFor={`${theme.id}-dep`} className={labelCls} style={labelStyle}>📅 Departure</label>
            <input id={`${theme.id}-dep`} type="date" value={s.date} onChange={(e) => s.setDate(e.target.value)} required className={inputCls} />
          </div>
          <div className={`${boxCls} ${s.tripType === 'oneway' ? 'opacity-40' : ''}`} style={boxStyle}>
            <label htmlFor={`${theme.id}-ret`} className={labelCls} style={labelStyle}>📅 Return</label>
            <input id={`${theme.id}-ret`} type="date" value={s.returnDate} onChange={(e) => s.setReturnDate(e.target.value)} disabled={s.tripType === 'oneway'} className={inputCls} />
          </div>
          <div className={boxCls} style={boxStyle}>
            <label htmlFor={`${theme.id}-pax`} className={labelCls} style={labelStyle}>👥 Passengers</label>
            <select id={`${theme.id}-pax`} value={s.adults} onChange={(e) => s.setAdults(parseInt(e.target.value))} className={`${inputCls} cursor-pointer`}>
              {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Adult{n>1?'s':''}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="mx-6 border-t" style={{ borderColor: c.primaryDark }} />

      {/* Row 2 */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={boxCls} style={boxStyle}>
            <LocationSearch id={`${theme.id}-origin`} label="📍 From" autosuggestEndpoint="/api/autosuggest/flights" onSelect={(p) => s.setOriginEntityId(p.entityId)} placeholder="London (LHR)" labelClassName={labelCls} inputClassName={inputCls} />
          </div>
          <div className={boxCls} style={boxStyle}>
            <LocationSearch id={`${theme.id}-dest`} label="✈️ To" autosuggestEndpoint="/api/autosuggest/flights" onSelect={(p) => s.setDestinationEntityId(p.entityId)} placeholder="New York (JFK)" labelClassName={labelCls} inputClassName={inputCls} />
          </div>
          <div className={boxCls} style={boxStyle}>
            <label htmlFor={`${theme.id}-cab`} className={labelCls} style={labelStyle}>✈️ Class</label>
            <select id={`${theme.id}-cab`} value={s.cabinClass} onChange={(e) => s.setCabinClass(e.target.value)} className={`${inputCls} cursor-pointer`}>
              <option value="CABIN_CLASS_ECONOMY">Economy</option><option value="CABIN_CLASS_PREMIUM_ECONOMY">Premium Economy</option><option value="CABIN_CLASS_BUSINESS">Business</option><option value="CABIN_CLASS_FIRST">First</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

// === Wheel component (reused) ===
function Wheel() {
  return (
    <div className="relative">
      <div className="w-20 h-20 rounded-full border-[6px] flex items-center justify-center" style={{ borderColor: '#333', backgroundColor: '#222' }}>
        <div className="w-10 h-10 rounded-full border-4 flex items-center justify-center" style={{ borderColor: '#555', backgroundColor: '#333' }}>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#555' }} />
        </div>
        {[0, 45, 90, 135].map(deg => <div key={deg} className="absolute w-0.5 h-8" style={{ backgroundColor: '#555', transform: `rotate(${deg}deg)` }} />)}
      </div>
    </div>
  );
}

// === Small wheel for Vespa ===
function SmallWheel() {
  return (
    <div className="relative">
      <div className="w-16 h-16 rounded-full border-[5px] flex items-center justify-center" style={{ borderColor: '#333', backgroundColor: '#222' }}>
        <div className="w-8 h-8 rounded-full border-3 flex items-center justify-center" style={{ borderColor: '#555', backgroundColor: '#333' }}>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#555' }} />
        </div>
        {[0, 60, 120].map(deg => <div key={deg} className="absolute w-0.5 h-6" style={{ backgroundColor: '#555', transform: `rotate(${deg}deg)` }} />)}
      </div>
    </div>
  );
}

// === Search button row ===
function SearchButton({ s, theme }: { s: ReturnType<typeof useFlightsState>; theme: CityTheme }) {
  const c = theme.colors;
  return (
    <div className="flex items-center justify-center gap-4 px-6 pb-6 pt-2">
      <div className="flex items-center justify-center w-16 h-16 rounded-full border-[3px] border-white/60">
        <span className="text-sm font-black tracking-wider" style={{ color: c.accent }}>FLY</span>
      </div>
      <button type="submit" disabled={s.loading} className="flex items-center gap-3 px-10 py-4 rounded-xl text-lg font-black tracking-wide transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100" style={{ backgroundColor: c.accent, color: c.accent === '#FFD300' || c.accent === '#D4AF37' ? '#1a1a2e' : '#fff' }}>
        <span className="text-xl">🔍</span>{s.loading ? 'SEARCHING...' : 'SEARCH FLIGHTS'}
      </button>
    </div>
  );
}

// === Bottom strip with indicator lights ===
function BottomStrip({ theme }: { theme: CityTheme }) {
  return (
    <div className="flex items-center justify-between px-6 h-8" style={{ backgroundColor: '#111' }}>
      <div className="w-4 h-2.5 rounded-sm" style={{ backgroundColor: theme.colors.accent }} />
      <div className="w-4 h-2.5 rounded-sm" style={{ backgroundColor: theme.colors.accent }} />
    </div>
  );
}

// ========== VEHICLE SHELLS ==========

function LondonBus({ s, theme }: { s: ReturnType<typeof useFlightsState>; theme: CityTheme }) {
  return (
    <form onSubmit={s.handleSubmit} className="relative">
      <div className="relative rounded-t-[2.5rem] overflow-hidden" style={{ backgroundColor: theme.colors.primary }}>
        <VehicleFormFields s={s} theme={theme} />
        <SearchButton s={s} theme={theme} />
      </div>
      <div style={{ backgroundColor: theme.colors.darkBg }}>
        <BottomStrip theme={theme} />
        <div className="flex items-end justify-between px-16 pb-2 -mt-1">
          <Wheel /><Wheel />
        </div>
      </div>
    </form>
  );
}

function ParisMetro({ s, theme }: { s: ReturnType<typeof useFlightsState>; theme: CityTheme }) {
  return (
    <form onSubmit={s.handleSubmit} className="relative">
      {/* Silver roof */}
      <div className="h-4 rounded-t-2xl" style={{ backgroundColor: '#C0C0C0' }} />
      {/* Windows row */}
      <div className="flex justify-center gap-4 py-2" style={{ backgroundColor: '#A8A8A8' }}>
        {[1,2,3,4,5].map(i => <div key={i} className="w-16 h-6 rounded-t-lg" style={{ backgroundColor: '#d0e8ff', border: '2px solid #003CA6' }} />)}
      </div>
      {/* Blue body */}
      <div className="relative overflow-hidden" style={{ backgroundColor: theme.colors.primary }}>
        {/* Gold RATP stripe */}
        <div className="h-2" style={{ backgroundColor: theme.colors.accent }} />
        <VehicleFormFields s={s} theme={theme} />
        <SearchButton s={s} theme={theme} />
        <div className="h-2" style={{ backgroundColor: theme.colors.accent }} />
      </div>
      <div style={{ backgroundColor: theme.colors.darkBg }}>
        <BottomStrip theme={theme} />
        <div className="flex items-end justify-between px-16 pb-2 -mt-1">
          <Wheel /><Wheel />
        </div>
      </div>
    </form>
  );
}

function RomeVespa({ s, theme }: { s: ReturnType<typeof useFlightsState>; theme: CityTheme }) {
  return (
    <form onSubmit={s.handleSubmit} className="relative">
      {/* Handlebar */}
      <div className="flex items-end justify-center gap-32 pb-0">
        <div className="w-3 h-10 rounded-t-full" style={{ backgroundColor: '#555' }} />
        <div className="w-24 h-3 rounded-full" style={{ backgroundColor: '#777' }} />
        <div className="w-3 h-10 rounded-t-full" style={{ backgroundColor: '#555' }} />
      </div>
      {/* Headlight */}
      <div className="flex justify-center -mb-3 relative z-10">
        <div className="w-10 h-10 rounded-full border-4 flex items-center justify-center" style={{ borderColor: '#C0C0C0', backgroundColor: '#FFF9C4' }}>
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FFD300' }} />
        </div>
      </div>
      {/* Green body with red seat */}
      <div className="relative rounded-t-[3rem] overflow-hidden" style={{ backgroundColor: theme.colors.primary }}>
        {/* Red seat strip */}
        <div className="h-3 rounded-t-[3rem]" style={{ backgroundColor: theme.colors.accent }} />
        <VehicleFormFields s={s} theme={theme} />
        <SearchButton s={s} theme={theme} />
      </div>
      {/* Fender + wheels */}
      <div className="relative" style={{ backgroundColor: theme.colors.darkBg }}>
        <div className="h-4 rounded-b-xl mx-8" style={{ backgroundColor: theme.colors.primary }} />
        <div className="flex items-end justify-between px-20 pb-2 pt-1">
          <SmallWheel /><SmallWheel />
        </div>
      </div>
    </form>
  );
}

function TokyoShinkansen({ s, theme }: { s: ReturnType<typeof useFlightsState>; theme: CityTheme }) {
  return (
    <form onSubmit={s.handleSubmit} className="relative">
      {/* Aerodynamic nose */}
      <div className="flex">
        <div className="w-16 overflow-hidden">
          <div className="h-full rounded-l-[4rem]" style={{ backgroundColor: '#F5F5F5', borderLeft: '6px solid #E60012' }} />
        </div>
        <div className="flex-1">
          {/* White body with red stripe */}
          <div className="relative overflow-hidden rounded-tr-2xl" style={{ backgroundColor: '#F5F5F5' }}>
            {/* Window row */}
            <div className="flex gap-3 px-6 pt-3 pb-1">
              {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="w-8 h-4 rounded-sm" style={{ backgroundColor: '#b8d4f0' }} />)}
            </div>
            {/* Red JR stripe */}
            <div className="h-3" style={{ backgroundColor: '#E60012' }} />
            <VehicleFormFields s={s} theme={theme} />
            <SearchButton s={s} theme={theme} />
          </div>
        </div>
      </div>
      {/* Bottom / bogies */}
      <div style={{ backgroundColor: theme.colors.darkBg }}>
        <div className="h-3" style={{ backgroundColor: '#888' }} />
        <div className="flex items-end justify-between px-24 pb-2 pt-1">
          <Wheel /><Wheel />
        </div>
      </div>
    </form>
  );
}

function NewYorkTaxi({ s, theme }: { s: ReturnType<typeof useFlightsState>; theme: CityTheme }) {
  return (
    <form onSubmit={s.handleSubmit} className="relative">
      {/* TAXI sign on roof */}
      <div className="flex justify-center pb-0">
        <div className="px-6 py-1.5 rounded-t-lg text-sm font-black tracking-widest" style={{ backgroundColor: '#FFD300', color: '#1C1C1C' }}>
          TAXI
        </div>
      </div>
      {/* Yellow body */}
      <div className="relative rounded-t-2xl overflow-hidden" style={{ backgroundColor: '#FFD300' }}>
        {/* Checkered stripe */}
        <div className="flex h-4 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-4 h-4 flex-shrink-0" style={{ backgroundColor: i % 2 === 0 ? '#1C1C1C' : '#FFD300' }} />
          ))}
        </div>
        <VehicleFormFields s={s} theme={theme} />
        <SearchButton s={s} theme={theme} />
      </div>
      {/* Black bumper */}
      <div style={{ backgroundColor: theme.colors.darkBg }}>
        <div className="flex items-center justify-between px-6 h-6" style={{ backgroundColor: '#1C1C1C' }}>
          {/* Headlights */}
          <div className="flex gap-2">
            <div className="w-6 h-4 rounded-sm" style={{ backgroundColor: '#FFD300' }} />
            <div className="w-6 h-4 rounded-sm" style={{ backgroundColor: '#FFD300' }} />
          </div>
          {/* License plate */}
          <div className="px-3 py-0.5 rounded text-[10px] font-bold" style={{ backgroundColor: '#FFD300', color: '#1C1C1C' }}>NYC</div>
          <div className="flex gap-2">
            <div className="w-6 h-4 rounded-sm" style={{ backgroundColor: '#E32017' }} />
            <div className="w-6 h-4 rounded-sm" style={{ backgroundColor: '#E32017' }} />
          </div>
        </div>
        <div className="flex items-end justify-between px-16 pb-2 pt-1">
          <Wheel /><Wheel />
        </div>
      </div>
    </form>
  );
}

// === Vehicle router ===
const vehicleMap: Record<string, React.FC<{ s: ReturnType<typeof useFlightsState>; theme: CityTheme }>> = {
  london: LondonBus,
  paris: ParisMetro,
  rome: RomeVespa,
  tokyo: TokyoShinkansen,
  newyork: NewYorkTaxi,
};

function CityThemedForm({ s, theme }: { s: ReturnType<typeof useFlightsState>; theme: CityTheme }) {
  const Vehicle = vehicleMap[theme.id] ?? LondonBus;
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl px-4 py-12" style={{ backgroundColor: theme.colors.darkBg }}>
      <h1 className="text-center text-3xl md:text-5xl font-bold mb-2" style={{ color: '#e8f4fd', fontFamily: 'Georgia, serif' }}>{theme.heading}</h1>
      <p className="text-center text-base mb-8" style={{ color: theme.colors.accent, fontFamily: 'Georgia, serif' }}>{theme.subtitle}</p>
      <Vehicle s={s} theme={theme} />
      {s.error && <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 mt-8">{s.error}</div>}
      <FlightResults result={s.result} themed={true} />
    </div>
  );
}

// === Main ===
export default function FlightsSearch() {
  const theme = useCityTheme();
  const s = useFlightsState();
  if (theme) return <CityThemedForm s={s} theme={theme} />;
  return <DefaultForm s={s} />;
}
