import { useState } from 'react';
import LocationSearch from './LocationSearch';

function parseDatetime(dt: string) {
  const [date, time] = dt.split('T');
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = (time ?? '00:00').split(':').map(Number);
  return { year, month, day, hour, minute };
}

export default function CarHireSearch() {
  const [pickUpEntityId, setPickUpEntityId] = useState('');
  const [dropOffEntityId, setDropOffEntityId] = useState('');
  const [pickUpDatetime, setPickUpDatetime] = useState('');
  const [dropOffDatetime, setDropOffDatetime] = useState('');
  const [driverAge, setDriverAge] = useState(30);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const createRes = await fetch('/api/carhire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: {
            market: 'UK',
            locale: 'en-GB',
            currency: 'GBP',
            pickUpLocation: { entityId: pickUpEntityId },
            dropOffLocation: { entityId: dropOffEntityId },
            pickUpDate: parseDatetime(pickUpDatetime),
            dropOffDate: parseDatetime(dropOffDatetime),
            driverAge,
          },
        }),
      });
      let data = await createRes.json();

      while (data.status === 'RESULT_STATUS_INCOMPLETE' && data.sessionToken) {
        await new Promise((r) => setTimeout(r, 1000));
        const pollRes = await fetch('/api/carhire-poll', {
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

  const quotes = (result as any)?.content?.results?.quotes ?? {};
  const agents = (result as any)?.content?.results?.agents ?? {};
  const hasCards = result && Object.keys(quotes).length > 0;

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <LocationSearch
              id="pickUpEntityId"
              label="Pick-up Location"
              autosuggestEndpoint="/api/autosuggest/carhire"
              onSelect={(place) => setPickUpEntityId(place.entityId)}
              placeholder="e.g. Barcelona"
            />
          </div>
          <div>
            <LocationSearch
              id="dropOffEntityId"
              label="Drop-off Location"
              autosuggestEndpoint="/api/autosuggest/carhire"
              onSelect={(place) => setDropOffEntityId(place.entityId)}
              placeholder="e.g. London"
            />
          </div>
          <div>
            <label htmlFor="pickUpDatetime" className="block text-gray-700 font-semibold mb-2">
              Pick-up Date & Time
            </label>
            <input
              id="pickUpDatetime"
              type="datetime-local"
              value={pickUpDatetime}
              onChange={(e) => setPickUpDatetime(e.target.value)}
              required
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="dropOffDatetime" className="block text-gray-700 font-semibold mb-2">
              Drop-off Date & Time
            </label>
            <input
              id="dropOffDatetime"
              type="datetime-local"
              value={dropOffDatetime}
              onChange={(e) => setDropOffDatetime(e.target.value)}
              required
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="driverAge" className="block text-gray-700 font-semibold mb-2">
              Driver Age
            </label>
            <input
              id="driverAge"
              type="number"
              min={18}
              value={driverAge}
              onChange={(e) => setDriverAge(parseInt(e.target.value))}
              className="w-full border rounded px-4 py-2"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search Car Hire'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      {result && hasCards && (
        <div>
          <p className="text-gray-600 mb-4">{Object.keys(quotes).length} vehicles found</p>
          <div className="grid gap-4">
            {Object.entries(quotes).map(([id, q]: [string, any]) => {
              const info = q.vehicleInfo ?? {};
              const deepLink = q.deepLinks?.[0] ?? q.cheapestDeepLink ?? {};
              const price = deepLink.price?.amount ?? q.price?.amount;
              const agentId = deepLink.agentId;
              const agent = agentId ? agents[agentId] : null;

              return (
                <div key={id} className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{info.name ?? 'Vehicle'}</h3>
                      {info.category && (
                        <p className="text-gray-500 text-sm mt-0.5">{info.category}</p>
                      )}
                    </div>
                    {price && (
                      <div className="text-right ml-4 shrink-0">
                        <div className="text-blue-600 font-bold text-xl">
                          £{(parseFloat(price) / 1000).toFixed(2)}
                        </div>
                        <div className="text-gray-500 text-xs">total</div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-gray-700 text-sm">
                    {info.seats && <span>🧑 {info.seats} seats</span>}
                    {info.doors && <span>🚪 {info.doors} doors</span>}
                    {info.transmission && <span>⚙️ {info.transmission}</span>}
                    {info.airConditioning != null && <span>{info.airConditioning ? '❄️ AC' : 'No AC'}</span>}
                    {agent?.name && (
                      <span className="text-gray-500">via {agent.name}</span>
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
