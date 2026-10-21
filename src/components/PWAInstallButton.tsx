import React, { useState, useEffect } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, CheckCircle2, Share2, PlusSquare } from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'nav' | 'banner' | 'floating';
  language?: 'bn' | 'en';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'nav',
  language = 'bn',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showAutoBanner, setShowAutoBanner] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);

  // Auto-prompt banner for mobile users after 2 seconds
  useEffect(() => {
    if (!isInstalled && !hasDismissed && (isInstallable || isIOS)) {
      const timer = setTimeout(() => {
        setShowAutoBanner(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isIOS, isInstalled, hasDismissed]);

  if (isInstalled) {
    if (variant === 'nav') {
      return (
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-amber-800 bg-amber-100/80 border border-amber-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
          {language === 'bn' ? 'ইনস্টল করা আছে' : 'Installed'}
        </span>
      );
    }
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
      setShowAutoBanner(false);
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // General browser fallback instructions
      alert(language === 'bn' 
        ? 'ব্রাউজারের মেনু (৩ ডট) থেকে "Add to Home screen" বা "Install App" অপশনে ক্লিক করুন।' 
        : 'Please tap the browser menu (3 dots) and select "Add to Home screen".');
    }
  };

  const dismissBanner = () => {
    setShowAutoBanner(false);
    setHasDismissed(true);
  };

  // Nav button representation
  if (variant === 'nav') {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-amber-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-500 shadow-sm hover:shadow-md transition-all duration-200 border border-amber-400 active:scale-95"
          title={language === 'bn' ? 'মোবাইলে ইনস্টল করুন' : 'Install Mobile App'}
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-900" />
          <span>{language === 'bn' ? 'অ্যাপ ইনস্টল' : 'Install App'}</span>
        </button>

        {showIOSGuide && (
          <IOSInstallModal language={language} onClose={() => setShowIOSGuide(false)} />
        )}
      </>
    );
  }

  // Floating auto-install mobile prompt banner
  if (showAutoBanner && !isInstalled) {
    return (
      <>
        <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto animate-bounce-in">
          <div className="relative rounded-2xl p-4 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white shadow-2xl border border-amber-400/40 backdrop-blur-md">
            <button
              onClick={dismissBanner}
              className="absolute top-2.5 right-2.5 p-1 rounded-full text-amber-200/70 hover:text-white hover:bg-white/10 transition"
              aria-label="Close install prompt"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg border border-amber-300 shrink-0 overflow-hidden">
                <span className="font-bold text-amber-950 text-base tracking-wider">MT</span>
              </div>

              <div className="flex-1 pr-6">
                <h4 className="font-semibold text-sm text-amber-200">
                  {language === 'bn' ? 'মোবাইলে অ্যাপ হিসেবে যোগ করুন' : 'Install on Mobile'}
                </h4>
                <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                  {language === 'bn'
                    ? 'হোম স্ক্রিনে রাখুন, অফলাইনেও পোর্টফোলিও ও ছবি দেখতে পারবেন।'
                    : 'Add to home screen for 1-tap fast access and offline viewing.'}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={handleInstallClick}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold text-xs shadow-md transition active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>{language === 'bn' ? 'এখনই ইনস্টল করুন' : 'Install Now'}</span>
                  </button>
                  <button
                    onClick={dismissBanner}
                    className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-stone-300 font-medium text-xs transition"
                  >
                    {language === 'bn' ? 'পরে' : 'Later'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showIOSGuide && (
          <IOSInstallModal language={language} onClose={() => setShowIOSGuide(false)} />
        )}
      </>
    );
  }

  return null;
};

// Modal specifically guiding iOS Safari users
const IOSInstallModal: React.FC<{ language: 'bn' | 'en'; onClose: () => void }> = ({
  language,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-amber-200 text-stone-800">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-base">
            <Smartphone className="w-5 h-5 text-amber-600" />
            <span>{language === 'bn' ? 'আইফোন / আইপ্যাডে ইনস্টল' : 'Install on iOS Safari'}</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-stone-100 text-stone-500">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-3.5 text-xs text-stone-600">
          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200">
            <Share2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-stone-800">
                {language === 'bn' ? 'ধাপ ১: Share বাটনে ট্যাপ করুন' : 'Step 1: Tap Share'}
              </p>
              <p className="text-stone-600 mt-0.5">
                {language === 'bn'
                  ? 'Safari ব্রাউজারের নিচে শেয়ার (Share) আইকনে চাপ দিন।'
                  : 'Tap the Share icon at the bottom of Safari.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200">
            <PlusSquare className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-stone-800">
                {language === 'bn' ? 'ধাপ ২: "Add to Home Screen" নির্বাচন করুন' : 'Step 2: Add to Home Screen'}
              </p>
              <p className="text-stone-600 mt-0.5">
                {language === 'bn'
                  ? 'নিচে স্ক্রল করে "Add to Home Screen" সিলেক্ট করুন এবং Add চাপুন।'
                  : 'Scroll down and tap "Add to Home Screen", then tap Add.'}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-2 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-md transition"
        >
          {language === 'bn' ? 'বুঝেছি' : 'Got it'}
        </button>
      </div>
    </div>
  );
};
