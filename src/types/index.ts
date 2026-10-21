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
