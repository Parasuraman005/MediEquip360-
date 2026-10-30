import { ShieldCheck, Award, Globe, CheckCircle2, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export function AboutPage() {
  useSEO({
    title: 'About Us | MediEquip360 Procurement Platform',
    description: 'Learn about MediEquip360, our mission to simplify medical equipment procurement, and our comprehensive catalog for hospitals and clinics.',
    path: '/about',
  });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0f3b6c] to-[#0284c7] text-white p-8 sm:p-16 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10">
          <Stethoscope className="w-80 h-80 text-white" />
        </div>
        <div className="max-w-3xl relative z-10 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3.5 py-1.5 rounded-full inline-block">
            About MediEquip360
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Making Equipment Discovery Simpler
          </h1>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            MediEquip360 is a fictional demonstration platform designed to showcase how healthcare providers can explore medical equipment listings and submit procurement inquiries through a single intuitive interface.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="text-xs font-bold text-sky-700 uppercase tracking-widest">Our Mission & Vision</div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Streamlining Medical Device Procurement Workflows
          </h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Our mission is to make equipment discovery and product inquiry workflows straightforward and accessible for healthcare organizations. We demonstrate a more organized approach to medical equipment discovery for modern healthcare facilities.
          </p>
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
              <span>Accessible product information across 8 specialized medical categories</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
              <span>Transparent inquiry workflows and demo quotation requests</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-800">
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
              <span>Comprehensive catalog spanning new and refurbished options</span>
            </div>
          </div>
        </div>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 h-[400px]">
          <img
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1000&q=80"
            alt="Medical Equipment Facility"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-sky-700 uppercase tracking-widest">Core Principles</div>
          <h2 className="text-3xl font-extrabold text-slate-900">Our Brand Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-sky-50 text-[#0f3b6c] rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Reliability</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dependable demonstration data structures simulating robust hospital asset management.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-sky-50 text-[#0f3b6c] rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Transparency</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Clear demonstration pricing and straightforward inquiry workflows without hidden terms.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-sky-50 text-[#0f3b6c] rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Accessibility</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Easy navigation across categories, brands, conditions, and technical specifications.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-sky-50 text-[#0f3b6c] rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Innovation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Modern digital platform demonstration for medical device procurement exploration.
            </p>
          </div>
        </div>
      </div>

      {/* Closing CTA */}
      <div className="bg-[#0f3b6c] text-white rounded-3xl p-10 text-center space-y-6 shadow-xl">
        <h2 className="text-3xl font-extrabold">Explore the MediEquip360 Catalog</h2>
        <p className="text-slate-300 max-w-xl mx-auto text-sm">
          Browse our complete demonstration inventory of over 40 medical equipment listings.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link to="/catalog" className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow">
            Explore Equipment
          </Link>
          <Link to="/contact" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors">
            Contact Demo Team
          </Link>
        </div>
      </div>
    </div>
  );
}
