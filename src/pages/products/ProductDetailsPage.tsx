import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { ShieldCheck, ArrowLeft, ArrowRight, Phone, Mail, FileText, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';
import { useToast } from '../../components/common/Toast';
import { getStoredUTMParameters } from '../../utils/utm';
import { analytics } from '../../utils/analytics';

export function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const product = products.find((p) => p.slug === slug);

  useSEO({
    title: product ? `${product.name} | MediEquip360` : 'Product Details | MediEquip360',
    description: product ? `${product.brand} ${product.name} (${product.model}). ${product.description}` : 'Detailed medical equipment specifications and procurement information.',
    image: product?.image,
    path: `/product/${slug}`,
  });

  useEffect(() => {
    if (product) {
      analytics.trackProductView(product.id, product.name, product.category);
    }
  }, [product]);

  const [inquirySent, setInquirySent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    hospital: '',
    message: '',
  });

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <h2 className="text-3xl font-bold text-slate-900">Equipment Not Found</h2>
        <p className="text-slate-600">The medical equipment listing you are looking for does not exist or has been removed.</p>
        <Link
          to="/catalog"
          className="inline-block bg-[#0f3b6c] text-white px-6 py-3 rounded-xl font-semibold text-sm shadow"
        >
          Return to Equipment Catalog
        </Link>
      </div>
    );
  }

  const isNew = product.condition === 'New';

  const formatPrice = (price: number | null) => {
    if (!price) return 'Contact for Information';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email address is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('error', 'Form Error', 'Please correct the highlighted fields.');
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setInquirySent(true);
      showToast('success', 'Inquiry Sent', `Your inquiry for ${product.name} was logged successfully.`);
      const utm = getStoredUTMParameters();
      analytics.trackProductInquiryClick(product.name);
      console.log('Inquiry payload with UTM:', { ...formData, productId: product.id, utm });
    }, 800);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb & Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#0f3b6c] bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <div className="text-xs text-slate-500 font-medium">
          Catalog &gt; <span className="text-[#0f3b6c] font-bold">{product.category}</span> &gt; {product.name}
        </div>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md h-[400px] sm:h-[480px] relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 ${
                  isNew ? 'bg-sky-600 text-white' : 'bg-emerald-600 text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{product.condition} Equipment</span>
              </span>
            </div>
          </div>
        </div>

        {/* Product Info & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-sky-700 mb-1">
                {product.brand} • {product.category}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {product.name}
              </h1>
              <div className="text-xs font-medium text-slate-500 mt-1">
                Model Code: <span className="text-slate-800 font-semibold">{product.model}</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            <div className="bg-sky-50 border border-sky-100 p-4 rounded-2xl space-y-1">
              <div className="text-xs text-sky-800 font-semibold uppercase tracking-wider">Estimated Demo Price</div>
              <div className="text-2xl font-extrabold text-[#0f3b6c]">
                {formatPrice(product.price)}
              </div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Sample demonstration value. Not a binding commercial quote.</span>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Availability Status: <strong>{product.availability}</strong></span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3 pt-2">
              <Link
                to={`/request-quote?product=${encodeURIComponent(product.name)}&brand=${encodeURIComponent(product.brand)}&condition=${product.condition}`}
                className="w-full bg-[#0f3b6c] hover:bg-[#0b2d52] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Request Quotation Demo</span>
              </Link>
              <a
                href="tel:+910000000000"
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-sky-700" />
                <span>Call Demo Support</span>
              </a>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#0f3b6c]" />
              <span>Quick Product Inquiry</span>
            </h3>

            {inquirySent ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs space-y-2 text-center">
                <Check className="w-6 h-6 text-emerald-600 mx-auto" />
                <div className="font-bold text-sm">Demo Inquiry Logged Successfully</div>
                <p>Our demonstration procurement team has recorded your interest in {product.name}.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full bg-white border rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] ${
                      errors.fullName ? 'border-rose-500' : 'border-slate-200'
                    }`}
                  />
                  {errors.fullName && <p className="text-[10px] text-rose-600 mt-0.5">{errors.fullName}</p>}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full bg-white border rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c] ${
                        errors.email ? 'border-rose-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-rose-600 mt-0.5">{errors.email}</p>}
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                    />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Hospital / Organization"
                  value={formData.hospital}
                  onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                />
                <textarea
                  rows={2}
                  placeholder="Specific demo requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#0f3b6c]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0284c7] hover:bg-[#026aa2] disabled:opacity-60 text-white py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Demo Inquiry</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Technical Specifications Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
          Demonstration Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="flex justify-between py-3 px-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-600">{key}</span>
              <span className="text-xs font-semibold text-slate-900 text-right">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs font-bold text-sky-700 uppercase tracking-widest mb-1">Related Systems</div>
              <h3 className="text-2xl font-extrabold text-slate-900">Similar Equipment in {product.category}</h3>
            </div>
            <Link to={`/catalog?category=${product.category}`} className="text-sm font-semibold text-[#0f3b6c] hover:text-[#0284c7] flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="h-40 rounded-xl overflow-hidden mb-4 bg-slate-100">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs font-semibold text-sky-700 uppercase">{p.brand}</div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">{p.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{p.description}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-700">{p.condition}</span>
                  <Link to={`/product/${p.slug}`} className="text-xs font-bold text-[#0f3b6c] hover:underline flex items-center gap-1">
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
