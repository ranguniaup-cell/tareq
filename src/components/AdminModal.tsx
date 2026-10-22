import React, { useState, useEffect } from 'react';
import {
  ProfileInfo,
  WorkExperience,
  EducationItem,
  WebProject,
  SkillCategoryItem,
  PhotoItem,
  SectionVisibility,
  Language,
  SocialLinks,
} from '../types';
import {
  X,
  Trash2,
  Plus,
  RefreshCw,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
  Lock,
  Unlock,
  Sliders,
  FileText,
  Briefcase,
  GraduationCap,
  Code2,
  Layers,
  Image as ImageIcon,
  KeyRound,
  ShieldCheck,
  LogOut,
  Share2,
  Facebook,
  Linkedin,
  Github,
  Twitter,
  Youtube,
  Globe,
  MessageSquare,
  Edit3,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EducationModal } from './EducationModal';

const STORAGE_ADMIN_PASSWORD_KEY = 'md_tareq_admin_password';
const DEFAULT_PASSWORD = 'tareq123';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;

  // States
  profile: ProfileInfo;
  onUpdateProfile: (profile: ProfileInfo) => void;

  work: WorkExperience;
  onUpdateWork: (work: WorkExperience) => void;

  education: EducationItem[];
  onUpdateEducation: (education: EducationItem[]) => void;

  projects: WebProject[];
  onUpdateProjects: (projects: WebProject[]) => void;

  skills: SkillCategoryItem[];
  onUpdateSkills: (skills: SkillCategoryItem[]) => void;

  photos: PhotoItem[];
  onUpdatePhotos: (photos: PhotoItem[]) => void;

  sections: SectionVisibility;
  onUpdateSections: (sections: SectionVisibility) => void;

  onResetToDefaults: () => void;
  onClearAllTexts: () => void;
}

type AdminTab =
  | 'sections'
  | 'profile'
  | 'social'
  | 'work'
  | 'education'
  | 'projects'
  | 'skills'
  | 'photos'
  | 'password'
  | 'master';

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  language = 'bn',
  profile,
  onUpdateProfile,
  work,
  onUpdateWork,
  education,
  onUpdateEducation,
  projects,
  onUpdateProjects,
  skills,
  onUpdateSkills,
  photos,
  onUpdatePhotos,
  sections,
  onUpdateSections,
  onResetToDefaults,
  onClearAllTexts,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('sections');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [notification, setNotification] = useState<string>('');

  // Password Change fields
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [changePassError, setChangePassError] = useState<string>('');

  // Work Responsibility inline input
  const [newResponsibilityInput, setNewResponsibilityInput] = useState<string>('');

  // Project form states
  const [isAddingProject, setIsAddingProject] = useState<boolean>(false);
  const [newProjectTitle, setNewProjectTitle] = useState<string>('');
  const [newProjectCategory, setNewProjectCategory] = useState<string>('ওয়েব অ্যাপ্লিকেশন');
  const [newProjectDesc, setNewProjectDesc] = useState<string>('');
  const [newProjectDemo, setNewProjectDemo] = useState<string>('');

  // Skills input states
  const [activeAddSkillCatId, setActiveAddSkillCatId] = useState<string | null>(null);
  const [newSkillName, setNewSkillName] = useState<string>('');
  const [newSkillLevel, setNewSkillLevel] = useState<number>(85);

  // Education Modal & Edit Handlers states
  const [isEduModalOpen, setIsEduModalOpen] = useState(false);
  const [selectedEduItem, setSelectedEduItem] = useState<EducationItem | null>(null);
  const [selectedEduIndex, setSelectedEduIndex] = useState<number | null>(null);

  // Reset auth input on modal open
  useEffect(() => {
    if (isOpen) {
      setPasswordInput('');
      setAuthError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const getStoredPassword = (): string => {
    try {
      const stored = localStorage.getItem(STORAGE_ADMIN_PASSWORD_KEY);
      return stored || DEFAULT_PASSWORD;
    } catch {
      return DEFAULT_PASSWORD;
    }
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const correctPassword = getStoredPassword();

    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      setAuthError('');
      showToast(language === 'bn' ? 'লগইন সফল হয়েছে!' : 'Login successful!');
    } else {
      setAuthError(language === 'bn' ? 'ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।' : 'Incorrect password! Try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPass = getStoredPassword();

    if (oldPassword !== currentPass) {
      setChangePassError(language === 'bn' ? 'বর্তমান পাসওয়ার্ড সঠিক নয়।' : 'Current password incorrect.');
      return;
    }
    if (newPassword.length < 4) {
      setChangePassError(language === 'bn' ? 'নতুন পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।' : 'Password must be at least 4 chars.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setChangePassError(language === 'bn' ? 'নতুন পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মিলছে না।' : 'Passwords do not match.');
      return;
    }

    try {
      localStorage.setItem(STORAGE_ADMIN_PASSWORD_KEY, newPassword);
      setChangePassError('');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast(language === 'bn' ? 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!' : 'Password changed successfully!');
      confetti({ particleCount: 50, spread: 50 });
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Section toggle handler
  const handleToggleSection = (key: keyof SectionVisibility) => {
    const updated = { ...sections, [key]: !sections[key] };
    onUpdateSections(updated);
    showToast(language === 'bn' ? 'সেকশনের দৃশ্যমানতা পরিবর্তন করা হয়েছে' : 'Section visibility updated');
  };

  // Responsibilities delete
  const handleDeleteResponsibility = (index: number) => {
    const newBn = work.responsibilitiesBn.filter((_, i) => i !== index);
    const newEn = work.responsibilitiesEn.filter((_, i) => i !== index);
    onUpdateWork({
      ...work,
      responsibilitiesBn: newBn,
      responsibilitiesEn: newEn,
    });
    showToast(language === 'bn' ? 'দায়িত্বের বিবরণ মুছে ফেলা হয়েছে' : 'Responsibility deleted');
  };

  // Add responsibility
  const handleAddResponsibility = (textToAdd?: string) => {
    const text = textToAdd || newResponsibilityInput;
    if (text && text.trim()) {
      onUpdateWork({
        ...work,
        responsibilitiesBn: [...work.responsibilitiesBn, text.trim()],
        responsibilitiesEn: [...work.responsibilitiesEn, text.trim()],
      });
      setNewResponsibilityInput('');
      showToast(language === 'bn' ? 'নতুন দায়িত্ব যুক্ত হয়েছে' : 'New responsibility added');
    }
  };

  // Delete Stat
  const handleDeleteStat = (index: number) => {
    const newStats = work.stats.filter((_, i) => i !== index);
    onUpdateWork({ ...work, stats: newStats });
    showToast(language === 'bn' ? 'পরিসংখ্যান মুছে ফেলা হয়েছে' : 'Stat deleted');
  };

  // Education Modal & Edit Handlers
  const handleOpenAddEdu = () => {
    setSelectedEduItem(null);
    setSelectedEduIndex(null);
    setIsEduModalOpen(true);
  };

  const handleOpenEditEdu = (item: EducationItem, idx: number) => {
    setSelectedEduItem(item);
    setSelectedEduIndex(idx);
    setIsEduModalOpen(true);
  };

  const handleSaveEduModal = (savedItem: EducationItem, idx?: number | null) => {
    if (idx !== null && idx !== undefined && idx >= 0) {
      const updated = [...education];
      updated[idx] = savedItem;
      onUpdateEducation(updated);
      showToast(language === 'bn' ? 'ডিগ্রি সফলভাবে সম্পাদনা করা হয়েছে' : 'Degree updated');
    } else {
      onUpdateEducation([savedItem, ...education]);
      showToast(language === 'bn' ? 'নতুন ডিগ্রি যুক্ত হয়েছে' : 'New degree added');
    }
  };

  const handleDeleteEducation = (index: number) => {
    const newEdu = education.filter((_, i) => i !== index);
    onUpdateEducation(newEdu);
    showToast(language === 'bn' ? 'ডিগ্রি মুছে ফেলা হয়েছে' : 'Degree deleted');
  };

  // Social Links Update Handler
  const handleUpdateSocial = (field: keyof SocialLinks, val: string) => {
    const current = profile.socialLinks || {};
    const updated = { ...current, [field]: val };
    onUpdateProfile({ ...profile, socialLinks: updated });
    showToast(language === 'bn' ? 'সোশ্যাল লিংক আপডেট হয়েছে' : 'Social link updated');
  };

  // Projects Handlers (Edit, Add, Delete)
  const handleDeleteProject = (id: string) => {
    const newProj = projects.filter((p) => p.id !== id);
    onUpdateProjects(newProj);
    showToast(language === 'bn' ? 'প্রজেক্ট মুছে ফেলা হয়েছে' : 'Project deleted');
  };

  const handleSaveAddProject = () => {
    if (!newProjectTitle.trim()) {
      showToast(language === 'bn' ? '⚠️ অনুগ্রহ করে প্রজেক্টের নাম লিখুন' : '⚠️ Please enter project title');
      return;
    }

    const newProjItem: WebProject = {
      id: 'proj-' + Date.now(),
      titleBn: newProjectTitle.trim(),
      titleEn: newProjectTitle.trim(),
      categoryBn: newProjectCategory.trim() || 'ওয়েব অ্যাপ্লিকেশন',
      categoryEn: newProjectCategory.trim() || 'Web Application',
      descriptionBn: newProjectDesc.trim() || 'সৃজনশীল ডিজিটাল প্ল্যাটফর্ম ও ওয়েব ডিজাইন প্রজেক্ট।',
      descriptionEn: newProjectDesc.trim() || 'Creative digital platform and web design project.',
      tags: ['Web', 'Creative App', 'Portfolio'],
      demoUrl: newProjectDemo.trim() || undefined,
      iconName: 'Code2',
      isHobbyHighlight: true,
    };

    onUpdateProjects([newProjItem, ...projects]);
    setIsAddingProject(false);
    setNewProjectTitle('');
    setNewProjectDesc('');
    setNewProjectDemo('');
    showToast(language === 'bn' ? 'নতুন প্রজেক্ট যুক্ত হয়েছে' : 'New project added');
  };

  // Skills Handlers (Edit, Add, Delete)
  const handleAddSkillToCategory = (catId: string) => {
    if (!newSkillName.trim()) {
      showToast(language === 'bn' ? '⚠️ দক্ষতার নাম লিখুন' : '⚠️ Please enter skill name');
      return;
    }

    const updatedCats = skills.map((c) => {
      if (c.id === catId) {
        return {
          ...c,
          skills: [
            ...c.skills,
            {
              nameBn: newSkillName.trim(),
              nameEn: newSkillName.trim(),
              level: Math.min(100, Math.max(10, newSkillLevel || 85)),
            },
          ],
        };
      }
      return c;
    });
    onUpdateSkills(updatedCats);
    setNewSkillName('');
    setActiveAddSkillCatId(null);
    showToast(language === 'bn' ? 'নতুন দক্ষতা যোগ হয়েছে' : 'New skill added');
  };

  const handleDeleteSkill = (catId: string, skillIndex: number) => {
    const newCats = skills.map((cat) => {
      if (cat.id === catId) {
        return {
          ...cat,
          skills: cat.skills.filter((_, i) => i !== skillIndex),
        };
      }
      return cat;
    });
    onUpdateSkills(newCats);
    showToast(language === 'bn' ? 'দক্ষতা মুছে ফেলা হয়েছে' : 'Skill deleted');
  };

  const handleDeleteCategory = (catId: string) => {
    const newCats = skills.filter((c) => c.id !== catId);
    onUpdateSkills(newCats);
    showToast(language === 'bn' ? 'ক্যাটাগরি মুছে ফেলা হয়েছে' : 'Category deleted');
  };

  // Delete Photo
  const handleDeletePhoto = (id: string) => {
    if (photos.length <= 1) {
      showToast(language === 'bn' ? '⚠️ কমপক্ষে একটি ছবি থাকতে হবে!' : '⚠️ Must have at least one photo!');
      return;
    }
    const newPhotos = photos.filter((p) => p.id !== id);
    onUpdatePhotos(newPhotos);
    showToast(language === 'bn' ? 'ছবি মুছে ফেলা হয়েছে' : 'Photo deleted');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-5 font-bangla animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border-2 border-amber-300 flex flex-col overflow-hidden text-stone-800">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white flex items-center justify-between border-b border-amber-400/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-bold shadow-md">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-amber-200">
                {language === 'bn' ? 'অ্যাডমিন কন্ট্রোল প্যানেল' : 'Admin Control Center'}
              </h3>
              <p className="text-xs text-stone-300">
                {language === 'bn'
                  ? 'সকল ধরণের লিখা, অপশন, সেকশন ও ডাটা মুছে ফেলা বা পরিবর্তনের নিয়ন্ত্রণ'
                  : 'Manage, edit or delete any text, section, option, and media'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="py-1.5 px-3 rounded-xl bg-white/10 hover:bg-rose-500/20 text-stone-200 hover:text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition"
                title="লক করুন"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'লগআউট' : 'Lock'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {notification && (
          <div className="bg-amber-500 text-stone-950 font-bold text-xs py-2 px-4 text-center animate-pulse flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* IF NOT AUTHENTICATED: RENDER SECURE PASSWORD SCREEN */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-700 shadow-md">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="font-extrabold text-xl text-stone-900 font-bangla">
                {language === 'bn' ? 'অ্যাডমিন পাসওয়ার্ড লিখুন' : 'Enter Admin Password'}
              </h4>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed font-bangla">
                {language === 'bn'
                  ? 'সাইটের লিখা ও অপশন মুছে ফেলা বা পরিবর্তন করার জন্য পাসওয়ার্ড যাচাই আবশ্যক।'
                  : 'Password verification required to manage site content and options.'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-3.5">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setAuthError('');
                  }}
                  placeholder={language === 'bn' ? 'পাসওয়ার্ড দিন...' : 'Password...'}
                  className="w-full p-3.5 pr-12 rounded-2xl border-2 border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans text-stone-900 text-sm shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-3.5 p-1 text-stone-400 hover:text-stone-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <p className="text-xs font-bold text-rose-600 font-bangla animate-shake">
                  {authError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-extrabold text-sm shadow-md transition active:scale-98 flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>{language === 'bn' ? 'লগইন করুন' : 'Unlock & Login'}</span>
              </button>
            </form>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 w-full font-sans">
              💡 ডিফল্ট পাসওয়ার্ড (Default Password): <span className="font-extrabold text-amber-950 bg-amber-200/80 px-2 py-0.5 rounded">tareq123</span>
              <p className="text-[10px] text-stone-500 mt-1 font-bangla">
                (লগইন করার পর 'পাসওয়ার্ড পরিবর্তন' ট্যাব থেকে এটি বদলাতে পারবেন)
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Tab Navigation when Authenticated */}
            <div className="flex items-center gap-1.5 p-2 sm:p-3 bg-amber-50/70 border-b border-amber-200 overflow-x-auto text-xs font-bold scrollbar-none">
              <button
                onClick={() => setActiveTab('sections')}
                className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'sections'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:bg-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'সেকশন নিয়ন্ত্রণ' : 'Sections'}</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'profile'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:bg-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'প্রোফাইল ও বায়ো' : 'Profile'}</span>
              </button>

              <button
                onClick={() => setActiveTab('social')}
                className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'social'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:bg-white'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'সামাজিক যোগাযোগ' : 'Social Links'}</span>
              </button>

              <button
                onClick={() => setActiveTab('work')}
                className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'work'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:bg-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'পল্লী সঞ্চয় ব্যাংক' : 'Work'}</span>
              </button>

              <button
                onClick={() => setActiveTab('education')}
                className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'education'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:bg-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'শিক্ষা (MBA)' : 'Education'}</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'projects'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:bg-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'প্রজেক্ট ও শখ' : 'Projects'}</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'skills'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:bg-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'দক্ষতা' : 'Skills'}</span>
              </button>

              <button
                onClick={() => setActiveTab('photos')}
                className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'photos'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:bg-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ছবি ও গ্যালারি' : 'Photos'}</span>
              </button>

              <button
                onClick={() => setActiveTab('password')}
                className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'password'
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'text-stone-600 hover:bg-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'পাসওয়ার্ড পরিবর্তন' : 'Password'}</span>
              </button>

              <button
                onClick={() => setActiveTab('master')}
                className={`px-3 py-2 rounded-xl transition shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'master'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-rose-700 hover:bg-rose-50'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'মাস্টার রিসেট' : 'Master Reset'}</span>
              </button>
            </div>

            {/* Tab Content Body (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              
              {/* TAB: Sections Visibility */}
              {activeTab === 'sections' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                    <h4 className="font-extrabold text-sm text-stone-900 mb-1">
                      {language === 'bn' ? 'সেকশন অন/অফ বা মুছে ফেলার অপশন' : 'Section Visibility Controls'}
                    </h4>
                    <p className="text-xs text-stone-600">
                      {language === 'bn'
                        ? 'যেসব সেকশন সাইটে দেখাতে চান না, সেগুলো বন্ধ (Hide/Off) করে দিতে পারেন। বন্ধ করলে হোম পেজে সেই অংশটি দেখাবে না।'
                        : 'Toggle off any section to completely hide it from the portfolio.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { key: 'hero' as const, labelBn: '১. প্রধান পরিচিতি (Hero Section)', descBn: 'নাম, ছবি ও মূল হেডার' },
                      { key: 'about' as const, labelBn: '২. আমার সম্পর্কে (About Me)', descBn: 'ব্যক্তিগত বিবরণ ও মূল্যবোধ' },
                      { key: 'education' as const, labelBn: '৩. শিক্ষা ও ডিগ্রি (Education)', descBn: 'এমবিএ ও বিবিএস সার্টিফিকেট' },
                      { key: 'work' as const, labelBn: '৪. বর্তমান কাজ (Palli Sanchay Bank)', descBn: 'ব্যাংকিং দায়িত্ব ও পরিসংখ্যান' },
                      { key: 'projects' as const, labelBn: '৫. প্রজেক্ট ও শখ (Web Projects & Skills)', descBn: 'লোন ক্যালকুলেটর ও ওয়েবসাইট' },
                      { key: 'aiStudio' as const, labelBn: '৬. এআই ফটো স্টুডিও (AI Studio)', descBn: 'ছবি আপলোড ও কাটিন স্টুডিও' },
                      { key: 'contact' as const, labelBn: '৭. যোগাযোগ ফরম (Contact)', descBn: 'ইমেইল, ফোন ও মেসেজ ফরম' },
                    ].map((sec) => {
                      const isVisible = sections[sec.key];
                      return (
                        <div
                          key={sec.key}
                          className={`p-4 rounded-2xl border transition flex items-center justify-between ${
                            isVisible
                              ? 'border-amber-300 bg-white shadow-2xs'
                              : 'border-stone-200 bg-stone-50 opacity-60'
                          }`}
                        >
                          <div>
                            <p className="font-bold text-xs text-stone-900">{sec.labelBn}</p>
                            <p className="text-[11px] text-stone-500 mt-0.5">{sec.descBn}</p>
                          </div>

                          <button
                            onClick={() => handleToggleSection(sec.key)}
                            className={`p-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                              isVisible
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                            }`}
                          >
                            {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            <span>{isVisible ? (language === 'bn' ? 'সক্রিয়' : 'Visible') : (language === 'bn' ? 'লুকানো' : 'Hidden')}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB: Profile & Bio Editor */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-sm text-stone-900">
                      {language === 'bn' ? 'ব্যক্তিগত তথ্য ও পরিচিতি লিখা সম্পাদনা / মুছুন' : 'Edit or Clear Profile Information'}
                    </h4>
                    <button
                      onClick={() => {
                        onUpdateProfile({ ...profile, bioBn: '', bioEn: '', quoteBn: '', quoteEn: '' });
                        showToast(language === 'bn' ? 'বায়ো ফাঁকা করা হয়েছে' : 'Bio cleared');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold border border-rose-200 flex items-center gap-1.5 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'বায়ো মুছে ফাঁকা করুন' : 'Clear Bio'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">
                        {language === 'bn' ? 'নাম (বাংলা):' : 'Name (Bangla):'}
                      </label>
                      <input
                        type="text"
                        value={profile.nameBn}
                        onChange={(e) => onUpdateProfile({ ...profile, nameBn: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-400 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">
                        {language === 'bn' ? 'নাম (English):' : 'Name (English):'}
                      </label>
                      <input
                        type="text"
                        value={profile.nameEn}
                        onChange={(e) => onUpdateProfile({ ...profile, nameEn: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-400 font-bold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-stone-700 mb-1">
                        {language === 'bn' ? 'পদবী ও পরিচয় হেডলাইন:' : 'Designation Headline:'}
                      </label>
                      <input
                        type="text"
                        value={profile.titleBn}
                        onChange={(e) => onUpdateProfile({ ...profile, titleBn: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="block font-bold text-stone-700">
                          {language === 'bn' ? 'আমার সম্পর্কে (বায়ো প্যারাগ্রাফ):' : 'About Me Bio Paragraph:'}
                        </label>
                        <button
                          onClick={() => onUpdateProfile({ ...profile, bioBn: '' })}
                          className="text-[10px] text-rose-600 hover:underline"
                        >
                          {language === 'bn' ? 'লিখা মুছুন' : 'Clear'}
                        </button>
                      </div>
                      <textarea
                        rows={4}
                        value={profile.bioBn}
                        onChange={(e) => onUpdateProfile({ ...profile, bioBn: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-400 leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">
                        {language === 'bn' ? 'ইমেইল:' : 'Email:'}
                      </label>
                      <input
                        type="text"
                        value={profile.email}
                        onChange={(e) => onUpdateProfile({ ...profile, email: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-400 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">
                        {language === 'bn' ? 'অবস্থান (লোকেশন):' : 'Location:'}
                      </label>
                      <input
                        type="text"
                        value={profile.locationBn}
                        onChange={(e) => onUpdateProfile({ ...profile, locationBn: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-stone-700 mb-1">
                        {language === 'bn' ? 'অনুপ্রেরণাদায়ী বাণী (Quote):' : 'Inspirational Quote:'}
                      </label>
                      <input
                        type="text"
                        value={profile.quoteBn}
                        onChange={(e) => onUpdateProfile({ ...profile, quoteBn: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Social Media Links Manager */}
              {activeTab === 'social' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <h4 className="font-extrabold text-sm text-stone-900 mb-1 flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-amber-700" />
                      <span>{language === 'bn' ? 'সামাজিক যোগাযোগ লিংক পরিচালনা' : 'Manage Social Media Links'}</span>
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed font-bangla">
                      {language === 'bn'
                        ? 'আপনার ফেসবুক, লিঙ্কডইন, হোয়াটসঅ্যাপ, গিটহাব, টুইটার/এক্স ও ওয়েবসাইট লিংক সেট বা এডিট করুন। যে লিংকগুলো দেওয়া থাকবে, সেগুলো সাইটের হোম ও যোগাযোগ অংশে ভেসে উঠবে।'
                        : 'Set or update your social media profiles. Active links will display on the hero and contact sections.'}
                    </p>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    {/* Facebook */}
                    <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-stone-800 flex items-center gap-2">
                          <Facebook className="w-4 h-4 text-[#1877F2]" />
                          <span>{language === 'bn' ? 'ফেসবুক প্রোফাইল লিংক (Facebook):' : 'Facebook URL:'}</span>
                        </label>
                        {profile.socialLinks?.facebook && (
                          <div className="flex items-center gap-2">
                            <a
                              href={profile.socialLinks.facebook}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-sans"
                            >
                              <span>টেস্ট</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleUpdateSocial('facebook', '')}
                              className="text-[11px] text-rose-600 hover:underline"
                            >
                              মুছুন
                            </button>
                          </div>
                        )}
                      </div>
                      <input
                        type="url"
                        placeholder="https://facebook.com/yourprofile"
                        value={profile.socialLinks?.facebook || ''}
                        onChange={(e) => handleUpdateSocial('facebook', e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 font-sans text-stone-800"
                      />
                    </div>

                    {/* LinkedIn */}
                    <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-stone-800 flex items-center gap-2">
                          <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                          <span>{language === 'bn' ? 'লিঙ্কডইন প্রোফাইল লিংক (LinkedIn):' : 'LinkedIn URL:'}</span>
                        </label>
                        {profile.socialLinks?.linkedin && (
                          <div className="flex items-center gap-2">
                            <a
                              href={profile.socialLinks.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 font-sans"
                            >
                              <span>টেস্ট</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleUpdateSocial('linkedin', '')}
                              className="text-[11px] text-rose-600 hover:underline"
                            >
                              মুছুন
                            </button>
                          </div>
                        )}
                      </div>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={profile.socialLinks?.linkedin || ''}
                        onChange={(e) => handleUpdateSocial('linkedin', e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 font-sans text-stone-800"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-stone-800 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-[#25D366]" />
                          <span>{language === 'bn' ? 'হোয়াটসঅ্যাপ লিংক বা নম্বর (WhatsApp):' : 'WhatsApp Link or Number:'}</span>
                        </label>
                        {profile.socialLinks?.whatsapp && (
                          <div className="flex items-center gap-2">
                            <a
                              href={profile.socialLinks.whatsapp.startsWith('http') ? profile.socialLinks.whatsapp : `https://wa.me/${profile.socialLinks.whatsapp.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-emerald-600 hover:underline flex items-center gap-1 font-sans"
                            >
                              <span>টেস্ট</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleUpdateSocial('whatsapp', '')}
                              className="text-[11px] text-rose-600 hover:underline"
                            >
                              মুছুন
                            </button>
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="8801819000000 বা https://wa.me/8801819000000"
                        value={profile.socialLinks?.whatsapp || ''}
                        onChange={(e) => handleUpdateSocial('whatsapp', e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 font-sans text-stone-800"
                      />
                    </div>

                    {/* GitHub */}
                    <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-stone-800 flex items-center gap-2">
                          <Github className="w-4 h-4 text-stone-900" />
                          <span>{language === 'bn' ? 'গিটহাব প্রোফাইল লিংক (GitHub):' : 'GitHub URL:'}</span>
                        </label>
                        {profile.socialLinks?.github && (
                          <div className="flex items-center gap-2">
                            <a
                              href={profile.socialLinks.github}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-stone-900 hover:underline flex items-center gap-1 font-sans"
                            >
                              <span>টেস্ট</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleUpdateSocial('github', '')}
                              className="text-[11px] text-rose-600 hover:underline"
                            >
                              মুছুন
                            </button>
                          </div>
                        )}
                      </div>
                      <input
                        type="url"
                        placeholder="https://github.com/yourusername"
                        value={profile.socialLinks?.github || ''}
                        onChange={(e) => handleUpdateSocial('github', e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 font-sans text-stone-800"
                      />
                    </div>

                    {/* Twitter / X */}
                    <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-stone-800 flex items-center gap-2">
                          <Twitter className="w-4 h-4 text-stone-800" />
                          <span>{language === 'bn' ? 'টুইটার / এক্স লিংক (Twitter / X):' : 'Twitter / X URL:'}</span>
                        </label>
                        {profile.socialLinks?.twitter && (
                          <div className="flex items-center gap-2">
                            <a
                              href={profile.socialLinks.twitter}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-stone-800 hover:underline flex items-center gap-1 font-sans"
                            >
                              <span>টেস্ট</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleUpdateSocial('twitter', '')}
                              className="text-[11px] text-rose-600 hover:underline"
                            >
                              মুছুন
                            </button>
                          </div>
                        )}
                      </div>
                      <input
                        type="url"
                        placeholder="https://x.com/yourusername"
                        value={profile.socialLinks?.twitter || ''}
                        onChange={(e) => handleUpdateSocial('twitter', e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 font-sans text-stone-800"
                      />
                    </div>

                    {/* YouTube */}
                    <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-stone-800 flex items-center gap-2">
                          <Youtube className="w-4 h-4 text-[#FF0000]" />
                          <span>{language === 'bn' ? 'ইউটিউব চ্যানেল লিংক (YouTube):' : 'YouTube Channel:'}</span>
                        </label>
                        {profile.socialLinks?.youtube && (
                          <div className="flex items-center gap-2">
                            <a
                              href={profile.socialLinks.youtube}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-rose-600 hover:underline flex items-center gap-1 font-sans"
                            >
                              <span>টেস্ট</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleUpdateSocial('youtube', '')}
                              className="text-[11px] text-rose-600 hover:underline"
                            >
                              মুছুন
                            </button>
                          </div>
                        )}
                      </div>
                      <input
                        type="url"
                        placeholder="https://youtube.com/@yourchannel"
                        value={profile.socialLinks?.youtube || ''}
                        onChange={(e) => handleUpdateSocial('youtube', e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 font-sans text-stone-800"
                      />
                    </div>

                    {/* Website */}
                    <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-stone-800 flex items-center gap-2">
                          <Globe className="w-4 h-4 text-amber-700" />
                          <span>{language === 'bn' ? 'ব্যক্তিগত ওয়েবসাইট / পোর্টফোলিও লিংক:' : 'Website / Portfolio URL:'}</span>
                        </label>
                        {profile.socialLinks?.website && (
                          <div className="flex items-center gap-2">
                            <a
                              href={profile.socialLinks.website}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-amber-700 hover:underline flex items-center gap-1 font-sans"
                            >
                              <span>টেস্ট</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleUpdateSocial('website', '')}
                              className="text-[11px] text-rose-600 hover:underline"
                            >
                              মুছুন
                            </button>
                          </div>
                        )}
                      </div>
                      <input
                        type="url"
                        placeholder="https://yourwebsite.com"
                        value={profile.socialLinks?.website || ''}
                        onChange={(e) => handleUpdateSocial('website', e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-300 font-sans text-stone-800"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Work & Bank Responsibilities */}
              {activeTab === 'work' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-stone-900">
                        {language === 'bn' ? 'পল্লী সঞ্চয় ব্যাংক দায়িত্ব ও পরিসংখ্যান মুছুন/সম্পাদনা' : 'Work & Responsibilities'}
                      </h4>
                      <p className="text-xs text-stone-500">
                        {language === 'bn' ? 'যেকোনো দায়িত্ব বা স্ট্যাটস ডিলিট করুন' : 'Delete any responsibility or statistic'}
                      </p>
                    </div>
                  </div>

                  {/* Add Responsibility Inline Field */}
                  <div className="flex items-center gap-2 p-2 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <input
                      type="text"
                      value={newResponsibilityInput}
                      onChange={(e) => setNewResponsibilityInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddResponsibility();
                        }
                      }}
                      placeholder={language === 'bn' ? 'নতুন দায়িত্বের বিবরণ লিখুন...' : 'Enter new responsibility...'}
                      className="flex-1 p-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-400 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddResponsibility()}
                      className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition shadow-xs shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'যোগ করুন' : 'Add'}</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-stone-700">
                      {language === 'bn' ? 'কাজের দায়িত্বসমূহ (' + work.responsibilitiesBn.length + ' টি):' : 'Responsibilities:'}
                    </p>

                    {work.responsibilitiesBn.map((resp, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white border border-stone-200 flex items-start justify-between gap-3 shadow-2xs group"
                      >
                        <span className="text-xs text-stone-700 font-bangla flex-1 leading-relaxed">
                          {resp}
                        </span>
                        <button
                          onClick={() => handleDeleteResponsibility(idx)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition"
                          title={language === 'bn' ? 'এই দায়িত্বটি মুছুন' : 'Delete responsibility'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Stats Counters */}
                  <div className="pt-4 border-t border-stone-200">
                    <p className="text-xs font-bold text-stone-700 mb-2">
                      {language === 'bn' ? 'পরিসংখ্যান কার্ডসমূহ:' : 'Statistics Metrics:'}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {work.stats.map((st, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 relative group text-center"
                        >
                          <button
                            onClick={() => handleDeleteStat(idx)}
                            className="absolute top-1.5 right-1.5 p-1 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            title={language === 'bn' ? 'মুছুন' : 'Delete'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <p className="font-extrabold text-amber-900 text-lg">{st.value}</p>
                          <p className="text-[11px] text-stone-600 mt-0.5">{st.labelBn}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: Education Editor */}
              {activeTab === 'education' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-stone-900">
                        {language === 'bn' ? 'শিক্ষাগত সনদ ও ডিগ্রি সম্পাদনা / মুছুন / যোগ' : 'Education Degrees'}
                      </h4>
                      <p className="text-xs text-stone-500">
                        {language === 'bn' ? 'এমবিএ, বিবিএস বা অন্য যেকোনো সনদ সম্পাদনা বা ডিলিট করুন' : 'Edit, delete or add degrees'}
                      </p>
                    </div>

                    <button
                      onClick={handleOpenAddEdu}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition shadow-xs active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? 'নতুন ডিগ্রি যোগ করুন' : 'Add Degree'}</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {education.map((edu, idx) => (
                      <div
                        key={edu.id || idx}
                        className="p-4 rounded-2xl bg-white border border-stone-200 flex items-start justify-between gap-4 shadow-2xs"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-extrabold text-sm text-stone-900">{edu.degreeBn}</h5>
                            {edu.degreeEn && edu.degreeEn !== edu.degreeBn && (
                              <span className="text-xs text-stone-500 font-sans">({edu.degreeEn})</span>
                            )}
                          </div>
                          <p className="text-xs text-amber-800 font-semibold mt-0.5">
                            {edu.majorBn} • {edu.institutionBn}
                          </p>
                          <p className="text-[11px] text-stone-500 mt-0.5">{edu.yearBn} • {edu.boardOrAffiliationBn}</p>
                          {edu.highlightsBn && edu.highlightsBn.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {edu.highlightsBn.map((h, hi) => (
                                <span key={hi} className="px-2 py-0.5 rounded-md bg-stone-100 text-[10.5px] text-stone-600">
                                  • {h}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleOpenEditEdu(edu, idx)}
                            className="p-2 rounded-xl text-amber-800 hover:bg-amber-100/70 border border-amber-200 transition"
                            title={language === 'bn' ? 'সম্পাদনা করুন' : 'Edit Degree'}
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEducation(idx)}
                            className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 transition"
                            title={language === 'bn' ? 'এই ডিগ্রিটি মুছুন' : 'Delete degree'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: Projects Editor */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-stone-900">
                        {language === 'bn' ? 'ওয়েব প্রজেক্টসমূহ সম্পাদনা, মুছুন বা যোগ করুন' : 'Web Projects'}
                      </h4>
                      <p className="text-xs text-stone-500">
                        {language === 'bn' ? 'আপনার শখের তৈরি ওয়েবসাইট তালিকা পরিচালনা' : 'Manage web portfolio items'}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingProject(!isAddingProject)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition shadow-xs active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{language === 'bn' ? (isAddingProject ? 'ফরম বন্ধ করুন' : 'নতুন প্রজেক্ট যোগ') : (isAddingProject ? 'Close Form' : 'Add Project')}</span>
                    </button>
                  </div>

                  {/* Inline Add Project Form */}
                  {isAddingProject && (
                    <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-300 space-y-3">
                      <h5 className="font-extrabold text-xs text-amber-950">
                        {language === 'bn' ? 'নতুন প্রজেক্টের বিবরণ লিখুন:' : 'New Project Details:'}
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          placeholder={language === 'bn' ? 'প্রজেক্টের নাম (Title)*' : 'Project Title*'}
                          value={newProjectTitle}
                          onChange={(e) => setNewProjectTitle(e.target.value)}
                          className="p-2 rounded-xl border border-stone-300 bg-white"
                        />
                        <input
                          type="text"
                          placeholder={language === 'bn' ? 'ক্যাটাগরি (যেমন: ওয়েব অ্যাপ্লিকেশন)' : 'Category'}
                          value={newProjectCategory}
                          onChange={(e) => setNewProjectCategory(e.target.value)}
                          className="p-2 rounded-xl border border-stone-300 bg-white"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder={language === 'bn' ? 'প্রজেক্টের বিস্তারিত বিবরণ...' : 'Description...'}
                        value={newProjectDesc}
                        onChange={(e) => setNewProjectDesc(e.target.value)}
                        className="w-full p-2 rounded-xl border border-stone-300 text-xs bg-white"
                      />
                      <input
                        type="url"
                        placeholder={language === 'bn' ? 'ডেমো লিংক বা ওয়েবসাইট URL (ঐচ্ছিক)' : 'Demo URL (Optional)'}
                        value={newProjectDemo}
                        onChange={(e) => setNewProjectDemo(e.target.value)}
                        className="w-full p-2 rounded-xl border border-stone-300 text-xs font-sans bg-white"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingProject(false)}
                          className="px-3 py-1.5 rounded-xl bg-stone-200 text-stone-700 text-xs font-bold"
                        >
                          {language === 'bn' ? 'বাতিল' : 'Cancel'}
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveAddProject}
                          className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold shadow-xs"
                        >
                          {language === 'bn' ? 'সংরক্ষণ করুন' : 'Save Project'}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-2xl bg-white border border-stone-200 flex items-start justify-between gap-4 shadow-2xs"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                              {proj.categoryBn}
                            </span>
                            {proj.demoUrl && (
                              <a
                                href={proj.demoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10.5px] text-blue-600 hover:underline flex items-center gap-0.5 font-sans"
                              >
                                <span>ডেমো লিংক</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <h5 className="font-extrabold text-sm text-stone-900 mt-1">{proj.titleBn}</h5>
                          <p className="text-xs text-stone-600 mt-1 leading-relaxed">{proj.descriptionBn}</p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 transition"
                            title={language === 'bn' ? 'এই প্রজেক্টটি মুছুন' : 'Delete project'}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: Skills Editor */}
              {activeTab === 'skills' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                    <h4 className="font-extrabold text-sm text-stone-900 mb-1">
                      {language === 'bn' ? 'দক্ষতা ও পারদর্শিতা সম্পাদনা ও মুছুন' : 'Manage Skills & Expertise'}
                    </h4>
                    <p className="text-xs text-stone-600">
                      {language === 'bn'
                        ? 'যেকোনো নির্দিষ্ট দক্ষতা সম্পাদনা, লেভেল পরিবর্তন বা মুছে ফেলতে পারেন।'
                        : 'Edit, update levels, or delete skills.'}
                    </p>
                  </div>

                  {skills.map((cat) => (
                    <div key={cat.id} className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                        <h5 className="font-extrabold text-sm text-stone-900">{cat.categoryBn}</h5>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveAddSkillCatId(activeAddSkillCatId === cat.id ? null : cat.id)}
                            className="text-xs text-amber-800 hover:bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-300 flex items-center gap-1 transition font-bold"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{language === 'bn' ? (activeAddSkillCatId === cat.id ? 'বন্ধ' : 'দক্ষতা যোগ') : (activeAddSkillCatId === cat.id ? 'Close' : 'Add Skill')}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="text-xs text-rose-600 hover:bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 flex items-center gap-1 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{language === 'bn' ? 'ক্যাটাগরি মুছুন' : 'Delete'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Inline Add Skill Form for this category */}
                      {activeAddSkillCatId === cat.id && (
                        <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row items-center gap-2 text-xs">
                          <input
                            type="text"
                            placeholder={language === 'bn' ? 'দক্ষতার নাম (যেমন: React.js)' : 'Skill name'}
                            value={newSkillName}
                            onChange={(e) => setNewSkillName(e.target.value)}
                            className="flex-1 p-2 rounded-lg border border-stone-300 bg-white w-full"
                          />
                          <div className="flex items-center gap-1.5 w-full sm:w-auto">
                            <span className="text-[11px] text-stone-600 font-bold">দক্ষতা %:</span>
                            <input
                              type="number"
                              min={10}
                              max={100}
                              value={newSkillLevel}
                              onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                              className="w-16 p-2 rounded-lg border border-stone-300 bg-white font-sans text-center"
                            />
                            <button
                              type="button"
                              onClick={() => handleAddSkillToCategory(cat.id)}
                              className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold shrink-0"
                            >
                              {language === 'bn' ? 'যুক্ত করুন' : 'Add'}
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {cat.skills.map((sk, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-2"
                          >
                            <span className="text-xs font-semibold text-stone-800">{sk.nameBn}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md font-sans">
                                {sk.level}%
                              </span>
                              <button
                                onClick={() => handleDeleteSkill(cat.id, sIdx)}
                                className="p-1 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition"
                                title={language === 'bn' ? 'মুছুন' : 'Delete'}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB: Photos Manager */}
              {activeTab === 'photos' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-stone-900">
                        {language === 'bn' ? 'ফটো গ্যালারি থেকে ছবি মুছুন' : 'Manage & Delete Photos'}
                      </h4>
                      <p className="text-xs text-stone-500">
                        {language === 'bn' ? 'বর্তমান সংকলনে ' + photos.length + ' টি ছবি রয়েছে' : photos.length + ' photos available'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {photos.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-white border border-stone-200 relative group overflow-hidden shadow-2xs flex flex-col justify-between"
                      >
                        <div className="w-full aspect-square rounded-xl overflow-hidden mb-2 bg-stone-100">
                          <img src={item.url} alt="" className="w-full h-full object-cover" />
                        </div>

                        <div className="space-y-1">
                          <p className="font-bold text-xs text-stone-900 truncate">{item.title}</p>
                          <p className="text-[10px] text-amber-800 truncate">{item.badge}</p>
                        </div>

                        <button
                          onClick={() => handleDeletePhoto(item.id)}
                          className="mt-2 w-full py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 flex items-center justify-center gap-1.5 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{language === 'bn' ? 'ছবিটি মুছুন' : 'Delete Photo'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: Change Password */}
              {activeTab === 'password' && (
                <div className="max-w-md mx-auto space-y-5 p-6 rounded-3xl bg-amber-50/60 border border-amber-200">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center mx-auto mb-2">
                      <KeyRound className="w-6 h-6" />
                    </div>
                    <h4 className="font-extrabold text-base text-stone-900">
                      {language === 'bn' ? 'অ্যাডমিন পাসওয়ার্ড পরিবর্তন' : 'Change Admin Password'}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1">
                      {language === 'bn'
                        ? 'আপনার প্যানেল সুরক্ষিত রাখতে নতুন শক্তিশালী পাসওয়ার্ড সেট করুন।'
                        : 'Update your admin password for enhanced security.'}
                    </p>
                  </div>

                  <form onSubmit={handleChangePassword} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-stone-700 mb-1">বর্তমান পাসওয়ার্ড:</label>
                      <input
                        type="password"
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Current password"
                        className="w-full p-2.5 rounded-xl border border-stone-300 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">নতুন পাসওয়ার্ড:</label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password (min 4 chars)"
                        className="w-full p-2.5 rounded-xl border border-stone-300 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-700 mb-1">নতুন পাসওয়ার্ড নিশ্চিত করুন:</label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full p-2.5 rounded-xl border border-stone-300 font-sans"
                      />
                    </div>

                    {changePassError && (
                      <p className="text-xs font-bold text-rose-600">{changePassError}</p>
                    )}

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition"
                    >
                      {language === 'bn' ? 'পাসওয়ার্ড সেভ করুন' : 'Save New Password'}
                    </button>
                  </form>
                </div>
              )}

              {/* TAB: Master Reset & Wipe */}
              {activeTab === 'master' && (
                <div className="space-y-5">
                  <div className="p-5 rounded-3xl bg-rose-50 border-2 border-rose-300 space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-extrabold text-base text-rose-900">
                          {language === 'bn' ? 'মাস্টার ডিলিট ও রিসেট জোন' : 'Danger Zone: Master Clear & Reset'}
                        </h4>
                        <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                          {language === 'bn'
                            ? 'এখান থেকে আপনি এক ক্লিকে সাইটের সকল টেক্সট বা লিখা ফাঁকা করে দিতে পারেন, অথবা পুনরায় মূল ডিফল্ট তথ্যে ফিরিয়ে নিতে পারেন।'
                            : 'Wipe all text entries across the portfolio to blank, or reset all data back to original defaults.'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-rose-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          onClearAllTexts();
                          showToast(language === 'bn' ? 'সকল লিখা ফাঁকা করা হয়েছে!' : 'All texts cleared!');
                        }}
                        className="p-3.5 rounded-2xl bg-white hover:bg-rose-100 text-rose-800 border-2 border-rose-300 font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-xs"
                      >
                        <Trash2 className="w-4 h-4 text-rose-600" />
                        <span>{language === 'bn' ? 'সকল লিখা মুছে ফাঁকা করুন' : 'Wipe All Texts'}</span>
                      </button>

                      <button
                        onClick={() => {
                          onResetToDefaults();
                          confetti({ particleCount: 50, spread: 50 });
                          showToast(language === 'bn' ? 'মূল তথ্যে রিসেট সফল হয়েছে!' : 'Reset to defaults successful!');
                        }}
                        className="p-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-md"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>{language === 'bn' ? 'মূল তথ্যে রিসেট করুন' : 'Restore Defaults'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-amber-200 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-medium">
                {language === 'bn' ? 'সকল পরিবর্তন তাৎক্ষণিক ব্রাউজারে সংরক্ষিত হয়।' : 'All edits persist in local storage.'}
              </span>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{language === 'bn' ? 'সম্পন্ন / বন্ধ করুন' : 'Done & Close'}</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Education Modal for Admin */}
      <EducationModal
        isOpen={isEduModalOpen}
        onClose={() => setIsEduModalOpen(false)}
        educationItem={selectedEduItem}
        itemIndex={selectedEduIndex}
        onSave={handleSaveEduModal}
        language={language}
      />
    </div>
  );
};
