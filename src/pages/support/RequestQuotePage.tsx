import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileText, CheckCircle2, ArrowRight, RotateCcw, Loader2, Save, WifiOff } from 'lucide-react';
import { categories } from '../../data/categories';
import { trustedBrands } from '../../data/products';
import { useSEO } from '../../hooks/useSEO';
import { useToast } from '../../components/common/Toast';
import { useOffline, useFormDraft } from '../../hooks/useOffline';
import { getStoredUTMParameters } from '../../utils/utm';
import { analytics } from '../../utils/analytics';

export function RequestQuotePage() {
  useSEO({
    title: 'Request a Quote | MediEquip360',
    description: 'Submit formal medical equipment procurement requirements and receive a detailed quotation for hospital systems, diagnostic devices, and surgical tools.',
    path: '/request-quote',
  });

  const { showToast } = useToast();
  const { isOnline } = useOffline();
  const [searchParams] = useSearchParams();
  const preProduct = searchParams.get('product') || '';
  const preBrand = searchParams.get('brand') || '';
  const preCondition = searchParams.get('condition') || 'Any';

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [referenceId, setReferenceId] = useState('');

  const initialFormState = {
    fullName: '',
    organizationName: '',
    businessEmail: '',
    contactNumber: '',
    equipmentCategory: categories[0].name,
    manufacturerPreference: preBrand || trustedBrands[0],
    equipmentModel: preProduct || '',
    conditionPreference: (preCondition as 'New' | 'Refurbished' | 'Any') || 'Any',
    quantity: 1,
    deliveryLocation: '',
    additionalRequirements: '',
  };

  const [formData, setFormData, clearDraft] = useFormDraft('quote_request', initialFormState);

  useEffect(() => {
    if (preProduct) {
      setFormData((prev) => ({
        ...prev,
        equipmentModel: preProduct,
        manufacturerPreference: preBrand || prev.manufacturerPreference,
      }));
    }
  }, [preProduct, preBrand, setFormData]);

  const handleClearForm = () => {
    clearDraft();
    setErrors({});
    showToast('info', 'Form Cleared', 'All form fields have been reset.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOnline) {
      showToast('error', 'Offline Mode', 'Your internet connection is unavailable. Your quote request is saved as a local draft and can be submitted when reconnected.');
      return;
    }

    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.organizationName.trim()) newErrors.organizationName = 'Hospital / Organization Name is required';
    if (!formData.businessEmail.trim() || !/\S+@\S+\.\S+/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Valid Business Email is required';
    }
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact Number is required';
    if (!formData.deliveryLocation.trim()) newErrors.deliveryLocation = 'Delivery destination is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('error', 'Validation Failed', 'Please fill in all required fields.');
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const ref = `DEMO-Q-${Math.floor(100000 + Math.random() * 900000)}`;
      const utm = getStoredUTMParameters();
      setReferenceId(ref);
      setIsSubmitting(false);
      setSubmitted(true);
      clearDraft();

      showToast('success', 'Quote Request Submitted', `Reference ID: ${ref}`);

      analytics.trackQuoteRequestSubmit(formData.equipmentModel, formData.equipmentCategory);

      const existing = JSON.parse(localStorage.getItem('mediequip360_quotes') || '[]');
      localStorage.setItem(
        'mediequip360_quotes',
        JSON.stringify([{ ...formData, utm, referenceId: ref, date: new Date().toISOString() }, ...existing])
      );
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0f3b6c] to-[#0284c7] text-white py-4 px-6 rounded-2xl shadow-sm text-center space-y-1">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight">Request a Quote</h1>
        <p className="text-slate-200 text-xs max-w-xl mx-auto">
          Submit equipment specifications and delivery requirements to generate a demonstration quotation reference.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm">
        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 sm:p-3 rounded-3xl text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-extrabold">Demo Quote Request Logged!</h2>
            <div className="bg-white p-3 rounded-xl border border-emerald-200 inline-block text-xs font-bold text-slate-700">
              Reference ID: <span className="text-[#0f3b6c]">{referenceId}</span>
            </div>
            <p className="text-sm max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{formData.fullName}</strong>. Your quotation request for <strong>{formData.equipmentModel || formData.equipmentCategory}</strong> has been stored as demonstration data for <strong>{formData.organizationName}</strong>.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-[#0f3b6c] hover:bg-[#0b2d52] text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0f3b6c]" />
                <span>Hospital &amp; Contact Information</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Full Name *</label>
                <input
                  type="text"
                  placeholder="Dr. Michael Vance"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] focus:bg-white transition-all ${
                    errors.fullName ? 'border-rose-500' : 'border-slate-200'
                  }`}
                />
                {errors.fullName && <p className="text-[10px] text-rose-600">{errors.fullName}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hospital / Organization *</label>
                <input
                  type="text"
                  placeholder="St. Jude Medical Center"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] focus:bg-white transition-all ${
                    errors.organizationName ? 'border-rose-500' : 'border-slate-200'
                  }`}
                />
                {errors.organizationName && <p className="text-[10px] text-rose-600">{errors.organizationName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Business Email *</label>
                <input
                  type="email"
                  placeholder="m.vance@stjudemedical.org"
                  value={formData.businessEmail}
                  onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                  className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] focus:bg-white transition-all ${
                    errors.businessEmail ? 'border-rose-500' : 'border-slate-200'
                  }`}
                />
                {errors.businessEmail && <p className="text-[10px] text-rose-600">{errors.businessEmail}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Contact Number *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 382-9100"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] focus:bg-white transition-all ${
                    errors.contactNumber ? 'border-rose-500' : 'border-slate-200'
                  }`}
                />
                {errors.contactNumber && <p className="text-[10px] text-rose-600">{errors.contactNumber}</p>}
              </div>
            </div>

            <div className="border-b border-slate-100 pt-4 pb-4">
              <h2 className="text-lg font-bold text-slate-900">Equipment Specifications</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Equipment Category</label>
                <select
                  value={formData.equipmentCategory}
                  onChange={(e) => setFormData({ ...formData, equipmentCategory: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] focus:bg-white transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Manufacturer Preference</label>
                <select
                  value={formData.manufacturerPreference}
                  onChange={(e) => setFormData({ ...formData, manufacturerPreference: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] focus:bg-white transition-all"
                >
                  <option value="Any">Any Manufacturer</option>
                  {trustedBrands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Equipment Model / Name</label>
                <input
                  type="text"
                  placeholder="e.g. SonoVista Portable Ultrasound"
                  value={formData.equipmentModel}
                  onChange={(e) => setFormData({ ...formData, equipmentModel: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Condition Preference</label>
                <select
                  value={formData.conditionPreference}
                  onChange={(e) => setFormData({ ...formData, conditionPreference: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] focus:bg-white transition-all"
                >
                  <option value="Any">Any Condition (New or Refurbished)</option>
                  <option value="New">New Condition</option>
                  <option value="Refurbished">Refurbished Condition</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Delivery Destination / City &amp; Country *</label>
                <input
                  type="text"
                  placeholder="Chicago, IL, USA"
                  value={formData.deliveryLocation}
                  onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                  className={`w-full bg-slate-50 border rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] focus:bg-white transition-all ${
                    errors.deliveryLocation ? 'border-rose-500' : 'border-slate-200'
                  }`}
                />
                {errors.deliveryLocation && <p className="text-[10px] text-rose-600">{errors.deliveryLocation}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Additional Requirements / Custom Specifications</label>
              <textarea
                rows={3}
                placeholder="Mention specific probes, software licenses, accessories, or delivery timeline constraints..."
                value={formData.additionalRequirements}
                onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 bg-[#0f3b6c] hover:bg-[#0b2d52] disabled:opacity-60 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Formal Quote Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleClearForm}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-4 rounded-xl font-bold text-xs uppercase tracking-wider border border-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Clear Form</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
