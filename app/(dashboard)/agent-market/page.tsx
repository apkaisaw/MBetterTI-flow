'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, FileCode, Star, Target, Users } from 'lucide-react';
import Image from 'next/image';
import { templates, ProTemplate, ExperienceTemplate } from './data';

interface TemplateCardProps {
  template: ProTemplate | ExperienceTemplate;
  onGetStarted: () => void;
  onPreview: () => void;
}

const TemplateCard = ({ 
  template,
  onGetStarted,
  onPreview 
}: TemplateCardProps): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-lg rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100/50 group hover:scale-[1.02]"
    >
      <div className="p-3 md:p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-3 mb-2 md:mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-xl font-semibold text-purple-800 mb-1 md:mb-2 group-hover:text-purple-900 transition-colors truncate">
              {template.title}
            </h3>
            <p className="text-xs md:text-sm text-purple-600/80 line-clamp-2">
              {template.description}
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 bg-purple-50/50 rounded-lg px-2 py-1">
            <span className="text-base md:text-xl font-bold text-purple-900">
              {template.price.amount}
            </span>
            <span className="text-xs md:text-sm font-medium text-purple-600">
              {template.price.currency}
            </span>
          </div>
        </div>

        {template.type === 'pro' && (
          <>
            {/* Author Info */}
            <div className="flex items-center justify-between text-xs md:text-sm text-purple-600/70 mb-2 md:mb-3">
              <div className="flex items-center gap-1.5">
                <Image 
                  src={`https://avatars.dicebear.com/api/initials/${template.author}.svg`}
                  alt={template.author}
                  width={18}
                  height={18}
                  className="rounded-full"
                />
                <span>{template.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={12} className="text-yellow-400" />
                <span>{template.rating} ({template.reviews})</span>
              </div>
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-1.5 mb-2 md:mb-3">
              {template.specialties.map((specialty) => (
                <span 
                  key={specialty}
                  className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-lg"
                >
                  {specialty}
                </span>
              ))}
            </div>

            {/* MBTI Types */}
            <div className="flex flex-wrap gap-1.5 mb-3 md:mb-4">
              {template.mbtiTypes.map((type) => (
                <span 
                  key={type}
                  className="px-2 py-0.5 bg-purple-100/50 text-purple-700 text-xs rounded-lg"
                >
                  {type}
                </span>
              ))}
            </div>
          </>
        )}

        {template.type === 'experience' && (
          <>
            {/* Creator Info */}
            <div className="bg-purple-50/50 rounded-lg md:rounded-xl p-2 md:p-3 mb-2 md:mb-3">
              <div className="flex items-center gap-2 mb-1.5">
                <Image 
                  src={`https://avatars.dicebear.com/api/initials/${template.creator.name}.svg`}
                  alt={template.creator.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span className="text-xs md:text-sm font-medium text-purple-900">{template.creator.name}</span>
                <span className="px-1.5 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
                  {template.creator.mbti}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {template.creator.achievements.map((achievement: string, index: number) => (
                  <span key={index} className="text-xs text-purple-600/80">
                    • {achievement}
                  </span>
                ))}
              </div>
            </div>

            {/* Growth Path */}
            <div className="flex flex-wrap gap-1.5 mb-2 md:mb-3">
              {template.growthPath.map((path: string) => (
                <span 
                  key={path}
                  className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-lg"
                >
                  {path}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mb-3 md:mb-4">
              <div className="flex items-center gap-1.5 text-xs md:text-sm text-purple-600/70 bg-purple-50/30 rounded-lg px-2 py-1">
                <Clock size={12} />
                <span>{template.creator.yearsOfGrowth} Years Journey</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs md:text-sm text-purple-600/70 bg-purple-50/30 rounded-lg px-2 py-1">
                <Target size={12} />
                <span>{template.successRate}% Success</span>
              </div>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs md:text-sm text-purple-600/70">
            <span>
              {template.type === 'experience' ? `${template.users} Users` : 'Lifetime Access'}
            </span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onGetStarted}
              className="flex-1 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg md:rounded-xl hover:opacity-90 transition-all text-xs md:text-sm font-medium"
            >
              Get Started
            </button>
            <button 
              onClick={onPreview}
              className="px-3 py-1.5 text-purple-600 hover:bg-purple-50 rounded-lg md:rounded-xl transition-all text-xs md:text-sm"
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AgentMarket() {
  const [activeTab, setActiveTab] = useState<'pro' | 'experience'>('pro');

  const handleGetStarted = () => {
    alert('This is a demo version. Payment and coach activation features will be available in the full release.');
  };

  const handlePreview = () => {
    alert('Coach preview feature will be available in the full release.');
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-3 md:gap-4"
      >
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-purple-800/90 bg-white/50 backdrop-blur-sm px-4 md:px-6 py-2 rounded-2xl"
        >
          Agent Market
        </motion.h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center gap-1.5 md:gap-2">
            <FileCode size={16} className="md:w-5 md:h-5" />
            <span className="text-sm md:text-base">Share Your Growth Path</span>
          </div>
        </motion.button>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex p-1 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm">
          <button
            onClick={() => setActiveTab('pro')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${
              activeTab === 'pro'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-purple-600 hover:bg-purple-50'
            }`}
          >
            <Award size={16} className="md:w-[18px] md:h-[18px]" />
            Professional Coaches
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${
              activeTab === 'experience'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-purple-600 hover:bg-purple-50'
            }`}
          >
            <Users size={16} className="md:w-[18px] md:h-[18px]" />
            Experience-based Coaches
          </button>
        </div>
      </div>

      {/* Coach Cards */}
      <motion.div 
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        {templates
          .filter(template => template.type === activeTab)
          .map((template) => (
            <TemplateCard 
              key={template.id} 
              template={template}
              onGetStarted={handleGetStarted}
              onPreview={handlePreview}
            />
          ))}
      </motion.div>
    </div>
  );
} 