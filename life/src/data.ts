import { ProgrammePillar, ProgrammeItem, ResearchPaper, CourseItem } from './types';

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

export const GOVERNING_BODY = [
  {
    name: '[placeholder]',
    role: 'President & Executive Member',
    bio: '[placeholder] leading strategic development and field operations.'
  },
  {
    name: '[placeholder]',
    role: 'Vice President',
    bio: '[placeholder] advising on research methodology and public policy.'
  },
  {
    name: '[placeholder]',
    role: 'General Secretary',
    bio: '[placeholder] managing institute operations and donor relations.'
  },
  {
    name: '[placeholder]',
    role: 'Treasurer & Academic Advisor',
    bio: '[placeholder] overseeing institutional audits and field training programmes.'
  }
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
    duration: '12 Months [placeholder]',
    partners: 'District Health Society, Jaipur [placeholder]',
    reach: '45,000 Beneficiaries [placeholder]'
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
    duration: '8 Months [placeholder]',
    partners: 'State Education Department [placeholder]',
    reach: '18,000 Children [placeholder]'
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
    duration: '6 Months [placeholder]',
    partners: 'I.I.D.C. Training Wing [placeholder]',
    reach: '350 Field Workers [placeholder]'
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
    duration: '14 Months [placeholder]',
    partners: 'Rural Development Trust [placeholder]',
    reach: '60,000 Villagers [placeholder]'
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
    duration: '10 Months [placeholder]',
    partners: 'Women & Child Development Cell [placeholder]',
    reach: '12,500 Women [placeholder]'
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
    duration: '18 Months [placeholder]',
    partners: 'Independent Evaluation Panel [placeholder]',
    reach: '120 Sample Villages [placeholder]'
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'res-1',
    title: 'Baseline Survey on Maternal Health Information Delivery in Desert Districts',
    type: 'Survey',
    commissionedBy: 'Health Department, Government of Rajasthan [placeholder]',
    year: '2025',
    fileSize: '2.4 MB PDF'
  },
  {
    id: 'res-2',
    title: 'Impact Study of Community Radio Broadcasts on Rural Literacy Adoption',
    type: 'Impact study',
    commissionedBy: 'Autonomous Educational Foundation [placeholder]',
    year: '2025',
    fileSize: '4.1 MB PDF'
  },
  {
    id: 'res-3',
    title: 'Evaluation of Grassroots Volunteer Training Modules in Western Rajasthan',
    type: 'Evaluation',
    commissionedBy: 'I.I.D.C. Academic Council [placeholder]',
    year: '2024',
    fileSize: '1.8 MB PDF'
  },
  {
    id: 'res-4',
    title: 'Socio-Economic Survey on Women Self-Help Groups in Tribal Blocks',
    type: 'Survey',
    commissionedBy: 'State Rural Livelihoods Mission [placeholder]',
    year: '2024',
    fileSize: '3.6 MB PDF'
  },
  {
    id: 'res-5',
    title: 'Audio-Visual Media Effectiveness in Environmental Awareness Campaigns',
    type: 'Evaluation',
    commissionedBy: 'Private Research Trust [placeholder]',
    year: '2023',
    fileSize: '2.9 MB PDF'
  }
];

export const COURSES: CourseItem[] = [
  {
    id: 'c1',
    title: 'Development Communication & Audio-Visual Media Workshop',
    duration: '2 Weeks [placeholder]',
    format: 'In-person / Hands-on [placeholder]',
    location: 'I.I.D.C. Campus, Jaipur [placeholder]',
    nextStartDate: '15 September 2026 [placeholder]'
  },
  {
    id: 'c2',
    title: 'Field Survey Methodologies & Data Collection for Health Workers',
    duration: '1 Week [placeholder]',
    format: 'Field & Classroom [placeholder]',
    location: 'Barmer Resource Centre [placeholder]',
    nextStartDate: '01 October 2026 [placeholder]'
  },
  {
    id: 'c3',
    title: 'Master Trainer Certification in Community Outreach',
    duration: '1 Month [placeholder]',
    format: 'Residential Intensive [placeholder]',
    location: 'I.I.D.C. Campus, Jaipur [placeholder]',
    nextStartDate: '10 November 2026 [placeholder]'
  },
  {
    id: 'c4',
    title: 'Women Empowerment Facilitation & Self-Help Mobilization',
    duration: '10 Days [placeholder]',
    format: 'Interactive Workshop [placeholder]',
    location: 'Udaipur Centre [placeholder]',
    nextStartDate: '01 December 2026 [placeholder]'
  }
];

export const DONATION_AMOUNTS_MAP = {
  500: '₹500 prints 200 Hindi awareness leaflets',
  1000: '₹1,000 trains one village volunteer for a day',
  2500: '₹2,500 produces one district radio spot',
  5000: '₹5,000 funds a training camp for ten workers'
};
