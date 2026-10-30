import { Link } from 'react-router-dom';
import { Stethoscope, MapPin, Phone, Mail, ShieldCheck, Award } from 'lucide-react';
import { categories } from '../../data/categories';

export function SiteFooter() {
  return (
    <footer className="bg-[#0b1d33] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Company info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white">
                  MediEquip<span className="text-sky-400">360</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Healthcare Procurement Demo
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              MediEquip360 is a fictional medical equipment procurement platform helping hospitals, clinics, and healthcare providers explore medical devices and request equipment quotations.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="flex items-center gap-1.5 text-xs text-sky-400 bg-sky-950/60 px-3 py-1.5 rounded-full border border-sky-800/40">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Demo Procurement Platform</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-800/40">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Demo Company</span>
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-white transition-colors">Equipment Catalog</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Services & Support</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/request-quote" className="hover:text-white transition-colors">Request a Quote</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2.5 text-sm">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link to={`/catalog?category=${cat.name}`} className="hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Demo Headquarters</h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                <span>MediEquip360<br />Demo Business Park<br />Chennai, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>+91 00000 00000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>demo@mediequip360.example</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} MediEquip360 Demonstration Platform. All rights reserved. (Demo Company)
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-use" className="hover:text-slate-300 transition-colors">Terms of Use</Link>
            <Link to="/faq" className="hover:text-slate-300 transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
