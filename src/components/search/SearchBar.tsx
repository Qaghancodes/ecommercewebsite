import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchResult } from '@/types';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const searchProducts = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await fetchSearchResults(debouncedQuery);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    searchProducts();
  }, [debouncedQuery]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-black focus:outline-none"
      />
      
      {isLoading && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          {/* Loading spinner */}
        </div>
      )}
      
      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.map((result) => (
            <div
              key={result.id}
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                // Handle result click
              }}
            >
              <h3 className="font-medium">{result.name}</h3>
              <p className="text-sm text-gray-500">${result.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 