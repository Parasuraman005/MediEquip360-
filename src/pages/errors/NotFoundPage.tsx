import { Link } from 'react-router-dom';
import { Stethoscope, ArrowLeft, Grid } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';

export function NotFoundPage() {
  useSEO({
    title: '404 - Page Not Found | MediEquip360',
    description: 'The requested medical equipment page or support resource could not be found. Return to MediEquip360 homepage or browse our product catalog.',
    path: '/404',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 bg-sky-50 text-[#0f3b6c] rounded-3xl flex items-center justify-center mx-auto shadow-inner border border-sky-100">
        <Stethoscope className="w-10 h-10" />
      </div>
      
      <div className="space-y-2">
        <span className="inline-block px-3 py-1 bg-sky-100 text-[#0f3b6c] text-xs font-bold rounded-full uppercase tracking-wider">
          404 Error
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Page Not Found</h1>
      </div>

      <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
        The requested URL was not found on MediEquip360. It might have been relocated, renamed, or is temporarily unavailable.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0f3b6c] hover:bg-[#0b2d52] text-white px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>

        <Link
          to="/catalog"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border border-slate-200"
        >
          <Grid className="w-4 h-4" />
          <span>Browse Catalog</span>
        </Link>
      </div>
    </div>
  );
}
