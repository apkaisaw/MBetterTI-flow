'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileCode, Star, GitFork, Download, Users, Award, Clock, Target } from 'lucide-react'

// 专业教练模板接口
interface ProTemplate {
  id: string;
  title: string;
  description: string;
  author: string;
  price: {
    amount: number;
    currency: 'USDT';
  };
  rating: number;
  reviews: number;
  specialties: string[];
  mbtiTypes: string[];
  previewImage?: string;
  type: 'pro';
}

// 用户经验教练接口
interface ExperienceTemplate {
  id: string;
  title: string;
  description: string;
  creator: {
    name: string;
    mbti: string;
    yearsOfGrowth: number;
    achievements: string[];
  };
  successRate: number;
  users: number;
  price: {
    amount: number;
    currency: 'USDT';
  };
  growthPath: string[];
  type: 'experience';
}

type Template = ProTemplate | ExperienceTemplate;

const templates: Template[] = [
  // Professional Coaches
  {
    id: '1',
    type: 'pro',
    title: 'INFP Life Coach Pro',
    description: 'Professional AI coach designed specifically for INFP personality types, offering empathetic guidance and creative support.',
    author: 'MBetterTI Experts',
    price: {
      amount: 29.99,
      currency: 'USDT'
    },
    rating: 4.8,
    reviews: 128,
    specialties: ['Emotional Intelligence', 'Creative Development', 'Personal Growth'],
    mbtiTypes: ['INFP', 'INFJ', 'ENFP'],
  },
  {
    id: '3',
    type: 'pro',
    title: 'Career Transition Expert',
    description: 'Specialized coach for INFPs looking to make meaningful career changes while staying true to their values.',
    author: 'Career Catalyst Pro',
    price: {
      amount: 39.99,
      currency: 'USDT'
    },
    rating: 4.9,
    reviews: 156,
    specialties: ['Career Planning', 'Personal Branding', 'Interview Skills'],
    mbtiTypes: ['INFP', 'INTP', 'ENFP'],
  },
  {
    id: '5',
    type: 'pro',
    title: 'Creative Business Mentor',
    description: 'Expert guidance for INFP entrepreneurs building sustainable creative businesses.',
    author: 'Creative Minds Inc',
    price: {
      amount: 49.99,
      currency: 'USDT'
    },
    rating: 4.7,
    reviews: 98,
    specialties: ['Business Strategy', 'Creative Leadership', 'Financial Planning'],
    mbtiTypes: ['INFP', 'ENFP', 'ISFP'],
  },
  {
    id: '7',
    type: 'pro',
    title: 'Mindfulness & Wellness Guide',
    description: 'Holistic approach to personal development focusing on mental health and emotional balance.',
    author: 'Wellness Wisdom',
    price: {
      amount: 34.99,
      currency: 'USDT'
    },
    rating: 4.9,
    reviews: 203,
    specialties: ['Stress Management', 'Meditation', 'Work-Life Balance'],
    mbtiTypes: ['INFP', 'INFJ', 'ISFJ'],
  },

  // Experience-based Coaches
  {
    id: '2',
    type: 'experience',
    title: 'INFP to Senior Designer Journey',
    description: 'A growth path based on my 5-year journey from an introverted designer to a successful creative director.',
    creator: {
      name: 'Sarah Chen',
      mbti: 'INFP',
      yearsOfGrowth: 5,
      achievements: ['Creative Director at Tech Giant', 'Published Author', 'Design Mentor']
    },
    successRate: 89,
    users: 234,
    price: {
      amount: 19.99,
      currency: 'USDT'
    },
    growthPath: ['Self-discovery', 'Creative confidence', 'Leadership skills', 'Communication mastery'],
  },
  {
    id: '4',
    type: 'experience',
    title: 'INFP Entrepreneur Success Path',
    description: 'From anxious employee to confident business owner - my journey of building a successful creative agency.',
    creator: {
      name: 'Michael Zhang',
      mbti: 'INFP',
      yearsOfGrowth: 7,
      achievements: ['Founded Creative Agency', 'TEDx Speaker', '7-Figure Business']
    },
    successRate: 92,
    users: 178,
    price: {
      amount: 24.99,
      currency: 'USDT'
    },
    growthPath: ['Overcoming fear', 'Business mindset', 'Team building', 'Client relationships'],
  },
  {
    id: '6',
    type: 'experience',
    title: 'Tech Lead Transformation',
    description: 'My personal roadmap from an introverted developer to a successful engineering leader while staying authentic.',
    creator: {
      name: 'David Park',
      mbti: 'INFP',
      yearsOfGrowth: 8,
      achievements: ['Senior Tech Lead', 'Open Source Contributor', 'Engineering Blog Author']
    },
    successRate: 87,
    users: 156,
    price: {
      amount: 29.99,
      currency: 'USDT'
    },
    growthPath: ['Technical excellence', 'Team leadership', 'Public speaking', 'Mentoring'],
  },
  {
    id: '8',
    type: 'experience',
    title: 'Content Creator Evolution',
    description: 'How I turned my INFP sensitivity into a superpower as a successful content creator and influencer.',
    creator: {
      name: 'Emma Wilson',
      mbti: 'INFP',
      yearsOfGrowth: 4,
      achievements: ['1M+ Followers', 'Best-Selling Course', 'Featured in Forbes']
    },
    successRate: 94,
    users: 312,
    price: {
      amount: 22.99,
      currency: 'USDT'
    },
    growthPath: ['Finding your voice', 'Content strategy', 'Community building', 'Monetization'],
  }
];

// 模板卡片组件
function TemplateCard({ 
  template,
  onGetStarted,
  onPreview 
}: { 
  template: Template;
  onGetStarted: () => void;
  onPreview: () => void;
}) {
  return (
    <motion.div
      key={template.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100/50 group hover:scale-[1.02]"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-purple-800 mb-3 group-hover:text-purple-900 transition-colors">
          {template.title}
        </h3>
        <p className="text-purple-600/80 mb-4 text-sm">
          {template.description}
        </p>

        {template.type === 'pro' && (
          // 专业教练模板内容
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {(template as ProTemplate).specialties.map((specialty) => (
                <span 
                  key={specialty}
                  className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-lg"
                >
                  {specialty}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-purple-600/70 mb-4">
              <div className="flex items-center gap-2">
                <img 
                  src={`https://avatars.dicebear.com/api/initials/${(template as ProTemplate).author}.svg`}
                  alt={(template as ProTemplate).author}
                  className="w-6 h-6 rounded-full"
                />
                <span>{(template as ProTemplate).author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={14} className="text-yellow-400" />
                <span>{(template as ProTemplate).rating} ({(template as ProTemplate).reviews} reviews)</span>
              </div>
            </div>
          </>
        )}
        {template.type === 'experience' && (
          // 用户经验教练内容
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {(template as ExperienceTemplate).growthPath.map((path: string) => (
                <span 
                  key={path}
                  className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-lg"
                >
                  {path}
                </span>
              ))}
            </div>
            <div className="bg-purple-50/50 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <img 
                  src={`https://avatars.dicebear.com/api/initials/${(template as ExperienceTemplate).creator.name}.svg`}
                  alt={(template as ExperienceTemplate).creator.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm font-medium text-purple-900">{(template as ExperienceTemplate).creator.name}</span>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
                  {(template as ExperienceTemplate).creator.mbti}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(template as ExperienceTemplate).creator.achievements.map((achievement: string, index: number) => (
                  <span key={index} className="text-xs text-purple-600/80">
                    • {achievement}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-purple-600/70 mb-4">
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{(template as ExperienceTemplate).creator.yearsOfGrowth} Years Journey</span>
              </div>
              <div className="flex items-center gap-2">
                <Target size={14} />
                <span>{(template as ExperienceTemplate).successRate}% Success Rate</span>
              </div>
            </div>
          </>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-purple-900">
              {template.price.amount}
            </span>
            <span className="text-sm font-medium text-purple-600">
              {template.price.currency}
            </span>
          </div>
          <span className="text-sm text-purple-600/70">
            {template.type === 'experience' ? `${(template as ExperienceTemplate).users} Users` : 'Lifetime Access'}
          </span>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={onGetStarted}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-all text-sm"
          >
            Get Started
          </button>
          <button 
            onClick={onPreview}
            className="px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-all text-sm"
          >
            Preview
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function AgentMarket() {
  const handleGetStarted = () => {
    alert('This is a demo version. Payment and coach activation features will be available in the full release.');
  };

  const handlePreview = () => {
    alert('Coach preview feature will be available in the full release.');
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <motion.h1 
            className="text-3xl font-bold text-purple-800/90 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-2xl"
          >
            Agent Market
          </motion.h1>
          <span className="px-3 py-1 bg-purple-100/50 text-purple-600 text-sm rounded-full font-medium">
            Demo Version
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <FileCode size={20} />
            <span>Share Your Growth Path</span>
          </div>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-2 gap-6">
        {/* Professional Coaches Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-xl w-fit">
            <Award size={18} className="text-purple-600" />
            <h2 className="text-lg font-semibold text-purple-800">Professional Coaches</h2>
          </div>
          <div className="space-y-6">
            {templates
              .filter(template => template.type === 'pro')
              .map((template) => (
                <TemplateCard 
                  key={template.id} 
                  template={template}
                  onGetStarted={handleGetStarted}
                  onPreview={handlePreview}
                />
              ))}
          </div>
        </div>

        {/* Experience-based Coaches Column */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-xl w-fit">
            <Users size={18} className="text-purple-600" />
            <h2 className="text-lg font-semibold text-purple-800">Experience-based Coaches</h2>
          </div>
          <div className="space-y-6">
            {templates
              .filter(template => template.type === 'experience')
              .map((template) => (
                <TemplateCard 
                  key={template.id} 
                  template={template}
                  onGetStarted={handleGetStarted}
                  onPreview={handlePreview}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-purple-50/50 rounded-xl border border-purple-100/50">
        <div className="flex items-center gap-2 text-purple-600">
          <i data-lucide="info" className="w-5 h-5"></i>
          <p className="text-sm">
            This is a demo version showcasing the Agent Market concept. Payment integration and coach activation features will be available in the full release.
          </p>
        </div>
      </div>
    </div>
  );
} 