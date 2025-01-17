'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, FileCode, Star, Target, Users, Plus, Brain } from 'lucide-react';
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
      className="card-base rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]"
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
            <div className="card-base rounded-lg md:rounded-xl p-2 md:p-3 mb-2 md:mb-3">
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
  const [activeTab, setActiveTab] = useState<'my' | 'pro' | 'experience'>('my');

  const handleGetStarted = () => {
    alert('This is a demo version. Payment and coach activation features will be available in the full release.');
  };

  const handlePreview = () => {
    alert('Coach preview feature will be available in the full release.');
  };

  return (
    <>
      {/* Fixed Tabs */}
      <div className="fixed top-4 left-0 right-0 z-40 md:hidden flex justify-center px-4">
        <div className="inline-flex items-center h-9 bg-white/30 backdrop-blur-xl rounded-[1.2rem] shadow-lg border border-white/40 p-0.5">
          <button
            onClick={() => setActiveTab('my')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[1rem] text-sm font-medium transition-all ${
              activeTab === 'my'
                ? 'bg-white/60 text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-purple-500 hover:bg-white/30'
            }`}
          >
            <Users size={15} className={activeTab === 'my' ? 'text-purple-500' : 'text-gray-500'} />
            <span>My Coach</span>
          </button>
          <button
            onClick={() => setActiveTab('pro')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[1rem] text-sm font-medium transition-all ${
              activeTab === 'pro'
                ? 'bg-white/60 text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-purple-500 hover:bg-white/30'
            }`}
          >
            <Award size={15} className={activeTab === 'pro' ? 'text-purple-500' : 'text-gray-500'} />
            <span>Pro Coaches</span>
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[1rem] text-sm font-medium transition-all ${
              activeTab === 'experience'
                ? 'bg-white/60 text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-purple-500 hover:bg-white/30'
            }`}
          >
            <Users size={15} className={activeTab === 'experience' ? 'text-purple-500' : 'text-gray-500'} />
            <span>Community</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Spacer for fixed tabs */}
        <div className="h-6 md:h-0" />

        <div className="flex flex-col items-center">
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Agent Market
          </motion.h1>
        </div>

        {/* My Coach Section */}
        {activeTab === 'my' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Create New Coach Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card-base rounded-xl md:rounded-2xl p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-2 border-dashed border-purple-200 flex flex-col items-center justify-center gap-4 text-center cursor-pointer"
            >
              <div className="p-3 bg-purple-100 rounded-xl">
                <Plus size={24} className="text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Create New Coach</h3>
                <p className="text-sm text-purple-600">Design your own AI coach based on your personality and goals</p>
              </div>
            </motion.div>

            {/* Active Coach Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card-base rounded-xl md:rounded-2xl p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Brain size={24} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-purple-800 mb-1">Growth Guide</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">Active</span>
                    <span className="text-sm text-purple-600">Created 2 weeks ago</span>
                  </div>
                  <p className="text-sm text-purple-600">Your personal growth companion focused on mindfulness and creativity</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-all text-sm">
                  Chat Now
                </button>
                <button className="px-3 py-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-all text-sm">
                  Settings
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Pro and Experience Coaches Sections */}
        {(activeTab === 'pro' || activeTab === 'experience') && (
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
        )}
      </div>
    </>
  );
} 