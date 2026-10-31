import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';
import { useToast } from '../../components/common/Toast';
import { useOffline, useFormDraft } from '../../hooks/useOffline';
import { getStoredUTMParameters } from '../../utils/utm';
import { analytics } from '../../utils/analytics';

const initialContactForm = {
  fullName: '',
  email: '',
  phone: '',
  organization: '',
  subject: 'General Inquiry',
  message: '',
};

export function ContactPage() {
  useSEO({
    title: 'Contact Us | MediEquip360 Support',
    description: 'Get in touch with the MediEquip360 team for equipment procurement questions, product availability, catalog information, and technical support.',
    path: '/contact',
  });

  const { showToast } = useToast();
  const { isOnline } = useOffline();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData, clearDraft] = useFormDraft('contact_form', initialContactForm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOnline) {
      showToast('error', 'Offline Mode', 'Internet connection is unavailable. Your message has been saved as a draft.');
      return;
    }

    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid Email Address is required';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('error', 'Form Error', 'Please complete all required fields.');
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const utm = getStoredUTMParameters();
      setIsSubmitting(false);
      setSubmitted(true);
      clearDraft();

      showToast('success', 'Inquiry Sent', 'Your message has been received.');
      analytics.trackContactFormSubmit(formData.subject);

      const existing = JSON.parse(localStorage.getItem('mediequip360_contacts') || '[]');
      localStorage.setItem('mediequip360_contacts', JSON.stringify([{ ...formData, utm, date: new Date().toISOString() }, ...existing]));
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f3b6c] to-[#0284c7] text-white py-4 px-6 rounded-2xl shadow-sm text-center space-y-1">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight">Contact MediEquip360</h1>
        <p className="text-slate-200 text-xs max-w-2xl mx-auto">
          Have questions about our demonstration platform, mock equipment catalog, or quotation inquiry workflows? Get in touch with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-8">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Demo Headquarters
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-50 text-[#0f3b6c] rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Office Address</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    MediEquip360 (Demo Company)<br />
                    Demo Business Park<br />
                    Chennai, Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-50 text-[#0f3b6c] rounded-2xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Telephone</h3>
                  <span className="text-xs text-sky-700 font-semibold mt-1 block">
                    +91 00000 00000 (Placeholder Demo)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-50 text-[#0f3b6c] rounded-2xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Email Address</h3>
                  <span className="text-xs text-sky-700 font-semibold mt-1 block">
                    demo@mediequip360.example
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-50 text-[#0f3b6c] rounded-2xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Demonstration Hours</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Monday - Friday: 9:00 AM - 5:00 PM IST<br />
                    Saturday - Sunday: Closed (Demo Mode)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Send a Demo Inquiry</h2>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold">Demo Inquiry Logged Successfully!</h3>
                <p className="text-xs max-w-md mx-auto leading-relaxed">
                  Thank you for testing MediEquip360. Your inquiry has been stored as demonstration data. No actual email was transmitted to external servers.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#0f3b6c] text-white px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Send Another Demo Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] ${
                        errors.fullName ? 'border-rose-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.fullName && <p className="text-[10px] text-rose-600">{errors.fullName}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] ${
                        errors.email ? 'border-rose-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-rose-600">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Organization / Hospital</label>
                    <input
                      type="text"
                      placeholder="City General Hospital"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                  >
                    <option value="General Inquiry">General Demo Inquiry</option>
                    <option value="Quote Request">Quotation Request Demo</option>
                    <option value="Platform Feedback">Platform Feature Feedback</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Message *</label>
                  <textarea
                    rows={4}
                    placeholder="Enter your demonstration inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] ${
                      errors.message ? 'border-rose-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.message && <p className="text-[10px] text-rose-600">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0f3b6c] hover:bg-[#0b2d52] disabled:opacity-60 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Demo Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
