export type Language = 'bn' | 'en';

export type CutoutShape =
  | 'golden-arch'
  | 'circle-ring'
  | 'hexagon'
  | 'octagon'
  | 'blob'
  | 'rounded-card';

export type AIStylePreset =
  | 'luxury-gold'
  | 'executive-banker'
  | 'web-creator'
  | 'cinematic-studio'
  | 'sepia-classic';

export interface PhotoItem {
  id: string;
  title: string;
  bengaliTitle?: string;
  url: string;
  badge: string;
  caption: string;
  quote?: string;
  tags: string[];
  shape: CutoutShape;
  stylePreset: AIStylePreset;
  filters: {
    brightness: number;
    contrast: number;
    warmth: number;
    goldGlowIntensity: number;
    vignette?: number;
    borderHue?: string;
  };
  isFeaturedOnHome?: boolean;
  dateAdded: string;
}

export interface WorkExperience {
  roleBn: string;
  roleEn: string;
  organizationBn: string;
  organizationEn: string;
  locationBn: string;
  locationEn: string;
  periodBn: string;
  periodEn: string;
  statusBn: string;
  statusEn: string;
  descriptionBn: string;
  descriptionEn: string;
  responsibilitiesBn: string[];
  responsibilitiesEn: string[];
  stats: {
    labelBn: string;
    labelEn: string;
    value: string;
  }[];
}

export interface EducationItem {
  id?: string;
  degreeBn: string;
  degreeEn: string;
  majorBn: string;
  majorEn: string;
  institutionBn: string;
  institutionEn: string;
  boardOrAffiliationBn: string;
  boardOrAffiliationEn: string;
  yearBn: string;
  yearEn: string;
  highlightsBn: string[];
  highlightsEn: string[];
}

export interface WebProject {
  id: string;
  titleBn: string;
  titleEn: string;
  categoryBn: string;
  categoryEn: string;
  descriptionBn: string;
  descriptionEn: string;
  tags: string[];
  demoUrl?: string;
  iconName: string;
  isHobbyHighlight?: boolean;
}

export interface SkillItem {
  nameBn: string;
  nameEn: string;
  level: number;
}

export interface SkillCategoryItem {
  id: string;
  categoryBn: string;
  categoryEn: string;
  skills: SkillItem[];
}

export interface SocialLinks {
  facebook?: string;
  linkedin?: string;
  whatsapp?: string;
  github?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
}

export interface ProfileInfo {
  nameBn: string;
  nameEn: string;
  titleBn: string;
  titleEn: string;
  bioBn: string;
  bioEn: string;
  organizationBn: string;
  organizationEn: string;
  email: string;
  phone: string;
  whatsapp: string;
  locationBn: string;
  locationEn: string;
  quoteBn: string;
  quoteEn: string;
  socialLinks?: SocialLinks;
}

export interface SectionVisibility {
  hero: boolean;
  about: boolean;
  education: boolean;
  work: boolean;
  projects: boolean;
  aiStudio: boolean;
  contact: boolean;
}
