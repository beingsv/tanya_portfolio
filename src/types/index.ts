export interface Scholar {
  fullName: string;
  title: string;
  affiliation: string;
  tagline: string;
  profilePhotoUrl: string;
}

export interface EducationMilestone {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number | null;
}

export interface ResearchItem {
  id: string;
  title: string;
  description: string;
  venue: string;
  externalUrl?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface InterestArea {
  id: string;
  label: string;
  summary: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
}

export interface ContactInfo {
  email: string;
  links: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url?: string;
  icon?: string;
}

export interface SectionLink {
  id: string;
  label: string;
}
