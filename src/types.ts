export type PageId = 
  | 'home'
  | 'donate'
  | 'about'
  | 'work'
  | 'programme-detail'
  | 'research'
  | 'training'
  | 'get-involved'
  | 'contact'
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
}

export interface ResearchPaper {
  id: string;
  title: string;
  type: 'Survey' | 'Evaluation' | 'Impact study';
  commissionedBy: string;
  year: string;
  fileSize: string;
}

export interface CourseItem {
  id: string;
  title: string;
  duration: string;
  format: string;
  location: string;
  nextStartDate: string;
}

/** Navigation callback shared by every page component. */
export type NavigateFn = (page: PageId, extra?: unknown) => void;
