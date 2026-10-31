import { OfflineView } from '../../components/common/OfflineDetector';
import { useSEO } from '../../hooks/useSEO';

export function OfflinePage() {
  useSEO({
    title: "You're Offline | MediEquip360",
    description: "Your internet connection is unavailable. Please check your network connection and try again.",
    path: '/offline',
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#f8fafc]">
      <OfflineView fullPage={true} />
    </div>
  );
}
