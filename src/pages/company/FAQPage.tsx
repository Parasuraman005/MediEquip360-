import { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../hooks/useSEO';

export function FAQPage() {
  useSEO({
    title: 'Frequently Asked Questions | MediEquip360',
    description: 'Find answers to common questions about medical equipment browsing, quotation requests, equipment conditions, and procurement workflows on MediEquip360.',
    path: '/faq',
  });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How can I browse medical equipment?',
      a: 'You can explore our Equipment Catalog using category filters, brand filters, condition filters (New or Refurbished), and real-time search across all 40+ demonstration listings.',
    },
    {
      q: 'How do I request a product quotation?',
      a: 'Select any product from the catalog, click "Inquire" or "Request Quotation Demo", fill in your organization details, and submit the form to generate a demo quotation reference ID.',
    },
    {
      q: 'What does the refurbished condition mean in this demo?',
      a: 'Refurbished listings in this demonstration platform represent pre-owned medical devices that have been restored to simulated operational standards for evaluation purposes.',
    },
    {
      q: 'Can I compare products?',
      a: 'Yes, you can browse items within the same category or search across manufacturers to compare specifications and demo pricing.',
    },
    {
      q: 'Are the displayed prices real?',
      a: 'No, displayed prices are sample demonstration values in Indian Rupees (INR) and do not represent binding commercial offers or verified market rates.',
    },
    {
      q: 'How can I contact the demonstration company?',
      a: 'You can reach out via demo@mediequip360.example, call +91 00000 00000, or visit our demo office located at Demo Business Park, Chennai, Tamil Nadu, India.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-[#0f3b6c]"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-sky-600 shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#0f3b6c]' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Have more questions about the demo?</h3>
        <p className="text-xs sm:text-sm text-slate-600">Our demonstration support team is ready to help you explore the platform.</p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-[#0f3b6c] hover:bg-[#0b2d52] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
        >
          <span>Contact Demo Team</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
