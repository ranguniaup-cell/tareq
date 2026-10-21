import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import { Menu, X, Globe, Sparkles, User, Briefcase, GraduationCap, Code2, Phone, Home } from 'lucide-react';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  activeSection,
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-amber-200/60 py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#hero"
              className="flex items-center gap-2.5 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:shadow-amber-500/40 border border-amber-300 transition duration-300">
                <span className="font-extrabold text-amber-950 text-sm tracking-wider font-serif-gold">MT</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-stone-900 text-base leading-tight tracking-tight font-bangla">
                  {language === 'bn' ? 'মোঃ তারেক' : 'MD Tareq'}
                </span>
                <span className="text-[10px] text-amber-700 font-medium font-sans tracking-wide">
                  {language === 'bn' ? 'পল্লী সঞ্চয় ব্যাংক কর্মকর্তা' : 'Palli Sanchay Bank'}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 font-bangla flex items-center gap-1.5 ${
                      item.highlight
                        ? 'bg-amber-100/90 text-amber-900 hover:bg-amber-200 border border-amber-300/80 shadow-xs'
                        : isActive
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-xs'
                        : 'text-stone-700 hover:text-amber-800 hover:bg-amber-50/80'
                    }`}
                  >
                    {item.highlight && <Sparkles className="w-3 h-3 text-amber-600" />}
                    <span>{language === 'bn' ? item.labelBn : item.labelEn}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right Actions: PWA Install & Language */}
            <div className="flex items-center gap-2 sm:gap-3">
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
                className="lg:hidden p-2 rounded-xl text-stone-700 hover:text-stone-950 hover:bg-amber-50 transition"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-lg rounded-3xl p-5 shadow-2xl border border-amber-200 animate-fadeIn">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold transition ${
                      item.highlight
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                        : isActive
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'text-stone-700 hover:bg-amber-50 hover:text-amber-900'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${item.highlight ? 'text-amber-600' : 'text-stone-500'}`} />
                    <span className="font-bangla">{language === 'bn' ? item.labelBn : item.labelEn}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
