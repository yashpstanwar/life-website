export type PageId = 
  | 'home'
  | 'donate'
  | 'about'
  | 'work'
  | 'programme-detail'
  | 'training'
  | 'get-involved'
  | 'contact'
  | 'legal'
  | 'donate-success'
  | 'donate-failure';

export type Language = 'en' | 'hi';

export type PillarId = 
  | 'dev-comm'
  | 'research-eval'
  | 'training-inst'
  | 'edu-lit'
  | 'women-emp'
  | 'health-reform';

export interface ProgrammePillar {
  id: PillarId;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  iconName: string;
  accentColor: string;
  metric: string;
  metricLabel: string;
}

export interface DonationDetails {
  amount: number;
  customAmount: string;
  frequency: 'one-time' | 'monthly';
  programme: string;
  addFeeCoverage: boolean;
  fullName: string;
  email: string;
  mobile: string;
  pan: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  isCitizen: boolean;
  isAnonymous: boolean;
  receiveUpdates: boolean;
}

export interface ProgrammeItem {
  id: string;
  pillar: PillarId;
  pillarName: string;
  title: string;
  summary: string;
  district: string;
  year: string;
  image: string;
  duration?: string;
  partners?: string;
  reach?: string;
  problemStatement?: string;
  interventionMethod?: string;
  keyOutcomes?: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface DistrictImpact {
  id: string;
  name: string;
  nameHi: string;
  tagline: string;
  stats: {
    villages: number;
    beneficiaries: string;
    activePrograms: number;
  };
  keyInitiative: string;
  description: string;
  image: string;
}

export interface ImpactStory {
  id: string;
  name: string;
  location: string;
  category: string;
  quote: string;
  story: string;
  impactMetric: string;
  image: string;
  audioSampleTitle?: string;
}

export interface VolunteerRole {
  id: string;
  title: string;
  department: string;
  commitment: string;
  location: string;
  description: string;
  requirements: string[];
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface CourseItem {
  id: string;
  title: string;
  duration: string;
  format: string;
  location: string;
  nextStartDate: string;
  seatsTotal: number;
  seatsRemaining: number;
  overview: string;
  modules: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'donation' | 'tax80g' | 'work' | 'volunteer';
}

/** Navigation callback shared by every page component. */
export type NavigateFn = (page: PageId, extra?: unknown) => void;
