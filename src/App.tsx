import React, { useState, useEffect } from 'react';
import { PhotoItem, Language } from './types';
import { initialPhotos } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { CurrentWork } from './components/CurrentWork';
import { ProjectsAndSkills } from './components/ProjectsAndSkills';
import { AIPhotoStudio } from './components/AIPhotoStudio';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';

const LOCAL_STORAGE_PHOTOS_KEY = 'md_tareq_portfolio_photos';
const LOCAL_STORAGE_HERO_KEY = 'md_tareq_portfolio_hero_photo_id';

export default function App() {
  const [language, setLanguage] = useState<Language>('bn');
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PHOTOS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading saved photos from localStorage', e);
    }
    return initialPhotos;
  });

  const [heroPhotoId, setHeroPhotoId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_HERO_KEY);
      if (saved) return saved;
    } catch (e) {
      console.error(e);
    }
    return initialPhotos[0].id;
  });

  const [activePhotoId, setActivePhotoId] = useState<string>(heroPhotoId);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Save photos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PHOTOS_KEY, JSON.stringify(photos));
    } catch (e) {
      console.error('Error persisting photos', e);
    }
  }, [photos]);

  // Save heroPhotoId to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_HERO_KEY, heroPhotoId);
    } catch (e) {
      console.error(e);
    }
  }, [heroPhotoId]);

  // Section observer on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'education', 'work', 'projects', 'ai-studio', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUpdatePhoto = (updated: PhotoItem) => {
    setPhotos((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleAddPhoto = (newPhoto: PhotoItem) => {
    setPhotos((prev) => [newPhoto, ...prev]);
    setActivePhotoId(newPhoto.id);
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos((prev) => {
      const filtered = prev.filter((p) => p.id !== id);
      if (filtered.length > 0) {
        if (activePhotoId === id) setActivePhotoId(filtered[0].id);
        if (heroPhotoId === id) setHeroPhotoId(filtered[0].id);
      }
      return filtered;
    });
  };

  const handleSetAsHero = (id: string) => {
    setHeroPhotoId(id);
    setPhotos((prev) =>
      prev.map((p) => ({
        ...p,
        isFeaturedOnHome: p.id === id,
      }))
    );
  };

  const heroPhoto = photos.find((p) => p.id === heroPhotoId) || photos[0];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Navigation Header */}
      <Navbar
        language={language}
        onToggleLanguage={() => setLanguage((l) => (l === 'bn' ? 'en' : 'bn'))}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Light Gold Aesthetic and Live Cutout Frame */}
        <Hero
          heroPhoto={heroPhoto}
          allPhotos={photos}
          onSelectPhoto={(id) => {
            setHeroPhotoId(id);
            setActivePhotoId(id);
          }}
          language={language}
        />

        {/* About Section */}
        <About language={language} />

        {/* Education Section (MBA in Accounting, NU) */}
        <Education language={language} />

        {/* Current Work Section (Palli Sanchay Bank, Field Assistant Officer) */}
        <CurrentWork language={language} />

        {/* Web Passion, Projects & Skills (with interactive loan calculator widget) */}
        <ProjectsAndSkills language={language} />

        {/* AI Photo Studio & Modifier (Upload, Cutouts, Framing, Gemini AI Restyle, Live Home sync) */}
        <AIPhotoStudio
          photos={photos}
          activePhotoId={activePhotoId}
          onSelectPhoto={(id) => setActivePhotoId(id)}
          onUpdatePhoto={handleUpdatePhoto}
          onAddPhoto={handleAddPhoto}
          onDeletePhoto={handleDeletePhoto}
          onSetAsHero={handleSetAsHero}
          heroPhotoId={heroPhotoId}
          language={language}
        />

        {/* Contact Section (Email, WhatsApp, Phone, vCard download, form) */}
        <Contact language={language} />
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Mobile Auto-Install Prompt Banner */}
      <PWAInstallButton variant="banner" language={language} />

      {/* Offline Status Toast Indicator */}
      <OfflineIndicator language={language} />
    </div>
  );
}
