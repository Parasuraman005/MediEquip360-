import { useSEO } from '../hooks/useSEO';

export function PrivacyPolicyPage() {
  useSEO({
    title: 'Privacy Policy | MediEquip360',
    description: 'Read the MediEquip360 Privacy Policy regarding local data persistence, browser storage, and demonstration information handling.',
    path: '/privacy-policy',
  });
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">
          Privacy Policy (Demo)
        </h1>
        <div className="text-xs text-slate-500">Last updated: January 2026</div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Demonstration Data Handling</h2>
            <p>
              MediEquip360 is a fictional demonstration platform. Information submitted through contact forms and quotation requests is stored locally in your browser's session or localStorage for demonstration purposes only. No actual personal data is transmitted to external servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Cookies &amp; Local Storage</h2>
            <p>
              We use browser localStorage solely to persist your demonstration quotation requests and inquiry history during your browsing session.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Third-Party Services</h2>
            <p>
              This demonstration does not integrate with external commercial analytics or third-party tracking services.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Contact Information</h2>
            <p>
              For privacy inquiries regarding this demonstration platform, contact us at demo@mediequip360.example or call +91 00000 00000.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
