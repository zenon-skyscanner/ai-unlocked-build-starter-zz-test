import { db, Article, RailTrip } from 'astro:db';

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
    { id: 1, origin: 'Rome', destination: 'Milan', departureDateTime: new Date('2025-12-10T06:00:00'), arrivalDateTime: new Date('2025-12-10T09:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 195, stops: 'Florence, Bologna' },
    { id: 2, origin: 'Rome', destination: 'Milan', departureDateTime: new Date('2025-12-10T07:30:00'), arrivalDateTime: new Date('2025-12-10T10:30:00'), carrier: 'Italo', duration: 180, stops: 'Florence' },
    { id: 3, origin: 'Rome', destination: 'Milan', departureDateTime: new Date('2025-12-10T09:00:00'), arrivalDateTime: new Date('2025-12-10T12:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 195, stops: 'Florence, Bologna' },
    { id: 4, origin: 'Rome', destination: 'Milan', departureDateTime: new Date('2025-12-11T14:00:00'), arrivalDateTime: new Date('2025-12-11T17:00:00'), carrier: 'Italo', duration: 180, stops: 'Florence' },
    { id: 5, origin: 'Rome', destination: 'Milan', departureDateTime: new Date('2025-12-12T16:30:00'), arrivalDateTime: new Date('2025-12-12T19:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 195, stops: 'Florence, Bologna' },

    // Milan to Rome routes
    { id: 6, origin: 'Milan', destination: 'Rome', departureDateTime: new Date('2025-12-10T08:00:00'), arrivalDateTime: new Date('2025-12-10T11:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 195, stops: 'Bologna, Florence' },
    { id: 7, origin: 'Milan', destination: 'Rome', departureDateTime: new Date('2025-12-10T10:30:00'), arrivalDateTime: new Date('2025-12-10T13:30:00'), carrier: 'Italo', duration: 180, stops: 'Florence' },
    { id: 8, origin: 'Milan', destination: 'Rome', departureDateTime: new Date('2025-12-11T12:00:00'), arrivalDateTime: new Date('2025-12-11T15:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 195, stops: 'Bologna, Florence' },
    { id: 9, origin: 'Milan', destination: 'Rome', departureDateTime: new Date('2025-12-11T15:30:00'), arrivalDateTime: new Date('2025-12-11T18:30:00'), carrier: 'Italo', duration: 180, stops: 'Florence' },
    { id: 10, origin: 'Milan', destination: 'Rome', departureDateTime: new Date('2025-12-12T18:00:00'), arrivalDateTime: new Date('2025-12-12T21:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 195, stops: 'Bologna, Florence' },

    // Rome to Venice routes
    { id: 11, origin: 'Rome', destination: 'Venice', departureDateTime: new Date('2025-12-10T06:30:00'), arrivalDateTime: new Date('2025-12-10T10:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 225, stops: 'Florence, Bologna' },
    { id: 12, origin: 'Rome', destination: 'Venice', departureDateTime: new Date('2025-12-10T11:00:00'), arrivalDateTime: new Date('2025-12-10T14:45:00'), carrier: 'Italo', duration: 225, stops: 'Bologna' },
    { id: 13, origin: 'Rome', destination: 'Venice', departureDateTime: new Date('2025-12-11T08:30:00'), arrivalDateTime: new Date('2025-12-11T12:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 225, stops: 'Florence, Bologna' },
    { id: 14, origin: 'Rome', destination: 'Venice', departureDateTime: new Date('2025-12-12T13:00:00'), arrivalDateTime: new Date('2025-12-12T16:45:00'), carrier: 'Italo', duration: 225, stops: 'Bologna' },

    // Venice to Rome routes
    { id: 15, origin: 'Venice', destination: 'Rome', departureDateTime: new Date('2025-12-10T07:00:00'), arrivalDateTime: new Date('2025-12-10T10:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 225, stops: 'Bologna, Florence' },
    { id: 16, origin: 'Venice', destination: 'Rome', departureDateTime: new Date('2025-12-10T12:30:00'), arrivalDateTime: new Date('2025-12-10T16:15:00'), carrier: 'Italo', duration: 225, stops: 'Bologna' },
    { id: 17, origin: 'Venice', destination: 'Rome', departureDateTime: new Date('2025-12-11T09:00:00'), arrivalDateTime: new Date('2025-12-11T12:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 225, stops: 'Bologna, Florence' },
    { id: 18, origin: 'Venice', destination: 'Rome', departureDateTime: new Date('2025-12-12T14:30:00'), arrivalDateTime: new Date('2025-12-12T18:15:00'), carrier: 'Italo', duration: 225, stops: 'Bologna' },

    // Rome to Florence routes
    { id: 19, origin: 'Rome', destination: 'Florence', departureDateTime: new Date('2025-12-10T06:00:00'), arrivalDateTime: new Date('2025-12-10T07:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '' },
    { id: 20, origin: 'Rome', destination: 'Florence', departureDateTime: new Date('2025-12-10T08:30:00'), arrivalDateTime: new Date('2025-12-10T10:00:00'), carrier: 'Italo', duration: 90, stops: '' },
    { id: 21, origin: 'Rome', destination: 'Florence', departureDateTime: new Date('2025-12-10T11:00:00'), arrivalDateTime: new Date('2025-12-10T12:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '' },
    { id: 22, origin: 'Rome', destination: 'Florence', departureDateTime: new Date('2025-12-11T14:30:00'), arrivalDateTime: new Date('2025-12-11T16:00:00'), carrier: 'Italo', duration: 90, stops: '' },
    { id: 23, origin: 'Rome', destination: 'Florence', departureDateTime: new Date('2025-12-12T17:00:00'), arrivalDateTime: new Date('2025-12-12T18:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '' },

    // Florence to Rome routes
    { id: 24, origin: 'Florence', destination: 'Rome', departureDateTime: new Date('2025-12-10T07:00:00'), arrivalDateTime: new Date('2025-12-10T08:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '' },
    { id: 25, origin: 'Florence', destination: 'Rome', departureDateTime: new Date('2025-12-10T09:30:00'), arrivalDateTime: new Date('2025-12-10T11:00:00'), carrier: 'Italo', duration: 90, stops: '' },
    { id: 26, origin: 'Florence', destination: 'Rome', departureDateTime: new Date('2025-12-11T12:00:00'), arrivalDateTime: new Date('2025-12-11T13:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '' },
    { id: 27, origin: 'Florence', destination: 'Rome', departureDateTime: new Date('2025-12-11T15:30:00'), arrivalDateTime: new Date('2025-12-11T17:00:00'), carrier: 'Italo', duration: 90, stops: '' },
    { id: 28, origin: 'Florence', destination: 'Rome', departureDateTime: new Date('2025-12-12T18:00:00'), arrivalDateTime: new Date('2025-12-12T19:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '' },

    // Rome to Naples routes
    { id: 29, origin: 'Rome', destination: 'Naples', departureDateTime: new Date('2025-12-10T06:15:00'), arrivalDateTime: new Date('2025-12-10T07:25:00'), carrier: 'Trenitalia Frecciarossa', duration: 70, stops: '' },
    { id: 30, origin: 'Rome', destination: 'Naples', departureDateTime: new Date('2025-12-10T09:00:00'), arrivalDateTime: new Date('2025-12-10T10:10:00'), carrier: 'Italo', duration: 70, stops: '' },
    { id: 31, origin: 'Rome', destination: 'Naples', departureDateTime: new Date('2025-12-10T12:30:00'), arrivalDateTime: new Date('2025-12-10T13:40:00'), carrier: 'Trenitalia Frecciarossa', duration: 70, stops: '' },
    { id: 32, origin: 'Rome', destination: 'Naples', departureDateTime: new Date('2025-12-11T15:00:00'), arrivalDateTime: new Date('2025-12-11T16:10:00'), carrier: 'Italo', duration: 70, stops: '' },
    { id: 33, origin: 'Rome', destination: 'Naples', departureDateTime: new Date('2025-12-12T18:30:00'), arrivalDateTime: new Date('2025-12-12T19:40:00'), carrier: 'Trenitalia Frecciarossa', duration: 70, stops: '' },

    // Naples to Rome routes
    { id: 34, origin: 'Naples', destination: 'Rome', departureDateTime: new Date('2025-12-10T07:30:00'), arrivalDateTime: new Date('2025-12-10T08:40:00'), carrier: 'Trenitalia Frecciarossa', duration: 70, stops: '' },
    { id: 35, origin: 'Naples', destination: 'Rome', departureDateTime: new Date('2025-12-10T10:15:00'), arrivalDateTime: new Date('2025-12-10T11:25:00'), carrier: 'Italo', duration: 70, stops: '' },
    { id: 36, origin: 'Naples', destination: 'Rome', departureDateTime: new Date('2025-12-11T13:45:00'), arrivalDateTime: new Date('2025-12-11T14:55:00'), carrier: 'Trenitalia Frecciarossa', duration: 70, stops: '' },
    { id: 37, origin: 'Naples', destination: 'Rome', departureDateTime: new Date('2025-12-11T16:15:00'), arrivalDateTime: new Date('2025-12-11T17:25:00'), carrier: 'Italo', duration: 70, stops: '' },
    { id: 38, origin: 'Naples', destination: 'Rome', departureDateTime: new Date('2025-12-12T19:45:00'), arrivalDateTime: new Date('2025-12-12T20:55:00'), carrier: 'Trenitalia Frecciarossa', duration: 70, stops: '' },

    // Milan to Venice routes
    { id: 39, origin: 'Milan', destination: 'Venice', departureDateTime: new Date('2025-12-10T06:30:00'), arrivalDateTime: new Date('2025-12-10T09:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 150, stops: 'Verona' },
    { id: 40, origin: 'Milan', destination: 'Venice', departureDateTime: new Date('2025-12-10T10:00:00'), arrivalDateTime: new Date('2025-12-10T12:30:00'), carrier: 'Italo', duration: 150, stops: 'Verona' },
    { id: 41, origin: 'Milan', destination: 'Venice', departureDateTime: new Date('2025-12-11T13:30:00'), arrivalDateTime: new Date('2025-12-11T16:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 150, stops: 'Verona' },
    { id: 42, origin: 'Milan', destination: 'Venice', departureDateTime: new Date('2025-12-12T16:45:00'), arrivalDateTime: new Date('2025-12-12T19:15:00'), carrier: 'Italo', duration: 150, stops: 'Verona' },

    // Venice to Milan routes
    { id: 43, origin: 'Venice', destination: 'Milan', departureDateTime: new Date('2025-12-10T07:15:00'), arrivalDateTime: new Date('2025-12-10T09:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 150, stops: 'Verona' },
    { id: 44, origin: 'Venice', destination: 'Milan', departureDateTime: new Date('2025-12-10T11:00:00'), arrivalDateTime: new Date('2025-12-10T13:30:00'), carrier: 'Italo', duration: 150, stops: 'Verona' },
    { id: 45, origin: 'Venice', destination: 'Milan', departureDateTime: new Date('2025-12-11T14:15:00'), arrivalDateTime: new Date('2025-12-11T16:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 150, stops: 'Verona' },
    { id: 46, origin: 'Venice', destination: 'Milan', departureDateTime: new Date('2025-12-12T17:30:00'), arrivalDateTime: new Date('2025-12-12T20:00:00'), carrier: 'Italo', duration: 150, stops: 'Verona' },

    // Milan to Turin routes
    { id: 47, origin: 'Milan', destination: 'Turin', departureDateTime: new Date('2025-12-10T06:00:00'), arrivalDateTime: new Date('2025-12-10T07:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '' },
    { id: 48, origin: 'Milan', destination: 'Turin', departureDateTime: new Date('2025-12-10T09:30:00'), arrivalDateTime: new Date('2025-12-10T10:30:00'), carrier: 'Trenitalia Regionale', duration: 60, stops: '' },
    { id: 49, origin: 'Milan', destination: 'Turin', departureDateTime: new Date('2025-12-11T12:00:00'), arrivalDateTime: new Date('2025-12-11T13:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '' },
    { id: 50, origin: 'Milan', destination: 'Turin', departureDateTime: new Date('2025-12-12T15:30:00'), arrivalDateTime: new Date('2025-12-12T16:30:00'), carrier: 'Trenitalia Regionale', duration: 60, stops: '' },

    // Turin to Milan routes
    { id: 51, origin: 'Turin', destination: 'Milan', departureDateTime: new Date('2025-12-10T07:15:00'), arrivalDateTime: new Date('2025-12-10T08:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '' },
    { id: 52, origin: 'Turin', destination: 'Milan', departureDateTime: new Date('2025-12-10T10:45:00'), arrivalDateTime: new Date('2025-12-10T11:45:00'), carrier: 'Trenitalia Regionale', duration: 60, stops: '' },
    { id: 53, origin: 'Turin', destination: 'Milan', departureDateTime: new Date('2025-12-11T13:15:00'), arrivalDateTime: new Date('2025-12-11T14:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '' },
    { id: 54, origin: 'Turin', destination: 'Milan', departureDateTime: new Date('2025-12-12T16:45:00'), arrivalDateTime: new Date('2025-12-12T17:45:00'), carrier: 'Trenitalia Regionale', duration: 60, stops: '' },

    // Florence to Venice routes
    { id: 55, origin: 'Florence', destination: 'Venice', departureDateTime: new Date('2025-12-10T06:45:00'), arrivalDateTime: new Date('2025-12-10T08:50:00'), carrier: 'Trenitalia Frecciarossa', duration: 125, stops: 'Bologna' },
    { id: 56, origin: 'Florence', destination: 'Venice', departureDateTime: new Date('2025-12-10T11:00:00'), arrivalDateTime: new Date('2025-12-10T13:05:00'), carrier: 'Italo', duration: 125, stops: 'Bologna' },
    { id: 57, origin: 'Florence', destination: 'Venice', departureDateTime: new Date('2025-12-11T14:30:00'), arrivalDateTime: new Date('2025-12-11T16:35:00'), carrier: 'Trenitalia Frecciarossa', duration: 125, stops: 'Bologna' },
    { id: 58, origin: 'Florence', destination: 'Venice', departureDateTime: new Date('2025-12-12T17:15:00'), arrivalDateTime: new Date('2025-12-12T19:20:00'), carrier: 'Italo', duration: 125, stops: 'Bologna' },

    // Venice to Florence routes
    { id: 59, origin: 'Venice', destination: 'Florence', departureDateTime: new Date('2025-12-10T08:00:00'), arrivalDateTime: new Date('2025-12-10T10:05:00'), carrier: 'Trenitalia Frecciarossa', duration: 125, stops: 'Bologna' },
    { id: 60, origin: 'Venice', destination: 'Florence', departureDateTime: new Date('2025-12-10T12:15:00'), arrivalDateTime: new Date('2025-12-10T14:20:00'), carrier: 'Italo', duration: 125, stops: 'Bologna' },
    { id: 61, origin: 'Venice', destination: 'Florence', departureDateTime: new Date('2025-12-11T15:45:00'), arrivalDateTime: new Date('2025-12-11T17:50:00'), carrier: 'Trenitalia Frecciarossa', duration: 125, stops: 'Bologna' },
    { id: 62, origin: 'Venice', destination: 'Florence', departureDateTime: new Date('2025-12-12T18:30:00'), arrivalDateTime: new Date('2025-12-12T20:35:00'), carrier: 'Italo', duration: 125, stops: 'Bologna' },

    // Bologna to Milan routes
    { id: 63, origin: 'Bologna', destination: 'Milan', departureDateTime: new Date('2025-12-10T06:30:00'), arrivalDateTime: new Date('2025-12-10T07:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '' },
    { id: 64, origin: 'Bologna', destination: 'Milan', departureDateTime: new Date('2025-12-10T10:00:00'), arrivalDateTime: new Date('2025-12-10T11:00:00'), carrier: 'Italo', duration: 60, stops: '' },
    { id: 65, origin: 'Bologna', destination: 'Milan', departureDateTime: new Date('2025-12-11T13:30:00'), arrivalDateTime: new Date('2025-12-11T14:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '' },
    { id: 66, origin: 'Bologna', destination: 'Milan', departureDateTime: new Date('2025-12-12T17:00:00'), arrivalDateTime: new Date('2025-12-12T18:00:00'), carrier: 'Italo', duration: 60, stops: '' },

    // Milan to Bologna routes
    { id: 67, origin: 'Milan', destination: 'Bologna', departureDateTime: new Date('2025-12-10T07:45:00'), arrivalDateTime: new Date('2025-12-10T08:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '' },
    { id: 68, origin: 'Milan', destination: 'Bologna', departureDateTime: new Date('2025-12-10T11:15:00'), arrivalDateTime: new Date('2025-12-10T12:15:00'), carrier: 'Italo', duration: 60, stops: '' },
    { id: 69, origin: 'Milan', destination: 'Bologna', departureDateTime: new Date('2025-12-11T14:45:00'), arrivalDateTime: new Date('2025-12-11T15:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '' },
    { id: 70, origin: 'Milan', destination: 'Bologna', departureDateTime: new Date('2025-12-12T18:15:00'), arrivalDateTime: new Date('2025-12-12T19:15:00'), carrier: 'Italo', duration: 60, stops: '' },

    // Bologna to Florence routes
    { id: 71, origin: 'Bologna', destination: 'Florence', departureDateTime: new Date('2025-12-10T06:15:00'), arrivalDateTime: new Date('2025-12-10T06:50:00'), carrier: 'Trenitalia Frecciarossa', duration: 35, stops: '' },
    { id: 72, origin: 'Bologna', destination: 'Florence', departureDateTime: new Date('2025-12-10T10:30:00'), arrivalDateTime: new Date('2025-12-10T11:05:00'), carrier: 'Italo', duration: 35, stops: '' },
    { id: 73, origin: 'Bologna', destination: 'Florence', departureDateTime: new Date('2025-12-11T14:00:00'), arrivalDateTime: new Date('2025-12-11T14:35:00'), carrier: 'Trenitalia Frecciarossa', duration: 35, stops: '' },
    { id: 74, origin: 'Bologna', destination: 'Florence', departureDateTime: new Date('2025-12-12T17:45:00'), arrivalDateTime: new Date('2025-12-12T18:20:00'), carrier: 'Italo', duration: 35, stops: '' },

    // Florence to Bologna routes
    { id: 75, origin: 'Florence', destination: 'Bologna', departureDateTime: new Date('2025-12-10T07:00:00'), arrivalDateTime: new Date('2025-12-10T07:35:00'), carrier: 'Trenitalia Frecciarossa', duration: 35, stops: '' },
    { id: 76, origin: 'Florence', destination: 'Bologna', departureDateTime: new Date('2025-12-10T11:15:00'), arrivalDateTime: new Date('2025-12-10T11:50:00'), carrier: 'Italo', duration: 35, stops: '' },
    { id: 77, origin: 'Florence', destination: 'Bologna', departureDateTime: new Date('2025-12-11T14:45:00'), arrivalDateTime: new Date('2025-12-11T15:20:00'), carrier: 'Trenitalia Frecciarossa', duration: 35, stops: '' },
    { id: 78, origin: 'Florence', destination: 'Bologna', departureDateTime: new Date('2025-12-12T18:30:00'), arrivalDateTime: new Date('2025-12-12T19:05:00'), carrier: 'Italo', duration: 35, stops: '' },

    // Verona routes
    { id: 79, origin: 'Verona', destination: 'Milan', departureDateTime: new Date('2025-12-10T06:45:00'), arrivalDateTime: new Date('2025-12-10T08:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 75, stops: '' },
    { id: 80, origin: 'Milan', destination: 'Verona', departureDateTime: new Date('2025-12-10T08:30:00'), arrivalDateTime: new Date('2025-12-10T09:45:00'), carrier: 'Trenitalia Frecciarossa', duration: 75, stops: '' },
    { id: 81, origin: 'Verona', destination: 'Venice', departureDateTime: new Date('2025-12-10T09:00:00'), arrivalDateTime: new Date('2025-12-10T10:15:00'), carrier: 'Trenitalia Regionale', duration: 75, stops: '' },
    { id: 82, origin: 'Venice', destination: 'Verona', departureDateTime: new Date('2025-12-10T10:45:00'), arrivalDateTime: new Date('2025-12-10T12:00:00'), carrier: 'Trenitalia Regionale', duration: 75, stops: '' },
    { id: 83, origin: 'Verona', destination: 'Bologna', departureDateTime: new Date('2025-12-11T11:30:00'), arrivalDateTime: new Date('2025-12-11T12:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '' },
    { id: 84, origin: 'Bologna', destination: 'Verona', departureDateTime: new Date('2025-12-11T13:00:00'), arrivalDateTime: new Date('2025-12-11T14:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 60, stops: '' },

    // Genoa routes
    { id: 85, origin: 'Genoa', destination: 'Milan', departureDateTime: new Date('2025-12-10T06:00:00'), arrivalDateTime: new Date('2025-12-10T07:30:00'), carrier: 'Trenitalia Intercity', duration: 90, stops: '' },
    { id: 86, origin: 'Milan', destination: 'Genoa', departureDateTime: new Date('2025-12-10T08:00:00'), arrivalDateTime: new Date('2025-12-10T09:30:00'), carrier: 'Trenitalia Intercity', duration: 90, stops: '' },
    { id: 87, origin: 'Genoa', destination: 'Rome', departureDateTime: new Date('2025-12-10T09:00:00'), arrivalDateTime: new Date('2025-12-10T14:30:00'), carrier: 'Trenitalia Intercity', duration: 330, stops: 'Florence' },
    { id: 88, origin: 'Rome', destination: 'Genoa', departureDateTime: new Date('2025-12-11T10:30:00'), arrivalDateTime: new Date('2025-12-11T16:00:00'), carrier: 'Trenitalia Intercity', duration: 330, stops: 'Florence' },
    { id: 89, origin: 'Genoa', destination: 'Turin', departureDateTime: new Date('2025-12-11T12:00:00'), arrivalDateTime: new Date('2025-12-11T14:00:00'), carrier: 'Trenitalia Regionale', duration: 120, stops: '' },
    { id: 90, origin: 'Turin', destination: 'Genoa', departureDateTime: new Date('2025-12-12T14:30:00'), arrivalDateTime: new Date('2025-12-12T16:30:00'), carrier: 'Trenitalia Regionale', duration: 120, stops: '' },

    // Palermo routes (Sicily)
    { id: 91, origin: 'Naples', destination: 'Palermo', departureDateTime: new Date('2025-12-10T08:00:00'), arrivalDateTime: new Date('2025-12-10T17:00:00'), carrier: 'Trenitalia Intercity', duration: 540, stops: 'Messina' },
    { id: 92, origin: 'Palermo', destination: 'Naples', departureDateTime: new Date('2025-12-11T07:00:00'), arrivalDateTime: new Date('2025-12-11T16:00:00'), carrier: 'Trenitalia Intercity', duration: 540, stops: 'Messina' },
    { id: 93, origin: 'Rome', destination: 'Palermo', departureDateTime: new Date('2025-12-10T21:00:00'), arrivalDateTime: new Date('2025-12-11T11:00:00'), carrier: 'Trenitalia Intercity Notte', duration: 840, stops: 'Naples, Messina' },
    { id: 94, origin: 'Palermo', destination: 'Rome', departureDateTime: new Date('2025-12-11T20:30:00'), arrivalDateTime: new Date('2025-12-12T10:30:00'), carrier: 'Trenitalia Intercity Notte', duration: 840, stops: 'Messina, Naples' },

    // Additional mixed routes
    { id: 95, origin: 'Turin', destination: 'Venice', departureDateTime: new Date('2025-12-10T08:00:00'), arrivalDateTime: new Date('2025-12-10T12:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 240, stops: 'Milan, Verona' },
    { id: 96, origin: 'Venice', destination: 'Turin', departureDateTime: new Date('2025-12-11T09:00:00'), arrivalDateTime: new Date('2025-12-11T13:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 240, stops: 'Verona, Milan' },
    { id: 97, origin: 'Naples', destination: 'Florence', departureDateTime: new Date('2025-12-10T08:30:00'), arrivalDateTime: new Date('2025-12-10T11:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 180, stops: 'Rome' },
    { id: 98, origin: 'Florence', destination: 'Naples', departureDateTime: new Date('2025-12-11T12:00:00'), arrivalDateTime: new Date('2025-12-11T15:00:00'), carrier: 'Trenitalia Frecciarossa', duration: 180, stops: 'Rome' },
    { id: 99, origin: 'Bologna', destination: 'Venice', departureDateTime: new Date('2025-12-10T10:00:00'), arrivalDateTime: new Date('2025-12-10T11:30:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '' },
    { id: 100, origin: 'Venice', destination: 'Bologna', departureDateTime: new Date('2025-12-12T11:45:00'), arrivalDateTime: new Date('2025-12-12T13:15:00'), carrier: 'Trenitalia Frecciarossa', duration: 90, stops: '' },
  ]);

  console.log('✅ Database seeded successfully!');
}
