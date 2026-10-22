import React, { useState, useRef } from 'react';
import { Language, ProfileInfo, WorkExperience, EducationItem } from '../types';
import {
  X,
  Download,
  Printer,
  Plus,
  Trash2,
  FileText,
  User,
  GraduationCap,
  Briefcase,
  CheckCircle,
  Sparkles,
  Award,
  Layers,
  Eye,
  Edit3,
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';

export interface CVData {
  // Personal
  fullName: string;
  fullNameBn: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: string;
  bloodGroup: string;
  maritalStatus: string;
  religion: string;
  nationality: string;
  nidNo: string;
  mobile: string;
  email: string;
  presentAddress: string;
  permanentAddress: string;
  photoUrl: string;

  // Objective
  objective: string;

  // Education Table
  educationRows: {
    id: string;
    degree: string;
    group: string;
    institution: string;
    board: string;
    year: string;
    result: string;
  }[];

  // Experience
  experiences: {
    id: string;
    designation: string;
    organization: string;
    location: string;
    period: string;
    responsibilities: string[];
  }[];

  // Skills
  skillsList: string[];
  digitalSkills: string[];
  languages: string[];

  // Reference
  references: {
    id: string;
    name: string;
    designation: string;
    organization: string;
    phone: string;
    email: string;
  }[];
}

interface CVBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  profile: ProfileInfo;
  work: WorkExperience;
  educationList: EducationItem[];
  userPhotoUrl?: string;
}

export const CVBuilderModal: React.FC<CVBuilderModalProps> = ({
  isOpen,
  onClose,
  language = 'bn',
  profile,
  work,
  educationList,
  userPhotoUrl = '/assets/aistudio/5318_cdace00b.jpg',
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'form'>('preview');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [newSkillText, setNewSkillText] = useState<string>('');
  const cvPrintRef = useRef<HTMLDivElement>(null);

  // Initialize CV State with authentic data for MD Tareq
  const [cvData, setCvData] = useState<CVData>(() => ({
    fullName: profile.nameEn || 'MD Tareq',
    fullNameBn: profile.nameBn || 'মোঃ তারেক',
    fatherName: 'মোঃ আব্দুল হক',
    motherName: 'নুরজাহান বেগম',
    dateOfBirth: '15/01/1993',
    bloodGroup: 'B (+ve)',
    maritalStatus: 'বিবাহিত (Married)',
    religion: 'ইসলাম (Islam)',
    nationality: 'বাংলাদেশী (Bangladeshi)',
    nidNo: '199315XXXXXXXXXX',
    mobile: profile.phone || '01819000000',
    email: profile.email || 'ranguniaup@gmail.com',
    presentAddress: profile.locationBn || 'রাঙ্গুনিয়া, চট্টগ্রাম, বাংলাদেশ',
    permanentAddress: 'গ্রাম: রাঙ্গুনিয়া, ডাকঘর: রাঙ্গুনিয়া, উপজেলা: রাঙ্গুনিয়া, জেলা: চট্টগ্রাম',
    photoUrl: userPhotoUrl,

    objective:
      'হিসাববিজ্ঞানে এমবিএ এবং পল্লী সঞ্চয় ব্যাংকে মাঠ কর্মকর্তা হিসেবে পেশাগত অভিজ্ঞতাকে কাজে লাগিয়ে গ্রামীণ অর্থনৈতিক অন্তর্ভুক্তি, ক্ষুদ্র সঞ্চয় ব্যবস্থাপনা ও ডিজিটাল ব্যাংকিং কার্যক্রমে নিষ্ঠার সাথে অবদান রাখা। আধুনিক ওয়েব প্রযুক্তি ও নির্ভুল হিসাবরক্ষণের মেলবন্ধনে প্রাতিষ্ঠানিক উৎকর্ষ সাধন করা।',

    educationRows: [
      {
        id: '1',
        degree: 'MBA',
        group: 'Accounting',
        institution: 'National University (NU)',
        board: 'National University',
        year: '2019',
        result: 'First Class / 3.42',
      },
      {
        id: '2',
        degree: 'BBS (Honors)',
        group: 'Accounting',
        institution: 'National University (NU)',
        board: 'National University',
        year: '2017',
        result: 'First Class / 3.35',
      },
      {
        id: '3',
        degree: 'HSC',
        group: 'Business Studies',
        institution: 'Govt. College',
        board: 'Chattogram',
        year: '2013',
        result: 'GPA 4.50',
      },
      {
        id: '4',
        degree: 'SSC',
        group: 'Business Studies',
        institution: 'High School',
        board: 'Chattogram',
        year: '2011',
        result: 'GPA 4.80',
      },
    ],

    experiences: [
      {
        id: '1',
        designation: work.roleBn || 'ফিল্ড অ্যাসিস্ট্যান্ট অফিসার (মাঠ সহকারী কর্মকর্তা)',
        organization: work.organizationBn || 'পল্লী সঞ্চয় ব্যাংক (Palli Sanchay Bank)',
        location: work.locationBn || 'রাঙ্গুনিয়া, চট্টগ্রাম',
        period: 'নভেম্বর ২০২১ – বর্তমান কর্মরত',
        responsibilities: [
          'তৃণমূল গ্রামীণ সদস্যদের মধ্যে নিয়মিত সঞ্চয় বৃদ্ধির সচেতনতা তৈরি ও সমিতি পরিচালনা।',
          'ক্ষুদ্র ঋণ বিতরণ, প্রকল্পের সম্ভাব্যতা যাচাই এবং সময়মত কিস্তি আদায় সমন্বয়।',
          'সদস্যদের পল্লী সঞ্চয় ব্যাংকের ডিজিটাল সেবা ও মোবাইল ব্যাংকিং ব্যবহারে প্রশিক্ষণ।',
          'দৈনিক লেজার ও ক্যাশ বুক ব্যালেন্স শিট প্রস্তুতকরণ এবং সফটওয়্যার এন্ট্রি নিশ্চিতকরণ।',
        ],
      },
    ],

    skillsList: [
      'আর্থিক হিসাবরক্ষণ ও ব্যালেন্স শিট প্রস্তুত (Financial Accounting & Reporting)',
      'ক্ষুদ্রঋণ মূল্যায়ন ও মাঠ ব্যবস্থাপনা (Micro-credit Loan Management)',
      'অডিট ভেরিফিকেশন ও লেজার রিকনসিলিয়েশন (Ledger Reconciliation)',
      'কমিউনিটি যোগাযোগ ও গ্রাহক সেবা (Community Engagement)',
    ],

    digitalSkills: [
      'Core Banking Software (Palli Sanchay Bank Core System)',
      'ওয়েব ডিজাইন ও ডেভেলপমেন্ট (HTML5, CSS3, Tailwind CSS, JavaScript, React, PWA)',
      'MS Office (Advanced Excel, Financial Formulas, Word, PowerPoint)',
      'ডিজিটাল পেমেন্ট গেটওয়ে ও মোবাইল ব্যাংকিং অপারেশন',
    ],

    languages: ['বাংলা (মাতৃভাষা - Native)', 'ইংরেজি (পেশাগত যোগাযোগ - Professional Working)'],

    references: [
      {
        id: '1',
        name: 'শাখা ব্যবস্থাপক',
        designation: 'শাখা ব্যবস্থাপক (Branch Manager)',
        organization: 'পল্লী সঞ্চয় ব্যাংক, রাঙ্গুনিয়া শাখা',
        phone: '০১৮XXXXXXXX',
        email: 'branch.psb@gmail.com',
      },
      {
        id: '2',
        name: 'বিভাগীয় প্রধান, হিসাববিজ্ঞান',
        designation: 'সহযোগী অধ্যাপক',
        organization: 'জাতীয় বিশ্ববিদ্যালয় অধিভুক্ত কলেজ',
        phone: '০১৭১XXXXXXX',
        email: 'nu.accounting.dept@gmail.com',
      },
    ],
  }));

  if (!isOpen) return null;

  // Add Education Row
  const handleAddEducationRow = () => {
    const newRow = {
      id: Date.now().toString(),
      degree: 'Degree',
      group: 'Subject',
      institution: 'Institution Name',
      board: 'Board/Univ',
      year: '2020',
      result: 'Passed',
    };
    setCvData({ ...cvData, educationRows: [...cvData.educationRows, newRow] });
  };

  // Delete Education Row
  const handleDeleteEducationRow = (id: string) => {
    setCvData({
      ...cvData,
      educationRows: cvData.educationRows.filter((r) => r.id !== id),
    });
  };

  // Add Skill
  const handleAddSkill = (type: 'skillsList' | 'digitalSkills') => {
    if (newSkillText && newSkillText.trim()) {
      setCvData({ ...cvData, [type]: [...cvData[type], newSkillText.trim()] });
      setNewSkillText('');
    }
  };

  // Delete Skill
  const handleDeleteSkill = (type: 'skillsList' | 'digitalSkills', index: number) => {
    setCvData({
      ...cvData,
      [type]: cvData[type].filter((_, i) => i !== index),
    });
  };

  // Download PDF via jsPDF & toPng (fully compatible with Tailwind v4 oklch colors)
  const handleDownloadPDF = async () => {
    setIsExporting(true);

    try {
      // Make sure preview tab is active for capture
      if (activeTab !== 'preview') {
        setActiveTab('preview');
        await new Promise((resolve) => setTimeout(resolve, 400));
      }

      const element = cvPrintRef.current;
      if (!element) {
        throw new Error('CV element not ready');
      }

      // Generate PNG using browser native engine (immune to oklch / CSS parse errors)
      const dataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        cacheBust: true,
      });

      const img = new Image();
      img.src = dataUrl;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Image failed to load'));
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

      if (pdfHeight <= pageHeight + 5) {
        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, pageHeight));
      } else {
        let position = 0;
        let remainingHeight = pdfHeight;
        pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, pdfHeight);
        remainingHeight -= pageHeight;

        while (remainingHeight > 5) {
          position -= pageHeight;
          pdf.addPage();
          pdf.addImage(dataUrl, 'PNG', 0, position, pdfWidth, pdfHeight);
          remainingHeight -= pageHeight;
        }
      }

      const cleanFileName = `CV_${(cvData.fullName || 'Tareq').replace(/\s+/g, '_')}_PalliSanchayBank.pdf`;
      pdf.save(cleanFileName);

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#fbbf24'],
      });
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      // Fallback: trigger browser print
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  // Native Print to PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 font-bangla animate-fadeIn">
      <div className="w-full max-w-5xl max-h-[94vh] bg-white rounded-3xl shadow-2xl border-2 border-amber-300 flex flex-col overflow-hidden text-stone-800">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white flex items-center justify-between border-b border-amber-400/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-bold shadow-md">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-amber-200">
                {language === 'bn' ? 'পূর্ণাঙ্গ প্রফেশনাল সিভি প্রস্তুতকারক ও পিডিএফ ডাউনলোড' : 'Professional CV Builder & PDF Download'}
              </h3>
              <p className="text-xs text-stone-300">
                {language === 'bn'
                  ? 'হিসাববিজ্ঞান ও ব্যাংকিং পেশার মানসম্মত পূর্ণাঙ্গ জীবনবৃত্তান্ত (Curriculum Vitae)'
                  : 'Executive Standard Curriculum Vitae tailored for banking & accounting'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-extrabold text-xs shadow-md transition flex items-center gap-1.5 active:scale-95 disabled:opacity-60"
            >
              <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-bounce' : ''}`} />
              <span>{isExporting ? (language === 'bn' ? 'পিডিএফ তৈরি হচ্ছে...' : 'Generating PDF...') : (language === 'bn' ? 'পিডিএফ ডাউনলোড' : 'Download PDF')}</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 font-bold text-xs items-center gap-1.5 transition"
              title="সরাসরি প্রিন্ট করুন"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Switcher Bar */}
        <div className="flex items-center justify-between p-2.5 sm:px-6 bg-amber-50/70 border-b border-amber-200 text-xs font-bold">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeTab === 'preview'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-600 hover:bg-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'সিভি প্রিভিউ (PDF View)' : 'CV Preview'}</span>
            </button>

            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeTab === 'form'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-600 hover:bg-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'তথ্য সম্পাদনা ফরম (Edit Form)' : 'Edit Info Form'}</span>
            </button>
          </div>

          <span className="text-[11px] text-amber-800 font-semibold hidden md:inline">
            {language === 'bn' ? '💡 এ৪ সাইজ ফরম্যাট (A4 Printable Standard)' : 'Standard A4 Format'}
          </span>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-stone-100/70">
          
          {/* TAB 1: FORM EDITOR */}
          {activeTab === 'form' && (
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Personal Info Box */}
              <div className="p-5 rounded-2xl bg-white border border-amber-200/90 shadow-xs space-y-4">
                <h4 className="font-extrabold text-sm text-stone-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-600" />
                  <span>{language === 'bn' ? '১. ব্যক্তিগত তথ্য (Personal Details)' : 'Personal Details'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">পূর্ণ নাম (ইংরেজি):</label>
                    <input
                      type="text"
                      value={cvData.fullName}
                      onChange={(e) => setCvData({ ...cvData, fullName: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">পূর্ণ নাম (বাংলা):</label>
                    <input
                      type="text"
                      value={cvData.fullNameBn}
                      onChange={(e) => setCvData({ ...cvData, fullNameBn: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">পিতার নাম:</label>
                    <input
                      type="text"
                      value={cvData.fatherName}
                      onChange={(e) => setCvData({ ...cvData, fatherName: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">মাতার নাম:</label>
                    <input
                      type="text"
                      value={cvData.motherName}
                      onChange={(e) => setCvData({ ...cvData, motherName: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-300"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">জন্ম তারিখ:</label>
                    <input
                      type="text"
                      value={cvData.dateOfBirth}
                      onChange={(e) => setCvData({ ...cvData, dateOfBirth: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-300 font-sans"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">রক্তের গ্রুপ:</label>
                    <input
                      type="text"
                      value={cvData.bloodGroup}
                      onChange={(e) => setCvData({ ...cvData, bloodGroup: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-300 font-sans"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">মোবাইল:</label>
                    <input
                      type="text"
                      value={cvData.mobile}
                      onChange={(e) => setCvData({ ...cvData, mobile: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-300 font-sans"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">ইমেইল:</label>
                    <input
                      type="text"
                      value={cvData.email}
                      onChange={(e) => setCvData({ ...cvData, email: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-300 font-sans"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-stone-700 mb-1">বর্তমান ঠিকানা:</label>
                    <input
                      type="text"
                      value={cvData.presentAddress}
                      onChange={(e) => setCvData({ ...cvData, presentAddress: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-300"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-stone-700 mb-1">স্থায়ী ঠিকানা:</label>
                    <input
                      type="text"
                      value={cvData.permanentAddress}
                      onChange={(e) => setCvData({ ...cvData, permanentAddress: e.target.value })}
                      className="w-full p-2 rounded-xl border border-stone-300"
                    />
                  </div>
                </div>
              </div>

              {/* Career Objective */}
              <div className="p-5 rounded-2xl bg-white border border-amber-200/90 shadow-xs space-y-3">
                <h4 className="font-extrabold text-sm text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{language === 'bn' ? '২. ক্যারিয়ার অবজেক্টিভ (Career Objective)' : 'Career Objective'}</span>
                </h4>
                <textarea
                  rows={3}
                  value={cvData.objective}
                  onChange={(e) => setCvData({ ...cvData, objective: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 text-xs leading-relaxed"
                />
              </div>

              {/* Education Table Editor */}
              <div className="p-5 rounded-2xl bg-white border border-amber-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-stone-900 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-600" />
                    <span>{language === 'bn' ? '৩. শিক্ষাগত যোগ্যতা টেবিল (Education Rows)' : 'Education Rows'}</span>
                  </h4>
                  <button
                    onClick={handleAddEducationRow}
                    className="py-1 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1 shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'সারি যোগ' : 'Add Row'}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {cvData.educationRows.map((row, idx) => (
                    <div
                      key={row.id}
                      className="p-3 rounded-xl bg-stone-50 border border-stone-200 grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs items-center"
                    >
                      <div>
                        <span className="text-[10px] text-stone-500 font-bold">ডিগ্রি</span>
                        <input
                          type="text"
                          value={row.degree}
                          onChange={(e) => {
                            const updated = [...cvData.educationRows];
                            updated[idx].degree = e.target.value;
                            setCvData({ ...cvData, educationRows: updated });
                          }}
                          className="w-full p-1.5 rounded-lg border border-stone-300 font-bold"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 font-bold">বিষয়/গ্রুপ</span>
                        <input
                          type="text"
                          value={row.group}
                          onChange={(e) => {
                            const updated = [...cvData.educationRows];
                            updated[idx].group = e.target.value;
                            setCvData({ ...cvData, educationRows: updated });
                          }}
                          className="w-full p-1.5 rounded-lg border border-stone-300"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-[10px] text-stone-500 font-bold">প্রতিষ্ঠান</span>
                        <input
                          type="text"
                          value={row.institution}
                          onChange={(e) => {
                            const updated = [...cvData.educationRows];
                            updated[idx].institution = e.target.value;
                            setCvData({ ...cvData, educationRows: updated });
                          }}
                          className="w-full p-1.5 rounded-lg border border-stone-300"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 font-bold">পাসিং সন / ফল</span>
                        <input
                          type="text"
                          value={row.year + ' / ' + row.result}
                          onChange={(e) => {
                            const parts = e.target.value.split('/');
                            const updated = [...cvData.educationRows];
                            updated[idx].year = (parts[0] || '').trim();
                            updated[idx].result = (parts[1] || '').trim();
                            setCvData({ ...cvData, educationRows: updated });
                          }}
                          className="w-full p-1.5 rounded-lg border border-stone-300 font-sans"
                        />
                      </div>
                      <div className="text-right">
                        <button
                          onClick={() => handleDeleteEducationRow(row.id)}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200"
                          title="মুছুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Editor */}
              <div className="p-5 rounded-2xl bg-white border border-amber-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-stone-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>{language === 'bn' ? '৪. দক্ষতা ও বিশেষ ট্রেনিং' : 'Skills & Training'}</span>
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newSkillText}
                    onChange={(e) => setNewSkillText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill('skillsList');
                      }
                    }}
                    placeholder={language === 'bn' ? 'নতুন দক্ষতা বা ট্রেনিং লিখুন...' : 'Enter skill or training...'}
                    className="flex-1 p-2 rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill('skillsList')}
                    className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1 shadow-2xs shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'যোগ করুন' : 'Add'}</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  {cvData.skillsList.map((sk, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
                    >
                      <span>• {sk}</span>
                      <button
                        onClick={() => handleDeleteSkill('skillsList', idx)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setActiveTab('preview')}
                  className="py-3 px-6 rounded-2xl bg-stone-900 text-amber-300 font-bold text-xs hover:bg-stone-800 transition shadow-md"
                >
                  {language === 'bn' ? 'প্রিভিউ দেখুন ও পিডিএফ তৈরি করুন ➔' : 'View Preview & Generate PDF ➔'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE A4 PRINTABLE PREVIEW */}
          {activeTab === 'preview' && (
            <div className="flex justify-center">
              {/* Clean White A4 Sheet with Executive Gold Borders */}
              <div
                ref={cvPrintRef}
                id="printable-cv"
                className="w-full max-w-[210mm] bg-white p-8 sm:p-12 shadow-2xl border border-stone-200 text-stone-900 text-xs leading-relaxed"
                style={{ minHeight: '297mm' }}
              >
                {/* Header: Name, Title, Contact and Photo */}
                <div className="flex items-start justify-between gap-6 pb-6 border-b-2 border-amber-600">
                  <div className="space-y-1.5 flex-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight font-serif-gold uppercase text-amber-900">
                      {cvData.fullName}
                    </h1>
                    <p className="text-sm font-bold text-stone-700 font-bangla">
                      {cvData.fullNameBn} — {work.roleBn || 'ফিল্ড অ্যাসিস্ট্যান্ট অফিসার'}
                    </p>
                    <p className="text-xs font-semibold text-amber-800 font-bangla">
                      {work.organizationBn || 'পল্লী সঞ্চয় ব্যাংক (Palli Sanchay Bank)'}
                    </p>

                    <div className="pt-2 text-[11px] text-stone-600 space-y-0.5 font-sans">
                      <p>📞 Phone: {cvData.mobile}</p>
                      <p>✉️ Email: {cvData.email}</p>
                      <p>📍 Address: {cvData.presentAddress}</p>
                    </div>
                  </div>

                  {/* Passport Photo Box */}
                  <div className="w-28 h-32 rounded-lg border-2 border-amber-500 overflow-hidden shadow-sm shrink-0 bg-stone-100">
                    <img
                      src={cvData.photoUrl}
                      alt={cvData.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Section: Career Objective */}
                <div className="mt-5 space-y-1.5">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-amber-950 bg-amber-100/70 px-2.5 py-1 rounded border-l-4 border-amber-600">
                    CAREER OBJECTIVE / কর্মজীবনের উদ্দেশ্য
                  </h3>
                  <p className="text-stone-700 text-justify text-[11.5px] leading-relaxed pt-1">
                    {cvData.objective}
                  </p>
                </div>

                {/* Section: Professional Work Experience */}
                <div className="mt-5 space-y-2">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-amber-950 bg-amber-100/70 px-2.5 py-1 rounded border-l-4 border-amber-600">
                    PROFESSIONAL EXPERIENCE / পেশাগত অভিজ্ঞতা
                  </h3>

                  {cvData.experiences.map((exp) => (
                    <div key={exp.id} className="pt-1 space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-extrabold text-stone-900 text-xs">
                          {exp.designation} — <span className="text-amber-900">{exp.organization}</span>
                        </span>
                        <span className="text-[11px] font-semibold text-stone-500 font-sans">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600">{exp.location}</p>

                      <ul className="list-disc list-inside space-y-1 text-stone-700 text-[11px] pt-1">
                        {exp.responsibilities.map((r, rIdx) => (
                          <li key={rIdx}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Section: Education Table */}
                <div className="mt-5 space-y-2">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-amber-950 bg-amber-100/70 px-2.5 py-1 rounded border-l-4 border-amber-600">
                    EDUCATIONAL QUALIFICATIONS / শিক্ষাগত যোগ্যতা
                  </h3>

                  <div className="overflow-x-auto pt-1">
                    <table className="w-full border-collapse border border-stone-300 text-[11px]">
                      <thead>
                        <tr className="bg-amber-50/80 text-amber-950 font-extrabold text-left">
                          <th className="border border-stone-300 p-1.5">Degree / Exam</th>
                          <th className="border border-stone-300 p-1.5">Major / Group</th>
                          <th className="border border-stone-300 p-1.5">Board / University</th>
                          <th className="border border-stone-300 p-1.5">Passing Year</th>
                          <th className="border border-stone-300 p-1.5">Result / CGPA</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cvData.educationRows.map((row) => (
                          <tr key={row.id} className="hover:bg-amber-50/30">
                            <td className="border border-stone-300 p-1.5 font-bold text-stone-900">
                              {row.degree}
                            </td>
                            <td className="border border-stone-300 p-1.5">{row.group}</td>
                            <td className="border border-stone-300 p-1.5">{row.board}</td>
                            <td className="border border-stone-300 p-1.5 font-sans">{row.year}</td>
                            <td className="border border-stone-300 p-1.5 font-bold font-sans">
                              {row.result}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section: Skills & Expertise */}
                <div className="mt-5 space-y-2">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-amber-950 bg-amber-100/70 px-2.5 py-1 rounded border-l-4 border-amber-600">
                    KEY SKILLS & COMPETENCIES / বিশেষ দক্ষতা
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px]">
                    <div>
                      <p className="font-bold text-stone-900 mb-1">হিসাববিজ্ঞান ও ব্যাংকিং দক্ষতা:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-stone-700">
                        {cvData.skillsList.map((sk, idx) => (
                          <li key={idx}>{sk}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-bold text-stone-900 mb-1">ডিজিটাল ও আইটি দক্ষতা (IT Skills):</p>
                      <ul className="list-disc list-inside space-y-0.5 text-stone-700">
                        {cvData.digitalSkills.map((ds, idx) => (
                          <li key={idx}>{ds}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Section: Personal Information */}
                <div className="mt-5 space-y-2">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-amber-950 bg-amber-100/70 px-2.5 py-1 rounded border-l-4 border-amber-600">
                    PERSONAL PARTICULARS / ব্যক্তিগত বিবরণ
                  </h3>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1 text-[11px] text-stone-800">
                    <div>
                      <span className="font-bold">Father's Name:</span> {cvData.fatherName}
                    </div>
                    <div>
                      <span className="font-bold">Mother's Name:</span> {cvData.motherName}
                    </div>
                    <div>
                      <span className="font-bold">Date of Birth:</span> {cvData.dateOfBirth}
                    </div>
                    <div>
                      <span className="font-bold">Blood Group:</span> {cvData.bloodGroup}
                    </div>
                    <div>
                      <span className="font-bold">Marital Status:</span> {cvData.maritalStatus}
                    </div>
                    <div>
                      <span className="font-bold">Religion:</span> {cvData.religion}
                    </div>
                    <div>
                      <span className="font-bold">Nationality:</span> {cvData.nationality}
                    </div>
                    <div>
                      <span className="font-bold">National ID:</span> {cvData.nidNo}
                    </div>
                    <div className="col-span-2">
                      <span className="font-bold">Permanent Address:</span> {cvData.permanentAddress}
                    </div>
                  </div>
                </div>

                {/* Section: References */}
                <div className="mt-5 space-y-2">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-amber-950 bg-amber-100/70 px-2.5 py-1 rounded border-l-4 border-amber-600">
                    REFERENCES / তথ্য সহায়তাকারী
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-[10.5px]">
                    {cvData.references.map((ref) => (
                      <div key={ref.id} className="p-2 rounded bg-stone-50 border border-stone-200">
                        <p className="font-bold text-stone-900">{ref.name}</p>
                        <p className="text-stone-600">{ref.designation}</p>
                        <p className="text-amber-900 font-semibold">{ref.organization}</p>
                        <p className="font-sans text-stone-500">Phone: {ref.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Declaration & Signature */}
                <div className="mt-8 pt-4 border-t border-stone-300 flex justify-between items-end text-[10.5px]">
                  <div>
                    <p className="text-stone-600">
                      I hereby declare that all the information provided above is true and correct.
                    </p>
                    <p className="font-semibold text-stone-800 mt-1">Date: {new Date().toLocaleDateString('en-GB')}</p>
                  </div>

                  <div className="text-center">
                    <div className="w-32 border-b border-stone-800 mb-1" />
                    <span className="font-bold text-stone-900">({cvData.fullName})</span>
                    <p className="text-stone-500 text-[10px]">Applicant Signature</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-amber-200 flex items-center justify-between text-xs">
          <span className="text-stone-600 font-medium">
            {language === 'bn'
              ? 'উক্ত সিভি সরাসরি PDF ডাউনলোড বা যেকোনো প্রিন্টারে প্রিন্ট করা যাবে।'
              : 'Directly download PDF or print to A4 standard paper.'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-extrabold text-xs shadow-md transition flex items-center gap-2 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'পিডিএফ প্রস্তুত হচ্ছে...' : 'পিডিএফ ডাউনলোড করুন (Save PDF)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
