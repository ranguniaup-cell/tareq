import React from 'react';
import { Language } from '../types';
import { Heart, ArrowUp, Sparkles, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language = 'bn' }) => {
  const { isInstallable, install } = usePWAInstall();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 px-4 border-t-2 border-amber-500/30 relative overflow-hidden font-bangla">
      {/* Golden Ambient Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-800">
          
          {/* Brand info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-stone-950 font-extrabold shadow-md border border-amber-300 font-serif-gold text-sm">
                MT
              </div>
              <div>
                <h4 className="font-extrabold text-white text-lg">
                  {language === 'bn' ? 'মোঃ তারেক (MD Tareq)' : 'MD Tareq'}
                </h4>
                <p className="text-xs text-amber-400 font-sans">
                  {language === 'bn' ? 'মাঠ সহকারী কর্মকর্তা • পল্লী সঞ্চয় ব্যাংক' : 'Field Assistant Officer, Palli Sanchay Bank'}
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {language === 'bn'
                ? 'হিসাববিজ্ঞানে এমবিএ ও পল্লী সঞ্চয় ব্যাংকের পেশাদার কর্মকর্তা। আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরি ও ডিজিটাল প্রযুক্তিতে নিবেদিত প্রাণ।'
                : 'MBA in Accounting (NU) & Field Assistant Officer at Palli Sanchay Bank. Passionate web builder and digital innovator.'}
            </p>
          </div>

          {/* Quick links (4 cols) */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <p className="font-bold text-amber-200 uppercase tracking-wider mb-3">
              {language === 'bn' ? 'দ্রুত মেনু নেভিগেশন' : 'Quick Links'}
            </p>
            <div className="grid grid-cols-2 gap-2 text-stone-300">
              <a href="#hero" className="hover:text-amber-400 transition">হোম</a>
              <a href="#about" className="hover:text-amber-400 transition">আমার সম্পর্কে</a>
              <a href="#education" className="hover:text-amber-400 transition">শিক্ষা (MBA)</a>
              <a href="#work" className="hover:text-amber-400 transition">বর্তমান কাজ</a>
              <a href="#projects" className="hover:text-amber-400 transition">প্রজেক্ট ও দক্ষতা</a>
              <a href="#ai-studio" className="hover:text-amber-400 text-amber-300 font-semibold transition flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>এআই ফটো স্টুডিও</span>
              </a>
              <a href="#contact" className="hover:text-amber-400 transition">যোগাযোগ</a>
            </div>
          </div>

          {/* PWA & Action (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="font-bold text-amber-200 uppercase tracking-wider text-xs">
              {language === 'bn' ? 'মোবাইল সুবিধা (PWA)' : 'Mobile App'}
            </p>
            <p className="text-[11px] text-stone-400">
              {language === 'bn'
                ? 'এই পোর্টফোলিওটি আপনার মোবাইলে সরাসরি অ্যাপ হিসেবে ইনস্টল করা যায় এবং অফলাইনেও কাজ করে।'
                : 'Installable Progressive Web App with offline access on iOS & Android.'}
            </p>
            {isInstallable && (
              <button
                onClick={install}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition"
              >
                <Smartphone className="w-4 h-4" />
                <span>{language === 'bn' ? 'মোবাইলে ইনস্টল করুন' : 'Install on Mobile'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            © {new Date().getFullYear()} মোঃ তারেক (MD Tareq) | সর্বস্বত্ব সংরক্ষিত।
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900 hover:bg-amber-500/20 text-stone-300 hover:text-amber-300 border border-stone-800 transition"
          >
            <span>{language === 'bn' ? 'উপরে যান' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
