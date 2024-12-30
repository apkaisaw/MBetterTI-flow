export interface BaseTemplate {
  id: string;
  type: 'pro' | 'experience';
  title: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
}

export interface ProTemplate extends BaseTemplate {
  type: 'pro';
  author: string;
  rating: number;
  reviews: number;
  specialties: string[];
  mbtiTypes: string[];
}

export interface ExperienceTemplate extends BaseTemplate {
  type: 'experience';
  creator: {
    name: string;
    mbti: string;
    achievements: string[];
    yearsOfGrowth: number;
  };
  growthPath: string[];
  successRate: number;
  users: number;
}

export const templates: (ProTemplate | ExperienceTemplate)[] = [
  // Professional Coaches
  {
    id: '1',
    type: 'pro',
    title: 'INFP Career Development Coach',
    description: 'Specialized in helping INFPs find their ideal career path and develop professional skills.',
    price: {
      amount: 29.99,
      currency: 'USDT'
    },
    author: 'Sarah Chen',
    rating: 4.9,
    reviews: 128,
    specialties: ['Career Planning', 'Personal Growth', 'Emotional Intelligence'],
    mbtiTypes: ['INFP', 'INFJ', 'ENFP']
  },
  {
    id: '2',
    type: 'pro',
    title: 'INTJ Strategic Career Coach',
    description: 'Strategic guidance for INTJs to maximize their career potential and leadership abilities.',
    price: {
      amount: 32.99,
      currency: 'USDT'
    },
    author: 'Dr. Marcus Wei',
    rating: 4.9,
    reviews: 156,
    specialties: ['Strategic Planning', 'Leadership Development', 'Systems Thinking'],
    mbtiTypes: ['INTJ', 'ENTJ', 'ISTJ']
  },
  {
    id: '3',
    type: 'pro',
    title: 'ENFJ Communication Master',
    description: 'Master the art of charismatic leadership and authentic communication.',
    price: {
      amount: 28.99,
      currency: 'USDT'
    },
    author: 'Lisa Thompson',
    rating: 4.8,
    reviews: 187,
    specialties: ['Public Speaking', 'Team Leadership', 'Relationship Building'],
    mbtiTypes: ['ENFJ', 'ESFJ', 'INFJ']
  },
  {
    id: '4',
    type: 'pro',
    title: 'ENTP Innovation Coach',
    description: 'Transform your creative chaos into successful ventures and breakthrough innovations.',
    price: {
      amount: 30.99,
      currency: 'USDT'
    },
    author: 'Alex Rivera',
    rating: 4.7,
    reviews: 143,
    specialties: ['Innovation Strategy', 'Entrepreneurship', 'Creative Problem Solving'],
    mbtiTypes: ['ENTP', 'INTP', 'ENFP']
  },
  {
    id: '5',
    type: 'pro',
    title: 'ISTJ Efficiency Expert',
    description: 'Optimize your workflow and career path with proven systematic approaches.',
    price: {
      amount: 27.99,
      currency: 'USDT'
    },
    author: 'Michael Chen',
    rating: 4.9,
    reviews: 165,
    specialties: ['Process Optimization', 'Project Management', 'Career Advancement'],
    mbtiTypes: ['ISTJ', 'ESTJ', 'INTJ']
  },
  {
    id: '6',
    type: 'pro',
    title: 'ENFP Creative Catalyst',
    description: 'Channel your endless possibilities into meaningful impact and creative success.',
    price: {
      amount: 26.99,
      currency: 'USDT'
    },
    author: 'Isabella Martinez',
    rating: 4.8,
    reviews: 192,
    specialties: ['Creative Direction', 'Personal Branding', 'Motivation'],
    mbtiTypes: ['ENFP', 'INFP', 'ENTP']
  },

  // Experience-based Coaches
  {
    id: '7',
    type: 'experience',
    title: 'INTJ Tech Leadership Journey',
    description: 'From senior developer to CTO - a strategic approach to tech leadership.',
    price: {
      amount: 19.99,
      currency: 'USDT'
    },
    creator: {
      name: 'James Wilson',
      mbti: 'INTJ',
      achievements: ['CTO of Tech Startup', 'Built 3 Successful Products', 'Tech Leadership Author'],
      yearsOfGrowth: 12
    },
    growthPath: ['Technical Strategy', 'Team Leadership', 'Business Acumen'],
    successRate: 94,
    users: 267
  },
  {
    id: '8',
    type: 'experience',
    title: 'ENFJ People Leadership Success',
    description: 'Building and leading high-performing teams with emotional intelligence.',
    price: {
      amount: 18.99,
      currency: 'USDT'
    },
    creator: {
      name: 'Sarah Johnson',
      mbti: 'ENFJ',
      achievements: ['VP of People Operations', 'Leadership Award Winner', 'TEDx Speaker'],
      yearsOfGrowth: 9
    },
    growthPath: ['People Management', 'Team Culture', 'Organizational Development'],
    successRate: 92,
    users: 345
  },
  {
    id: '9',
    type: 'experience',
    title: 'ENTP Startup Founder Path',
    description: "From idea to successful exit - an entrepreneur's journey.",
    price: {
      amount: 22.99,
      currency: 'USDT'
    },
    creator: {
      name: 'Ryan Zhang',
      mbti: 'ENTP',
      achievements: ['Serial Entrepreneur', 'Successful Exit', 'Venture Advisor'],
      yearsOfGrowth: 8
    },
    growthPath: ['Ideation to Execution', 'Growth Strategy', 'Investment Raising'],
    successRate: 88,
    users: 289
  },
  {
    id: '10',
    type: 'experience',
    title: 'ISTJ Corporate Success Blueprint',
    description: 'Systematic approach to climbing the corporate ladder.',
    price: {
      amount: 17.99,
      currency: 'USDT'
    },
    creator: {
      name: 'David Miller',
      mbti: 'ISTJ',
      achievements: ['Fortune 500 Executive', 'Process Innovation Award', 'Management Expert'],
      yearsOfGrowth: 15
    },
    growthPath: ['Career Planning', 'Process Management', 'Leadership Skills'],
    successRate: 95,
    users: 412
  },
  {
    id: '11',
    type: 'experience',
    title: 'ENFP Creative Business Journey',
    description: 'Building a thriving creative agency while staying true to yourself.',
    price: {
      amount: 16.99,
      currency: 'USDT'
    },
    creator: {
      name: 'Maria Rodriguez',
      mbti: 'ENFP',
      achievements: ['Agency Founder', 'Creative Awards', 'Industry Speaker'],
      yearsOfGrowth: 6
    },
    growthPath: ['Creative Strategy', 'Business Development', 'Team Building'],
    successRate: 87,
    users: 234
  },
  {
    id: '12',
    type: 'experience',
    title: 'INFJ Counseling Practice Builder',
    description: 'From therapist to successful private practice owner.',
    price: {
      amount: 15.99,
      currency: 'USDT'
    },
    creator: {
      name: 'Emma Thompson',
      mbti: 'INFJ',
      achievements: ['Successful Practice Owner', 'Mental Health Advocate', 'Published Researcher'],
      yearsOfGrowth: 7
    },
    growthPath: ['Practice Development', 'Client Relationships', 'Business Management'],
    successRate: 91,
    users: 178
  }
]; 