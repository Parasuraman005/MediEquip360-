import { useSEO } from '../../hooks/useSEO';

export function TermsPage() {
  useSEO({
    title: 'Terms of Use | MediEquip360',
    description: 'Read the MediEquip360 Terms of Use governing demonstration website access, simulated pricing, and intellectual property.',
    path: '/terms-of-use',
  });
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">
          Terms of Use (Demo)
        </h1>
        <div className="text-xs text-slate-500">Last updated: January 2026</div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Demonstration Purpose</h2>
            <p>
              MediEquip360 is a fictional medical equipment procurement demonstration platform. All product catalogs, prices, specifications, and company details are simulated demonstration data and do not represent a real commercial business.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Limitation of Liability</h2>
            <p>
              Because this is a demonstration web application, MediEquip360, its creators, and contributors assume no liability for any reliance placed on simulated product specifications or demo pricing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Intellectual Property</h2>
            <p>
              Product names and manufacturer brand examples are used for illustrative demonstration purposes. All demonstration code and interface designs are provided as-is.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Governing Terms</h2>
            <p>
              Use of this demonstration website constitutes acceptance of these terms. For inquiries, contact demo@mediequip360.example.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
