import React, { useState, useRef } from 'react';
import { PhotoItem, CutoutShape, AIStylePreset, Language } from '../types';
import {
  Upload,
  Sparkles,
  Sliders,
  Check,
  Star,
  Download,
  Image as ImageIcon,
  RotateCcw,
  Palette,
  Layers,
  Wand2,
  Trash2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AIPhotoStudioProps {
  photos: PhotoItem[];
  activePhotoId: string;
  onSelectPhoto: (id: string) => void;
  onUpdatePhoto: (updated: PhotoItem) => void;
  onAddPhoto: (newPhoto: PhotoItem) => void;
  onDeletePhoto?: (id: string) => void;
  onSetAsHero: (id: string) => void;
  heroPhotoId: string;
  language?: Language;
}

const SHAPES: { id: CutoutShape; labelBn: string; labelEn: string; icon: string }[] = [
  { id: 'golden-arch', labelBn: 'রয়্যাল আর্চ (Arch)', labelEn: 'Royal Arch', icon: '🏛️' },
  { id: 'circle-ring', labelBn: 'দ্বৈত গোল্ড রিং (Circle)', labelEn: 'Dual Gold Ring', icon: '⭕' },
  { id: 'hexagon', labelBn: 'হেক্সাগন শিল্ড (Hexagon)', labelEn: 'Hexagon Shield', icon: '⬡' },
  { id: 'octagon', labelBn: 'অষ্টভুজ সিল (Octagon)', labelEn: 'Octagon Seal', icon: '🛑' },
  { id: 'blob', labelBn: 'অর্গানিক শেপ (Blob)', labelEn: 'Organic Blob', icon: '💧' },
  { id: 'rounded-card', labelBn: 'এক্সিকিউটিভ ফ্রেম (Frame)', labelEn: 'Executive Frame', icon: '🪟' },
];

const STYLES: { id: AIStylePreset; labelBn: string; labelEn: string; descBn: string; color: string }[] = [
  {
    id: 'luxury-gold',
    labelBn: 'হালকা গোল্ডেন অরা (Gold Aura)',
    labelEn: 'Luxury Gold Aura',
    descBn: 'উষ্ণ সোনালী আলো ও প্রিমিয়াম এক্সিকিউটিভ গ্লো',
    color: 'from-amber-400 to-amber-600',
  },
  {
    id: 'executive-banker',
    labelBn: 'ব্যাংকিং প্রফেশনাল (Banker)',
    labelEn: 'Executive Banker',
    descBn: 'পল্লী সঞ্চয় ব্যাংকের প্রফেশনাল ও নির্ভরযোগ্য ভাবমূর্তি',
    color: 'from-emerald-600 to-amber-600',
  },
  {
    id: 'web-creator',
    labelBn: 'ওয়েব ডেভেলপার ভাইব (Creator)',
    labelEn: 'Tech & Web Creator',
    descBn: 'আধুনিক কোডিং, ডিজিটাল উদ্ভাবন ও সৃজনশীলতা',
    color: 'from-cyan-500 to-amber-500',
  },
  {
    id: 'cinematic-studio',
    labelBn: 'সিনেমাটিক পোর্ট্রেট (Cinematic)',
    labelEn: 'Cinematic Studio',
    descBn: 'নাটকীয় গভীরতা ও প্রাকৃতিক উজ্জ্বল আলো',
    color: 'from-stone-700 to-amber-600',
  },
  {
    id: 'sepia-classic',
    labelBn: 'ভিন্টেজ রয়্যাল গোল্ড (Sepia)',
    labelEn: 'Vintage Royal Gold',
    descBn: 'ঐতিহ্যবাহী আভিজাত্য ও শান্ত সোনালী টোন',
    color: 'from-yellow-700 to-amber-800',
  },
];

export const AIPhotoStudio: React.FC<AIPhotoStudioProps> = ({
  photos,
  activePhotoId,
  onSelectPhoto,
  onUpdatePhoto,
  onAddPhoto,
  onDeletePhoto,
  onSetAsHero,
  heroPhotoId,
  language = 'bn',
}) => {
  const currentPhoto = photos.find((p) => p.id === activePhotoId) || photos[0];
  const [isProcessing, setIsProcessing] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardPreviewRef = useRef<HTMLDivElement>(null);

  // Local state for interactive sliders
  const [brightness, setBrightness] = useState(currentPhoto.filters.brightness);
  const [contrast, setContrast] = useState(currentPhoto.filters.contrast);
  const [warmth, setWarmth] = useState(currentPhoto.filters.warmth);
  const [goldGlow, setGoldGlow] = useState(currentPhoto.filters.goldGlowIntensity);

  // Sync state when active photo changes
  const handlePhotoSelect = (photo: PhotoItem) => {
    onSelectPhoto(photo.id);
    setBrightness(photo.filters.brightness);
    setContrast(photo.filters.contrast);
    setWarmth(photo.filters.warmth);
    setGoldGlow(photo.filters.goldGlowIntensity);
  };

  // Upload new photo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64Url = reader.result as string;
      const newPhotoItem: PhotoItem = {
        id: 'photo-' + Date.now(),
        title: file.name.split('.')[0] || 'New Photo',
        bengaliTitle: 'মোঃ তারেক — নতুন ছবি সংকলন',
        url: base64Url,
        badge: '✨ নতুন আপলোড',
        caption: 'মোঃ তারেকের নতুন পোর্ট্রেট ছবি। এআই মডিফায়ার দ্বারা স্বয়ংক্রিয়ভাবে কাটআউট ও গোল্ডেন ডিজাইনে প্রস্তুত।',
        quote: '“প্রতিটি নতুন দিন নিয়ে আসে নতুন সম্ভাবনা।”',
        tags: ['#NewUpload', '#TareqPortfolio', '#GoldAura', '#PalliSanchayBank'],
        shape: 'golden-arch',
        stylePreset: 'luxury-gold',
        filters: {
          brightness: 104,
          contrast: 106,
          warmth: 12,
          goldGlowIntensity: 85,
          borderHue: '#f59e0b',
        },
        isFeaturedOnHome: false,
        dateAdded: new Date().toISOString().split('T')[0],
      };

      onAddPhoto(newPhotoItem);
      handlePhotoSelect(newPhotoItem);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Call AI Modifier backend API
  const handleAIModifier = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/ai-photo-modifier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          style: currentPhoto.stylePreset,
          shape: currentPhoto.shape,
          userNote: customPrompt,
          imageBase64: currentPhoto.url.startsWith('data:') ? currentPhoto.url : undefined,
        }),
      });

      const data = await response.json();
      if (data.success) {
        const updatedFilters = {
          ...currentPhoto.filters,
          brightness: data.filterRecommendation?.brightness ?? brightness,
          contrast: data.filterRecommendation?.contrast ?? contrast,
          warmth: data.filterRecommendation?.warmth ?? warmth,
          goldGlowIntensity: data.filterRecommendation?.goldGlowIntensity ?? goldGlow,
          borderHue: data.filterRecommendation?.borderHue ?? '#f59e0b',
        };

        const updated: PhotoItem = {
          ...currentPhoto,
          badge: data.badge || currentPhoto.badge,
          bengaliTitle: data.bengaliTitle || currentPhoto.bengaliTitle,
          title: data.englishTitle || currentPhoto.title,
          caption: data.caption || currentPhoto.caption,
          quote: data.quote || currentPhoto.quote,
          tags: data.tags && data.tags.length > 0 ? data.tags : currentPhoto.tags,
          filters: updatedFilters,
        };

        onUpdatePhoto(updated);
        setBrightness(updatedFilters.brightness);
        setContrast(updatedFilters.contrast);
        setWarmth(updatedFilters.warmth);
        setGoldGlow(updatedFilters.goldGlowIntensity);

        confetti({
          particleCount: 80,
          spread: 70,
          colors: ['#f59e0b', '#fbbf24', '#fef08a', '#d97706'],
        });
      }
    } catch (err) {
      console.error('Failed to run AI modifier:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Update shape
  const handleShapeChange = (shape: CutoutShape) => {
    const updated = { ...currentPhoto, shape };
    onUpdatePhoto(updated);
  };

  // Update style
  const handleStyleChange = (stylePreset: AIStylePreset) => {
    const updated = { ...currentPhoto, stylePreset };
    onUpdatePhoto(updated);
  };

  // Live filter adjustments applied
  const applyLiveFilters = (newFilters: Partial<PhotoItem['filters']>) => {
    const updated = {
      ...currentPhoto,
      filters: { ...currentPhoto.filters, ...newFilters },
    };
    onUpdatePhoto(updated);
  };

  // Helper for applying shape styles to the photo container
  const getShapeClasses = (shape: CutoutShape) => {
    switch (shape) {
      case 'golden-arch':
        return 'rounded-t-[140px] rounded-b-3xl';
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

  return (
    <section id="ai-studio" className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'bn' ? 'স্মার্ট এআই ফটো মডিফায়ার ও স্টুডিও' : 'AI Photo Studio & Modifier'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            {language === 'bn' ? (
              <>
                ছবি আপলোড, <span className="gold-gradient-text">কাটিন ও ডিজাইন</span> স্টুডিও
              </>
            ) : (
              <>
                Upload, <span className="gold-gradient-text">AI Cutout & Design</span> Studio
              </>
            )}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-bangla">
            {language === 'bn'
              ? 'আপনার যে কোনো ছবি আপলোড করুন; কৃত্রিম বুদ্ধিমত্তা (Gemini AI) দ্বারা স্বয়ংক্রিয়ভাবে বিভিন্ন কাটআউট ফ্রেম, গোল্ডেন গ্লো ও আকর্ষণীয় ব্যাংকিং/ওয়েব ক্রিয়েটর স্টাইলে সাজিয়ে নিন। এটি সরাসরি হোম পেজে প্রদর্শন হবে!'
              : 'Upload any photo of Md Tareq. Gemini AI generates custom cutouts, luxury gold lighting, titles, and integrates it live onto the Home Page!'}
          </p>
        </div>

        {/* Main Grid: Preview & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Photo List & Upload (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Upload Button Box */}
            <div className="p-5 rounded-3xl bg-white border border-amber-200/80 shadow-sm text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group active:scale-98"
              >
                <Upload className="w-4 h-4 text-stone-900 group-hover:-translate-y-0.5 transition" />
                <span>{language === 'bn' ? 'নতুন ছবি আপলোড করুন' : 'Upload New Photo'}</span>
              </button>
              <p className="text-[11px] text-stone-500 mt-2">
                {language === 'bn'
                  ? 'মোবাইল বা পিসি থেকে যে কোনো ছবি আপলোড করুন (JPG, PNG)'
                  : 'Upload any photo from phone or computer'}
              </p>
            </div>

            {/* Photo Thumbnails Selector */}
            <div className="p-5 rounded-3xl bg-white border border-amber-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                  {language === 'bn' ? 'ফটো গ্যালারি সংকলন' : 'Photo Gallery'}
                </span>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {photos.length} {language === 'bn' ? 'টি ছবি' : 'photos'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
                {photos.map((item) => {
                  const isSelected = item.id === activePhotoId;
                  const isHero = item.id === heroPhotoId;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handlePhotoSelect(item)}
                      className={`relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-200 group ${
                        isSelected
                          ? 'border-amber-500 shadow-md ring-2 ring-amber-400/30 scale-[1.02]'
                          : 'border-stone-200 hover:border-amber-300 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      {isHero && (
                        <span className="absolute top-1 left-1 bg-amber-500 text-stone-950 p-1 rounded-full shadow-sm text-[9px]" title="হোম পেজের প্রধান ফটো">
                          <Star className="w-2.5 h-2.5 fill-current" />
                        </span>
                      )}
                      {isSelected && (
                        <div className="absolute inset-0 bg-amber-500/20 border-2 border-amber-400 pointer-events-none rounded-2xl" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action: Set as Home Hero button */}
              <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    onSetAsHero(activePhotoId);
                    confetti({ particleCount: 70, spread: 60 });
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    currentPhoto.id === heroPhotoId
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 cursor-default'
                      : 'bg-stone-900 hover:bg-stone-800 text-amber-200 shadow-sm hover:shadow'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${currentPhoto.id === heroPhotoId ? 'fill-amber-600 text-amber-600' : 'text-amber-400'}`} />
                  <span>
                    {currentPhoto.id === heroPhotoId
                      ? language === 'bn'
                        ? 'হোম পেজের প্রধান ফটো হিসেবে সক্রিয়'
                        : 'Active as Home Hero'
                      : language === 'bn'
                      ? 'হোম পেজের প্রধান ফটো হিসেবে সেট করুন'
                      : 'Set as Home Hero'}
                  </span>
                </button>

                {photos.length > 2 && onDeletePhoto && currentPhoto.id !== 'photo-tareq-1' && currentPhoto.id !== 'photo-tareq-2' && (
                  <button
                    onClick={() => onDeletePhoto(currentPhoto.id)}
                    className="py-1.5 px-3 rounded-xl text-xs text-rose-600 hover:bg-rose-50 flex items-center justify-center gap-1.5 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'ছবিটি মুছুন' : 'Delete photo'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* AI Prompt Custom Request box */}
            <div className="p-5 rounded-3xl bg-white border border-amber-200/80 shadow-sm space-y-3">
              <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'bn' ? 'এআই নির্দেশ বা বিশেষ অনুরোধ' : 'Custom AI Prompt'}</span>
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder={
                  language === 'bn'
                    ? 'যেমন: ব্যাংকের লোগো ফ্রেম, সোনালী আভা বৃদ্ধি করুন অথবা বিশেষ ক্যাপশন তৈরি করুন...'
                    : 'e.g. Add subtle warm gold lighting, generate a leadership quote...'
                }
                rows={2}
                className="w-full text-xs p-3 rounded-xl bg-amber-50/50 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400/50 text-stone-800 placeholder:text-stone-400 resize-none font-bangla"
              />

              <button
                onClick={handleAIModifier}
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-2 disabled:opacity-60 active:scale-98"
              >
                <Sparkles className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                <span>
                  {isProcessing
                    ? language === 'bn'
                      ? 'এআই ডিজাইন প্রস্তুত করছে...'
                      : 'AI Enhancing Design...'
                    : language === 'bn'
                    ? '✨ এআই দিয়ে মডিফাই ও স্টাইল করুন'
                    : '✨ AI Modify & Restyle'}
                </span>
              </button>
            </div>
          </div>

          {/* Center Column: Live Photo Showcase Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              ref={cardPreviewRef}
              className="w-full max-w-sm rounded-[32px] p-6 bg-gradient-to-b from-stone-900 via-stone-950 to-amber-950 text-white shadow-2xl border-2 border-amber-400/40 relative overflow-hidden transition-all duration-300"
            >
              {/* Gold light corner glow */}
              <div
                className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle, rgba(245, 158, 11, ${goldGlow / 100}) 0%, transparent 70%)`,
                }}
              />
              <div
                className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full blur-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle, rgba(251, 191, 36, ${(goldGlow * 0.7) / 100}) 0%, transparent 70%)`,
                }}
              />

              {/* Top Badge */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm backdrop-blur-sm">
                  {currentPhoto.badge}
                </span>
                <span className="text-[11px] text-amber-200/60 font-mono">
                  {currentPhoto.shape.toUpperCase()}
                </span>
              </div>

              {/* Photo with Cutout & Filters applied */}
              <div className="relative mx-auto my-2 flex items-center justify-center">
                {/* Exterior golden glow ring */}
                <div
                  className={`w-64 h-72 p-1.5 transition-all duration-300 ${getShapeClasses(currentPhoto.shape)}`}
                  style={{
                    background: `linear-gradient(135deg, #fde68a, #d97706, #fbbf24)`,
                    boxShadow: `0 0 ${goldGlow / 3}px rgba(245, 158, 11, ${goldGlow / 100})`,
                  }}
                >
                  <div className={`w-full h-full overflow-hidden bg-stone-900 ${getShapeClasses(currentPhoto.shape)}`}>
                    <img
                      src={currentPhoto.url}
                      alt={currentPhoto.title}
                      className="w-full h-full object-cover transition duration-300"
                      style={{
                        filter: `brightness(${brightness}%) contrast(${contrast}%) sepia(${warmth}%)`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Meta & AI Generated Text */}
              <div className="mt-5 text-center relative z-10 space-y-2">
                <h3 className="font-extrabold text-lg text-amber-200 tracking-wide font-bangla">
                  {currentPhoto.bengaliTitle || 'মোঃ তারেক — পল্লী সঞ্চয় ব্যাংক কর্মকর্তা'}
                </h3>
                <p className="text-xs text-amber-100/70 font-sans tracking-wide">
                  {currentPhoto.title}
                </p>

                <p className="text-xs text-stone-300 leading-relaxed font-bangla pt-1 px-2 border-t border-amber-500/20">
                  {currentPhoto.caption}
                </p>

                {currentPhoto.quote && (
                  <p className="text-[11px] italic text-amber-300/80 font-bangla pt-1">
                    {currentPhoto.quote}
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                  {currentPhoto.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-amber-200/90 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Customization & Cutouts & Presets (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Cutout Shapes ("বিভিন্ন ধরনের কাটিন") */}
            <div className="p-5 rounded-3xl bg-white border border-amber-200/80 shadow-sm">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'bn' ? 'কাটআউট ফ্রেম ডিজাইন' : 'Cutout Shapes'}</span>
              </span>

              <div className="grid grid-cols-2 gap-2">
                {SHAPES.map((shape) => {
                  const isActive = currentPhoto.shape === shape.id;
                  return (
                    <button
                      key={shape.id}
                      onClick={() => handleShapeChange(shape.id)}
                      className={`p-2.5 rounded-2xl text-left border transition flex flex-col items-center justify-center gap-1 text-center ${
                        isActive
                          ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm ring-1 ring-amber-400 font-bold'
                          : 'border-stone-200 hover:border-amber-300 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <span className="text-xl">{shape.icon}</span>
                      <span className="text-[11px] leading-tight font-bangla">
                        {language === 'bn' ? shape.labelBn.split(' ')[0] : shape.labelEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Style Presets ("ডিজাইন ও ভাইব") */}
            <div className="p-5 rounded-3xl bg-white border border-amber-200/80 shadow-sm">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                <Palette className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'bn' ? 'ডিজাইন প্রিসেট' : 'Style Presets'}</span>
              </span>

              <div className="space-y-2">
                {STYLES.map((style) => {
                  const isActive = currentPhoto.stylePreset === style.id;
                  return (
                    <div
                      key={style.id}
                      onClick={() => handleStyleChange(style.id)}
                      className={`p-2.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                        isActive
                          ? 'border-amber-500 bg-amber-50/80 shadow-sm'
                          : 'border-stone-200 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${style.color}`} />
                        <div>
                          <p className="text-xs font-bold text-stone-800 font-bangla">
                            {language === 'bn' ? style.labelBn : style.labelEn}
                          </p>
                          <p className="text-[10px] text-stone-500 font-bangla leading-tight">
                            {style.descBn}
                          </p>
                        </div>
                      </div>
                      {isActive && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Manual Light Gold Slider Controls */}
            <div className="p-5 rounded-3xl bg-white border border-amber-200/80 shadow-sm">
              <div
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-between cursor-pointer"
              >
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-600" />
                  <span>{language === 'bn' ? 'গোল্ড লাইট ফিল্টার' : 'Light Controls'}</span>
                </span>
                <span className="text-[11px] text-amber-700 font-semibold">
                  {showFilters ? 'সংকোচন' : 'বিস্তারিত'}
                </span>
              </div>

              {showFilters && (
                <div className="mt-4 space-y-3 pt-3 border-t border-stone-100">
                  {/* Gold Glow */}
                  <div>
                    <div className="flex justify-between text-[11px] text-stone-600 mb-1">
                      <span>গোল্ডেন গ্লো আভা:</span>
                      <span className="font-bold text-amber-700">{goldGlow}%</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="100"
                      value={goldGlow}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setGoldGlow(val);
                        applyLiveFilters({ goldGlowIntensity: val });
                      }}
                      className="w-full accent-amber-500 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Brightness */}
                  <div>
                    <div className="flex justify-between text-[11px] text-stone-600 mb-1">
                      <span>উজ্জ্বলতা (Brightness):</span>
                      <span className="font-bold text-amber-700">{brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="90"
                      max="125"
                      value={brightness}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setBrightness(val);
                        applyLiveFilters({ brightness: val });
                      }}
                      className="w-full accent-amber-500 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Contrast */}
                  <div>
                    <div className="flex justify-between text-[11px] text-stone-600 mb-1">
                      <span>কনট্রাস্ট (Contrast):</span>
                      <span className="font-bold text-amber-700">{contrast}%</span>
                    </div>
                    <input
                      type="range"
                      min="90"
                      max="125"
                      value={contrast}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setContrast(val);
                        applyLiveFilters({ contrast: val });
                      }}
                      className="w-full accent-amber-500 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Warmth */}
                  <div>
                    <div className="flex justify-between text-[11px] text-stone-600 mb-1">
                      <span>উষ্ণতা (Warmth):</span>
                      <span className="font-bold text-amber-700">{warmth}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="35"
                      value={warmth}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setWarmth(val);
                        applyLiveFilters({ warmth: val });
                      }}
                      className="w-full accent-amber-500 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
