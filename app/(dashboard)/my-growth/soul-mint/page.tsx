'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Hammer, Award, Sparkles, Lock, ArrowRight, Plus } from 'lucide-react'

interface Badge {
  id: string;
  title: string;
  description: string;
  category: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  progress: number;
  isLocked: boolean;
  requirements: string[];
  imageUrl?: string;
}

const badges: Badge[] = [
  {
    id: '1',
    title: 'Creative Soul',
    description: 'Awarded for exceptional creative expression and artistic achievements.',
    category: 'Creativity',
    rarity: 'Epic',
    progress: 75,
    isLocked: false,
    requirements: [
      'Complete 5 creative projects',
      'Share your work with the community',
      'Receive positive feedback'
    ]
  },
  {
    id: '2',
    title: 'Empathy Master',
    description: 'Recognition of your deep understanding and connection with others.',
    category: 'Social',
    rarity: 'Legendary',
    progress: 40,
    isLocked: false,
    requirements: [
      'Help 10 community members',
      'Receive gratitude notes',
      'Maintain positive relationships'
    ]
  },
  {
    id: '3',
    title: 'Inner Peace',
    description: 'Achievement for maintaining mental wellness and emotional balance.',
    category: 'Wellness',
    rarity: 'Rare',
    progress: 100,
    isLocked: false,
    requirements: [
      'Practice daily meditation',
      'Complete mindfulness exercises',
      'Maintain emotional balance'
    ]
  },
  {
    id: '4',
    title: 'Vision Seeker',
    description: 'Locked badge for those who seek deeper meaning and purpose.',
    category: 'Personal Growth',
    rarity: 'Epic',
    progress: 0,
    isLocked: true,
    requirements: [
      'Complete personal vision quest',
      'Define life purpose',
      'Create action plan'
    ]
  },
  {
    id: '5',
    title: 'Knowledge Explorer',
    description: 'Recognition for continuous learning and intellectual curiosity.',
    category: 'Education',
    rarity: 'Rare',
    progress: 60,
    isLocked: false,
    requirements: [
      'Complete 3 online courses',
      'Share learning insights',
      'Apply knowledge in projects'
    ]
  },
  {
    id: '6',
    title: 'Resilience Warrior',
    description: 'Badge for demonstrating strength and adaptability in challenges.',
    category: 'Personal Growth',
    rarity: 'Legendary',
    progress: 25,
    isLocked: false,
    requirements: [
      'Overcome major obstacles',
      'Maintain positive mindset',
      'Help others through difficulties'
    ]
  }
];

const rarityColors = {
  Common: 'from-gray-400 to-gray-500',
  Rare: 'from-blue-400 to-indigo-500',
  Epic: 'from-purple-400 to-pink-500',
  Legendary: 'from-yellow-400 to-orange-500'
};

const rarityBgColors = {
  Common: 'from-gray-100 to-gray-200',
  Rare: 'from-blue-100 to-indigo-200',
  Epic: 'from-purple-100 to-pink-200',
  Legendary: 'from-yellow-100 to-orange-200'
};

export default function SoulMint() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <motion.h1 
            className="text-3xl font-bold text-purple-800/90"
          >
            Soul Mint
          </motion.h1>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl">
            <Award className="text-purple-600 w-5 h-5" />
            <span className="text-purple-600 font-medium">12 Badges</span>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Create Badge</span>
          </div>
        </motion.button>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${badge.isLocked ? 'from-gray-100 to-gray-50' : rarityBgColors[badge.rarity]} backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-white/50 group hover:scale-[1.02] relative overflow-hidden`}
          >
            {/* Badge Content */}
            <div className="p-6 relative z-10">
              {/* Badge Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-r ${rarityColors[badge.rarity]} group-hover:scale-110 transition-transform duration-300`}>
                    {badge.isLocked ? (
                      <Lock className="w-6 h-6 text-white" />
                    ) : (
                      <Sparkles className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-800">
                      {badge.title}
                    </h3>
                    <span className={`text-xs font-medium bg-gradient-to-r ${rarityColors[badge.rarity]} text-transparent bg-clip-text`}>
                      {badge.rarity}
                    </span>
                  </div>
                </div>
                <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-lg font-medium">
                  {badge.category}
                </span>
              </div>

              {/* Badge Description */}
              <p className="text-purple-600/80 text-sm mb-4">
                {badge.description}
              </p>

              {/* Progress Bar */}
              {!badge.isLocked && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-purple-600/70 mb-2">
                    <span>Progress</span>
                    <span>{badge.progress}%</span>
                  </div>
                  <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${rarityColors[badge.rarity]} transition-all duration-500`}
                      style={{ width: `${badge.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Requirements */}
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-purple-700">Requirements:</h4>
                <ul className="space-y-1">
                  {badge.requirements.map((req, index) => (
                    <li 
                      key={index}
                      className="flex items-center gap-2 text-sm text-purple-600/70"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button 
                className={`w-full px-4 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all
                  ${badge.isLocked 
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90'
                  }`}
                disabled={badge.isLocked}
              >
                <span>{badge.isLocked ? 'Locked' : 'View Details'}</span>
                {!badge.isLocked && <ArrowRight size={16} />}
              </button>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
              <div className="w-full h-full bg-gradient-to-br from-current to-transparent transform rotate-45" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 