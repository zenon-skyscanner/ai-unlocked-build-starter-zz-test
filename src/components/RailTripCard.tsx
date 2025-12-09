interface RailTripCardProps {
  trip: {
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
  };
  index: number;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

function formatDateTime(dateTime: Date): string {
  const date = new Date(dateTime);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

export default function RailTripCard({ trip, index }: RailTripCardProps) {
  return (
    <a
      href={`/rail-search/${trip.id}`}
      className="card group cursor-pointer block"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="p-6 md:p-8">
        <div className="grid md:grid-cols-12 gap-6 items-center">
          {/* Origin Station */}
          <div className="md:col-span-3 text-center md:text-left">
            <div className="inline-block mb-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-purple-700 text-xs font-bold">
              DEPARTURE
            </div>
            <div className="text-4xl font-black text-gray-800">{formatDateTime(trip.departureDateTime)}</div>
            <div className="text-xl font-bold text-purple-600 mt-2 flex items-center justify-center md:justify-start gap-2">
              <span>📍</span>
              <span>{trip.origin}</span>
            </div>
          </div>

          {/* Journey Visualization */}
          <div className="md:col-span-3 flex flex-col items-center justify-center">
            <div className="relative w-full">
              <div className="h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white rounded-full p-3 shadow-lg border-2 border-orange-400">
                  <span className="text-2xl">🚄</span>
                </div>
              </div>
            </div>
            <div className="mt-4 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold text-sm">
              ⏱️ {formatDuration(trip.duration)}
            </div>
          </div>

          {/* Destination Station */}
          <div className="md:col-span-3 text-center md:text-left">
            <div className="inline-block mb-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 text-xs font-bold">
              ARRIVAL
            </div>
            <div className="text-4xl font-black text-gray-800">{formatDateTime(trip.arrivalDateTime)}</div>
            <div className="text-xl font-bold text-orange-600 mt-2 flex items-center justify-center md:justify-start gap-2">
              <span>🎯</span>
              <span>{trip.destination}</span>
            </div>
          </div>

          {/* Trip Details & Price */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-center md:text-right">
              <div className="text-5xl font-black text-green-600 mb-2">
                from €{trip.price.toFixed(2)}
              </div>
              <button className="btn-primary text-sm px-6 py-2">
                View Details →
              </button>
            </div>
            
            {/* Amenities and Punctuality */}
            <div className="flex items-center gap-2 justify-center md:justify-end flex-wrap">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xs">
                {trip.carrier}
              </span>
              
              {/* Punctuality Badge */}
              <span className={`px-2 py-1 rounded-full font-bold text-xs flex items-center gap-1 ${
                trip.punctuality >= 90 ? 'bg-green-100 text-green-700' :
                trip.punctuality >= 80 ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                <span>🎯</span>
                <span>{trip.punctuality}% on-time</span>
              </span>
              
              {/* Amenity Icons */}
              {trip.hasPowerSockets && (
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1" title="Power sockets available">
                  <span>⚡</span>
                </span>
              )}
              
              {trip.hasWifi && trip.wifiReliability && (
                <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center gap-1" title={`WiFi quality: ${trip.wifiReliability}/5`}>
                  <span>📶</span>
                  <span>{'⭐'.repeat(trip.wifiReliability)}</span>
                </span>
              )}
            </div>
            
            {trip.stops && trip.stops.length > 0 ? (
              <div className="flex items-start gap-2 justify-center md:justify-end">
                <span className="text-xs font-bold text-gray-500 mt-1">🛤️ STOPS:</span>
                <span className="text-sm text-gray-600 font-medium">{trip.stops}</span>
              </div>
            ) : (
              <div className="flex justify-center md:justify-end">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-bold text-xs">
                  <span>⚡</span>
                  <span>DIRECT ROUTE</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
