import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

export function ServerErrorPage() {
  useSEO({
    title: '500 - System Error | MediEquip360',
    description: 'An unexpected system error occurred. Please try refreshing the page or return to MediEquip360 homepage.',
    path: '/500',
  });

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner border border-rose-100">
        <AlertTriangle className="w-10 h-10" />
      </div>
      
      <div className="space-y-2">
        <span className="inline-block px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-full uppercase tracking-wider">
          500 Error
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Unexpected Server Error
        </h1>
      </div>

      <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
        We encountered a temporary technical glitch while loading this page. Our team has been notified. Please try reloading or head back to safety.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={handleReload}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0f3b6c] hover:bg-[#0b2d52] text-white px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border border-slate-200"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
