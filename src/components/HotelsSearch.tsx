import { useState } from 'react';
import LocationSearch from './LocationSearch';

function Stars({ count }: { count: number }) {
  return (
    <span className="text-yellow-400">
      {'★'.repeat(Math.min(count, 5))}{'☆'.repeat(Math.max(0, 5 - count))}
    </span>
  );
}

export default function HotelsSearch() {
  const [entityId, setEntityId] = useState<string>('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const createRes = await fetch('/api/hotels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: {
            market: 'UK',
            locale: 'en-GB',
            currency: 'GBP',
            entityId,
            checkinDate: {
              year: parseInt(checkIn.split('-')[0]),
              month: parseInt(checkIn.split('-')[1]),
              day: parseInt(checkIn.split('-')[2]),
            },
            checkoutDate: {
              year: parseInt(checkOut.split('-')[0]),
              month: parseInt(checkOut.split('-')[1]),
              day: parseInt(checkOut.split('-')[2]),
            },
            rooms,
            adults,
            childrenAges: [],
          },
          initialPageSize: 25,
        }),
      });
      let data = await createRes.json();

      while (data.status === 'RESULT_STATUS_INCOMPLETE' && data.sessionToken) {
        await new Promise((r) => setTimeout(r, 1000));
        const pollRes = await fetch('/api/hotels-poll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionToken: data.sessionToken }),
        });
        data = await pollRes.json();
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const hotelContent = (result as any)?.content?.results?.hotelContent ?? {};
  const hotelsPricingOptions = (result as any)?.content?.results?.hotelsPricingOptions ?? {};
  const hotelInfo = (result as any)?.content?.results?.hotelInfo ?? {};
  const agents = (result as any)?.content?.results?.agents ?? {};
  const sortItems: any[] = (result as any)?.content?.results?.sortOptions?.hotel?.sortItems ?? [];
  const hasCards = result && Object.keys(hotelContent).length > 0;

  // Group pricing options by hotelId and find cheapest per hotel
  const cheapestByHotel: Record<string, { price: number; agentId: string; roomName: string }> = {};
  for (const opt of Object.values(hotelsPricingOptions) as any[]) {
    const { hotelId, agentId, roomName, price } = opt;
    const amount = price?.price ?? Infinity;
    if (!cheapestByHotel[hotelId] || amount < cheapestByHotel[hotelId].price) {
      cheapestByHotel[hotelId] = { price: amount, agentId, roomName };
    }
  }

  function parseStars(stars: string): number {
    const map: Record<string, number> = {
      STARS_ONE_STAR: 1, STARS_TWO_STAR: 2, STARS_THREE_STAR: 3,
      STARS_FOUR_STAR: 4, STARS_FIVE_STAR: 5,
    };
    return map[stars] ?? 0;
  }

  // Use sort order if available, otherwise fall back to hotelContent keys
  const orderedHotelIds = sortItems.length > 0
    ? sortItems.map((s: any) => s.itemId).filter((id: string) => hotelContent[id])
    : Object.keys(hotelContent);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <LocationSearch
              id="entityId"
              label="Destination"
              autosuggestEndpoint="/api/autosuggest/hotels"
              onSelect={(place) => setEntityId(place.entityId)}
              placeholder="e.g. Barcelona"
            />
          </div>
          <div>
            <label htmlFor="checkIn" className="block text-gray-700 font-semibold mb-2">
              Check-in Date
            </label>
            <input
              id="checkIn"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="checkOut" className="block text-gray-700 font-semibold mb-2">
              Check-out Date
            </label>
            <input
              id="checkOut"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="rooms" className="block text-gray-700 font-semibold mb-2">
              Rooms
            </label>
            <input
              id="rooms"
              type="number"
              min={1}
              value={rooms}
              onChange={(e) => setRooms(parseInt(e.target.value))}
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
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search Hotels'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      {result && hasCards && (
        <div>
          <p className="text-gray-600 mb-4">{orderedHotelIds.length} hotels found</p>
          <div className="grid gap-4">
            {orderedHotelIds.map((hotelId) => {
              const hotel = hotelContent[hotelId];
              const info = hotelInfo[hotelId];
              const cheapest = cheapestByHotel[hotelId];
              const agent = cheapest ? agents[cheapest.agentId] : null;
              const starCount = parseStars(hotel.stars);
              const score = hotel.guestRating?.score;
              const reviewCount = hotel.guestRating?.reviewCount;
              const imageUrl = hotel.hotelImages?.[0]?.dynamicUrl?.replace('{width}', '400').replace('{height}', '250');
              const distanceM = info?.distanceFromTarget?.value;
              const distanceKm = distanceM != null ? (distanceM / 1000).toFixed(1) : null;

              return (
                <div key={hotelId} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex">
                  {imageUrl && (
                    <img src={imageUrl} alt={hotel.hotelName} className="w-40 object-cover shrink-0 hidden sm:block" />
                  )}
                  <div className="p-5 flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="text-xl font-bold">{hotel.hotelName}</h3>
                        {starCount > 0 && (
                          <div className="mt-0.5">
                            <Stars count={starCount} />
                          </div>
                        )}
                        {distanceKm && (
                          <p className="text-gray-500 text-xs mt-0.5">{distanceKm} km from centre</p>
                        )}
                      </div>
                      {cheapest && (
                        <div className="text-right ml-4 shrink-0">
                          <div className="text-blue-600 font-bold text-xl">
                            £{(cheapest.price / 1000).toFixed(2)}
                          </div>
                          <div className="text-gray-500 text-xs">per night</div>
                          {agent?.name && (
                            <div className="text-gray-400 text-xs mt-0.5">via {agent.name}</div>
                          )}
                        </div>
                      )}
                    </div>
                    {score != null && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="bg-blue-600 text-white text-sm font-bold px-2 py-0.5 rounded">
                          {score}
                        </span>
                        {reviewCount && (
                          <span className="text-gray-500 text-sm">· {reviewCount.toLocaleString()} reviews</span>
                        )}
                      </div>
                    )}
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
