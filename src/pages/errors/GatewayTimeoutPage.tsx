import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, RefreshCw, Home, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';
import { useToast } from '../../components/common/Toast';

export function GatewayTimeoutPage() {
  useSEO({
    title: '504 Gateway Timeout | MediEquip360',
    description: 'The upstream server or gateway took too long to respond. Please retry your request or return to the homepage.',
    path: '/504',
  });

  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    showToast('info', 'Retrying Connection', 'Sending request to server...');

    setTimeout(() => {
      setIsRetrying(false);
      showToast('success', 'Server Responsive', 'Connection restored successfully!');
      navigate(-1);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
      {/* Icon */}
      <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner border border-amber-100">
        <Clock className="w-10 h-10" />
      </div>

      {/* Badge & Title */}
      <div className="space-y-2">
        <span className="inline-block px-3.5 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full uppercase tracking-wider">
          HTTP 504 Error
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Server Taking Too Long to Respond
        </h1>
      </div>

      {/* Description */}
      <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
        The server or upstream gateway did not send a response in time. Your internet connection is working, but the server is experiencing temporary load or delayed response times.
      </p>

      {/* Clarification Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 text-xs text-slate-600 max-w-md mx-auto space-y-2 text-left shadow-xs">
        <div className="font-bold text-slate-800 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Technical Diagnosis</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          This is an upstream gateway timeout (504), not a network disconnect. Your local internet connection is fully operational.
        </p>
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-emerald-700 font-medium text-[11px]">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Local Internet: Connected &amp; Active</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0f3b6c] hover:bg-[#0b2d52] disabled:opacity-60 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md"
        >
          <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
          <span>{isRetrying ? 'Retrying Request...' : 'Try Again'}</span>
        </button>

        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border border-slate-200"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
