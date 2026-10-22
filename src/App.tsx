import React, { useState, useEffect } from 'react';
import {
  PhotoItem,
  Language,
  ProfileInfo,
  WorkExperience,
  EducationItem,
  WebProject,
  SkillCategoryItem,
  SectionVisibility,
} from './types';
import {
  initialPhotos,
  initialProfileInfo,
  initialWorkExperience,
  initialEducationList,
  initialWebProjectsList,
  initialSkillsData,
  initialSectionVisibility,
} from './data/portfolioData';
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
import { AdminModal } from './components/AdminModal';
import { CVBuilderModal } from './components/CVBuilderModal';
import { QRCodeModal } from './components/QRCodeModal';
import { KeyRound, QrCode } from 'lucide-react';

const STORAGE_KEY_PHOTOS = 'md_tareq_portfolio_photos';
const STORAGE_KEY_HERO_ID = 'md_tareq_portfolio_hero_photo_id';
const STORAGE_KEY_PROFILE = 'md_tareq_portfolio_profile';
const STORAGE_KEY_WORK = 'md_tareq_portfolio_work';
const STORAGE_KEY_EDUCATION = 'md_tareq_portfolio_education';
const STORAGE_KEY_PROJECTS = 'md_tareq_portfolio_projects';
const STORAGE_KEY_SKILLS = 'md_tareq_portfolio_skills';
const STORAGE_KEY_SECTIONS = 'md_tareq_portfolio_sections';

export default function App() {
  const [language, setLanguage] = useState<Language>('bn');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false);
  const [isQROpen, setIsQROpen] = useState<boolean>(false);

  // Profile State
  const [profile, setProfile] = useState<ProfileInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialProfileInfo;
  });

  // Work State
  const [work, setWork] = useState<WorkExperience>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WORK);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialWorkExperience;
  });

  // Education State
  const [education, setEducation] = useState<EducationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_EDUCATION);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialEducationList;
  });

  // Projects State
  const [projects, setProjects] = useState<WebProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialWebProjectsList;
  });

  // Skills State
  const [skills, setSkills] = useState<SkillCategoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SKILLS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialSkillsData;
  });

  // Sections Visibility State
  const [sections, setSections] = useState<SectionVisibility>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SECTIONS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialSectionVisibility;
  });

  // Photos State
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PHOTOS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return initialPhotos;
  });

  const [heroPhotoId, setHeroPhotoId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HERO_ID);
      if (saved) return saved;
    } catch (e) {
      console.error(e);
    }
    return initialPhotos[0].id;
  });

  const [activePhotoId, setActivePhotoId] = useState<string>(heroPhotoId);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_WORK, JSON.stringify(work));
  }, [work]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_EDUCATION, JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SKILLS, JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SECTIONS, JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PHOTOS, JSON.stringify(photos));
  }, [photos]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_HERO_ID, heroPhotoId);
  }, [heroPhotoId]);

  // Section observer on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['hero', 'about', 'education', 'work', 'projects', 'ai-studio', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sectionIds) {
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

  // Master Actions
  const handleResetToDefaults = () => {
    setProfile(initialProfileInfo);
    setWork(initialWorkExperience);
    setEducation(initialEducationList);
    setProjects(initialWebProjectsList);
    setSkills(initialSkillsData);
    setSections(initialSectionVisibility);
    setPhotos(initialPhotos);
    setHeroPhotoId(initialPhotos[0].id);
    setActivePhotoId(initialPhotos[0].id);
  };

  const handleClearAllTexts = () => {
    setProfile({
      ...profile,
      bioBn: '',
      bioEn: '',
      quoteBn: '',
      quoteEn: '',
      titleBn: '',
      titleEn: '',
    });
    setWork({
      ...work,
      descriptionBn: '',
      descriptionEn: '',
      responsibilitiesBn: [],
      responsibilitiesEn: [],
    });
  };

  const SECTIONS_ORDER = [
    { id: 'hero', labelBn: 'হোম', labelEn: 'Home' },
    { id: 'about', labelBn: 'আমার সম্পর্কে', labelEn: 'About Me' },
    { id: 'education', labelBn: 'শিক্ষা', labelEn: 'Education' },
    { id: 'work', labelBn: 'বর্তমান কাজ', labelEn: 'Current Work' },
    { id: 'projects', labelBn: 'দক্ষতা ও প্রজেক্ট', labelEn: 'Projects' },
    { id: 'ai-studio', labelBn: 'এআই ফটো স্টুডিও', labelEn: 'AI Studio' },
    { id: 'contact', labelBn: 'যোগাযোগ', labelEn: 'Contact' },
  ];

  const currentIdx = SECTIONS_ORDER.findIndex((s) => s.id === activeSection);
  const prevSection = currentIdx > 0 ? SECTIONS_ORDER[currentIdx - 1] : null;
  const nextSection = currentIdx < SECTIONS_ORDER.length - 1 ? SECTIONS_ORDER[currentIdx + 1] : null;

  const heroPhoto = photos.find((p) => p.id === heroPhotoId) || photos[0];

  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Navigation Header with Compact Sub-bar Menu */}
      <Navbar
        language={language}
        onToggleLanguage={() => setLanguage((l) => (l === 'bn' ? 'en' : 'bn'))}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenQR={() => setIsQROpen(true)}
      />

      {/* Main Single Page View Container - Shows ONLY the Selected Menu Page */}
      <main className="min-h-[82vh] transition-all duration-300">
        {/* 1. Home / Hero Section */}
        {activeSection === 'hero' && (
          <div className="animate-fadeIn">
            <Hero
              heroPhoto={heroPhoto}
              allPhotos={photos}
              onSelectPhoto={(id) => {
                setHeroPhotoId(id);
                setActivePhotoId(id);
              }}
              language={language}
              profile={profile}
              onOpenCV={() => setIsCVModalOpen(true)}
              onOpenQR={() => setIsQROpen(true)}
              onSelectSection={handleSelectSection}
            />
          </div>
        )}

        {/* 2. About Me Section */}
        {activeSection === 'about' && (
          <div className="pt-24 sm:pt-28 animate-fadeIn">
            <About language={language} profile={profile} />
          </div>
        )}

        {/* 3. Education Section (MBA in Accounting, NU) */}
        {activeSection === 'education' && (
          <div className="pt-24 sm:pt-28 animate-fadeIn">
            <Education
              language={language}
              educationList={education}
              onOpenCVBuilder={() => setIsCVModalOpen(true)}
              onUpdateEducation={setEducation}
            />
          </div>
        )}

        {/* 4. Current Work Section (Palli Sanchay Bank, Field Assistant Officer) */}
        {activeSection === 'work' && (
          <div className="pt-24 sm:pt-28 animate-fadeIn">
            <CurrentWork language={language} work={work} />
          </div>
        )}

        {/* 5. Web Passion, Projects & Skills */}
        {activeSection === 'projects' && (
          <div className="pt-24 sm:pt-28 animate-fadeIn">
            <ProjectsAndSkills language={language} projects={projects} skills={skills} />
          </div>
        )}

        {/* 6. AI Photo Studio & Modifier */}
        {activeSection === 'ai-studio' && (
          <div className="pt-24 sm:pt-28 animate-fadeIn">
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
          </div>
        )}

        {/* 7. Contact Section */}
        {activeSection === 'contact' && (
          <div className="pt-24 sm:pt-28 animate-fadeIn">
            <Contact language={language} profile={profile} />
          </div>
        )}

        {/* Bottom Page Navigation Buttons: Previous / Next Section */}
        <div className="max-w-5xl mx-auto px-4 mt-12 mb-8 pt-6 border-t border-amber-200/80 flex items-center justify-between gap-3 font-bangla text-xs">
          {prevSection ? (
            <button
              type="button"
              onClick={() => handleSelectSection(prevSection.id)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-amber-100/90 text-stone-700 hover:text-stone-950 border border-stone-200/90 shadow-2xs transition active:scale-95 group font-bold"
            >
              <span className="text-amber-600 group-hover:-translate-x-0.5 transition-transform">←</span>
              <span>{language === 'bn' ? `পূর্ববর্তী: ${prevSection.labelBn}` : `Previous: ${prevSection.labelEn}`}</span>
            </button>
          ) : <div />}

          {nextSection ? (
            <button
              type="button"
              onClick={() => handleSelectSection(nextSection.id)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold shadow-xs border border-amber-400 transition active:scale-95 group"
            >
              <span>{language === 'bn' ? `পরবর্তী: ${nextSection.labelBn}` : `Next: ${nextSection.labelEn}`}</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
          ) : <div />}
        </div>
      </main>

      {/* Footer */}
      <Footer
        language={language}
        profile={profile}
        onOpenQR={() => setIsQROpen(true)}
        onSelectSection={handleSelectSection}
      />

      {/* Mobile Auto-Install Prompt Banner */}
      <PWAInstallButton variant="banner" language={language} />

      {/* Offline Status Toast Indicator */}
      <OfflineIndicator language={language} />

      {/* Floating QR Code Quick Scan Button */}
      <button
        onClick={() => setIsQROpen(true)}
        className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 border-2 border-amber-300 shadow-xl hover:shadow-2xl transition duration-300 active:scale-95 group flex items-center gap-2"
        title={language === 'bn' ? 'মোবাইলে সহজে ভিজিট করতে QR কোড' : 'Scan QR Code'}
        aria-label="Scan QR Code to Visit App"
      >
        <QrCode className="w-5 h-5 text-stone-950 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline text-xs font-bold text-stone-950 font-bangla pr-1">
          {language === 'bn' ? 'QR কোড' : 'App QR'}
        </span>
      </button>

      {/* Floating Quick Admin Trigger Button */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-amber-300 border-2 border-amber-400 shadow-xl hover:shadow-2xl transition duration-300 active:scale-95 group flex items-center gap-2"
        title={language === 'bn' ? 'অ্যাডমিন প্যানেল (লিখা ও অপশন মুছুন)' : 'Admin Options'}
        aria-label="Open Admin Control Panel"
      >
        <KeyRound className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-xs font-bold text-amber-200 font-bangla pr-1">
          {language === 'bn' ? 'অ্যাডমিন' : 'Admin'}
        </span>
      </button>

      {/* Admin Control Center Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        language={language}
        profile={profile}
        onUpdateProfile={setProfile}
        work={work}
        onUpdateWork={setWork}
        education={education}
        onUpdateEducation={setEducation}
        projects={projects}
        onUpdateProjects={setProjects}
        skills={skills}
        onUpdateSkills={setSkills}
        photos={photos}
        onUpdatePhotos={setPhotos}
        sections={sections}
        onUpdateSections={setSections}
        onResetToDefaults={handleResetToDefaults}
        onClearAllTexts={handleClearAllTexts}
      />

      {/* Comprehensive Professional CV Builder & PDF Download Modal */}
      <CVBuilderModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        language={language}
        profile={profile}
        work={work}
        educationList={education}
        userPhotoUrl={heroPhoto?.url || '/assets/aistudio/5318_cdace00b.jpg'}
      />

      {/* App QR Code Scanner & Share Modal */}
      <QRCodeModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        language={language}
      />
    </div>
  );
}
