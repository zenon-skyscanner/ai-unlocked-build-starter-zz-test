import { db, Article, RailTrip, SeatClass } from 'astro:db';

export default async function seed() {
  await db.insert(Article).values([
    {
      id: 1,
      title: 'Top 10 Beaches to Visit in 2025',
      slug: 'top-10-beaches-2025',
      excerpt: 'Discover the most beautiful beaches around the world that you must visit this year.',
      content: `Discover the most beautiful beaches around the world that you must visit this year. From the crystal-clear waters of the Maldives to the stunning coastlines of Greece, we've compiled a list of must-visit beach destinations.

## 1. Maldives
The Maldives offers pristine white sand beaches and incredible marine life. Perfect for snorkeling and diving enthusiasts.

## 2. Santorini, Greece
Experience the unique volcanic beaches with their distinctive black and red sand, combined with stunning sunset views.

## 3. Bora Bora, French Polynesia
Known for its turquoise lagoon and luxury overwater bungalows, Bora Bora is the ultimate beach paradise.`,
      author: 'Sarah Johnson',
      publishedDate: new Date('2025-01-15'),
      category: 'Beach',
      imageUrl: '/images/beach.jpg',
    },
    {
      id: 2,
      title: 'Mountain Hiking: A Beginner\'s Guide',
      slug: 'mountain-hiking-beginners-guide',
      excerpt: 'Everything you need to know before embarking on your first mountain hiking adventure.',
      content: `Everything you need to know before embarking on your first mountain hiking adventure. Learn about essential gear, safety tips, and the best trails for beginners.

## Getting Started
Before you hit the trails, it's important to prepare properly. Invest in good hiking boots, bring plenty of water, and always check the weather forecast.

## Essential Gear
- Comfortable hiking boots
- Weather-appropriate clothing
- First aid kit
- Map and compass
- Sufficient water and snacks

## Best Beginner Trails
Start with well-marked, shorter trails and gradually work your way up to more challenging hikes.`,
      author: 'Mike Chen',
      publishedDate: new Date('2025-02-10'),
      category: 'Mountain',
      imageUrl: '/images/mountain.jpg',
    },
    {
      id: 3,
      title: 'Exploring European Capitals: A Complete Itinerary',
      slug: 'exploring-european-capitals',
      excerpt: 'Plan your perfect European city tour with our comprehensive guide to must-see attractions.',
      content: `Plan your perfect European city tour with our comprehensive guide to must-see attractions in Europe's most beautiful capitals.

## Paris, France
The City of Light offers world-class museums, incredible architecture, and unforgettable cuisine.

## Rome, Italy
Walk through ancient history while enjoying some of the best food in the world.

## Barcelona, Spain
Experience Gaudí's architectural masterpieces and vibrant Mediterranean culture.

## Prague, Czech Republic
Discover fairy-tale architecture and rich history in this charming Central European gem.`,
      author: 'Emily Rodriguez',
      publishedDate: new Date('2025-03-05'),
      category: 'City',
      imageUrl: '/images/city.jpg',
    },
    {
      id: 4,
      title: 'Travel Photography: Capturing Your Adventures',
      slug: 'travel-photography-tips',
      excerpt: 'Professional tips to take stunning photos during your travels.',
      content: `Professional tips to take stunning photos during your travels and preserve your memories forever.

## Lighting is Everything
The golden hour (just after sunrise and before sunset) provides the best natural lighting for travel photography.

## Composition Techniques
Use the rule of thirds, leading lines, and framing to create more engaging images.

## Equipment Recommendations
You don't need expensive gear to take great photos. A modern smartphone and basic understanding of composition can go a long way.`,
      author: 'David Park',
      publishedDate: new Date('2025-03-20'),
      category: 'Tips',
      imageUrl: '/images/photography.jpg',
    },
    {
      id: 5,
      title: 'Budget Travel: How to See the World on a Shoestring',
      slug: 'budget-travel-tips',
      excerpt: 'Practical advice for traveling the world without breaking the bank.',
      content: `Practical advice for traveling the world without breaking the bank. Learn how to find cheap flights, affordable accommodation, and free activities.

## Finding Cheap Flights
Use flight comparison websites, be flexible with dates, and consider budget airlines for short-haul flights.

## Accommodation Tips
Stay in hostels, use Couchsurfing, or book apartments for longer stays to save money.

## Eating on a Budget
Shop at local markets, cook your own meals, and look for lunch specials at restaurants.

## Free Activities
Most cities offer free walking tours, parks, beaches, and museums with free admission days.`,
      author: 'Lisa Thompson',
      publishedDate: new Date('2025-04-01'),
      category: 'Tips',
      imageUrl: '/images/budget.jpg',
    },
    {
      id: 6,
      title: 'Island Hopping in Southeast Asia',
      slug: 'island-hopping-southeast-asia',
      excerpt: 'Navigate the beautiful islands of Thailand, Philippines, and Indonesia with our expert guide.',
      content: `Navigate the beautiful islands of Thailand, Philippines, and Indonesia with our expert guide to the best island hopping routes.

## Thailand's Islands
From the party atmosphere of Koh Phi Phi to the tranquil beaches of Koh Lanta, Thailand offers something for everyone.

## Philippines Gems
Discover Palawan's incredible lagoons, Boracay's white sand beaches, and Siargao's world-class surf breaks.

## Indonesian Paradise
Explore Bali's cultural richness, the Gili Islands' laid-back vibe, and Komodo's unique wildlife.`,
      author: 'Sarah Johnson',
      publishedDate: new Date('2025-04-15'),
      category: 'Beach',
      imageUrl: '/images/islands.jpg',
    },
  ]);

  await db.insert(RailTrip).values([
    // Rome to Milan routes
    { id: 1, origin: 'Rome', destination: 'Milan', departureDateTime: new Date('2025-12-10T06:00:00'), arrivalDateTime: new Date('2025-12-10T09:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 195, stops: 'Florence, Bologna', price: 89.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 92 },
    { id: 2, origin: 'Rome', destination: 'Milan', departureDateTime: new Date('2025-12-10T07:30:00'), arrivalDateTime: new Date('2025-12-10T10:30:00'), carrier: 'Italo', duration: 180, stops: 'Florence', price: 79.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 90 },
    { id: 3, origin: 'Rome', destination: 'Milan', departureDateTime: new Date('2025-12-10T09:00:00'), arrivalDateTime: new Date('2025-12-10T12:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 195, stops: 'Florence, Bologna', price: 94.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 93 },
    { id: 4, origin: 'Rome', destination: 'Milan', departureDateTime: new Date('2025-12-11T14:00:00'), arrivalDateTime: new Date('2025-12-11T17:00:00'), carrier: 'Italo', duration: 180, stops: 'Florence', price: 84.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 3, punctuality: 92 },
    { id: 5, origin: 'Rome', destination: 'Milan', departureDateTime: new Date('2025-12-12T16:30:00'), arrivalDateTime: new Date('2025-12-12T19:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 195, stops: 'Florence, Bologna', price: 92.00, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 95 },

    // Milan to Rome routes
    { id: 6, origin: 'Milan', destination: 'Rome', departureDateTime: new Date('2025-12-10T08:00:00'), arrivalDateTime: new Date('2025-12-10T11:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 195, stops: 'Bologna, Florence', price: 89.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 96 },
    { id: 7, origin: 'Milan', destination: 'Rome', departureDateTime: new Date('2025-12-10T10:30:00'), arrivalDateTime: new Date('2025-12-10T13:30:00'), carrier: 'Italo', duration: 180, stops: 'Florence', price: 79.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 95 },
    { id: 8, origin: 'Milan', destination: 'Rome', departureDateTime: new Date('2025-12-11T12:00:00'), arrivalDateTime: new Date('2025-12-11T15:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 195, stops: 'Bologna, Florence', price: 94.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 90 },
    { id: 9, origin: 'Milan', destination: 'Rome', departureDateTime: new Date('2025-12-11T15:30:00'), arrivalDateTime: new Date('2025-12-11T18:30:00'), carrier: 'Italo', duration: 180, stops: 'Florence', price: 84.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 97 },
    { id: 10, origin: 'Milan', destination: 'Rome', departureDateTime: new Date('2025-12-12T18:00:00'), arrivalDateTime: new Date('2025-12-12T21:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 195, stops: 'Bologna, Florence', price: 92.00, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 92 },

    // Rome to Venice routes
    { id: 11, origin: 'Rome', destination: 'Venice', departureDateTime: new Date('2025-12-10T06:30:00'), arrivalDateTime: new Date('2025-12-10T10:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 225, stops: 'Florence, Bologna', price: 79.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 93 },
    { id: 12, origin: 'Rome', destination: 'Venice', departureDateTime: new Date('2025-12-10T11:00:00'), arrivalDateTime: new Date('2025-12-10T14:45:00'), carrier: 'Italo', duration: 225, stops: 'Bologna', price: 69.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 3, punctuality: 90 },
    { id: 13, origin: 'Rome', destination: 'Venice', departureDateTime: new Date('2025-12-11T08:30:00'), arrivalDateTime: new Date('2025-12-11T12:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 225, stops: 'Florence, Bologna', price: 84.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 95 },
    { id: 14, origin: 'Rome', destination: 'Venice', departureDateTime: new Date('2025-12-12T13:00:00'), arrivalDateTime: new Date('2025-12-12T16:45:00'), carrier: 'Italo', duration: 225, stops: 'Bologna', price: 74.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 92 },

    // Venice to Rome routes
    { id: 15, origin: 'Venice', destination: 'Rome', departureDateTime: new Date('2025-12-10T07:00:00'), arrivalDateTime: new Date('2025-12-10T10:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 225, stops: 'Bologna, Florence', price: 79.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 97 },
    { id: 16, origin: 'Venice', destination: 'Rome', departureDateTime: new Date('2025-12-10T12:30:00'), arrivalDateTime: new Date('2025-12-10T16:15:00'), carrier: 'Italo', duration: 225, stops: 'Bologna', price: 69.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 3, punctuality: 94 },
    { id: 17, origin: 'Venice', destination: 'Rome', departureDateTime: new Date('2025-12-11T09:00:00'), arrivalDateTime: new Date('2025-12-11T12:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 225, stops: 'Bologna, Florence', price: 84.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 91 },
    { id: 18, origin: 'Venice', destination: 'Rome', departureDateTime: new Date('2025-12-12T14:30:00'), arrivalDateTime: new Date('2025-12-12T18:15:00'), carrier: 'Italo', duration: 225, stops: 'Bologna', price: 74.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 96 },

    // Rome to Florence routes
    { id: 19, origin: 'Rome', destination: 'Florence', departureDateTime: new Date('2025-12-10T06:00:00'), arrivalDateTime: new Date('2025-12-10T07:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '', price: 44.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 93 },
    { id: 20, origin: 'Rome', destination: 'Florence', departureDateTime: new Date('2025-12-10T08:30:00'), arrivalDateTime: new Date('2025-12-10T10:00:00'), carrier: 'Italo', duration: 90, stops: '', price: 39.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 3, punctuality: 88 },
    { id: 21, origin: 'Rome', destination: 'Florence', departureDateTime: new Date('2025-12-10T11:00:00'), arrivalDateTime: new Date('2025-12-10T12:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '', price: 49.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 95 },
    { id: 22, origin: 'Rome', destination: 'Florence', departureDateTime: new Date('2025-12-11T14:30:00'), arrivalDateTime: new Date('2025-12-11T16:00:00'), carrier: 'Italo', duration: 90, stops: '', price: 42.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 90 },
    { id: 23, origin: 'Rome', destination: 'Florence', departureDateTime: new Date('2025-12-12T17:00:00'), arrivalDateTime: new Date('2025-12-12T18:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '', price: 46.00, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 97 },

    // Florence to Rome routes
    { id: 24, origin: 'Florence', destination: 'Rome', departureDateTime: new Date('2025-12-10T07:00:00'), arrivalDateTime: new Date('2025-12-10T08:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '', price: 44.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 90 },
    { id: 25, origin: 'Florence', destination: 'Rome', departureDateTime: new Date('2025-12-10T09:30:00'), arrivalDateTime: new Date('2025-12-10T11:00:00'), carrier: 'Italo', duration: 90, stops: '', price: 39.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 93 },
    { id: 26, origin: 'Florence', destination: 'Rome', departureDateTime: new Date('2025-12-11T12:00:00'), arrivalDateTime: new Date('2025-12-11T13:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '', price: 49.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 92 },
    { id: 27, origin: 'Florence', destination: 'Rome', departureDateTime: new Date('2025-12-11T15:30:00'), arrivalDateTime: new Date('2025-12-11T17:00:00'), carrier: 'Italo', duration: 90, stops: '', price: 42.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 95 },
    { id: 28, origin: 'Florence', destination: 'Rome', departureDateTime: new Date('2025-12-12T18:00:00'), arrivalDateTime: new Date('2025-12-12T19:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '', price: 46.00, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 94 },

    // Rome to Naples routes
    { id: 29, origin: 'Rome', destination: 'Naples', departureDateTime: new Date('2025-12-10T06:15:00'), arrivalDateTime: new Date('2025-12-10T07:25:00'), carrier: 'Trenitalia Frecciarossa', duration: 70, stops: '', price: 34.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 95 },
    { id: 30, origin: 'Rome', destination: 'Naples', departureDateTime: new Date('2025-12-10T09:00:00'), arrivalDateTime: new Date('2025-12-10T10:10:00'), carrier: 'Italo', duration: 70, stops: '', price: 29.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 88 },
    { id: 31, origin: 'Rome', destination: 'Naples', departureDateTime: new Date('2025-12-10T12:30:00'), arrivalDateTime: new Date('2025-12-10T13:40:00'), carrier: 'Trenitalia Frecciarossa', duration: 70, stops: '', price: 37.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 97 },
    { id: 32, origin: 'Rome', destination: 'Naples', departureDateTime: new Date('2025-12-11T15:00:00'), arrivalDateTime: new Date('2025-12-11T16:10:00'), carrier: 'Italo', duration: 70, stops: '', price: 32.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 3, punctuality: 90 },
    { id: 33, origin: 'Rome', destination: 'Naples', departureDateTime: new Date('2025-12-12T18:30:00'), arrivalDateTime: new Date('2025-12-12T19:40:00'), carrier: 'Trenitalia Frecciarossa', duration: 70, stops: '', price: 35.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 91 },

    // Naples to Rome routes
    { id: 34, origin: 'Naples', destination: 'Rome', departureDateTime: new Date('2025-12-10T07:30:00'), arrivalDateTime: new Date('2025-12-10T08:40:00'), carrier: 'Trenitalia Frecciarossa', duration: 70, stops: '', price: 34.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 92 },
    { id: 35, origin: 'Naples', destination: 'Rome', departureDateTime: new Date('2025-12-10T10:15:00'), arrivalDateTime: new Date('2025-12-10T11:25:00'), carrier: 'Italo', duration: 70, stops: '', price: 29.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 93 },
    { id: 36, origin: 'Naples', destination: 'Rome', departureDateTime: new Date('2025-12-11T13:45:00'), arrivalDateTime: new Date('2025-12-11T14:55:00'), carrier: 'Trenitalia Frecciarossa', duration: 70, stops: '', price: 37.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 94 },
    { id: 37, origin: 'Naples', destination: 'Rome', departureDateTime: new Date('2025-12-11T16:15:00'), arrivalDateTime: new Date('2025-12-11T17:25:00'), carrier: 'Italo', duration: 70, stops: '', price: 32.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 95 },
    { id: 38, origin: 'Naples', destination: 'Rome', departureDateTime: new Date('2025-12-12T19:45:00'), arrivalDateTime: new Date('2025-12-12T20:55:00'), carrier: 'Trenitalia Frecciarossa', duration: 70, stops: '', price: 35.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 96 },

    // Milan to Venice routes
    { id: 39, origin: 'Milan', destination: 'Venice', departureDateTime: new Date('2025-12-10T06:30:00'), arrivalDateTime: new Date('2025-12-10T09:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 150, stops: 'Verona', price: 54.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 97 },
    { id: 40, origin: 'Milan', destination: 'Venice', departureDateTime: new Date('2025-12-10T10:00:00'), arrivalDateTime: new Date('2025-12-10T12:30:00'), carrier: 'Italo', duration: 150, stops: 'Verona', price: 49.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 3, punctuality: 88 },
    { id: 41, origin: 'Milan', destination: 'Venice', departureDateTime: new Date('2025-12-11T13:30:00'), arrivalDateTime: new Date('2025-12-11T16:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 150, stops: 'Verona', price: 59.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 91 },
    { id: 42, origin: 'Milan', destination: 'Venice', departureDateTime: new Date('2025-12-12T16:45:00'), arrivalDateTime: new Date('2025-12-12T19:15:00'), carrier: 'Italo', duration: 150, stops: 'Verona', price: 52.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 90 },

    // Venice to Milan routes
    { id: 43, origin: 'Venice', destination: 'Milan', departureDateTime: new Date('2025-12-10T07:15:00'), arrivalDateTime: new Date('2025-12-10T09:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 150, stops: 'Verona', price: 54.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 93 },
    { id: 44, origin: 'Venice', destination: 'Milan', departureDateTime: new Date('2025-12-10T11:00:00'), arrivalDateTime: new Date('2025-12-10T13:30:00'), carrier: 'Italo', duration: 150, stops: 'Verona', price: 49.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 3, punctuality: 92 },
    { id: 45, origin: 'Venice', destination: 'Milan', departureDateTime: new Date('2025-12-11T14:15:00'), arrivalDateTime: new Date('2025-12-11T16:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 150, stops: 'Verona', price: 59.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 95 },
    { id: 46, origin: 'Venice', destination: 'Milan', departureDateTime: new Date('2025-12-12T17:30:00'), arrivalDateTime: new Date('2025-12-12T20:00:00'), carrier: 'Italo', duration: 150, stops: 'Verona', price: 52.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 94 },

    // Milan to Turin routes
    { id: 47, origin: 'Milan', destination: 'Turin', departureDateTime: new Date('2025-12-10T06:00:00'), arrivalDateTime: new Date('2025-12-10T07:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '', price: 29.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 97 },
    { id: 48, origin: 'Milan', destination: 'Turin', departureDateTime: new Date('2025-12-10T09:30:00'), arrivalDateTime: new Date('2025-12-10T10:30:00'), carrier: 'Trenitalia Regionale', duration: 60, stops: '', price: 18.50, hasPowerSockets: false, hasWifi: false, punctuality: 90 },
    { id: 49, origin: 'Milan', destination: 'Turin', departureDateTime: new Date('2025-12-11T12:00:00'), arrivalDateTime: new Date('2025-12-11T13:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '', price: 32.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 91 },
    { id: 50, origin: 'Milan', destination: 'Turin', departureDateTime: new Date('2025-12-12T15:30:00'), arrivalDateTime: new Date('2025-12-12T16:30:00'), carrier: 'Trenitalia Regionale', duration: 60, stops: '', price: 18.50, hasPowerSockets: false, hasWifi: false, punctuality: 82 },

    // Turin to Milan routes
    { id: 51, origin: 'Turin', destination: 'Milan', departureDateTime: new Date('2025-12-10T07:15:00'), arrivalDateTime: new Date('2025-12-10T08:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '', price: 29.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 93 },
    { id: 52, origin: 'Turin', destination: 'Milan', departureDateTime: new Date('2025-12-10T10:45:00'), arrivalDateTime: new Date('2025-12-10T11:45:00'), carrier: 'Trenitalia Regionale', duration: 60, stops: '', price: 18.50, hasPowerSockets: false, hasWifi: false, punctuality: 84 },
    { id: 53, origin: 'Turin', destination: 'Milan', departureDateTime: new Date('2025-12-11T13:15:00'), arrivalDateTime: new Date('2025-12-11T14:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '', price: 32.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 95 },
    { id: 54, origin: 'Turin', destination: 'Milan', departureDateTime: new Date('2025-12-12T16:45:00'), arrivalDateTime: new Date('2025-12-12T17:45:00'), carrier: 'Trenitalia Regionale', duration: 60, stops: '', price: 18.50, hasPowerSockets: false, hasWifi: false, punctuality: 86 },

    // Florence to Venice routes
    { id: 55, origin: 'Florence', destination: 'Venice', departureDateTime: new Date('2025-12-10T06:45:00'), arrivalDateTime: new Date('2025-12-10T08:50:00'), carrier: 'Trenitalia Frecciarossa', duration: 125, stops: 'Bologna', price: 49.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 97 },
    { id: 56, origin: 'Florence', destination: 'Venice', departureDateTime: new Date('2025-12-10T11:00:00'), arrivalDateTime: new Date('2025-12-10T13:05:00'), carrier: 'Italo', duration: 125, stops: 'Bologna', price: 44.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 3, punctuality: 94 },
    { id: 57, origin: 'Florence', destination: 'Venice', departureDateTime: new Date('2025-12-11T14:30:00'), arrivalDateTime: new Date('2025-12-11T16:35:00'), carrier: 'Trenitalia Frecciarossa', duration: 125, stops: 'Bologna', price: 54.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 91 },
    { id: 58, origin: 'Florence', destination: 'Venice', departureDateTime: new Date('2025-12-12T17:15:00'), arrivalDateTime: new Date('2025-12-12T19:20:00'), carrier: 'Italo', duration: 125, stops: 'Bologna', price: 47.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 96 },

    // Venice to Florence routes
    { id: 59, origin: 'Venice', destination: 'Florence', departureDateTime: new Date('2025-12-10T08:00:00'), arrivalDateTime: new Date('2025-12-10T10:05:00'), carrier: 'Trenitalia Frecciarossa', duration: 125, stops: 'Bologna', price: 49.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 93 },
    { id: 60, origin: 'Venice', destination: 'Florence', departureDateTime: new Date('2025-12-10T12:15:00'), arrivalDateTime: new Date('2025-12-10T14:20:00'), carrier: 'Italo', duration: 125, stops: 'Bologna', price: 44.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 3, punctuality: 88 },
    { id: 61, origin: 'Venice', destination: 'Florence', departureDateTime: new Date('2025-12-11T15:45:00'), arrivalDateTime: new Date('2025-12-11T17:50:00'), carrier: 'Trenitalia Frecciarossa', duration: 125, stops: 'Bologna', price: 54.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 95 },
    { id: 62, origin: 'Venice', destination: 'Florence', departureDateTime: new Date('2025-12-12T18:30:00'), arrivalDateTime: new Date('2025-12-12T20:35:00'), carrier: 'Italo', duration: 125, stops: 'Bologna', price: 47.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 90 },

    // Bologna to Milan routes
    { id: 63, origin: 'Bologna', destination: 'Milan', departureDateTime: new Date('2025-12-10T06:30:00'), arrivalDateTime: new Date('2025-12-10T07:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '', price: 34.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 97 },
    { id: 64, origin: 'Bologna', destination: 'Milan', departureDateTime: new Date('2025-12-10T10:00:00'), arrivalDateTime: new Date('2025-12-10T11:00:00'), carrier: 'Italo', duration: 60, stops: '', price: 29.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 3, punctuality: 92 },
    { id: 65, origin: 'Bologna', destination: 'Milan', departureDateTime: new Date('2025-12-11T13:30:00'), arrivalDateTime: new Date('2025-12-11T14:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '', price: 37.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 91 },
    { id: 66, origin: 'Bologna', destination: 'Milan', departureDateTime: new Date('2025-12-12T17:00:00'), arrivalDateTime: new Date('2025-12-12T18:00:00'), carrier: 'Italo', duration: 60, stops: '', price: 32.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 94 },

    // Milan to Bologna routes
    { id: 67, origin: 'Milan', destination: 'Bologna', departureDateTime: new Date('2025-12-10T07:45:00'), arrivalDateTime: new Date('2025-12-10T08:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '', price: 34.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 93 },
    { id: 68, origin: 'Milan', destination: 'Bologna', departureDateTime: new Date('2025-12-10T11:15:00'), arrivalDateTime: new Date('2025-12-10T12:15:00'), carrier: 'Italo', duration: 60, stops: '', price: 29.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 3, punctuality: 96 },
    { id: 69, origin: 'Milan', destination: 'Bologna', departureDateTime: new Date('2025-12-11T14:45:00'), arrivalDateTime: new Date('2025-12-11T15:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '', price: 37.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 95 },
    { id: 70, origin: 'Milan', destination: 'Bologna', departureDateTime: new Date('2025-12-12T18:15:00'), arrivalDateTime: new Date('2025-12-12T19:15:00'), carrier: 'Italo', duration: 60, stops: '', price: 32.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 88 },

    // Bologna to Florence routes
    { id: 71, origin: 'Bologna', destination: 'Florence', departureDateTime: new Date('2025-12-10T06:15:00'), arrivalDateTime: new Date('2025-12-10T06:50:00'), carrier: 'Trenitalia Frecciarossa', duration: 35, stops: '', price: 24.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 97 },
    { id: 72, origin: 'Bologna', destination: 'Florence', departureDateTime: new Date('2025-12-10T10:30:00'), arrivalDateTime: new Date('2025-12-10T11:05:00'), carrier: 'Italo', duration: 35, stops: '', price: 19.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 3, punctuality: 90 },
    { id: 73, origin: 'Bologna', destination: 'Florence', departureDateTime: new Date('2025-12-11T14:00:00'), arrivalDateTime: new Date('2025-12-11T14:35:00'), carrier: 'Trenitalia Frecciarossa', duration: 35, stops: '', price: 27.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 91 },
    { id: 74, origin: 'Bologna', destination: 'Florence', departureDateTime: new Date('2025-12-12T17:45:00'), arrivalDateTime: new Date('2025-12-12T18:20:00'), carrier: 'Italo', duration: 35, stops: '', price: 22.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 92 },

    // Florence to Bologna routes
    { id: 75, origin: 'Florence', destination: 'Bologna', departureDateTime: new Date('2025-12-10T07:00:00'), arrivalDateTime: new Date('2025-12-10T07:35:00'), carrier: 'Trenitalia Frecciarossa', duration: 35, stops: '', price: 24.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 93 },
    { id: 76, origin: 'Florence', destination: 'Bologna', departureDateTime: new Date('2025-12-10T11:15:00'), arrivalDateTime: new Date('2025-12-10T11:50:00'), carrier: 'Italo', duration: 35, stops: '', price: 19.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 3, punctuality: 94 },
    { id: 77, origin: 'Florence', destination: 'Bologna', departureDateTime: new Date('2025-12-11T14:45:00'), arrivalDateTime: new Date('2025-12-11T15:20:00'), carrier: 'Trenitalia Frecciarossa', duration: 35, stops: '', price: 27.50, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 95 },
    { id: 78, origin: 'Florence', destination: 'Bologna', departureDateTime: new Date('2025-12-12T18:30:00'), arrivalDateTime: new Date('2025-12-12T19:05:00'), carrier: 'Italo', duration: 35, stops: '', price: 22.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 96 },

    // Verona routes
    { id: 79, origin: 'Verona', destination: 'Milan', departureDateTime: new Date('2025-12-10T06:45:00'), arrivalDateTime: new Date('2025-12-10T08:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 75, stops: '', price: 32.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 97 },
    { id: 80, origin: 'Milan', destination: 'Verona', departureDateTime: new Date('2025-12-10T08:30:00'), arrivalDateTime: new Date('2025-12-10T09:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 75, stops: '', price: 32.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 90 },
    { id: 81, origin: 'Verona', destination: 'Venice', departureDateTime: new Date('2025-12-10T09:00:00'), arrivalDateTime: new Date('2025-12-10T10:15:00'), carrier: 'Trenitalia Regionale', duration: 75, stops: '', price: 15.50, hasPowerSockets: false, hasWifi: false, punctuality: 83 },
    { id: 82, origin: 'Venice', destination: 'Verona', departureDateTime: new Date('2025-12-10T10:45:00'), arrivalDateTime: new Date('2025-12-10T12:00:00'), carrier: 'Trenitalia Regionale', duration: 75, stops: '', price: 15.50, hasPowerSockets: false, hasWifi: false, punctuality: 84 },
    { id: 83, origin: 'Verona', destination: 'Bologna', departureDateTime: new Date('2025-12-11T11:30:00'), arrivalDateTime: new Date('2025-12-11T12:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '', price: 27.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 93 },
    { id: 84, origin: 'Bologna', destination: 'Verona', departureDateTime: new Date('2025-12-11T13:00:00'), arrivalDateTime: new Date('2025-12-11T14:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '', price: 27.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 94 },

    // Genoa routes
    { id: 85, origin: 'Genoa', destination: 'Milan', departureDateTime: new Date('2025-12-10T06:00:00'), arrivalDateTime: new Date('2025-12-10T07:30:00'), carrier: 'Trenitalia Intercity', duration: 90, stops: '', price: 25.50, hasPowerSockets: false, hasWifi: false, punctuality: 90 },
    { id: 86, origin: 'Milan', destination: 'Genoa', departureDateTime: new Date('2025-12-10T08:00:00'), arrivalDateTime: new Date('2025-12-10T09:30:00'), carrier: 'Trenitalia Intercity', duration: 90, stops: '', price: 25.50, hasPowerSockets: true, hasWifi: false, punctuality: 91 },
    { id: 87, origin: 'Genoa', destination: 'Rome', departureDateTime: new Date('2025-12-10T09:00:00'), arrivalDateTime: new Date('2025-12-10T14:30:00'), carrier: 'Trenitalia Intercity', duration: 330, stops: 'Florence', price: 65.00, hasPowerSockets: false, hasWifi: true, wifiReliability: 3, punctuality: 92 },
    { id: 88, origin: 'Rome', destination: 'Genoa', departureDateTime: new Date('2025-12-11T10:30:00'), arrivalDateTime: new Date('2025-12-11T16:00:00'), carrier: 'Trenitalia Intercity', duration: 330, stops: 'Florence', price: 65.00, hasPowerSockets: true, hasWifi: false, punctuality: 93 },
    { id: 89, origin: 'Genoa', destination: 'Turin', departureDateTime: new Date('2025-12-11T12:00:00'), arrivalDateTime: new Date('2025-12-11T14:00:00'), carrier: 'Trenitalia Regionale', duration: 120, stops: '', price: 19.50, hasPowerSockets: false, hasWifi: false, punctuality: 91 },
    { id: 90, origin: 'Turin', destination: 'Genoa', departureDateTime: new Date('2025-12-12T14:30:00'), arrivalDateTime: new Date('2025-12-12T16:30:00'), carrier: 'Trenitalia Regionale', duration: 120, stops: '', price: 19.50, hasPowerSockets: false, hasWifi: false, punctuality: 82 },

    // Palermo routes (Sicily)
    { id: 91, origin: 'Naples', destination: 'Palermo', departureDateTime: new Date('2025-12-10T08:00:00'), arrivalDateTime: new Date('2025-12-10T17:00:00'), carrier: 'Trenitalia Intercity', duration: 540, stops: 'Messina', price: 89.00, hasPowerSockets: false, hasWifi: false, punctuality: 81 },
    { id: 92, origin: 'Palermo', destination: 'Naples', departureDateTime: new Date('2025-12-11T07:00:00'), arrivalDateTime: new Date('2025-12-11T16:00:00'), carrier: 'Trenitalia Intercity', duration: 540, stops: 'Messina', price: 89.00, hasPowerSockets: true, hasWifi: false, punctuality: 82 },
    { id: 93, origin: 'Rome', destination: 'Palermo', departureDateTime: new Date('2025-12-10T21:00:00'), arrivalDateTime: new Date('2025-12-11T11:00:00'), carrier: 'Trenitalia Intercity Notte', duration: 840, stops: 'Naples, Messina', price: 115.00, hasPowerSockets: true, hasWifi: false, punctuality: 84 },
    { id: 94, origin: 'Palermo', destination: 'Rome', departureDateTime: new Date('2025-12-11T20:30:00'), arrivalDateTime: new Date('2025-12-12T10:30:00'), carrier: 'Trenitalia Intercity Notte', duration: 840, stops: 'Messina, Naples', price: 115.00, hasPowerSockets: true, hasWifi: false, punctuality: 85 },

    // Additional mixed routes
    { id: 95, origin: 'Turin', destination: 'Venice', departureDateTime: new Date('2025-12-10T08:00:00'), arrivalDateTime: new Date('2025-12-10T12:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 240, stops: 'Milan, Verona', price: 74.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 97 },
    { id: 96, origin: 'Venice', destination: 'Turin', departureDateTime: new Date('2025-12-11T09:00:00'), arrivalDateTime: new Date('2025-12-11T13:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 240, stops: 'Verona, Milan', price: 74.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 90 },
    { id: 97, origin: 'Naples', destination: 'Florence', departureDateTime: new Date('2025-12-10T08:30:00'), arrivalDateTime: new Date('2025-12-10T11:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 180, stops: 'Rome', price: 59.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 91 },
    { id: 98, origin: 'Florence', destination: 'Naples', departureDateTime: new Date('2025-12-11T12:00:00'), arrivalDateTime: new Date('2025-12-11T15:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 180, stops: 'Rome', price: 59.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 92 },
    { id: 99, origin: 'Bologna', destination: 'Venice', departureDateTime: new Date('2025-12-10T10:00:00'), arrivalDateTime: new Date('2025-12-10T11:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '', price: 39.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 4, punctuality: 93 },
    { id: 100, origin: 'Venice', destination: 'Bologna', departureDateTime: new Date('2025-12-12T11:45:00'), arrivalDateTime: new Date('2025-12-12T13:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '', price: 39.90, hasPowerSockets: true, hasWifi: true, wifiReliability: 5, punctuality: 94 },
  ]);

  // Seed seat classes for all trips
  const seatClasses: any[] = [];
  
  for (let tripId = 1; tripId <= 100; tripId++) {
    // Standard class - always available (base price)
    seatClasses.push({
      id: tripId * 10 + 1,
      tripId: tripId,
      className: 'Standard',
      description: 'Comfortable standard seating with adequate legroom',
      priceModifier: 0
    });
    
    // Solo seat - premium single seat
    seatClasses.push({
      id: tripId * 10 + 2,
      tripId: tripId,
      className: 'Solo',
      description: 'Single seat with extra privacy and space, perfect for solo travelers',
      priceModifier: 15
    });
    
    // Double Seat - face-to-face seating
    seatClasses.push({
      id: tripId * 10 + 3,
      tripId: tripId,
      className: 'Double Seat',
      description: 'Two seats facing each other, ideal for couples or colleagues',
      priceModifier: 10
    });
    
    // Table Seat - four seats around table
    seatClasses.push({
      id: tripId * 10 + 4,
      tripId: tripId,
      className: 'Table Seat',
      description: 'Four seats around a table, great for families or groups',
      priceModifier: 12
    });
    
    // Compartment - semi-private compartment (high-speed trains only)
    if (tripId % 2 === 0) {
      seatClasses.push({
        id: tripId * 10 + 5,
        tripId: tripId,
        className: 'Compartment',
        description: 'Semi-private compartment with sliding door, seats 4-6 passengers',
        priceModifier: 25
      });
    }
    
    // First Class - premium service (high-speed trains only)
    if (tripId % 3 === 0) {
      seatClasses.push({
        id: tripId * 10 + 6,
        tripId: tripId,
        className: 'First Class',
        description: 'Premium first class with wider seats, complimentary refreshments, and executive lounge access',
        priceModifier: 45
      });
    }
  }
  
  await db.insert(SeatClass).values(seatClasses);

  console.log('✅ Database seeded successfully!');
  console.log(`   - ${100} rail trips with amenities and punctuality data`);
  console.log(`   - ${seatClasses.length} seat class options across all trips`);
}
