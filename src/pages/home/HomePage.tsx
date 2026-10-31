import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Globe, Cpu, CheckCircle2, Activity, FileText } from 'lucide-react';
import { categories } from '../../data/categories';
import { products } from '../../data/products';
import { ProductCard } from '../../components/products/ProductCard';
import { useSEO } from '../../hooks/useSEO';
import { analytics } from '../../utils/analytics';

export function HomePage() {
  useSEO({
    title: 'MediEquip360 | Premium Medical Equipment & Healthcare Solutions',
    description: 'Explore a comprehensive selection of medical devices, diagnostic imaging equipment, surgical care tools, and patient monitors for healthcare facilities.',
    path: '/',
  });

  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0b1d33] via-[#0f3b6c] to-[#0284c7] text-white py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight">
                Medical Equipment for Every <span className="text-sky-300">Healthcare Need</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Explore a comprehensive selection of medical devices for hospitals, diagnostic centers, clinics, and healthcare professionals.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/catalog"
                  onClick={() => analytics.trackHomepageCTA('Explore Equipment')}
                  className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-sky-900/30 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Equipment</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/request-quote"
                  onClick={() => analytics.trackHomepageCTA('Request a Quote')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase backdrop-blur-sm transition-all flex items-center justify-center"
                >
                  Request a Quote
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-white/10 text-center lg:text-left">
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">40+</div>
                  <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">Demo Listings</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">8</div>
                  <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">Specialized Categories</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">360°</div>
                  <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">Procurement Demo</div>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80"
                    alt="Advanced Medical Imaging Equipment"
                    className="w-full h-[320px] sm:h-[380px] lg:h-[420px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 bg-white text-slate-900 p-3.5 sm:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 text-[#0f3b6c] rounded-xl flex items-center justify-center font-bold shrink-0">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase">Platform Status</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">Demonstration Interface</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start space-y-4">
            <div className="w-12 h-12 bg-sky-50 text-[#0f3b6c] rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Wide Equipment Selection</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Explore products across diagnostic imaging, monitoring, surgical care, respiratory support, and laboratory equipment.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start space-y-4">
            <div className="w-12 h-12 bg-sky-50 text-[#0f3b6c] rounded-2xl flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Flexible Equipment Options</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Compare demonstration listings for new and refurbished equipment.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start space-y-4">
            <div className="w-12 h-12 bg-sky-50 text-[#0f3b6c] rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Product Information</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Review product descriptions, available specifications, and equipment details in one place.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start space-y-4">
            <div className="w-12 h-12 bg-sky-50 text-[#0f3b6c] rounded-2xl flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">Inquiry Support</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Submit equipment requirements through a convenient product inquiry workflow.
            </p>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-sky-700 uppercase tracking-widest mb-1">Specialized Categories</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Explore Medical Equipment Categories</h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs sm:text-sm font-semibold text-[#0f3b6c] hover:text-[#0284c7] flex items-center gap-1.5 transition-colors shrink-0"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/catalog?category=${cat.name}`}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f3b6c]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-base leading-tight">{cat.name}</h3>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {cat.description}
                </p>
                <div className="text-xs font-semibold text-[#0f3b6c] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Browse Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-10 gap-4">
            <div>
              <div className="text-xs font-bold text-sky-700 uppercase tracking-widest mb-1">Featured Systems</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Featured Equipment Listings</h2>
            </div>
            <Link
              to="/catalog"
              className="text-xs sm:text-sm font-semibold text-[#0f3b6c] hover:text-[#0284c7] flex items-center gap-1.5 transition-colors shrink-0"
            >
              <span>Browse All Models</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section Snippet */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0f3b6c] to-[#0284c7] rounded-3xl text-white p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest bg-white/20 text-white px-3 py-1.5 rounded-full inline-block">
                About MediEquip360
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Making Equipment Discovery Simpler
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm lg:text-base leading-relaxed">
                MediEquip360 is a fictional medical equipment procurement platform that helps hospitals, clinics, diagnostic laboratories, and healthcare providers explore medical devices and request equipment quotations.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/about"
                  className="bg-white text-[#0f3b6c] hover:bg-slate-100 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Read Our Mission
                </Link>
                <Link
                  to="/contact"
                  className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Contact Demo Team
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-4">
              <h3 className="font-bold text-base sm:text-lg text-white">Platform Values</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Reliability & Transparency</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Accessibility for Healthcare Providers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Streamlined Product Inquiry Workflows</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-300 shrink-0" />
                  <span>Comprehensive Demo Dataset</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
