import {
  PhotoItem,
  WorkExperience,
  EducationItem,
  WebProject,
  SkillCategoryItem,
  ProfileInfo,
  SectionVisibility,
} from '../types';

export const initialPhotos: PhotoItem[] = [
  {
    id: 'photo-tareq-1',
    title: 'Executive Portrait',
    bengaliTitle: 'মোঃ তারেক — পেশাদার কর্মকর্তা ও ওয়েব নির্মাতা',
    url: '/assets/aistudio/5318_cdace00b.jpg',
    badge: '🌟 গোল্ডেন এক্সিকিউটিভ',
    caption: 'পল্লী সঞ্চয় ব্যাংকের আর্থিক অন্তর্ভুক্তি ও সেবা কার্যক্রমে নিষ্ঠার সাথে এগিয়ে চলা। হিসাববিজ্ঞান ও আধুনিক প্রযুক্তির মেলবন্ধনে নতুন দিগন্ত।',
    quote: '“পরিশ্রম ও প্রযুক্তির সঠিক সমন্বয়ই এনে দিতে পারে জীবনের শ্রেষ্ঠ সাফল্য।”',
    tags: ['#PalliSanchayBank', '#AccountingMBA', '#WebDeveloper', '#DigitalService'],
    shape: 'golden-arch',
    stylePreset: 'luxury-gold',
    filters: {
      brightness: 104,
      contrast: 106,
      warmth: 12,
      goldGlowIntensity: 85,
      borderHue: '#f59e0b',
    },
    isFeaturedOnHome: true,
    dateAdded: '2025-01-18',
  },
  {
    id: 'photo-tareq-2',
    title: 'Beachside Executive Casual',
    bengaliTitle: 'সৃজনশীল ভাবনায় মুক্ত দিগন্তে',
    url: '/assets/aistudio/20250118_075506_1e27b9fd.jpg',
    badge: '💼 স্মার্ট প্রফেশনাল',
    caption: 'কক্সবাজার সমুদ্র সৈকতের শান্ত পরিবেশে চিন্তার নতুন উদ্দীপনা। নতুন ওয়েব প্রযুক্তি ও উদ্ভাবনী ডিজিটাল প্রজেক্টের পরিকল্পনা।',
    quote: '“যত বড় স্বপ্ন, তত গভীর একাগ্রতা—প্রতিটি পদক্ষেপে নিজেকে ছাড়িয়ে যাওয়ার প্রয়াস।”',
    tags: ['#ExecutiveVibe', '#WebCreator', '#CreativeMindset', '#Beachside'],
    shape: 'rounded-card',
    stylePreset: 'cinematic-studio',
    filters: {
      brightness: 102,
      contrast: 108,
      warmth: 15,
      goldGlowIntensity: 75,
      borderHue: '#d97706',
    },
    isFeaturedOnHome: false,
    dateAdded: '2025-01-18',
  },
];

export const initialProfileInfo: ProfileInfo = {
  nameBn: 'মোঃ তারেক',
  nameEn: 'MD Tareq',
  titleBn: 'মাঠ সহকারী কর্মকর্তা • পল্লী সঞ্চয় ব্যাংক | এমবিএ (অ্যাকাউন্টিং, এনইউ)',
  titleEn: 'Field Assistant Officer • Palli Sanchay Bank | MBA in Accounting (NU)',
  bioBn:
    'আমি বর্তমানে পল্লী সঞ্চয় ব্যাংক-এ মাঠ সহকারী কর্মকর্তা হিসেবে দায়িত্ব পালন করছি এবং জাতীয় বিশ্ববিদ্যালয় থেকে হিসাববিজ্ঞানে এমবিএ ডিগ্রিধারী। বিভিন্ন ধরণের আধুনিক ওয়েবসাইট তৈরি আমার শখ, ডিজিটাল কার্যক্রম পরিচালনা এবং ওয়েব উদ্ভাবন আমার ভালোলাগা।',
  bioEn:
    'Currently serving as a Field Assistant Officer at Palli Sanchay Bank with an MBA in Accounting (NU). Beyond professional banking, I am an enthusiastic Web Designer & Creator passionate about digital transformation.',
  organizationBn: 'পল্লী সঞ্চয় ব্যাংক (Palli Sanchay Bank)',
  organizationEn: 'Palli Sanchay Bank',
  email: 'ranguniaup@gmail.com',
  phone: '01819000000',
  whatsapp: '8801819000000',
  locationBn: 'রাঙ্গুনিয়া, চট্টগ্রাম, বাংলাদেশ',
  locationEn: 'Rangunia, Chattogram, Bangladesh',
  quoteBn: '“পরিশ্রম ও প্রযুক্তির সঠিক সমন্বয়ই এনে দিতে পারে জীবনের শ্রেষ্ঠ সাফল্য।”',
  quoteEn: '“Hard work and proper technology alignment create the greatest achievements in life.”',
  socialLinks: {
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
    whatsapp: 'https://wa.me/8801819000000',
    github: 'https://github.com',
    twitter: '',
    youtube: '',
    website: '',
  },
};

export const initialWorkExperience: WorkExperience = {
  roleBn: 'ফিল্ড অ্যাসিস্ট্যান্ট অফিসার (মাঠ সহকারী কর্মকর্তা)',
  roleEn: 'Field Assistant Officer',
  organizationBn: 'পল্লী সঞ্চয় ব্যাংক (Palli Sanchay Bank)',
  organizationEn: 'Palli Sanchay Bank (A Specialized Govt Bank)',
  locationBn: 'চট্টগ্রাম / রাঙ্গুনিয়া, বাংলাদেশ',
  locationEn: 'Chattogram / Rangunia, Bangladesh',
  periodBn: 'বর্তমান কর্মরত',
  periodEn: 'Currently Serving',
  statusBn: 'নিয়মিত কর্মকর্তা',
  statusEn: 'Full-time Officer',
  descriptionBn:
    'পল্লী সঞ্চয় ব্যাংকে মাঠ সহকারী কর্মকর্তা হিসেবে গ্রামীণ জনগণের আর্থিক অন্তর্ভুক্তি, ক্ষুদ্র সঞ্চয় উৎসাহিতকরণ, সহজ শর্তে ঋণ বিতরণ ও আদায় এবং ডিজিটাল ব্যাংকিং সেবা তৃণমূল পর্যায়ে পৌঁছে দিতে দায়িত্ব পালন করছি।',
  descriptionEn:
    'Serving as Field Assistant Officer at Palli Sanchay Bank, driving rural financial inclusion, promoting micro-savings, disbursing and recovering micro-loans, and onboarding beneficiaries to digital banking channels.',
  responsibilitiesBn: [
    'গ্রামীণ সমিতি গঠন ও সদস্যদের মধ্যে নিয়মিত সঞ্চয় বৃদ্ধির সচেতনতা তৈরি।',
    'ক্ষুদ্র ঋণ বিতরণ, প্রজেক্ট পরিদর্শন ও সময়মত কিস্তি আদায় সমন্বয়।',
    'পল্লী সঞ্চয় ব্যাংকের মোবাইল ও ডিজিটাল সেবা ব্যবহারে সদস্যদের প্রশিক্ষণ প্রদান।',
    'হিসাবের দৈনিক লেজার, ব্যালেন্স শিট যাচাই এবং একাউন্টিং সফটওয়্যারে এন্ট্রি নিশ্চিতকরণ।',
    'নারী উদ্যোক্তা ও দরিদ্র পরিবারের আর্থ-সামাজিক উন্নয়নে পরামর্শ সহায়তা প্রদান।',
  ],
  responsibilitiesEn: [
    'Organizing rural credit societies and instilling strong micro-savings culture.',
    'Appraising micro-loans, conducting field monitoring, and supervising recoveries.',
    'Assisting rural clients with digital banking platforms and cashless transactions.',
    'Reconciling daily transactions, audit verifications, and accounting software logs.',
    'Mentoring female micro-entrepreneurs and marginalized households for sustainable income.',
  ],
  stats: [
    { labelBn: 'সদস্য পরিবার সহায়তা', labelEn: 'Families Supported', value: '১৫০০+' },
    { labelBn: 'ঋণ আদায় ও সমন্বয় হার', labelEn: 'Recovery Success Rate', value: '৯৮.৫%' },
    { labelBn: 'ডিজিটাল প্রশিক্ষণ সেশন', labelEn: 'Digital Training Sessions', value: '১২০+' },
    { labelBn: 'হিসাবরক্ষণ নির্ভুলতা', labelEn: 'Accounting Accuracy', value: '১০০%' },
  ],
};

export const initialEducationList: EducationItem[] = [
  {
    id: 'edu-1',
    degreeBn: 'মাস্টার্স অব বিজনেস অ্যাডমিনিস্ট্রেশন (এমবিএ)',
    degreeEn: 'Master of Business Administration (MBA)',
    majorBn: 'হিসাববিজ্ঞান (Accounting)',
    majorEn: 'Accounting',
    institutionBn: 'জাতীয় বিশ্ববিদ্যালয় (National University - NU)',
    institutionEn: 'National University (NU)',
    boardOrAffiliationBn: 'জাতীয় বিশ্ববিদ্যালয় বাংলাদেশ',
    boardOrAffiliationEn: 'National University, Bangladesh',
    yearBn: 'স্নাতকোত্তর সম্পন্ন',
    yearEn: 'Completed',
    highlightsBn: [
      'উন্নত ফাইন্যান্সিয়াল অ্যাকাউন্টিং, কস্ট অ্যাকাউন্টিং এবং কর্পোরেট ট্যাক্সেশন।',
      'অডিট ও ফাইন্যান্সিয়াল স্টেটমেন্ট বিশ্লেষণ ও আর্থিক সিদ্ধান্ত গ্রহণ।',
      'ব্যাংকিং ম্যানেজমেন্ট ও ব্যবসায়িক কৌশল গবেষণা।',
    ],
    highlightsEn: [
      'Advanced Financial Accounting, Cost Accounting & Corporate Taxation.',
      'Auditing, Financial Statement Analysis & Strategic Capital Budgeting.',
      'Banking Operations & Quantitative Accounting Research.',
    ],
  },
  {
    id: 'edu-2',
    degreeBn: 'ব্যাচেলর অব বিজনেস স্টাডিজ (বিবিএস অনার্স)',
    degreeEn: 'Bachelor of Business Studies (BBS Honors)',
    majorBn: 'হিসাববিজ্ঞান (Accounting)',
    majorEn: 'Accounting',
    institutionBn: 'জাতীয় বিশ্ববিদ্যালয় (National University - NU)',
    institutionEn: 'National University (NU)',
    boardOrAffiliationBn: 'জাতীয় বিশ্ববিদ্যালয় বাংলাদেশ',
    boardOrAffiliationEn: 'National University, Bangladesh',
    yearBn: 'স্নাতক সম্পন্ন',
    yearEn: 'Completed',
    highlightsBn: [
      'ব্যবসায়িক গণিত, পরিসংখ্যান এবং কম্পিউটারাইজড অ্যাকাউন্টিং সিস্টেম।',
      'বাণিজ্যিক ব্যাংক ও মাইক্রোফাইন্যান্স সিস্টেমের কার্যপ্রণালী অধ্যয়ন।',
    ],
    highlightsEn: [
      'Business Statistics, Accounting Information Systems & Economics.',
      'Banking Principles and Microfinance Fundamentals.',
    ],
  },
];

export const initialWebProjectsList: WebProject[] = [
  {
    id: 'proj-1',
    titleBn: 'পল্লী লোন ও সঞ্চয় ক্যালকুলেটর ওয়েব অ্যাপ',
    titleEn: 'Rural Micro-Loan & Savings EMI Calculator',
    categoryBn: 'ফিনটেক ও ব্যাংকিং টুলস',
    categoryEn: 'FinTech & Banking Tools',
    descriptionBn:
      'ব্যাংকের গ্রাহক ও মাঠ কর্মকর্তাদের সুবিধার্থে সহজ বাংলায় কিস্তি ও মুনাফার সঠিক হিসাব বের করার আধুনিক ওয়েব ক্যালকুলেটর।',
    descriptionEn:
      'A responsive web tool for calculating micro-credit installments, interest yields, and repayment schedules in Bengali.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'FinTech'],
    demoUrl: '#',
    iconName: 'Calculator',
    isHobbyHighlight: true,
  },
  {
    id: 'proj-2',
    titleBn: 'আধুনিক গোল্ডেন পোর্টফোলিও ও পিডব্লিউএ সাইট',
    titleEn: 'Luxury Light Gold PWA Portfolio & AI Studio',
    categoryBn: 'ব্যক্তিগত ব্র্যান্ডিং ও ওয়েব ডিজাইন',
    categoryEn: 'Personal Branding & Web Development',
    descriptionBn:
      'মোবাইল ফ্রেন্ডলি, অফলাইন ইনস্টলেবল পিডব্লিউএ এবং কৃত্রিম বুদ্ধিমত্তা সমৃদ্ধ ডায়নামিক ফটো আর্ট ফ্রেম স্টুডিও।',
    descriptionEn:
      'High-performance PWA with warm golden light aesthetics, AI photo director, custom cutouts, and offline caching.',
    tags: ['PWA', 'Gemini AI', 'Tailwind', 'Canvas'],
    demoUrl: '#',
    iconName: 'Sparkles',
    isHobbyHighlight: true,
  },
  {
    id: 'proj-3',
    titleBn: 'ডিজিটাল নাগরিক সেবা ও তথ্য পোর্টাল',
    titleEn: 'Digital Citizen Services & Union Information Hub',
    categoryBn: 'পাবলিক সার্ভিস ও কমিউনিটি',
    categoryEn: 'Public Service & Community Hub',
    descriptionBn:
      'ইউনিয়ন ও গ্রামীণ মানুষের জন্য বিভিন্ন সরকারি সেবা, ভাতা তথ্য ও ডিজিটাল ফরম প্রাপ্তির ইউজার-ফ্রেন্ডলি ওয়েব প্ল্যাটফর্ম।',
    descriptionEn:
      'Community portal designed to help rural citizens find public service guidelines, union services, and forms effortlessly.',
    tags: ['Next.js', 'UI/UX Design', 'Accessibility', 'GovTech'],
    demoUrl: '#',
    iconName: 'Globe',
    isHobbyHighlight: false,
  },
  {
    id: 'proj-4',
    titleBn: 'হিসাবরক্ষণ ও দৈনিক লেজার ভেরিফায়ার',
    titleEn: 'Accounting Balance & Daily Ledger Verifier',
    categoryBn: 'একাউন্টিং অটোমেশন',
    categoryEn: 'Accounting Automation',
    descriptionBn:
      'দৈনিক ক্যাশ ট্রানজেকশন, ডেবিট-ক্রেডিট রিকনসিলিয়েশন এবং এক্সেল রিপোর্ট এক্সপোর্টের লাইটওয়েট ওয়েব সমাধান।',
    descriptionEn:
      'Lightweight ledger utility for rapid debit/credit reconciliation, cash book balance checking, and summary exports.',
    tags: ['JavaScript', 'Data Tables', 'Export to Excel'],
    demoUrl: '#',
    iconName: 'FileSpreadsheet',
    isHobbyHighlight: false,
  },
];

export const initialSkillsData: SkillCategoryItem[] = [
  {
    id: 'cat-1',
    categoryBn: 'হিসাববিজ্ঞান ও ব্যাংকিং দক্ষতা',
    categoryEn: 'Accounting & Banking Expertise',
    skills: [
      { nameBn: 'আর্থিক হিসাবরক্ষণ (Financial Accounting)', nameEn: 'Financial Accounting', level: 98 },
      { nameBn: 'ক্ষুদ্রঋণ ও মাঠ ব্যবস্থাপনা (Micro-credit)', nameEn: 'Micro-credit Management', level: 95 },
      { nameBn: 'অডিট ও লেজার রিকনসিলিয়েশন', nameEn: 'Auditing & Reconciliation', level: 92 },
      { nameBn: 'পল্লী সঞ্চয় ব্যাংক সফটওয়্যার অপারেশন', nameEn: 'Core Banking Software', level: 94 },
    ],
  },
  {
    id: 'cat-2',
    categoryBn: 'ওয়েব ডিজাইন ও টেকনোলজি (শখ ও আগ্রহ)',
    categoryEn: 'Web Development & Tech (Passion)',
    skills: [
      { nameBn: 'এইচটিএমএল, সিএসএস ও টেলউইন্ড (Tailwind)', nameEn: 'HTML5, CSS3 & Tailwind CSS', level: 90 },
      { nameBn: 'জাভাস্ক্রিপ্ট ও আধুনিক রিঅ্যাক্ট (React)', nameEn: 'JavaScript & React', level: 85 },
      { nameBn: 'রেসপনসিভ মোবাইল ও পিডব্লিউএ (PWA)', nameEn: 'Responsive UI & PWA Architecture', level: 92 },
      { nameBn: 'এআই প্রম্পট ইঞ্জিনিয়ারিং ও গ্রাফিক্স ডিজাইন', nameEn: 'AI Prompting & Graphic Cutouts', level: 88 },
    ],
  },
];

export const initialSectionVisibility: SectionVisibility = {
  hero: true,
  about: true,
  education: true,
  work: true,
  projects: true,
  aiStudio: true,
  contact: true,
};
