'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ResultCard } from './ResultCard'

interface DimensionScoresProps {
  scores: Record<string, number>
  isVisible: boolean
}

export const DimensionScores = ({ scores, isVisible }: DimensionScoresProps) => {
  const dimensions = [
    {
      left: { label: 'Extroversion', code: 'E' },
      right: { label: 'Introversion', code: 'I' }
    },
    {
      left: { label: 'Sensing', code: 'S' },
      right: { label: 'Ntuition', code: 'N', prefix: 'i' }
    },
    {
      left: { label: 'Thinking', code: 'T' },
      right: { label: 'Feeling', code: 'F' }
    },
    {
      left: { label: 'Judging', code: 'J' },
      right: { label: 'Perceiving', code: 'P' }
    }
  ]

  return (
    <ResultCard isVisible={isVisible}>
      <div className="space-y-3">
        {dimensions.map(({ left, right }) => (
          <div key={left.code + right.code} className="space-y-2">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-purple-600/90">
                <span className="text-purple-600 font-bold">{left.code}</span>{left.label.slice(1)}
              </span>
              <span className="text-indigo-600/90">
                {right.prefix && <span className="text-indigo-600/90">{right.prefix}</span>}
                <span className="text-indigo-600 font-bold">{right.code}</span>
                {right.label.slice(1)}
              </span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden flex relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-sm" />
              <motion.div 
                initial={{ width: 0 }}
                animate={{ 
                  width: `${(scores[left.code] || 0) / ((scores[left.code] || 0) + (scores[right.code] || 0)) * 100}%` 
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative bg-gradient-to-r from-purple-200/90 via-purple-300/80 to-purple-200/90 rounded-l-full"
              />
              <motion.div 
                initial={{ width: 0 }}
                animate={{ 
                  width: `${(scores[right.code] || 0) / ((scores[left.code] || 0) + (scores[right.code] || 0)) * 100}%` 
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative bg-gradient-to-r from-indigo-200/90 via-indigo-300/80 to-indigo-200/90 rounded-r-full"
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-purple-500 font-medium">{scores[left.code] || 0}</span>
              <span className="text-indigo-500 font-medium">{scores[right.code] || 0}</span>
            </div>
          </div>
        ))}
      </div>
    </ResultCard>
  )
} 