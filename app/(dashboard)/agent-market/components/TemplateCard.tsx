'use client'

import { motion } from 'framer-motion';
import { Star, Clock, Target, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { ProTemplate, ExperienceTemplate } from '../data';

interface TemplateCardProps {
  template: ProTemplate | ExperienceTemplate;
  onGetStarted: () => void;
  onPreview: () => void;
}

export const TemplateCard = ({ 
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
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500/90 via-indigo-500/90 to-purple-500/90 text-white rounded-xl hover:shadow-[0_8px_30px_rgb(124,58,237,0.15)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm font-medium relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-center justify-center gap-1.5">
                <span>Get Started</span>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
            </button>
            <button 
              onClick={onPreview}
              className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-all text-sm font-medium"
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 