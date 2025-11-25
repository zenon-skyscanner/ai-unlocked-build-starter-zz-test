import { db, Article } from 'astro:db';

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

  console.log('✅ Database seeded successfully!');
}
