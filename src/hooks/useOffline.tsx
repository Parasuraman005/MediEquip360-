import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';

interface OfflineContextType {
  isOnline: boolean;
  isSimulatedOffline: boolean;
  isReconnecting: boolean;
  lastCheckedAt: Date | null;
  checkConnectivity: () => Promise<boolean>;
  setSimulatedOffline: (simulated: boolean) => void;
}

const OfflineContext = createContext<OfflineContextType>({
  isOnline: true,
  isSimulatedOffline: false,
  isReconnecting: false,
  lastCheckedAt: null,
  checkConnectivity: async () => true,
  setSimulatedOffline: () => {},
});

export function OfflineProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);
  const [lastCheckedAt, setLastCheckedAt] = useState<Date | null>(new Date());

  const checkConnectivity = useCallback(async (): Promise<boolean> => {
    if (isSimulatedOffline) {
      setIsOnline(false);
      setLastCheckedAt(new Date());
      return false;
    }

    setIsReconnecting(true);
    let onlineState = navigator.onLine;

    // Perform an active lightweight ping check to verify true internet access
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const response = await fetch('/favicon.ico', {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      onlineState = response.ok || response.status < 500;
    } catch {
      // If fetch fails or aborts, fallback to navigator.onLine check
      onlineState = navigator.onLine;
    } finally {
      setIsReconnecting(false);
      setIsOnline(onlineState);
      setLastCheckedAt(new Date());
    }

    return onlineState;
  }, [isSimulatedOffline]);

  useEffect(() => {
    const handleOnline = () => {
      if (!isSimulatedOffline) {
        checkConnectivity();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setLastCheckedAt(new Date());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkConnectivity, isSimulatedOffline]);

  const effectiveOnline = isSimulatedOffline ? false : isOnline;

  return (
    <OfflineContext.Provider
      value={{
        isOnline: effectiveOnline,
        isSimulatedOffline,
        isReconnecting,
        lastCheckedAt,
        checkConnectivity,
        setSimulatedOffline: setIsSimulatedOffline,
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  return useContext(OfflineContext);
}

/**
 * Hook to auto-save form input state to localStorage to prevent data loss
 * on disconnection or page reloads.
 */
export function useFormDraft<T extends object>(key: string, initialValues: T) {
  const [formData, setFormData] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(`draft_${key}`);
      return saved ? { ...initialValues, ...JSON.parse(saved) } : initialValues;
    } catch {
      return initialValues;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`draft_${key}`, JSON.stringify(formData));
    } catch {
      // Ignore quota errors
    }
  }, [key, formData]);

  const clearDraft = useCallback(() => {
    setFormData(initialValues);
    try {
      localStorage.removeItem(`draft_${key}`);
    } catch {
      // Ignore
    }
  }, [key, initialValues]);

  return [formData, setFormData, clearDraft] as const;
}
