import {
  ProgrammePillar,
  ProgrammeItem,
  CourseItem,
  DistrictImpact,
  ImpactStory,
  VolunteerRole,
  Milestone,
  FAQItem
} from './types';

export const PILLARS: ProgrammePillar[] = [
  {
    id: 'dev-comm',
    title: 'Development Communication',
    titleHi: 'विकास संचार',
    description: 'Hyper-localized audio-visual campaigns, street puppet theatre, and community radio bridging critical awareness gaps on nutrition, healthcare, and water.',
    descriptionHi: 'स्वास्थ्य, पर्यावरण, पोषण और साक्षरता पर अभियान, कठपुतली नाटक और ऑडियो-विजुअल संदेश।',
    iconName: 'Megaphone',
    accentColor: 'from-amber-500 to-orange-600',
    metric: '60,000+',
    metricLabel: 'Villagers Reached Directly'
  },
  {
    id: 'health-reform',
    title: 'Health & Social Reform',
    titleHi: 'स्वास्थ्य एवं सामाजिक सुधार',
    description: 'Maternal-child health literacy, localized rural health camps, blood donation drives, and systematic eradication of harmful social stigmas.',
    descriptionHi: 'मातृ-शिशु स्वास्थ्य जागरूकता, ग्रामीण स्वास्थ्य शिविर, रक्तदान और सामाजिक कुरीतियों के विरुद्ध अभियान।',
    iconName: 'HeartPulse',
    accentColor: 'from-rose-500 to-red-600',
    metric: '45,000+',
    metricLabel: 'Mothers & Infants Protected'
  },
  {
    id: 'edu-lit',
    title: 'Education & Literacy',
    titleHi: 'शिक्षा एवं साक्षरता',
    description: 'Grassroots learning caravans, interactive Devanagari literacy kits, and re-enrollment drives for out-of-school desert children.',
    descriptionHi: 'वंचित समुदायों के बच्चों के लिए स्कूली शिक्षा तक पहुंच, नामांकन अभियान और रोचक शिक्षण सामग्री।',
    iconName: 'BookOpen',
    accentColor: 'from-blue-500 to-indigo-600',
    metric: '18,000+',
    metricLabel: 'Children in Classrooms'
  },
  {
    id: 'women-emp',
    title: "Women's Empowerment",
    titleHi: 'महिला सशक्तिकरण',
    description: 'Self-help group mobilization, legal rights coaching, micro-enterprise training, and economic self-reliance for rural & tribal women.',
    descriptionHi: 'महिलाओं के स्वावलंबन, कानूनी अधिकारों की जानकारी और स्वयं सहायता समूहों का गठन व संवर्धन।',
    iconName: 'Sparkles',
    accentColor: 'from-purple-500 to-pink-600',
    metric: '12,500+',
    metricLabel: 'Women Financially Empowered'
  },
  {
    id: 'research-eval',
    title: 'Research & Evaluation',
    titleHi: 'अनुसंधान एवं मूल्यांकन',
    description: 'Rigorous ground surveys, last-mile policy bottleneck studies, and independent evaluation of welfare schemes for state and central bodies.',
    descriptionHi: 'सरकारी और निजी संस्थानों के लिए सामाजिक-आर्थिक सर्वेक्षण, नीतिगत प्रभाव और फील्ड अध्ययन।',
    iconName: 'BarChart3',
    accentColor: 'from-teal-500 to-emerald-600',
    metric: '120+',
    metricLabel: 'Panchayats Surveyed'
  },
  {
    id: 'training-inst',
    title: 'Training & Master Institute',
    titleHi: 'प्रशिक्षण एवं संस्थान',
    description: 'State-level capacity-building academy certifying frontline ASHAs, Anganwadi workers, and village volunteers in communication methodologies.',
    descriptionHi: 'फील्ड कार्यकर्ताओं, स्वयंसेवकों और मास्टर प्रशिक्षकों को संचार एवं नेतृत्व का उच्चस्तरीय प्रशिक्षण।',
    iconName: 'GraduationCap',
    accentColor: 'from-amber-600 to-yellow-600',
    metric: '1,750+',
    metricLabel: 'Master Trainers Certified'
  }
];

export const DISTRICTS: DistrictImpact[] = [
  {
    id: 'barmer',
    name: 'Barmer',
    nameHi: 'बाड़मेर',
    tagline: 'Maternal Healthcare & Desert Outreaches',
    stats: {
      villages: 34,
      beneficiaries: '45,000+',
      activePrograms: 3
    },
    keyInitiative: 'Janani Suraksha Audio Drama & Peer-Counseling Caravan',
    description: 'Reaching deep desert dhani settlements across Shiv, Chohtan, and Baytu with portable solar audio systems, increasing institutional deliveries by 42%.',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bikaner',
    name: 'Bikaner',
    nameHi: 'बीकानेर',
    tagline: 'Last-Mile Child Literacy & School Retention',
    stats: {
      villages: 22,
      beneficiaries: '18,000+',
      activePrograms: 2
    },
    keyInitiative: 'Grassroots Literacy Caravans & School Access',
    description: 'Partnering with local village elders and school management committees to enroll nomadic children and provide foundational Hindi storytelling kits.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'jaipur',
    name: 'Jaipur & Central Rajasthan',
    nameHi: 'जयपुर',
    tagline: 'Master Trainer Institute & Policy Evaluation Hub',
    stats: {
      villages: 18,
      beneficiaries: '25,000+',
      activePrograms: 4
    },
    keyInitiative: 'I.I.D.C. Master Trainer Academy & Media Lab',
    description: 'State headquarters at Jhotwara housing production facilities for audio spots, training wings, and strategic advisory for development bodies.',
    image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'jaisalmer',
    name: 'Jaisalmer',
    nameHi: 'जैसलमेर',
    tagline: 'Water Conservation & Nutrition Resilience',
    stats: {
      villages: 28,
      beneficiaries: '60,000+',
      activePrograms: 2
    },
    keyInitiative: 'Traditional Water Wisdom & Child Nutrition Drives',
    description: 'Community radio broadcasts and localized puppet street plays promoting groundwater preservation, drought survival, and fortified nutrition.',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'udaipur',
    name: 'Udaipur & Southern Tribal Belt',
    nameHi: 'उदयपुर',
    tagline: 'Tribal Women Self-Reliance & Forest Rights',
    stats: {
      villages: 26,
      beneficiaries: '12,500+',
      activePrograms: 2
    },
    keyInitiative: 'Women Self-Help Group Legal & Financial Literacy',
    description: 'Coaching tribal women in micro-credit management, non-timber forest produce pricing, and maternal health rights in regional Mewari/Bhilodi dialects.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
  }
];

export const STORIES: ImpactStory[] = [
  {
    id: 'savita-barmer',
    name: 'Savita Devi',
    location: 'Chohtan, Barmer',
    category: 'Maternal Healthcare',
    quote: 'I had lost hope during my first pregnancy. The puppet show showed me that the government hospital would care for me without asking for money.',
    story: 'Savita, 24, lives in an isolated desert settlement where traditional deliveries often resulted in complications. When LIFE’s audio caravan arrived with regional folk songs explaining the Janani Suraksha Yojana, she and her family registered at the primary health centre. Today, both Savita and her baby boy are thriving.',
    impactMetric: 'Institutional Delivery & Full Immunisation Achieved',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=700',
    audioSampleTitle: 'Barmer Radio Drama: Kavita Ki Kahani (Snippet)'
  },
  {
    id: 'kamla-udaipur',
    name: 'Kamla Bai',
    location: 'Jhadol Block, Udaipur',
    category: "Women's Empowerment",
    quote: 'Earlier, we could not sign our names or step outside. Now, our self-help group runs a local organic grain collective and sends every daughter to school.',
    story: 'Through LIFE’s 10-day intensive legal literacy and SHG workshop series, Kamla gained the confidence to unite 18 women in her village. They collectively secured micro-loans from a rural regional bank and established fair pricing for forest produce.',
    impactMetric: '18 Women Entrepreneurs & Independent Household Earners',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=700'
  },
  {
    id: 'mohan-jaipur',
    name: 'Mohan Lal Sharma',
    location: 'Sanganer, Jaipur',
    category: 'Master Trainer Certification',
    quote: 'As field workers, we had pamphlets that villagers could not read. LIFE taught us to communicate through stories, games, and participatory listening.',
    story: 'A veteran field worker with 12 years of community service, Mohan underwent the 1-month Master Trainer Certification at LIFE’s Jaipur campus. Equipped with audio visual pedagogy, he has since trained over 140 frontline ASHA workers.',
    impactMetric: '140+ Frontline Health Workers Multiplied in Impact',
    image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=700'
  }
];

export const PROGRAMMES: ProgrammeItem[] = [
  {
    id: 'barmer-maternal-health',
    pillar: 'health-reform',
    pillarName: 'Health & Social Reform',
    title: 'Maternal Health Literacy & Safe Delivery in Barmer',
    summary: 'Localized audio dramas, participatory puppet plays, and trained peer-educators bringing vital maternal health scheme information to remote desert blocks.',
    district: 'Barmer',
    year: '2025–2026',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800',
    duration: '12 Months Active',
    partners: 'District Health Society, Jaipur & Local Gram Panchayats',
    reach: '45,000 Beneficiaries',
    problemStatement: 'Severe desert isolation and low female literacy led expectant mothers in remote dhanis to delay medical care, resulting in elevated neonatal vulnerability.',
    interventionMethod: 'Field caravans equipped with solar-powered speakers, staged audio plays in local Marwari, accompanied by trained woman-to-woman peer counseling.',
    keyOutcomes: [
      '42% increase in institutional deliveries within targeted blocks',
      'Over 3,200 expectant mothers registered under government incentive schemes',
      '100% distribution of maternal nutrition tracking cards'
    ],
    testimonial: {
      quote: 'When health information is delivered in our own mother tongue, families listen and fear dissolves.',
      author: 'Dr. R. K. Rathore',
      role: 'Block Chief Medical Officer'
    }
  },
  {
    id: 'bikaner-literacy-drive',
    pillar: 'edu-lit',
    pillarName: 'Education & Literacy',
    title: 'Grassroots Literacy & School Access Campaign',
    summary: 'Community-led enrollment drives, portable libraries, and interactive Devanagari storytelling kits for deprived rural communities across north Rajasthan.',
    district: 'Bikaner',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    duration: '8 Months',
    partners: 'State Education Department & Village Panchayats',
    reach: '18,000 Children',
    problemStatement: 'Seasonal migration and lack of learning interest resulted in steep primary dropout rates, especially among young girls.',
    interventionMethod: 'Engaging weekend storytelling circles, colorful illustrated Hindi learning toolkits, and direct parent counseling on government mid-day meal & scholarship benefits.',
    keyOutcomes: [
      '1,420 out-of-school children successfully re-enrolled',
      '85 community volunteer study centres established',
      'Retention rates in participating schools improved by 34%'
    ]
  },
  {
    id: 'jaipur-field-training',
    pillar: 'training-inst',
    pillarName: 'Training & Institute',
    title: 'Master Trainer Certification for Rural Health Workers',
    summary: 'Capacity-building workshops equipping frontline health workers and volunteers with audiovisual communication, dialogue tools, and leadership competencies.',
    district: 'Jaipur',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=800',
    duration: '6 Months',
    partners: 'I.I.D.C. Training Wing & Rajasthan Public Health Forum',
    reach: '350 Field Workers',
    problemStatement: 'Frontline health workers are rarely taught communication or empathy-driven persuasion, creating misunderstandings during village surveys.',
    interventionMethod: 'Residential intensive modules covering audio production, group moderation techniques, conflict resolution, and data collection tools.',
    keyOutcomes: [
      '350 master trainers certified across 7 Rajasthan divisions',
      'Custom handbook in Hindi published and distributed free to trainees',
      '98% pass rate in practical field demonstration evaluations'
    ]
  },
  {
    id: 'jaisalmer-water-nutrition',
    pillar: 'dev-comm',
    pillarName: 'Development Communication',
    title: 'Nutrition & Environmental Awareness Caravans',
    summary: 'Community caravans, puppet theatre, and radio broadcasts addressing drought survival, clean water storage, and child nutrition in hyper-arid zones.',
    district: 'Jaisalmer',
    year: '2024–2025',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800',
    duration: '14 Months',
    partners: 'Rural Development Trust & Water Aid Networks',
    reach: '60,000 Villagers',
    problemStatement: 'Recurrent drought seasons lead to chronic infant malnutrition and high incidences of waterborne infections from unhygienic storage.',
    interventionMethod: 'Multi-lingual street theatre troupes and folk songs demonstrating low-cost water filtration, millets preparation, and ORS preparation.',
    keyOutcomes: [
      '60,000 villagers attended live interactive street caravan sessions',
      '50 community water harvesting structures revived and sanitized',
      'Childhood diarrhea reported cases reduced by 48%'
    ]
  },
  {
    id: 'udaipur-women-self-reliance',
    pillar: 'women-emp',
    pillarName: "Women's Empowerment",
    title: 'Self-Reliance & Financial Inclusion Workshop Series',
    summary: 'Legal rights awareness, vocational skills coaching, and self-help group formation in tribal regions of Udaipur, Dungarpur, and Banswara.',
    district: 'Udaipur',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    duration: '10 Months',
    partners: 'Women & Child Development Cell & NABARD Partners',
    reach: '12,500 Women',
    problemStatement: 'Tribal women faced economic disenfranchisement and exploitation from non-regulated money lenders due to lack of banking literacy.',
    interventionMethod: 'Practical simulations on opening bank accounts, understanding interest rates, legal rights under forest acts, and collective bargaining.',
    keyOutcomes: [
      '112 new self-help groups registered with formal bank linkage',
      '₹1.8 Crore in cumulative credit unlocked for small cottage enterprises',
      'Over 2,400 women acquired basic digital UPI and banking numeracy'
    ]
  },
  {
    id: 'state-impact-eval',
    pillar: 'research-eval',
    pillarName: 'Research & Evaluation',
    title: 'Impact Evaluation of Public Welfare Schemes in Western Rajasthan',
    summary: 'Comprehensive ground survey assessing communication bottlenecks in scheme adoption and service delivery across remote panchayats.',
    district: 'Barmer & Bikaner',
    year: '2025–2026',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    duration: '18 Months',
    partners: 'Independent Evaluation Panel & Academic Researchers',
    reach: '120 Sample Villages',
    problemStatement: 'Government policy planners lacked qualitative ground feedback on why well-funded welfare schemes had sluggish uptake in desert terrain.',
    interventionMethod: 'Rigorous mixed-method surveys, randomized sample interviews with 2,400 households, and participatory focus group discussions.',
    keyOutcomes: [
      'Comprehensive 140-page whitepaper presented to state administrators',
      'Identification of 7 critical administrative choke points in application flows',
      'Recommendations adopted in 2026 state communication guideline revision'
    ]
  }
];

export const COURSES: CourseItem[] = [
  {
    id: 'c1',
    title: 'Development Communication & Audio-Visual Media Workshop',
    duration: '2 Weeks (Full Time)',
    format: 'In-person / Hands-on Media Lab',
    location: 'I.I.D.C. Campus, Jhotwara, Jaipur',
    nextStartDate: '15 September 2026',
    seatsTotal: 25,
    seatsRemaining: 6,
    overview: 'Learn the principles of crafting high-impact behavioral change communications, producing low-cost audio spots, and scripting for rural audiences.',
    modules: [
      'Field Assessment & Empathy Mapping',
      'Audio Storyboarding & Scripting in Regional Dialects',
      'Mobile Audio Recording & Field Sound Engineering',
      'Community Radio & Street Theatre Dynamics'
    ]
  },
  {
    id: 'c2',
    title: 'Field Survey Methodologies & Socio-Economic Data Collection',
    duration: '1 Week Intensive',
    format: 'Field Practicum & Classroom',
    location: 'Barmer Resource Centre & Field Camps',
    nextStartDate: '01 October 2026',
    seatsTotal: 30,
    seatsRemaining: 9,
    overview: 'Designed for NGOs and researchers conducting ground surveys in desert and rural terrains. Covers ethical consent, mobile data collection, and qualitative interviews.',
    modules: [
      'Sampling Frameworks for Remote Populations',
      'Digital Survey Tools (Kobo / ODK / Google Forms)',
      'Mitigating Investigator Bias & Cultural Nuance',
      'Data Cleaning, Verification & Synthesis'
    ]
  },
  {
    id: 'c3',
    title: 'Master Trainer Certification in Community Outreach',
    duration: '1 Month Residential Intensive',
    format: 'Campus Residency + Field Apprenticeship',
    location: 'I.I.D.C. Campus, Jaipur',
    nextStartDate: '10 November 2026',
    seatsTotal: 20,
    seatsRemaining: 4,
    overview: 'Our premier certification equipping senior NGO coordinators and public health officers with pedagogical mastery to train hundreds of village-level workers.',
    modules: [
      'Adult Learning Methodologies & Participatory Action',
      'Training Needs Analysis & Curriculum Design',
      'Handling Resistance & Taboo Community Topics',
      'Monitoring Training Efficacy & Post-Training Impact'
    ]
  },
  {
    id: 'c4',
    title: 'Women Empowerment Facilitation & Self-Help Mobilization',
    duration: '10 Days Interactive',
    format: 'Interactive Workshop & Peer Exchange',
    location: 'Udaipur Centre',
    nextStartDate: '01 December 2026',
    seatsTotal: 25,
    seatsRemaining: 8,
    overview: 'Training community facilitators to catalyze sustainable self-help groups, guide micro-savings, and navigate institutional banking channels for women.',
    modules: [
      'SHG Formation Norms & Bookkeeping Fundamentals',
      'Financial Inclusion: Bank Credit Linkage & Schemes',
      'Legal Rights & Conflict Resolution within Collectives',
      'Livelihood Diversification & Market Aggregation'
    ]
  }
];

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    id: 'field-researcher',
    title: 'Field Research & Survey Fellow',
    department: 'Research & Evaluation',
    commitment: '3–6 Months (Full / Part Time)',
    location: 'Barmer, Bikaner, or Jaipur',
    description: 'Travel with our survey team to desert hamlets, conduct structured interviews with village beneficiaries, and assist in documentation.',
    requirements: [
      'Fluency in Hindi (basic familiarity with Marwari/Mewari is a bonus)',
      'Empathy and readiness for rural field travel',
      'Interest in public health, sociology, or public policy'
    ]
  },
  {
    id: 'media-audio',
    title: 'Audio Production & Creative Content Creator',
    department: 'Development Communication',
    commitment: 'Flexible (Hybrid / Remote or Studio)',
    location: 'Jaipur Studio or Remote',
    description: 'Help edit community radio broadcasts, create engaging social media reels of our grassroots programs, and design visual infographics.',
    requirements: [
      'Familiarity with audio/video editing software (Audacity, Premiere, Canva, etc.)',
      'Passion for social impact and storytelling',
      'Ability to translate complex policy into relatable language'
    ]
  },
  {
    id: 'translation-fellow',
    title: 'Regional Dialect & Devanagari Translator',
    department: 'Editorial & Curriculum',
    commitment: 'Flexible / Project-Based (Remote)',
    location: 'Remote',
    description: 'Translate training modules, health handouts, and legal awareness primers from English/Hindi into regional Rajasthani dialects.',
    requirements: [
      'Exceptional written command over Hindi & Devanagari script',
      'Familiarity with Marwari, Mewari, Dhundhari, or Shekhawati',
      'Attention to clarity and grassroots accessibility'
    ]
  },
  {
    id: 'campus-ambassador',
    title: 'Youth & University Ambassador',
    department: 'Advocacy & Partnerships',
    commitment: '2–4 Hours/Week (Flexible)',
    location: 'Pan-India Colleges & Universities',
    description: 'Organize campus awareness sessions, drive youth volunteer signups, and spearhead awareness campaigns for rural literacy and health.',
    requirements: [
      'Enrolled college student with leadership enthusiasm',
      'Strong presentation and interpersonal skills',
      'Desire to build social impact credentials'
    ]
  }
];

export const MILESTONES: Milestone[] = [
  {
    year: '1994',
    title: 'Foundation of I.I.D.C. in Jaipur',
    description: 'Registered under Rajasthan Societies Registration Act with the visionary mission: "Change doesn’t arrive on its own. Someone has to carry it."'
  },
  {
    year: '2001',
    title: 'First Large-Scale Desert Audio Caravans',
    description: 'Pioneered localized cassette and battery-operated loudspeaker campaigns reaching 80+ isolated desert dhanis on water sanitation and polio.'
  },
  {
    year: '2008',
    title: 'State Master Trainer Institute Established',
    description: 'Inaugurated dedicated training wing at Jhotwara, Jaipur, to formalize development communication curriculum for rural frontline workers.'
  },
  {
    year: '2016',
    title: 'Expansion into Tribal Southern Rajasthan',
    description: 'Launched women empowerment and forest rights legal literacy initiatives across Udaipur, Banswara, and Dungarpur.'
  },
  {
    year: '2021',
    title: 'COVID-19 Myth Busting & Vaccine Literacy',
    description: 'Produced 45 regional audio drama capsules deployed across western Rajasthan, credited with dramatically raising rural vaccination turnout.'
  },
  {
    year: '2026',
    title: 'Digital & Last-Mile Scale: 30+ Years of Service',
    description: 'Over 87+ villages transformed, 1,750+ master trainers certified, and 22+ statewide development communication campaigns executed.'
  }
];

export const FAQS: FAQItem[] = [
  {
    category: 'tax80g',
    question: 'Are donations to LIFE eligible for 80G tax exemption?',
    answer: 'Yes, 100%! The Indian Institute of Development and Communication (LIFE) is registered under Section 80G of the Indian Income Tax Act. Indian citizens and entities can claim a 50% tax deduction on their total donated amount. An official 80G tax exemption receipt is generated instantly upon payment.'
  },
  {
    category: 'donation',
    question: 'Where does my donated money go?',
    answer: 'We maintain strict financial transparency: 88% of all funds directly sponsor grassroots field caravans, educational toolkits, and rural awareness camps. 7% funds field research, training materials, and impact monitoring, while only 5% covers administrative and auditing governance.'
  },
  {
    category: 'donation',
    question: 'What payment modes are supported?',
    answer: 'We accept all major payment methods via secure 256-bit SSL encrypted gateway: UPI (Google Pay, PhonePe, Paytm, BHIM), Indian and International Debit & Credit Cards, NetBanking across 50+ banks, as well as direct NEFT/RTGS bank transfers.'
  },
  {
    category: 'tax80g',
    question: 'Why do you ask for my PAN number?',
    answer: 'As mandated by the Income Tax Department of India for tax deduction compliance, furnishing your Permanent Account Number (PAN) is mandatory to issue a valid 80G tax exemption certificate that will automatically reflect in your Annual Information Statement (AIS / Form 26AS).'
  },
  {
    category: 'volunteer',
    question: 'Can I volunteer remotely or part-time?',
    answer: 'Yes! We have several hybrid and remote volunteering tracks including translation, digital media creation, curriculum design, and campus advocacy, alongside our on-ground desert fieldwork.'
  },
  {
    category: 'work',
    question: 'How do you measure the impact of development communication?',
    answer: 'We combine rigorous quantitative baseline/endline household surveys with qualitative indicators like hospital institutional registration logs, school attendance registries, and scheme uptake rates to verify verified behavior change.'
  }
];

export const FINANCIAL_BREAKDOWN = [
  { category: 'Direct Grassroots Programs & Audio Caravans', percentage: 88, color: 'bg-emerald-500' },
  { category: 'Field Research, Monitoring & Master Training', percentage: 7, color: 'bg-amber-500' },
  { category: 'Governance, Legal Auditing & Transparency', percentage: 5, color: 'bg-indigo-500' }
];

export const DONATION_TIERS = [
  {
    amount: 500,
    label: '₹500',
    title: 'Literacy Starter Pack',
    impact: 'Supplies 25 rural children with Devanagari storytelling and learning toolkits.',
    popular: false
  },
  {
    amount: 1500,
    label: '₹1,500',
    title: 'Village Audio Caravan',
    impact: 'Sponsors 1 complete mobile audio-drama caravan session on maternal health reaching 250+ villagers.',
    popular: true
  },
  {
    amount: 3000,
    label: '₹3,000',
    title: 'Equip 3 Health Educators',
    impact: 'Equips 3 village frontline ASHA/Anganwadi workers with localized audio-visual demonstration kits.',
    popular: false
  },
  {
    amount: 7500,
    label: '₹7,500',
    title: 'Radio Campaign Spot',
    impact: 'Funds production and broadcast of a regional dialect radio spot reaching over 15,000 rural listeners.',
    popular: false
  },
  {
    amount: 15000,
    label: '₹15,000',
    title: 'Women Self-Reliance Camp',
    impact: 'Fully funds a 10-day legal rights and micro-enterprise workshop series for a village women collective.',
    popular: false
  }
];

export const OBJECTIVES = [
  'Public awareness through mass communication on welfare, literacy, environment, nutrition and health.',
  'Programme evaluation, planning and reporting for last-mile delivery.',
  'Producing and broadcasting research-based audio-visual and print material.',
  'Establishing a state-of-the-art mass communication research and training institute.',
  'Development and research advisory services for grassroots policy implementation.',
  'Evaluating government, autonomous and private institution activities.',
  'Human development research and socio-economic ground surveys.',
  'Communication planning and media consultancy for non-profit and government bodies.',
  'Camps, seminars and workshops on contemporary public health and gender equity issues.',
  'Awards, scholarships and grants for underprivileged rural scholars.',
  "Women's empowerment, self-reliance, and financial inclusion.",
  'Health awareness, blood and eye donation, and campaigns against harmful social evils.',
  'Literacy and schooling retention for deprived desert communities.',
  'All objectives pursued without distinction of colour, class, religion, caste or gender, free of political affiliation and strictly not for profit.'
];

export const DONATION_AMOUNTS_MAP = {
  500: '₹500 supplies 25 rural children with literacy toolkits',
  1000: '₹1,000 trains one village health volunteer for a day',
  1500: '₹1,500 sponsors one mobile maternal health audio drama session',
  2500: '₹2,500 equips a rural educator with communication aids',
  3000: '₹3,000 equips 3 village frontline health workers',
  5000: '₹5,000 funds a full capacity-building camp for ten workers',
  7500: '₹7,500 funds a regional dialect radio campaign spot',
  15000: '₹15,000 fully funds a 10-day women self-reliance workshop'
};

export const ORG = {
  brandName: 'LIFE',
  registeredName: 'Indian Institute of Development and Communication (I.I.D.C.)',
  shortName: 'LIFE (I.I.D.C.)',
  registrationNumber: 'Reg. No. 78/Jaipur/1994-95',
  panNumber: 'AAATI2486E',
  taxExemption: '80G & 12A Certified (Income Tax Act)',
  nitiAayogId: 'RJ/2018/0192847',
  addressLines: ['19, Shri Ram Nagar-B, Kanta, Jhotwara', 'Jaipur, Rajasthan 302012, India'],
  addressOneLine: '19, Shri Ram Nagar-B, Kanta, Jhotwara, Jaipur, Rajasthan 302012',
  phones: ['+91 70147 78387', '+91 82332 37530', '+91 63769 18299'],
  email: 'lifengo.org@gmail.com',
  city: 'Jaipur',
  state: 'Rajasthan',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d222.30056336610383!2d75.74466634855588!3d26.94126850466042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1785885341761!5m2!1sen!2sin',
  motto: "Change doesn't arrive on its own. Someone has to carry it.",
  mottoHi: "बदलाव अपने आप नहीं आता। उसे किसी न किसी को ले जाना पड़ता है।",
  bankDetails: {
    accountName: 'Indian Institute of Development and Communication',
    accountNumber: '920010045612349',
    ifsc: 'UTIB0000123',
    bankName: 'Axis Bank Ltd',
    branch: 'Jhotwara Branch, Jaipur',
    upiId: 'lifengo@axisbank'
  }
};

export const IMPACT_STATS = [
  { value: '87+', label: 'Desert & Rural Villages', subtext: 'Transformed across Rajasthan' },
  { value: '1,750+', label: 'Master Trainers Certified', subtext: 'Multiplying change across districts' },
  { value: '160,000+', label: 'Citizens Reached', subtext: 'Through audio caravans & campaigns' },
  { value: '30+', label: 'Years of Proven Trust', subtext: 'Established in Jaipur in 1994' }
];

export const PARTNERS = [
  { name: 'Governor of Rajasthan', role: 'Official Commendation' },
  { name: 'UNICEF Rajasthan', role: 'Program Collaboration' },
  { name: 'Jaipur Academic Council', role: 'Curriculum Partner' },
  { name: 'State Literacy Mission', role: 'Grassroots Partner' },
  { name: 'District Health Society', role: 'Maternal Outreach' }
];

export const MEDIA_FEATURES = [
  { outlet: 'Rajasthan Patrika', quote: 'A beacon of grassroots development communication reaching where roads end.' },
  { outlet: 'Dainik Bhaskar', quote: 'How audio drama and street puppet caravans are saving maternal lives in Thar.' },
  { outlet: 'Doordarshan Rajasthan', quote: 'Bridging the last-mile gap between welfare policy and rural citizens.' }
];
