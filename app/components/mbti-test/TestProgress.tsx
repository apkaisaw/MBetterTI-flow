'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Target, Compass } from 'lucide-react'

interface TestProgressProps {
  currentQuestion: number
  totalQuestions: number
}

export const TestProgress = ({ currentQuestion, totalQuestions }: TestProgressProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  return (
    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
      <div className="flex justify-between items-center text-sm mb-3">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-purple-600/70 flex items-center gap-1.5"
        >
          <Target size={14} className="text-purple-500/70" />
          <span className="font-medium tracking-wide">{currentQuestion + 1} / {totalQuestions}</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-purple-600/70 flex items-center gap-1.5"
        >
          <span className="font-medium tracking-wide">{Math.round(progress)}%</span>
          <Compass size={14} className="text-purple-500/70" />
        </motion.div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200/30 via-indigo-200/30 to-purple-200/30 blur-lg" />
        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-[2px] relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-purple-500/80 via-indigo-500/80 to-purple-500/80 rounded-full relative"
          >
            <motion.div
              animate={{
                background: [
                  "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)",
                  "linear-gradient(90deg, rgba(255,255,255,0.1) 100%, rgba(255,255,255,0.3) 150%, rgba(255,255,255,0.1) 200%)"
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0"
            />
          </motion.div>
        </div>
      </div>
      <motion.p 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 text-center text-xs text-purple-500/60 font-medium tracking-wide"
      >
        {progress < 50 ? "Keep going! You're doing great!" : progress < 80 ? "Almost there!" : "Final stretch!"}
      </motion.p>
    </div>
  )
} 