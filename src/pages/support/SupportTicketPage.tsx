import { useState, useRef } from 'react';
import { AlertCircle, CheckCircle2, Send, RotateCcw, Paperclip, X, FileText, ShieldAlert, Loader2 } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';
import { useToast } from '../../components/common/Toast';
import { useOffline, useFormDraft } from '../../hooks/useOffline';
import { getStoredUTMParameters } from '../../utils/utm';
import { analytics } from '../../utils/analytics';

interface AttachmentFile {
  name: string;
  size: number;
  type: string;
}

const initialSupportForm = {
  fullName: '',
  email: '',
  phone: '',
  organization: '',
  orderId: '',
  productName: '',
  modelNumber: '',
  serialNumber: '',
  purchaseDate: '',
  warrantyStatus: 'Under Warranty',
  complaintCategory: 'Equipment Malfunction',
  complaintSubject: '',
  description: '',
  problemStartDate: '',
  frequency: 'Occasionally',
  impact: 'Major Issue',
};

export function SupportTicketPage() {
  useSEO({
    title: 'Product Support & Complaint | MediEquip360',
    description: 'Submit product complaints, equipment malfunction issues, warranty claims, or technical assistance requests for medical equipment purchased from MediEquip360.',
    path: '/support-ticket',
  });

  const { showToast } = useToast();
  const { isOnline } = useOffline();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complaintRef, setComplaintRef] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData, clearDraft] = useFormDraft('support_ticket', initialSupportForm);

  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);

  const categories = [
    'Product Not Working',
    'Equipment Malfunction',
    'Physical Damage',
    'Missing Accessories',
    'Incorrect Product Delivered',
    'Product Quality Complaint',
    'Installation Problem',
    'Warranty Claim',
    'Technical Assistance',
    'Billing or Order Issue',
    'Other',
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles: AttachmentFile[] = [];
      let err = '';

      for (const file of filesArray) {
        if (file.size > 5 * 1024 * 1024) {
          err = `File "${file.name}" exceeds 5MB limit.`;
          continue;
        }
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
          err = `File "${file.name}" is not a supported format (JPEG, PNG, WEBP, PDF only).`;
          continue;
        }
        validFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
        });
      }

      if (err) {
        setErrorMsg(err);
        showToast('error', 'File Error', err);
      } else {
        setErrorMsg('');
        showToast('success', 'File Attached', `${validFiles.length} file(s) attached.`);
      }

      setAttachments((prev) => [...prev, ...validFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    showToast('info', 'File Removed', 'Attachment removed from form.');
  };

  const handleClear = () => {
    clearDraft();
    setAttachments([]);
    setErrorMsg('');
    showToast('info', 'Form Cleared', 'Complaint form has been reset.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOnline) {
      setErrorMsg('You are currently offline. Your complaint details are saved as a local draft and will not be lost.');
      showToast('error', 'Offline Mode', 'Internet connection is unavailable. Complaint saved locally as draft.');
      return;
    }

    setErrorMsg('');

    if (!formData.fullName || !formData.email || !formData.phone) {
      setErrorMsg('Please fill in all required Customer Information fields.');
      showToast('error', 'Validation Error', 'Missing required Customer Information.');
      return;
    }
    if (!formData.orderId || !formData.productName || !formData.purchaseDate) {
      setErrorMsg('Please fill in all required Purchased Product Information fields.');
      showToast('error', 'Validation Error', 'Missing required Product Information.');
      return;
    }
    if (!formData.complaintSubject || !formData.description) {
      setErrorMsg('Please provide a complaint subject and problem description.');
      showToast('error', 'Validation Error', 'Missing complaint subject or description.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const ref = `MED-CMP-2026-${randomNum}`;
      const utm = getStoredUTMParameters();

      setComplaintRef(ref);
      setIsSubmitting(false);
      setSubmitted(true);
      clearDraft();

      showToast('success', 'Complaint Submitted', `Complaint Reference: ${ref}`);

      analytics.trackComplaintFormSubmit(formData.complaintCategory);

      const existing = JSON.parse(localStorage.getItem('mediequip360_complaints') || '[]');
      localStorage.setItem(
        'mediequip360_complaints',
        JSON.stringify([{ ...formData, attachments, utm, referenceId: ref, date: new Date().toISOString() }, ...existing])
      );

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 900);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0f3b6c] to-[#0284c7] text-white py-4 px-6 rounded-2xl shadow-sm text-center space-y-1">
        <h1 className="text-lg sm:text-xl font-bold tracking-tight">Product Support &amp; Complaint</h1>
        <p className="text-slate-200 text-xs max-w-xl mx-auto">
          Tell us about the issue with your purchased product, and our support team will review your complaint.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-8 sm:p-12 rounded-3xl text-center space-y-5">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-extrabold">Your complaint has been submitted successfully.</h2>
            <div className="bg-white px-6 py-3 rounded-xl border border-emerald-200 inline-block text-sm font-bold text-slate-800 shadow-sm">
              Complaint Reference Number: <span className="text-[#0f3b6c] font-extrabold">{complaintRef}</span>
            </div>
            <p className="text-xs sm:text-sm max-w-md mx-auto leading-relaxed text-slate-600">
              Thank you for notifying MediEquip360. This is a demonstration submission. Your complaint details and attached files have been recorded locally for review.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  handleClear();
                }}
                className="bg-[#0f3b6c] hover:bg-[#0b2d52] text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow"
              >
                Submit Another Complaint
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-2xl flex items-center gap-3 text-xs sm:text-sm font-medium">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Desktop 2-Column Grid Layout for Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              
              {/* LEFT COLUMN: Section A & Section B */}
              <div className="space-y-8">
                {/* SECTION A: Customer Information */}
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 bg-sky-100 text-[#0f3b6c] rounded-lg flex items-center justify-center text-xs font-bold">A</span>
                      <span>Customer Information</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Jane Smith"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="jane@hospital.example"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Hospital / Clinic</label>
                      <input
                        type="text"
                        placeholder="City Medical Center"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION B: Purchased Product Information */}
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 bg-sky-100 text-[#0f3b6c] rounded-lg flex items-center justify-center text-xs font-bold">B</span>
                      <span>Purchased Product Information</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Order ID *</label>
                      <input
                        type="text"
                        required
                        placeholder="ORD-2026-9481"
                        value={formData.orderId}
                        onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Product Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. SonoVista Ultrasound"
                        value={formData.productName}
                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Model No.</label>
                      <input
                        type="text"
                        placeholder="SV-PU100"
                        value={formData.modelNumber}
                        onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Serial No.</label>
                      <input
                        type="text"
                        placeholder="SN-8839201"
                        value={formData.serialNumber}
                        onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Purchase Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.purchaseDate}
                        onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Warranty Status</label>
                    <select
                      value={formData.warrantyStatus}
                      onChange={(e) => setFormData({ ...formData, warrantyStatus: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                    >
                      <option value="Under Warranty">Under Warranty</option>
                      <option value="Warranty Expired">Warranty Expired</option>
                      <option value="Not Sure">Not Sure</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Section C & Section D */}
              <div className="space-y-8">
                {/* SECTION C: Complaint Details */}
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 bg-sky-100 text-[#0f3b6c] rounded-lg flex items-center justify-center text-xs font-bold">C</span>
                      <span>Complaint Details</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Category *</label>
                      <select
                        value={formData.complaintCategory}
                        onChange={(e) => setFormData({ ...formData, complaintCategory: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Subject *</label>
                      <input
                        type="text"
                        required
                        placeholder="Brief summary"
                        value={formData.complaintSubject}
                        onChange={(e) => setFormData({ ...formData, complaintSubject: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Describe the Problem *</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Details of what went wrong, error codes, symptoms..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Problem Start</label>
                      <input
                        type="date"
                        value={formData.problemStartDate}
                        onChange={(e) => setFormData({ ...formData, problemStartDate: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Frequency</label>
                      <select
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                      >
                        <option value="Once">Once</option>
                        <option value="Occasionally">Occasionally</option>
                        <option value="Frequently">Frequently</option>
                        <option value="Not Working at All">Not Working</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Usage Impact</label>
                      <select
                        value={formData.impact}
                        onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                      >
                        <option value="Minor Issue">Minor</option>
                        <option value="Major Issue">Major</option>
                        <option value="Equipment Cannot Be Used">Unusable</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECTION D: Attachments */}
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 bg-sky-100 text-[#0f3b6c] rounded-lg flex items-center justify-center text-xs font-bold">D</span>
                      <span>Attachments (Optional)</span>
                    </h2>
                  </div>

                  <div className="space-y-3">
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-[#0f3b6c] transition-colors bg-slate-50/50">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        className="hidden"
                        id="complaint-file-upload"
                      />
                      <label htmlFor="complaint-file-upload" className="cursor-pointer space-y-1 block">
                        <Paperclip className="w-6 h-6 text-sky-600 mx-auto" />
                        <div className="text-xs font-semibold text-slate-800">
                          Click to attach product images or invoice (Max 5MB)
                        </div>
                      </label>
                    </div>

                    {attachments.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Files ({attachments.length}):</div>
                        <div className="space-y-1.5 max-h-28 overflow-y-auto">
                          {attachments.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-xl text-xs">
                              <div className="flex items-center gap-2 truncate">
                                <FileText className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                                <span className="font-semibold text-slate-800 truncate">{file.name}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeAttachment(idx)}
                                className="text-rose-600 hover:text-rose-800 p-0.5"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Demo Notice & Form Buttons */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="bg-sky-50 border border-sky-100 p-3.5 rounded-2xl flex items-center gap-3 text-xs text-sky-900">
                <ShieldAlert className="w-4 h-4 text-sky-600 shrink-0" />
                <span><strong>Demo Notice:</strong> Simulated frontend submission. No external transmission.</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex-1 bg-[#0f3b6c] hover:bg-[#0b2d52] disabled:opacity-60 text-white py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Complaint...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Complaint</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 px-8 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear Form</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
