import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800">React Counter</h2>
      <div className="text-4xl font-bold text-blue-600">{count}</div>
      <div className="flex gap-2">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Decrease
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Increase
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        ✓ React is working with client-side interactivity!
      </p>
    </div>
  );
}
