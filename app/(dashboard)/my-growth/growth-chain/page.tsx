'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Layers, Target, Trophy, Star, Calendar, ArrowRight } from 'lucide-react'

interface GrowthTask {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  points: number;
  category: string;
  status: 'todo' | 'in-progress' | 'completed';
  dueDate?: string;
}

const growthTasks: GrowthTask[] = [
  {
    id: '1',
    title: 'Daily Reflection Journal',
    description: 'Write a daily reflection about your thoughts, feelings, and experiences.',
    difficulty: 'Easy',
    duration: '15 mins',
    points: 10,
    category: 'Self-Awareness',
    status: 'in-progress',
    dueDate: '2024-01-20'
  },
  {
    id: '2',
    title: 'Creative Expression',
    description: 'Express yourself through art, writing, or any creative medium.',
    difficulty: 'Medium',
    duration: '30 mins',
    points: 20,
    category: 'Creativity',
    status: 'todo',
    dueDate: '2024-01-25'
  },
  {
    id: '3',
    title: 'Value Alignment Check',
    description: 'Review and assess how your actions align with your core values.',
    difficulty: 'Hard',
    duration: '1 hour',
    points: 30,
    category: 'Personal Values',
    status: 'completed',
    dueDate: '2024-01-15'
  }
];

const difficultyColors = {
  Easy: 'from-green-500 to-emerald-500',
  Medium: 'from-blue-500 to-indigo-500',
  Hard: 'from-purple-500 to-indigo-500'
};

const statusColors = {
  'todo': 'bg-gray-100 text-gray-600',
  'in-progress': 'bg-blue-100 text-blue-600',
  'completed': 'bg-green-100 text-green-600'
};

export default function GrowthChain() {
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
            Growth Chain
          </motion.h1>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl">
            <Trophy className="text-purple-600 w-5 h-5" />
            <span className="text-purple-600 font-medium">240 Points</span>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            <span>Set New Goal</span>
          </div>
        </motion.button>
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-2 md:gap-6"
      >
        <div className="card-base rounded-lg md:rounded-2xl p-3 md:p-6 bg-gradient-to-br from-purple-500/20 to-indigo-500/20">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div className="p-1.5 md:p-2 bg-purple-100 rounded-lg">
              <Target className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-purple-800">Active Goals</h3>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-purple-900">5</p>
        </div>

        <div className="card-base rounded-lg md:rounded-2xl p-3 md:p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div className="p-1.5 md:p-2 bg-green-100 rounded-lg">
              <Trophy className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-green-800">Completed</h3>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-green-900">12</p>
        </div>

        <div className="card-base rounded-lg md:rounded-2xl p-3 md:p-6 bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <div className="p-1.5 md:p-2 bg-blue-100 rounded-lg">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-blue-800">Streak</h3>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-blue-900">7 days</p>
        </div>
      </motion.div>

      {/* Tasks List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-purple-800">Current Tasks</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              All
            </button>
            <button className="px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              In Progress
            </button>
            <button className="px-3 py-1.5 text-sm text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              Completed
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {growthTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-base rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">
                      {task.title}
                    </h3>
                    <p className="text-purple-600/80 text-sm">
                      {task.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${statusColors[task.status]}`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${difficultyColors[task.difficulty]} text-white`}>
                    {task.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded-lg font-medium">
                    {task.duration}
                  </span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded-lg font-medium">
                    {task.points} Points
                  </span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs rounded-lg font-medium">
                    {task.category}
                  </span>
                </div>

                {task.dueDate && (
                  <div className="flex items-center gap-2 text-sm text-purple-600/70 mb-4">
                    <Calendar size={14} />
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-all text-sm flex items-center justify-center gap-2">
                    <span>Start Task</span>
                    <ArrowRight size={16} />
                  </button>
                  <button className="px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-all text-sm">
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 