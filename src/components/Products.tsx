import { useState } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Beach Getaways',
    description: 'Relax on pristine beaches and enjoy tropical paradise.',
    price: 999,
    category: 'beach',
  },
  {
    id: 2,
    title: 'Mountain Adventures',
    description: 'Experience breathtaking peaks and outdoor activities.',
    price: 1299,
    category: 'mountain',
  },
  {
    id: 3,
    title: 'City Tours',
    description: 'Discover vibrant cities and immerse in local culture.',
    price: 799,
    category: 'city',
  },
  {
    id: 4,
    title: 'Tropical Island Escape',
    description: 'Unwind on exotic islands with crystal clear waters.',
    price: 1499,
    category: 'beach',
  },
  {
    id: 5,
    title: 'Ski Resort Package',
    description: 'Hit the slopes at world-class ski destinations.',
    price: 1599,
    category: 'mountain',
  },
  {
    id: 6,
    title: 'European City Break',
    description: 'Explore historic European capitals and their rich culture.',
    price: 899,
    category: 'city',
  },
];

const categories = [
  { value: 'all', label: 'All Packages' },
  { value: 'beach', label: 'Beach' },
  { value: 'mountain', label: 'Mountain' },
  { value: 'city', label: 'City' },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    
    let priceMatch = true;
    if (priceRange === 'low') {
      priceMatch = product.price < 1000;
    } else if (priceRange === 'mid') {
      priceMatch = product.price >= 1000 && product.price < 1500;
    } else if (priceRange === 'high') {
      priceMatch = product.price >= 1500;
    }

    return categoryMatch && priceMatch;
  });

  return (
    <div className="w-full">
      <div className="mb-8 bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Filter Products</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border rounded px-4 py-2"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
              Price Range
            </label>
            <select
              id="price"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full border rounded px-4 py-2"
            >
              <option value="all">All Prices</option>
              <option value="low">Under $1,000</option>
              <option value="mid">$1,000 - $1,500</option>
              <option value="high">$1,500+</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-4 text-gray-600">
        Showing {filteredProducts.length} of {products.length} packages
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-blue-600 font-bold text-xl">From ${product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No packages match your filters. Try adjusting your selection.</p>
        </div>
      )}
    </div>
  );
}
