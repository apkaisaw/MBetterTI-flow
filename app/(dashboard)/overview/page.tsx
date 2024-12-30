'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Target, 
  Trophy,
  Star,
  TrendingUp,
  Users,
  Activity,
  Calendar,
  ArrowUp,
  ArrowDown,
  Sparkles
} from 'lucide-react'

// 模拟的统计数据
const stats = [
  {
    title: 'Growth Score',
    value: '850',
    change: '+12%',
    isIncrease: true,
    icon: TrendingUp,
    color: 'from-purple-500 to-indigo-500'
  },
  {
    title: 'Completed Tasks',
    value: '24',
    change: '+3',
    isIncrease: true,
    icon: Trophy,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Active Goals',
    value: '5',
    change: '-1',
    isIncrease: false,
    icon: Target,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    title: 'Streak Days',
    value: '7',
    change: '+2',
    isIncrease: true,
    icon: Activity,
    color: 'from-orange-500 to-red-500'
  }
]

// 模拟的最近活动数据
const recentActivities = [
  {
    id: '1',
    type: 'achievement',
    title: 'Earned Creative Soul Badge',
    description: 'Completed a series of creative tasks',
    timestamp: '2 hours ago',
    icon: Star,
    color: 'text-purple-500'
  },
  {
    id: '2',
    type: 'task',
    title: 'Completed Daily Reflection',
    description: 'Wrote about personal growth insights',
    timestamp: '5 hours ago',
    icon: Brain,
    color: 'text-blue-500'
  },
  {
    id: '3',
    type: 'goal',
    title: 'New Goal Set',
    description: 'Started working on mindfulness practice',
    timestamp: '1 day ago',
    icon: Target,
    color: 'text-green-500'
  }
]

// 模拟的即将到来的任务
const upcomingTasks = [
  {
    id: '1',
    title: 'Creative Writing Session',
    dueDate: 'Tomorrow',
    priority: 'High',
    category: 'Creativity'
  },
  {
    id: '2',
    title: 'Meditation Practice',
    dueDate: 'Today',
    priority: 'Medium',
    category: 'Wellness'
  },
  {
    id: '3',
    title: 'Community Engagement',
    dueDate: 'In 2 days',
    priority: 'Low',
    category: 'Social'
  }
]

export default function Overview() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center gap-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.h1 
            className="text-2xl md:text-3xl font-bold text-purple-800/90 bg-white/50 backdrop-blur-sm px-4 md:px-6 py-2 rounded-2xl"
          >
            Overview
          </motion.h1>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-xl">
            <Sparkles className="text-purple-600 w-4 h-4" />
            <span className="text-purple-600 text-sm font-medium">INFP</span>
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/90 backdrop-blur-lg rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100/50 group hover:scale-[1.02]"
          >
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className={`p-1.5 md:p-2 rounded-lg md:rounded-xl bg-gradient-to-r ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <div className={`flex items-center gap-0.5 text-xs md:text-sm ${
                  stat.isIncrease ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.isIncrease ? (
                    <ArrowUp className="w-3 h-3 md:w-4 md:h-4" />
                  ) : (
                    <ArrowDown className="w-3 h-3 md:w-4 md:h-4" />
                  )}
                  <span>{stat.change}</span>
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

      {/* Recent Activities and Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/90 backdrop-blur-lg rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-purple-100/50"
        >
          <h2 className="text-lg md:text-xl font-semibold text-purple-800 mb-3 md:mb-4">Recent Activities</h2>
          <div className="space-y-3 md:space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 md:gap-4">
                <div className={`p-1.5 md:p-2 rounded-lg md:rounded-xl ${activity.color} bg-opacity-10`}>
                  <activity.icon className={`w-4 h-4 md:w-5 md:h-5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-medium text-purple-800 truncate">{activity.title}</h3>
                  <p className="text-xs md:text-sm text-purple-600/70 line-clamp-2">{activity.description}</p>
                  <span className="text-xs text-purple-500">{activity.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/90 backdrop-blur-lg rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-purple-100/50"
        >
          <h2 className="text-lg md:text-xl font-semibold text-purple-800 mb-3 md:mb-4">Upcoming Tasks</h2>
          <div className="space-y-3 md:space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between p-3 md:p-4 bg-purple-50/50 rounded-lg md:rounded-xl">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-medium text-purple-800 truncate">{task.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full">
                      {task.category}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      task.priority === 'High' 
                        ? 'bg-red-100 text-red-600'
                        : task.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-green-100 text-green-600'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs md:text-sm">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 text-purple-500" />
                  <span className="text-purple-600">{task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Growth Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-lg rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 border border-purple-100/50"
      >
        <h2 className="text-lg md:text-xl font-semibold text-purple-800 mb-3 md:mb-4">Growth Progress</h2>
        <div className="h-48 md:h-64 flex items-center justify-center">
          <p className="text-sm md:text-base text-purple-600">Growth chart visualization will be added here</p>
        </div>
      </motion.div>
    </div>
  )
} 