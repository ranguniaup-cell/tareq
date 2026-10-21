import React from 'react';
import { useOnlineStatus } from '../hooks/usePWAInstall';
import { WifiOff } from 'lucide-react';

interface OfflineIndicatorProps {
  language?: 'bn' | 'en';
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ language = 'bn' }) => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full bg-amber-600/90 text-white px-3.5 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-md border border-amber-400">
      <WifiOff className="w-3.5 h-3.5 animate-pulse" />
      <span>
        {language === 'bn'
          ? 'অফলাইন মোড — ক্যাশ করা ডাটা প্রদর্শিত হচ্ছে'
          : 'Offline Mode — Cached data loaded'}
      </span>
    </div>
  );
};
