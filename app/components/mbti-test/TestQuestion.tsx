'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { TestProgress } from './TestProgress'
import { TestQuestion as TestQuestionType } from '../../../lib/personality-test'

interface TestQuestionProps {
  question: TestQuestionType
  currentQuestion: number
  totalQuestions: number
  onAnswer: (answer: "A" | "B") => void
}

export const TestQuestion = ({ 
  question, 
  currentQuestion, 
  totalQuestions,
  onAnswer 
}: TestQuestionProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-purple-100/80 via-indigo-100/80 to-blue-100/80 backdrop-blur-sm"
        style={{
          background: `radial-gradient(circle at ${((currentQuestion + 1) / totalQuestions) * 100}% 50%, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.05))`,
        }}
      />

      {/* Progress indicator */}
      <TestProgress 
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
      />

      {/* Question content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-grow flex flex-col items-center justify-center px-4 py-20 relative z-10"
      >
        <div className="max-w-4xl w-full space-y-12">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-purple-900 text-center leading-relaxed"
          >
            {question.question}
          </motion.h2>
          
          <div className="space-y-4">
            {question.answerOptions.map((option: any, index: number) => (
              <motion.button
                key={option.type}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.15
                }}
                whileHover={{ 
                  scale: 1.01,
                  backgroundColor: "rgba(255, 255, 255, 0.35)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onAnswer(option.type as "A" | "B")}
                className="relative w-full bg-white/25 text-purple-900 px-8 py-4 rounded-full transition-all duration-200 shadow-sm hover:shadow border border-white/20 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />
                <div className="relative w-full flex justify-center items-center">
                  <span className="text-lg transition-all duration-300">
                    {option.answer}
                  </span>
                  <div className="absolute right-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Check className="w-5 h-5 text-purple-600/80" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
} 