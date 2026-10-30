import { Search, RotateCcw, Filter } from 'lucide-react';
import { categories } from '../../data/categories';
import { trustedBrands } from '../../data/products';

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedBrand: string;
  setSelectedBrand: (b: string) => void;
  selectedCondition: string;
  setSelectedCondition: (cond: string) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  onClearFilters: () => void;
  totalResults: number;
}

export function ProductFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  selectedCondition,
  setSelectedCondition,
  sortBy,
  setSortBy,
  onClearFilters,
  totalResults,
}: ProductFiltersProps) {
  const hasActiveFilters =
    searchQuery || selectedCategory !== 'All' || selectedBrand !== 'All' || selectedCondition !== 'All';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <Filter className="w-4 h-4 text-[#0f3b6c]" />
          <span>Equipment Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Search Equipment</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, model or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Category</label>
        <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              selectedCategory === 'All'
                ? 'bg-[#0f3b6c] text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                selectedCategory === cat.name
                  ? 'bg-[#0f3b6c] text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Manufacturer / Brand</label>
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => setSelectedBrand('All')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              selectedBrand === 'All'
                ? 'bg-[#0f3b6c] text-white font-semibold shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Manufacturers
          </button>
          {trustedBrands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                selectedBrand === brand
                  ? 'bg-[#0f3b6c] text-white font-semibold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Condition Filter */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Condition</label>
        <div className="grid grid-cols-3 gap-1.5">
          {['All', 'New', 'Refurbished'].map((cond) => (
            <button
              key={cond}
              onClick={() => setSelectedCondition(cond)}
              className={`py-2 px-2 text-center rounded-xl text-xs font-medium transition-colors ${
                selectedCondition === cond
                  ? 'bg-[#0f3b6c] text-white font-semibold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cond}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Sort Results</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
        >
          <option value="name-asc">Product Name (A - Z)</option>
          <option value="name-desc">Product Name (Z - A)</option>
          <option value="price-asc">Demo Price (Low to High)</option>
          <option value="price-desc">Demo Price (High to Low)</option>
          <option value="brand">Manufacturer Brand</option>
        </select>
      </div>

      <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 text-center">
        Showing <span className="font-bold text-slate-900">{totalResults}</span> demo items
      </div>
    </div>
  );
}
