'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Star, Vote, MessageSquare, Award, ArrowRight, Filter, Search } from 'lucide-react'

interface RatingTask {
  id: string;
  title: string;
  description: string;
  category: string;
  reward: number;
  votesRequired: number;
  currentVotes: number;
  deadline: string;
  status: 'open' | 'in-progress' | 'completed';
  tags: string[];
  submissions?: number;
}

const ratingTasks: RatingTask[] = [
  {
    id: '1',
    title: 'Evaluate Creative Writing Submissions',
    description: 'Review and rate creative writing pieces from the community. Focus on originality, style, and emotional impact.',
    category: 'Creative Writing',
    reward: 50,
    votesRequired: 10,
    currentVotes: 4,
    deadline: '2024-01-25',
    status: 'open',
    tags: ['Writing', 'Creativity', 'Feedback'],
    submissions: 12
  },
  {
    id: '2',
    title: 'Personal Growth Stories Assessment',
    description: 'Assess and rate personal growth journey stories. Consider authenticity, impact, and transformation demonstrated.',
    category: 'Personal Growth',
    reward: 75,
    votesRequired: 15,
    currentVotes: 8,
    deadline: '2024-01-30',
    status: 'in-progress',
    tags: ['Growth', 'Stories', 'Impact'],
    submissions: 8
  },
  {
    id: '3',
    title: 'Community Project Proposals',
    description: 'Review and rate community project proposals. Evaluate feasibility, impact, and alignment with community values.',
    category: 'Community',
    reward: 100,
    votesRequired: 20,
    currentVotes: 20,
    deadline: '2024-01-20',
    status: 'completed',
    tags: ['Projects', 'Community', 'Planning'],
    submissions: 15
  }
];

const statusColors = {
  'open': 'bg-green-100 text-green-600',
  'in-progress': 'bg-blue-100 text-blue-600',
  'completed': 'bg-purple-100 text-purple-600'
};

export default function RaterDAO() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['all', 'Creative Writing', 'Personal Growth', 'Community'];

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
            className="text-3xl font-bold text-purple-800/90 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-2xl"
          >
            Rater DAO
          </motion.h1>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl">
            <Award className="text-purple-600 w-5 h-5" />
            <span className="text-purple-600 font-medium">320 Rating Power</span>
          </div>
        </motion.div>
      </div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Vote className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-purple-800">Total Votes</h3>
          </div>
          <p className="text-3xl font-bold text-purple-900">156</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Star className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-blue-800">Accuracy</h3>
          </div>
          <p className="text-3xl font-bold text-blue-900">92%</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800">Reviews</h3>
          </div>
          <p className="text-3xl font-bold text-green-900">48</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-yellow-800">Rewards</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-900">890</p>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-purple-50 rounded-xl text-purple-600 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      {/* Rating Tasks */}
      <div className="grid grid-cols-1 gap-6">
        {ratingTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100/50 group"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-purple-800">
                      {task.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${statusColors[task.status]}`}>
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-purple-600/80 text-sm">
                    {task.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="text-purple-400 w-5 h-5" />
                  <span className="text-purple-600 font-medium">{task.reward} Points</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {task.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-purple-600/70">
                  <MessageSquare className="w-4 h-4" />
                  <span>{task.submissions} Submissions</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-600/70">
                  <Vote className="w-4 h-4" />
                  <span>{task.currentVotes}/{task.votesRequired} Votes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-600/70">
                  <Filter className="w-4 h-4" />
                  <span>{task.category}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500"
                    style={{ width: `${(task.currentVotes / task.votesRequired) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all
                    ${task.status === 'completed'
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90'
                    }`}
                  disabled={task.status === 'completed'}
                >
                  <span>Start Rating</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-all text-sm">
                  Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 