import { useState, useEffect, useRef } from 'react';

interface Place {
  entityId: string;
  name: string;
  type: string;
  hierarchy?: string;
}

interface Props {
  id: string;
  label: string;
  autosuggestEndpoint: string;
  onSelect: (place: Place) => void;
  placeholder?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export default function LocationSearch({ id, label, autosuggestEndpoint, onSelect, placeholder, inputClassName, labelClassName }: Props) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Place | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query || selected?.name === query) return;

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(autosuggestEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: { market: 'UK', locale: 'en-GB', searchTerm: query } }),
        });
        const data = await res.json();
        setSuggestions(data.places ?? []);
        setOpen(true);
      } catch {
        setSuggestions([]);
      }
    }, 300);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (place: Place) => {
    setSelected(place);
    setQuery(place.name);
    setSuggestions([]);
    setOpen(false);
    onSelect(place);
  };

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor={id} className={labelClassName ?? "block text-gray-700 font-semibold mb-2"}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(null);
        }}
        placeholder={placeholder ?? 'e.g. London'}
        required
        autoComplete="off"
        className={inputClassName ?? "w-full border rounded px-4 py-2"}
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow-lg mt-1 max-h-60 overflow-auto">
          {suggestions.map((place) => (
            <li
              key={place.entityId}
              onMouseDown={() => handleSelect(place)}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
            >
              <span className="font-medium">{place.name}</span>
              {place.hierarchy && (
                <span className="text-gray-500 text-sm ml-2">{place.hierarchy}</span>
              )}
              <span className="text-gray-400 text-xs ml-2">{place.type.replace('PLACE_TYPE_', '').toLowerCase()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
