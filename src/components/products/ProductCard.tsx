import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isNew = product.condition === 'New';

  const formatPrice = (price: number | null) => {
    if (!price) return null;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/85 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 ${
              isNew
                ? 'bg-sky-600 text-white'
                : 'bg-emerald-600 text-white'
            }`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>{product.condition}</span>
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded shadow-sm">
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-sky-700 mb-1">
            {product.brand}
          </div>
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-1.5 group-hover:text-sky-700 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
          {product.price && (
            <div className="text-xs font-bold text-slate-900 mb-3">
              Demo Price: <span className="text-sky-700">{formatPrice(product.price)}</span>
            </div>
          )}
        </div>

        {/* Specs highlights */}
        <div className="border-t border-slate-100 pt-3 mt-auto space-y-2.5">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">{product.availability}</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              to={`/product/${product.slug}`}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-center py-2 rounded-xl text-xs font-semibold transition-colors"
            >
              Details
            </Link>
            <Link
              to={`/request-quote?product=${encodeURIComponent(product.name)}&brand=${encodeURIComponent(product.brand)}`}
              className="flex-1 bg-[#0f3b6c] hover:bg-[#0b2d52] text-white text-center py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Inquire</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
