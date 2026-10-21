import React from 'react';
import { PhotoItem, CutoutShape, Language } from '../types';
import {
  Sparkles,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Code2,
  Phone,
  Download,
  Building2,
  ChevronRight,
} from 'lucide-react';

interface HeroProps {
  heroPhoto: PhotoItem;
  allPhotos: PhotoItem[];
  onSelectPhoto: (id: string) => void;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({
  heroPhoto,
  allPhotos,
  onSelectPhoto,
  language = 'bn',
}) => {
  const getShapeClasses = (shape: CutoutShape) => {
    switch (shape) {
      case 'golden-arch':
        return 'rounded-t-[160px] rounded-b-3xl';
      case 'circle-ring':
        return 'rounded-full aspect-square';
      case 'hexagon':
        return 'cutout-hexagon aspect-square';
      case 'octagon':
        return 'cutout-octagon aspect-square';
      case 'blob':
        return 'cutout-blob aspect-square';
      case 'rounded-card':
      default:
        return 'rounded-3xl';
    }
  };

  const glowIntensity = heroPhoto.filters?.goldGlowIntensity || 85;
  const brightness = heroPhoto.filters?.brightness || 104;
  const contrast = heroPhoto.filters?.contrast || 106;
  const warmth = heroPhoto.filters?.warmth || 12;

  // Download contact vCard
  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:Tareq;MD;;;
FN:MD Tareq (মোঃ তারেক)
ORG:Palli Sanchay Bank
TITLE:Field Assistant Officer
EMAIL;TYPE=INTERNET:ranguniaup@gmail.com
NOTE:MBA in Accounting (National University). Passionate Web Developer & Digital Creator.
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'MD_Tareq_PalliSanchayBank.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#fffbf0] to-[#faf8f5]">
      {/* Background Soft Golden Ambient Circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-amber-200/35 via-amber-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-yellow-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill: Palli Sanchay Bank & Accounting */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-amber-300/80 shadow-sm shadow-amber-500/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-bold text-amber-900 tracking-wide font-bangla">
                {language === 'bn'
                  ? 'পল্লী সঞ্চয় ব্যাংক কর্মকর্তা • এমবিএ (অ্যাকাউন্টিং, এনইউ)'
                  : 'Palli Sanchay Bank Officer • MBA in Accounting (NU)'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
              {language === 'bn' ? (
                <>
                  স্বাগতম, আমি <br />
                  <span className="gold-gradient-text font-serif-gold">মোঃ তারেক</span>
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-700 mt-2">
                    (MD Tareq)
                  </span>
                </>
              ) : (
                <>
                  Hello, I am <br />
                  <span className="gold-gradient-text font-serif-gold">MD Tareq</span>
                  <span className="block text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-700 mt-2 font-bangla">
                    (মোঃ তারেক)
                  </span>
                </>
              )}
            </h1>

            {/* Dynamic Bio Paragraph */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 font-bangla leading-relaxed">
              {language === 'bn' ? (
                <>
                  আমি বর্তমানে <strong>পল্লী সঞ্চয় ব্যাংক</strong>-এ <strong>মাঠ সহকারী কর্মকর্তা</strong> হিসেবে দায়িত্ব পালন করছি এবং জাতীয় বিশ্ববিদ্যালয় থেকে হিসাববিজ্ঞানে <strong>এমবিএ (MBA in Accounting)</strong> ডিগ্রিধারী। বিভিন্ন ধরণের <strong>আধুনিক ওয়েবসাইট তৈরি আমার শখ</strong>, ডিজিটাল কার্যক্রম পরিচালনা এবং ওয়েব উদ্ভাবন আমার ভালোলাগা।
                </>
              ) : (
                <>
                  Currently serving as a <strong>Field Assistant Officer</strong> at <strong>Palli Sanchay Bank</strong> with an <strong>MBA in Accounting (NU)</strong>. Beyond professional banking, I am an enthusiastic <strong>Web Designer & Creator</strong> passionate about digital transformation.
                </>
              )}
            </p>

            {/* Quick Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/80 border border-amber-200/80 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-stone-900 font-bangla">পল্লী সঞ্চয় ব্যাংক</p>
                  <p className="text-[11px] text-stone-500 font-bangla">মাঠ সহকারী কর্মকর্তা</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 border border-amber-200/80 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-stone-900 font-bangla">MBA in Accounting</p>
                  <p className="text-[11px] text-stone-500 font-bangla">জাতীয় বিশ্ববিদ্যালয় (NU)</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 border border-amber-200/80 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-stone-900 font-bangla">ওয়েব ক্রিয়েটর</p>
                  <p className="text-[11px] text-stone-500 font-bangla">ডিজিটাল ও ওয়েব শখ</p>
                </div>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-98"
              >
                <Phone className="w-4 h-4" />
                <span className="font-bangla">{language === 'bn' ? 'যোগাযোগ করুন' : 'Contact Me'}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href="#ai-studio"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-amber-50/80 text-amber-900 font-bold text-sm border-2 border-amber-300 shadow-xs hover:border-amber-400 transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="font-bangla">{language === 'bn' ? 'এআই ফটো স্টুডিও' : 'AI Photo Studio'}</span>
              </a>

              <button
                onClick={handleDownloadVCard}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm transition"
                title="Download Contact Card"
              >
                <Download className="w-4 h-4 text-stone-600" />
                <span className="font-bangla">{language === 'bn' ? 'vCard সেভ' : 'vCard'}</span>
              </button>
            </div>
          </div>

          {/* Right Hero: Live Cutout Portrait & Gold Glow (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative">
              {/* Outer Golden Aura Glow */}
              <div
                className="absolute inset-0 rounded-full blur-3xl pointer-events-none -z-10 transition-all duration-500"
                style={{
                  background: `radial-gradient(circle, rgba(245, 158, 11, ${glowIntensity / 100}) 0%, rgba(251, 191, 36, 0.25) 50%, transparent 75%)`,
                  transform: 'scale(1.25)',
                }}
              />

              {/* Main Photo Card Container */}
              <div className="p-3 rounded-[36px] bg-gradient-to-b from-white/95 to-amber-50/90 border-2 border-amber-300/80 shadow-2xl shadow-amber-500/20 backdrop-blur-md max-w-sm">
                
                {/* Image with current AI Cutout Shape */}
                <div
                  className={`w-72 sm:w-80 h-96 p-2 mx-auto transition-all duration-500 ${getShapeClasses(
                    heroPhoto.shape
                  )}`}
                  style={{
                    background: `linear-gradient(135deg, #fef08a, #d97706, #f59e0b)`,
                    boxShadow: `0 12px 36px -8px rgba(217, 119, 6, ${glowIntensity / 100})`,
                  }}
                >
                  <div
                    className={`w-full h-full overflow-hidden bg-stone-900 ${getShapeClasses(
                      heroPhoto.shape
                    )}`}
                  >
                    <img
                      src={heroPhoto.url}
                      alt="মোঃ তারেক (MD Tareq)"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      style={{
                        filter: `brightness(${brightness}%) contrast(${contrast}%) sepia(${warmth}%)`,
                      }}
                    />
                  </div>
                </div>

                {/* Photo Caption & Active Style Badge */}
                <div className="mt-4 p-3 rounded-2xl bg-white/90 border border-amber-200/80 text-center space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>{heroPhoto.badge}</span>
                  </div>
                  <h4 className="font-extrabold text-stone-900 text-sm font-bangla">
                    {heroPhoto.bengaliTitle || 'মোঃ তারেক — পল্লী সঞ্চয় ব্যাংক'}
                  </h4>
                  <p className="text-[11px] text-stone-600 line-clamp-2 font-bangla">
                    {heroPhoto.caption}
                  </p>
                </div>
              </div>

              {/* Quick Photo Switcher Bar underneath */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="text-xs text-stone-500 font-bangla mr-1">ছবি পরিবর্তন:</span>
                {allPhotos.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectPhoto(p.id)}
                    className={`relative w-10 h-10 rounded-xl overflow-hidden border-2 transition ${
                      p.id === heroPhoto.id
                        ? 'border-amber-500 ring-2 ring-amber-400/50 scale-110'
                        : 'border-stone-300 opacity-70 hover:opacity-100'
                    }`}
                    title={`ছবি ${idx + 1}`}
                  >
                    <img src={p.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
                <a
                  href="#ai-studio"
                  className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 hover:bg-amber-200 text-amber-800 flex items-center justify-center text-xs font-bold transition"
                  title="আরও ছবি যোগ করুন ও মডিফাই করুন"
                >
                  +
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
