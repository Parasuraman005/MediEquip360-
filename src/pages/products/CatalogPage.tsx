import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../../data/products';
import { ProductFilters } from '../../components/products/ProductFilters';
import { ProductGrid } from '../../components/products/ProductGrid';
import { SkeletonGrid } from '../../components/common/Skeleton';
import { Stethoscope, Filter, X } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

export function CatalogPage() {
  useSEO({
    title: 'Medical Equipment Catalog | MediEquip360',
    description: 'Browse our complete catalog of medical equipment including diagnostic imaging, ultrasound systems, patient monitors, surgical tables, and lab analyzers.',
    path: '/catalog',
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Synchronize URL query params
  useEffect(() => {
    const cat = searchParams.get('category');
    const srch = searchParams.get('search');
    if (cat) setSelectedCategory(cat);
    if (srch) setSearchQuery(srch);
  }, [searchParams]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSelectedCondition('All');
    setSortBy('name-asc');
    setSearchParams({});
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesBrand = selectedBrand === 'All' || product.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesCondition = selectedCondition === 'All' || product.condition.toLowerCase() === selectedCondition.toLowerCase();

    return matchesSearch && matchesCategory && matchesBrand && matchesCondition;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
    if (sortBy === 'brand') return a.brand.localeCompare(b.brand);
    if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
    if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
    return 0;
  });

  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedBrand !== 'All' ? 1 : 0) +
    (selectedCondition !== 'All' ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0f3b6c] to-[#0284c7] text-white py-4 px-6 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="relative z-10 space-y-1 max-w-3xl">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight">
            Medical Equipment Catalog
          </h1>
          <p className="text-slate-200 text-xs leading-relaxed">
            Explore diagnostic imaging, patient monitoring, surgical equipment, respiratory care, and laboratory solutions.
          </p>
        </div>
      </div>

      {/* Mobile/Tablet Filter Toggle Bar */}
      <div className="flex lg:hidden justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="text-xs font-semibold text-slate-700">
          Showing <span className="text-[#0f3b6c] font-bold">{sortedProducts.length}</span> demonstration items
        </div>
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="bg-[#0f3b6c] hover:bg-[#0b2d52] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filter Equipment</span>
          {activeFiltersCount > 0 && (
            <span className="bg-sky-500 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Modal / Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end lg:hidden animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white h-full overflow-y-auto p-6 space-y-6 shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <Filter className="w-5 h-5 text-[#0f3b6c]" />
                  <span>Filter Equipment</span>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ProductFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                selectedCondition={selectedCondition}
                setSelectedCondition={setSelectedCondition}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onClearFilters={handleClearFilters}
                totalResults={sortedProducts.length}
              />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#0f3b6c] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow"
              >
                Apply Filters &amp; View Results ({sortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar (Desktop only) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28">
            <ProductFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedCondition={selectedCondition}
              setSelectedCondition={setSelectedCondition}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onClearFilters={handleClearFilters}
              totalResults={sortedProducts.length}
            />
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="hidden lg:flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-sm font-semibold text-slate-700">
              Showing <span className="text-[#0f3b6c] font-bold">{sortedProducts.length}</span> demonstration items
              {selectedCategory !== 'All' && <span> in <span className="font-bold">{selectedCategory}</span></span>}
            </div>
            <div className="text-xs text-slate-500">
              Demo Pricing &amp; Specifications
            </div>
          </div>

          <ProductGrid products={sortedProducts} onResetFilters={handleClearFilters} />
        </div>
      </div>
    </div>
  );
}
