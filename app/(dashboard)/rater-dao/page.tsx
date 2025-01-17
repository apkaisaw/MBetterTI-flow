'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Star, Vote, MessageSquare, Award, ArrowRight, Target, Clock, Trophy } from 'lucide-react'

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
  submissions: number;
}

// 评分任务数据
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

const statusColors: Record<RatingTask['status'], string> = {
  'open': 'bg-green-100 text-green-600',
  'in-progress': 'bg-blue-100 text-blue-600',
  'completed': 'bg-purple-100 text-purple-600'
};

export default function RaterDAO() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-purple-800/90"
        >
          
        </motion.h1>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-6">
        {[
          {
            title: 'Total Ratings',
            value: '2.5k',
            icon: Star,
            color: 'from-yellow-500 to-orange-500'
          },
          {
            title: 'Active Raters',
            value: '180',
            icon: Users,
            color: 'from-purple-500 to-indigo-500'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-base rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]"
          >
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className={`p-1.5 md:p-2 rounded-lg md:rounded-xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
              </div>
              <h3 className="text-sm md:text-lg font-semibold text-purple-800 mb-1">
                {stat.title}
              </h3>
              <p className="text-xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rating Tasks */}
      <div className="space-y-3 md:space-y-4">
        {ratingTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-base rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
          >
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-base md:text-lg font-semibold text-purple-800">
                      {task.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${statusColors[task.status]}`}>
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-purple-600/80">
                    {task.description}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Award className="text-purple-400 w-4 h-4" />
                  <span className="text-sm font-medium text-purple-600">{task.reward} Points</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {task.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-0.5 bg-purple-50 text-purple-600 text-xs rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs md:text-sm mb-3">
                <div className="flex items-center gap-1.5 text-purple-600/70">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{task.submissions} Submissions</span>
                </div>
                <div className="flex items-center gap-1.5 text-purple-600/70">
                  <Vote className="w-3.5 h-3.5" />
                  <span>{task.currentVotes}/{task.votesRequired} Votes</span>
                </div>
                <div className="flex items-center gap-1.5 text-purple-600/70">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Due {task.deadline}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="h-1.5 bg-purple-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-500"
                    style={{ width: `${(task.currentVotes / task.votesRequired) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  className={`flex-1 px-3 py-1.5 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 transition-all
                    ${task.status === 'completed'
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90'
                    }`}
                  disabled={task.status === 'completed'}
                >
                  <span>Start Rating</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button className="px-3 py-1.5 text-purple-600 hover:bg-purple-50 rounded-xl transition-all text-sm">
                  Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* How to Participate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-base rounded-xl md:rounded-2xl shadow-md p-4 md:p-6"
      >
        <h2 className="text-lg md:text-xl font-semibold text-purple-800 mb-3 md:mb-4">How to Participate</h2>
        <div className="space-y-3 md:space-y-4">
          {[
            {
              title: 'Rate Growth Paths',
              description: 'Review and rate other users\' growth paths based on effectiveness and authenticity.',
              icon: Star,
              color: 'text-yellow-500 bg-yellow-100'
            },
            {
              title: 'Earn Rewards',
              description: 'Get USDT rewards for accurate ratings that help maintain quality.',
              icon: Trophy,
              color: 'text-purple-500 bg-purple-100'
            },
            {
              title: 'Build Reputation',
              description: 'Increase your influence and unlock more opportunities as a trusted rater.',
              icon: Target,
              color: 'text-blue-500 bg-blue-100'
            }
          ].map((step) => (
            <div key={step.title} className="flex gap-3 md:gap-4">
              <div className={`p-1.5 md:p-2 rounded-lg md:rounded-xl ${step.color}`}>
                <step.icon className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-medium text-purple-800 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-purple-600/70">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 