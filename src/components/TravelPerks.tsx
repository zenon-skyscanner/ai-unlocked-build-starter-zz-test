import { useState } from "react";
import {
  type Perk,
  type TripDetails,
  getPersonalisedPerks,
  categories,
} from "../data/perksData";

function discountedPrice(perk: Perk): string {
  const price = perk.originalPrice * (1 - perk.discountPercent / 100);
  return price.toFixed(2);
}

const badgeColors: Record<string, string> = {
  "Best Value for Families": "bg-green-100 text-green-800",
  "Just for You": "bg-purple-100 text-purple-800",
  Recommended: "bg-blue-100 text-blue-800",
  "City Essential": "bg-amber-100 text-amber-800",
  "Beach Essential": "bg-cyan-100 text-cyan-800",
  "Perfect for Short Trips": "bg-orange-100 text-orange-800",
};

export default function TravelPerks() {
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [loading, setLoading] = useState(false);
  const [perks, setPerks] = useState<Perk[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [addedPerks, setAddedPerks] = useState<Set<string>>(new Set());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPerks(null);
    setSelectedCategory("all");
    setAddedPerks(new Set());

    const trip: TripDetails = {
      destination,
      departureDate,
      returnDate,
      travellers,
    };

    // Simulate AI thinking time
    setTimeout(() => {
      const results = getPersonalisedPerks(trip);
      setPerks(results);
      setLoading(false);
    }, 1200);
  };

  const togglePerk = (id: string) => {
    setAddedPerks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredPerks =
    perks && selectedCategory !== "all"
      ? perks.filter((p) => p.category === selectedCategory)
      : perks;

  const isFormValid =
    destination && departureDate && returnDate && travellers >= 1;

  return (
    <div>
      {/* VIP Banner */}
      <div className="mb-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-center text-white shadow-lg">
        <h2 className="mb-1 text-2xl font-bold tracking-tight">
          SkyBound Rewards
        </h2>
        <p className="text-blue-100">
          Exclusive perks and discounts, personalised for your trip
        </p>
      </div>

      {/* Trip Details Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-10 rounded-lg bg-gray-100 p-6"
      >
        <h3 className="mb-4 text-lg font-semibold">
          Tell us about your trip
        </h3>
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="destination"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Destination
            </label>
            <input
              id="destination"
              type="text"
              placeholder="e.g. Paris, Bali, New York"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full rounded border border-gray-300 px-4 py-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="travellers"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Travellers
            </label>
            <input
              id="travellers"
              type="number"
              min={1}
              max={10}
              value={travellers}
              onChange={(e) => setTravellers(Number(e.target.value))}
              className="w-full rounded border border-gray-300 px-4 py-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="departureDate"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Departure Date
            </label>
            <input
              id="departureDate"
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full rounded border border-gray-300 px-4 py-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="returnDate"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Return Date
            </label>
            <input
              id="returnDate"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full rounded border border-gray-300 px-4 py-2"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className="rounded bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Finding your perks..." : "Get My Perks"}
        </button>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="py-16 text-center">
          <div className="mb-4 text-4xl">✨</div>
          <p className="text-lg font-medium text-gray-600">
            Our AI is personalising your perks...
          </p>
        </div>
      )}

      {/* Results */}
      {perks && !loading && (
        <>
          {/* Category Filter Pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  selectedCategory === cat.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="mb-4 text-gray-600">
            Showing {filteredPerks?.length ?? 0} personalised perk
            {filteredPerks?.length !== 1 ? "s" : ""}
          </p>

          {/* Perks Grid */}
          {filteredPerks && filteredPerks.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPerks.map((perk) => {
                const added = addedPerks.has(perk.id);
                return (
                  <div
                    key={perk.id}
                    className="relative rounded-lg border bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
                  >
                    {/* Badge */}
                    {perk.badge && (
                      <span
                        className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                          badgeColors[perk.badge] ??
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {perk.badge}
                      </span>
                    )}

                    {/* Icon */}
                    <div className="mb-3 text-4xl">{perk.icon}</div>

                    {/* Title & Description */}
                    <h4 className="mb-2 text-xl font-bold">{perk.title}</h4>
                    <p className="mb-4 text-gray-700">{perk.description}</p>

                    {/* Pricing Row */}
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-gray-400 line-through">
                        £{perk.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-xl font-bold text-blue-600">
                        £{discountedPrice(perk)}
                      </span>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                        {perk.discountPercent}% OFF
                      </span>
                    </div>

                    {/* Add to Trip Button */}
                    <button
                      onClick={() => togglePerk(perk.id)}
                      className={`w-full rounded py-2 font-medium transition-colors ${
                        added
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {added ? "✓ Added to Trip" : "Add to Trip"}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="py-8 text-center text-gray-500">
              No perks in this category. Try selecting "All Perks".
            </p>
          )}
        </>
      )}
    </div>
  );
}
