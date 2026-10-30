import { Product } from '../../types/product';
import { ProductCard } from './ProductCard';
import { Stethoscope } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onResetFilters?: () => void;
}

export function ProductGrid({ products, onResetFilters }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 my-8">
        <div className="w-16 h-16 bg-sky-50 text-[#0f3b6c] rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Stethoscope className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">No medical equipment found</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          We couldn't find any equipment matching your current search or filter criteria. Try resetting your filters or searching for another model.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-2 bg-[#0f3b6c] hover:bg-[#0b2d52] text-white px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
