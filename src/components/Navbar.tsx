import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import {
  Menu,
  X,
  Globe,
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Code2,
  Phone,
  Home,
  KeyRound,
  ShieldAlert,
  QrCode,
} from 'lucide-react';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  activeSection: string;
  onSelectSection: (section: string) => void;
  onOpenAdmin: () => void;
  onOpenQR?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  activeSection,
  onSelectSection,
  onOpenAdmin,
  onOpenQR,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', labelBn: 'হোম', labelEn: 'Home', icon: Home },
    { id: 'about', labelBn: 'আমার সম্পর্কে', labelEn: 'About Me', icon: User },
    { id: 'education', labelBn: 'শিক্ষা', labelEn: 'Education', icon: GraduationCap },
    { id: 'work', labelBn: 'বর্তমান কাজ', labelEn: 'Current Work', icon: Briefcase },
    { id: 'projects', labelBn: 'দক্ষতা ও প্রজেক্ট', labelEn: 'Projects', icon: Code2 },
    { id: 'ai-studio', labelBn: 'এআই ফটো স্টুডিও', labelEn: 'AI Studio', icon: Sparkles, highlight: true },
    { id: 'contact', labelBn: 'যোগাযোগ', labelEn: 'Contact', icon: Phone },
  ];

  const handleNavClick = (id: string) => {
    onSelectSection(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-200/70'
            : 'bg-white/90 backdrop-blur-md border-b border-amber-200/50 shadow-2xs'
        }`}
      >
        {/* Top Header Row: Brand Logo & Right Action Utilities */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center justify-between">
            {/* Brand Logo - Click to go Home */}
            <button
              type="button"
              className="flex items-center gap-2.5 group text-left transition active:scale-98"
              onClick={() => handleNavClick('hero')}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:shadow-amber-500/40 border border-amber-300 transition duration-300">
                <span className="font-extrabold text-amber-950 text-xs sm:text-sm tracking-wider font-serif-gold">MT</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-stone-900 text-sm sm:text-base leading-tight tracking-tight font-bangla">
                  {language === 'bn' ? 'মোঃ তারেক' : 'MD Tareq'}
                </span>
                <span className="text-[10px] text-amber-700 font-medium font-sans tracking-wide">
                  {language === 'bn' ? 'পল্লী সঞ্চয় ব্যাংক কর্মকর্তা' : 'Palli Sanchay Bank'}
                </span>
              </div>
            </button>

            {/* Right Actions: QR, Admin, PWA Install & Language */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* QR Code Quick Button */}
              {onOpenQR && (
                <button
                  onClick={onOpenQR}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300/90 shadow-2xs transition active:scale-95 group"
                  title={language === 'bn' ? 'মোবাইলে সহজে ভিজিট করতে QR কোড' : 'Scan QR Code to Visit App'}
                >
                  <QrCode className="w-3.5 h-3.5 text-amber-800 group-hover:scale-110 transition-transform" />
                  <span className="font-bangla">{language === 'bn' ? 'QR কোড' : 'App QR'}</span>
                </button>
              )}

              {/* Admin Button */}
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold text-amber-300 bg-stone-900 hover:bg-stone-800 border border-amber-400/50 shadow-sm transition active:scale-95 group"
                title={language === 'bn' ? 'অ্যাডমিন প্যানেল (লিখা ও অপশন মুছুন)' : 'Admin Panel'}
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span className="font-bangla">{language === 'bn' ? 'অ্যাডমিন' : 'Admin'}</span>
              </button>

              {/* PWA Install Button */}
              <PWAInstallButton variant="nav" language={language} />

              {/* Language Switch */}
              <button
                onClick={onToggleLanguage}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 transition"
                title="Switch Language (বাংলা / English)"
              >
                <Globe className="w-3.5 h-3.5 text-amber-600" />
                <span className="font-semibold">{language === 'bn' ? 'EN' : 'বাং'}</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-1.5 sm:p-2 rounded-xl text-stone-700 hover:text-stone-950 hover:bg-amber-50 transition"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Sub-bar Menu: Compact Menu Items Below Topbar */}
        <div className="border-t border-amber-200/60 bg-gradient-to-r from-amber-50/95 via-white/95 to-amber-50/95 backdrop-blur-md px-2 sm:px-6 py-1.5 shadow-2xs">
          <div className="max-w-7xl mx-auto flex items-center justify-start md:justify-center gap-1 sm:gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 font-bangla flex items-center gap-1.5 shrink-0 whitespace-nowrap active:scale-95 ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-extrabold shadow-sm border border-amber-400 scale-[1.02]'
                      : 'bg-white hover:bg-amber-100/90 text-stone-700 hover:text-amber-950 border border-amber-200/60 shadow-2xs'
                  }`}
                >
                  <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isActive ? 'text-stone-950' : item.highlight ? 'text-amber-600' : 'text-amber-700'}`} />
                  <span>{language === 'bn' ? item.labelBn : item.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 xl:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-lg rounded-3xl p-5 shadow-2xl border border-amber-200 animate-fadeIn space-y-2">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold transition text-left active:scale-98 ${
                      item.highlight
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                        : isActive
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                        : 'text-stone-700 hover:bg-amber-50 hover:text-amber-900'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-stone-950' : item.highlight ? 'text-amber-600' : 'text-stone-500'}`} />
                    <span className="font-bangla">{language === 'bn' ? item.labelBn : item.labelEn}</span>
                  </button>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-stone-100 space-y-2">
              {onOpenQR && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQR();
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                >
                  <QrCode className="w-4 h-4 text-stone-950" />
                  <span className="font-bangla">
                    {language === 'bn' ? '📱 অ্যাপ ভিজিট QR কোড' : '📱 Visit App via QR Code'}
                  </span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-3 px-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95"
              >
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span className="font-bangla">
                  {language === 'bn' ? 'অ্যাডমিন অপশন (লিখা ও অপশন মুছুন)' : 'Admin Options'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
