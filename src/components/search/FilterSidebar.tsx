import { useState } from 'react';
import { Category, PriceRange } from '@/types';

interface FilterSidebarProps {
  categories: Category[];
  onFilterChange: (filters: any) => void;
}

export default function FilterSidebar({ categories, onFilterChange }: FilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState<string>('newest');

  const handleCategoryChange = (categoryId: string) => {
    const updated = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(updated);
    updateFilters({ categories: updated });
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max });
    updateFilters({ priceRange: { min, max } });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    updateFilters({ sortBy: value });
  };

  const updateFilters = (newFilters: any) => {
    onFilterChange({
      categories: selectedCategories,
      priceRange,
      sortBy,
      ...newFilters
    });
  };

  return (
    <div className="w-64 p-4 border-r">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        {categories.map(category => (
          <label key={category.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
              className="mr-2"
            />
            {category.name}
          </label>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) => handlePriceChange(Number(e.target.value), priceRange.max)}
            className="w-20 px-2 py-1 border rounded"
          />
          <span>-</span>
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) => handlePriceChange(priceRange.min, Number(e.target.value))}
            className="w-20 px-2 py-1 border rounded"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>
  );
} 