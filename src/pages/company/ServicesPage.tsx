import { ShieldCheck, Cpu, Globe, Wrench, FileCheck, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';

export function ServicesPage() {
  useSEO({
    title: 'Services & Capabilities | MediEquip360',
    description: 'Explore the full capabilities of MediEquip360 including medical equipment catalog exploration, quotation workflows, and technical support.',
    path: '/services',
  });
  const services = [
    {
      icon: Cpu,
      title: 'Equipment Catalog Exploration',
      description: 'Browse 40+ simulated medical equipment listings across 8 specialized categories with advanced search and filters.',
    },
    {
      icon: Wrench,
      title: 'Quotation Request Workflow',
      description: 'Test interactive procurement quotation requests with pre-filled product details and unique demo reference generation.',
    },
    {
      icon: ShieldCheck,
      title: 'New & Refurbished Comparison',
      description: 'Compare condition options and demonstration specifications side by side for healthcare facility planning.',
    },
    {
      icon: Globe,
      title: 'Mock Logistics & Delivery',
      description: 'Explore delivery location inputs and simulation logistics for hospital procurement planning.',
    },
    {
      icon: FileCheck,
      title: 'Demo Inquiry Management',
      description: 'Log and review inquiries locally within the browser to test interactive customer support workflows.',
    },
    {
      icon: Award,
      title: 'Procurement Consultation',
      description: 'Connect with demo specialists to understand how MediEquip360 streamlines equipment discovery.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f3b6c] to-[#0284c7] text-white py-4 px-6 rounded-2xl shadow-sm text-center space-y-1">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight">Services &amp; Capabilities</h1>
        <p className="text-slate-200 text-xs max-w-xl mx-auto">
          MediEquip360 provides comprehensive demonstration workflows for exploring medical devices and managing mock procurement inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-sky-50 text-[#0f3b6c] rounded-2xl flex items-center justify-center">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">{service.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <Link to="/contact" className="text-xs font-semibold text-[#0f3b6c] hover:text-[#0284c7] flex items-center gap-1">
                  <span>Inquire About Demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold">Ready to Explore the Platform?</h2>
          <p className="text-xs sm:text-sm text-slate-400">Discover all 40+ medical equipment listings in our catalog.</p>
        </div>
        <Link to="/catalog" className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shrink-0 transition-colors shadow">
          View Catalog
        </Link>
      </div>
    </div>
  );
}
