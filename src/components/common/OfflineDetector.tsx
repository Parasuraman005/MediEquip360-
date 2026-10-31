import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { WifiOff, RefreshCw, Home, Signal, CheckCircle2, AlertCircle, Radio } from 'lucide-react';
import { useOffline } from '../../hooks/useOffline';
import { useToast } from './Toast';

export function OfflineDetector({ children }: { children?: React.ReactNode }) {
  const { isOnline, isSimulatedOffline, isReconnecting, lastCheckedAt, checkConnectivity, setSimulatedOffline } = useOffline();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [offlineAttempted, setOfflineAttempted] = useState(false);
  const wasOfflineRef = useRef(false);

  useEffect(() => {
    if (!isOnline) {
      wasOfflineRef.current = true;
    } else if (wasOfflineRef.current) {
      wasOfflineRef.current = false;
      showToast('success', 'Connection Restored', 'You are back online. All features and form inputs have been preserved.');
    }
  }, [isOnline, showToast]);

  const handleTryAgain = async () => {
    setOfflineAttempted(true);
    const online = await checkConnectivity();
    if (online) {
      showToast('success', 'Connected', 'Internet connection confirmed!');
    } else {
      showToast('error', 'Still Offline', 'Internet connection remains unavailable. Please check your network settings.');
    }
  };

  const handleGoHome = async () => {
    const online = await checkConnectivity();
    if (online || isOnline) {
      navigate('/');
    } else {
      showToast('info', 'Offline Mode', 'Connection is unavailable. Navigating to offline cached home view.');
      navigate('/');
    }
  };

  return (
    <>
      {/* Sticky Reconnection Notification Banner */}
      {!isOnline && (
        <div className="bg-amber-500 text-white text-xs py-2 px-4 shadow-md flex items-center justify-between gap-3 sticky top-[116px] sm:top-[120px] z-40 transition-all border-b border-amber-600" aria-live="polite">
          <div className="flex items-center gap-2 font-medium truncate">
            <Radio className="w-4 h-4 animate-pulse shrink-0" />
            <span className="truncate">
              <strong>Offline Mode Active:</strong> You are currently disconnected from the internet. Your form drafts are safe.
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleTryAgain}
              disabled={isReconnecting}
              className="bg-white/20 hover:bg-white/30 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
            >
              <RefreshCw className={`w-3 h-3 ${isReconnecting ? 'animate-spin' : ''}`} />
              <span>Retry</span>
            </button>
            <button
              onClick={() => setSimulatedOffline(false)}
              className="text-white/80 hover:text-white underline text-[11px] hidden sm:inline"
            >
              Dismiss Demo
            </button>
          </div>
        </div>
      )}

      {children}
    </>
  );
}

/**
 * Dedicated Full-Page Offline / No Internet Connection View
 */
export function OfflineView({ fullPage = true }: { fullPage?: boolean }) {
  const { isOnline, isSimulatedOffline, isReconnecting, lastCheckedAt, checkConnectivity, setSimulatedOffline } = useOffline();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [retryStatus, setRetryStatus] = useState<string | null>(null);

  const handleRetry = async () => {
    setRetryStatus('Checking network connection...');
    const online = await checkConnectivity();
    if (online) {
      setRetryStatus('Connected! Restoring page...');
      showToast('success', 'Connection Restored', 'You are back online.');
      setTimeout(() => {
        window.location.reload();
      }, 400);
    } else {
      setRetryStatus('Unable to reach network. Please check your WiFi / Ethernet connection.');
      showToast('error', 'Network Check Failed', 'Still offline. Please check your device network connection.');
    }
  };

  const handleGoHome = async () => {
    const online = await checkConnectivity();
    if (online) {
      navigate('/');
    } else {
      showToast('info', 'Offline Redirect', 'Returning to homepage in offline mode.');
      navigate('/');
    }
  };

  return (
    <div className={`max-w-2xl mx-auto px-4 ${fullPage ? 'py-16 sm:py-24' : 'py-8'} text-center space-y-6`}>
      {/* Icon Card */}
      <div className="relative w-24 h-24 bg-slate-50 text-[#0f3b6c] rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-slate-200">
        <WifiOff className="w-12 h-12 text-[#0f3b6c]" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full border-2 border-white flex items-center justify-center">
          <span className="w-2 h-2 bg-white rounded-full animate-ping" />
        </span>
      </div>

      {/* Connection Status Badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-full shadow-xs">
          <Signal className="w-3.5 h-3.5" />
          <span>
            {isReconnecting
              ? 'Checking Connectivity...'
              : !isOnline
              ? 'Disconnected — Offline Mode'
              : 'Connection Restored'}
          </span>
        </div>
      </div>

      {/* Main Heading & Message */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          You're Offline!
        </h1>
        <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          It looks like your internet connection is unavailable. Please check your network and try again.
        </p>
      </div>

      {/* Detailed Status Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 max-w-md mx-auto space-y-2 text-left">
        <div className="font-bold text-slate-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Automatic Network Protection</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-slate-600 pl-1">
          <li>Form inputs and drafts are automatically saved to your local browser.</li>
          <li>No data will be lost during unexpected network drops.</li>
          <li>This interface will automatically refresh once your connection returns.</li>
        </ul>
        {lastCheckedAt && (
          <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-200">
            Last checked: {lastCheckedAt.toLocaleTimeString()}
          </div>
        )}
      </div>

      {retryStatus && (
        <div className="text-xs font-semibold text-slate-700 bg-sky-50 border border-sky-200 p-3 rounded-xl max-w-md mx-auto">
          {retryStatus}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={handleRetry}
          disabled={isReconnecting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0f3b6c] hover:bg-[#0b2d52] disabled:opacity-60 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md"
        >
          <RefreshCw className={`w-4 h-4 ${isReconnecting ? 'animate-spin' : ''}`} />
          <span>{isReconnecting ? 'Checking Connection...' : 'Try Again'}</span>
        </button>

        <button
          onClick={handleGoHome}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors border border-slate-200 shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>Go to Homepage</span>
        </button>
      </div>

      {/* Simulation Toggle for Demo */}
      <div className="pt-6 border-t border-slate-100 max-w-md mx-auto">
        <button
          onClick={() => setSimulatedOffline(!isSimulatedOffline)}
          className="text-xs text-sky-700 hover:text-sky-900 font-medium underline flex items-center justify-center gap-1.5 mx-auto"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>
            {isSimulatedOffline ? 'Disable Demo Offline Simulation' : 'Toggle Demo Offline Simulation'}
          </span>
        </button>
      </div>
    </div>
  );
}
