import { ProgrammePillar, ProgrammeItem, CourseItem } from './types';

export const PILLARS: ProgrammePillar[] = [
  {
    id: 'dev-comm',
    title: 'Development Communication',
    titleHi: 'विकास संचार',
    description: 'campaigns and audio-visual messaging on health, environment, nutrition, literacy',
    descriptionHi: 'स्वास्थ्य, पर्यावरण, पोषण और साक्षरता पर अभियान और ऑडियो-विजुअल संदेश'
  },
  {
    id: 'research-eval',
    title: 'Research & Evaluation',
    titleHi: 'अनुसंधान एवं मूल्यांकन',
    description: 'surveys and impact studies for government and private institutions',
    descriptionHi: 'सरकारी और निजी संस्थानों के लिए सर्वेक्षण और प्रभाव अध्ययन'
  },
  {
    id: 'training-inst',
    title: 'Training & Institute',
    titleHi: 'प्रशिक्षण एवं संस्थान',
    description: 'training field workers, volunteers and master trainers',
    descriptionHi: 'फील्ड कार्यकर्ताओं, स्वयंसेवकों और मास्टर प्रशिक्षकों को प्रशिक्षण'
  },
  {
    id: 'edu-lit',
    title: 'Education & Literacy',
    titleHi: 'शिक्षा एवं साक्षरता',
    description: 'schooling access for deprived communities',
    descriptionHi: 'वंचित समुदायों के लिए स्कूली शिक्षा तक पहुंच'
  },
  {
    id: 'women-emp',
    title: "Women's Empowerment",
    titleHi: 'महिला सशक्तिकरण',
    description: "raising women's status and self-reliance",
    descriptionHi: 'महिलाओं के स्तर और स्वावलंबन को बढ़ावा देना'
  },
  {
    id: 'health-reform',
    title: 'Health & Social Reform',
    titleHi: 'स्वास्थ्य एवं सामाजिक सुधार',
    description: 'health awareness, blood and eye donation drives',
    descriptionHi: 'स्वास्थ्य जागरूकता, रक्तदान और नेत्रदान अभियान'
  }
];

export const OBJECTIVES = [
  'Public awareness through mass communication on welfare, literacy, environment, nutrition and health.',
  'Programme evaluation, planning and reporting.',
  'Producing and broadcasting research-based audio-visual and print material.',
  'Establishing a mass communication research and training institute.',
  'Development and research advisory services.',
  'Evaluating government, autonomous and private institution activities.',
  'Human development research and social and economic surveys.',
  'Communication planning and media consultancy for other organisations.',
  'Camps, seminars and conferences on contemporary issues.',
  'Awards, scholarships and grants.',
  "Women's empowerment and self-reliance.",
  'Health awareness, blood and eye donation, and campaigns against social evils.',
  'Literacy and schooling for deprived communities.',
  'All objectives pursued without distinction of colour, class, religion, caste or gender, free of political affiliation and not for profit.'
];

export const PROGRAMMES: ProgrammeItem[] = [
  {
    id: 'barmer-maternal-health',
    pillar: 'health-reform',
    pillarName: 'Health & Social Reform',
    title: 'Maternal Health Literacy in Barmer',
    summary: 'Localized audio dramas and trained peer-educators bringing vital maternal health scheme information to remote desert blocks.',
    district: 'Barmer',
    year: '2025–2026',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800',
    duration: '12 Months',
    partners: 'District Health Society, Jaipur',
    reach: '45,000 Beneficiaries'
  },
  {
    id: 'bikaner-literacy-drive',
    pillar: 'edu-lit',
    pillarName: 'Education & Literacy',
    title: 'Grassroots Literacy & School Access Campaign',
    summary: 'Community-led enrollment drives and interactive storytelling kits for deprived rural communities across north Rajasthan.',
    district: 'Bikaner',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    duration: '8 Months',
    partners: 'State Education Department',
    reach: '18,000 Children'
  },
  {
    id: 'jaipur-field-training',
    pillar: 'training-inst',
    pillarName: 'Training & Institute',
    title: 'Master Trainer Certification for Rural Health Workers',
    summary: 'Capacity-building workshops equipping frontline volunteers with audiovisual communication tools.',
    district: 'Jaipur',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800',
    duration: '6 Months',
    partners: 'I.I.D.C. Training Wing',
    reach: '350 Field Workers'
  },
  {
    id: 'jaisalmer-water-nutrition',
    pillar: 'dev-comm',
    pillarName: 'Development Communication',
    title: 'Nutrition & Environmental Awareness Caravans',
    summary: 'Street plays and radio broadcasts addressing drought survival, clean water storage, and child nutrition.',
    district: 'Jaisalmer',
    year: '2024–2025',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800',
    duration: '14 Months',
    partners: 'Rural Development Trust',
    reach: '60,000 Villagers'
  },
  {
    id: 'udaipur-women-self-reliance',
    pillar: 'women-emp',
    pillarName: "Women's Empowerment",
    title: 'Self-Reliance & Financial Inclusion Workshop Series',
    summary: 'Legal rights awareness, vocational skill guidance, and self-help group formation in tribal regions.',
    district: 'Udaipur',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    duration: '10 Months',
    partners: 'Women & Child Development Cell',
    reach: '12,500 Women'
  },
  {
    id: 'state-impact-eval',
    pillar: 'research-eval',
    pillarName: 'Research & Evaluation',
    title: 'Impact Evaluation of Public Welfare Schemes in Western Rajasthan',
    summary: 'Comprehensive field survey assessing communication bottlenecks in scheme adoption and service delivery.',
    district: 'Barmer & Bikaner',
    year: '2025–2026',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    duration: '18 Months',
    partners: 'Independent Evaluation Panel',
    reach: '120 Sample Villages'
  }
];

export const COURSES: CourseItem[] = [
  {
    id: 'c1',
    title: 'Development Communication & Audio-Visual Media Workshop',
    duration: '2 Weeks',
    format: 'In-person / Hands-on',
    location: 'I.I.D.C. Campus, Jaipur',
    nextStartDate: '15 September 2026'
  },
  {
    id: 'c2',
    title: 'Field Survey Methodologies & Data Collection for Health Workers',
    duration: '1 Week',
    format: 'Field & Classroom',
    location: 'Barmer Resource Centre',
    nextStartDate: '01 October 2026'
  },
  {
    id: 'c3',
    title: 'Master Trainer Certification in Community Outreach',
    duration: '1 Month',
    format: 'Residential Intensive',
    location: 'I.I.D.C. Campus, Jaipur',
    nextStartDate: '10 November 2026'
  },
  {
    id: 'c4',
    title: 'Women Empowerment Facilitation & Self-Help Mobilization',
    duration: '10 Days',
    format: 'Interactive Workshop',
    location: 'Udaipur Centre',
    nextStartDate: '01 December 2026'
  }
];

export const DONATION_AMOUNTS_MAP = {
  500: '₹500 prints 200 Hindi awareness leaflets',
  1000: '₹1,000 trains one village volunteer for a day',
  2500: '₹2,500 produces one district radio spot',
  5000: '₹5,000 funds a training camp for ten workers'
};

/**
 * Organisation details. Single source of truth — the header, footer and
 * contact page all read from here, so a phone number changes in one place.
 */
export const ORG = {
  brandName: 'LIFE',
  registeredName: 'Indian Institute of Development and Communication (I.I.D.C.)',
  shortName: 'LIFE (I.I.D.C.)',
  addressLines: ['19, Shri Ram Nagar-B, Kanta, Jhotwara', 'Jaipur, Rajasthan 302012'],
  addressOneLine: '19, Shri Ram Nagar-B, Kanta, Jhotwara, Jaipur, Rajasthan 302012',
  phones: ['+91 70147 78387', '+91 82332 37530', '+91 63769 18299'],
  email: 'lifengo.org@gmail.com',
  city: 'Jaipur',
  state: 'Rajasthan',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d222.30056336610383!2d75.74466634855588!3d26.94126850466042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1785885341761!5m2!1sen!2sin',
  motto: "Change doesn't arrive on its own. Someone has to carry it.",
};

export const IMPACT_STATS = [
  { value: '87', label: 'Villages reached' },
  { value: '1,758', label: 'People trained' },
  { value: '22', label: 'Campaigns produced' },
  { value: '30', label: 'Years of work' },
];

export const PARTNERS = [
  'Governor of Rajasthan',
  'UNICEF Rajasthan',
  'Jaipur Academic Council',
  'State Literacy Mission',
];
