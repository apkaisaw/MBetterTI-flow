'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ResultCard } from './ResultCard'

interface JungianFunctionsProps {
  functions: {
    dominant: string
    auxiliary: string
    tertiary: string
    inferior: string
  }
  isVisible: boolean
}

export const JungianFunctions = ({ functions, isVisible }: JungianFunctionsProps) => {
  const functionItems = [
    { label: 'Dominant', value: functions.dominant, color: 'from-purple-100 to-indigo-50' },
    { label: 'Auxiliary', value: functions.auxiliary, color: 'from-indigo-100 to-violet-50' },
    { label: 'Tertiary', value: functions.tertiary, color: 'from-violet-100 to-purple-50' },
    { label: 'Inferior', value: functions.inferior, color: 'from-fuchsia-100 to-pink-50' }
  ]

  return (
    <ResultCard isVisible={isVisible}>
      <div className="grid grid-cols-2 gap-3 h-full">
        {functionItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-[2rem] bg-gradient-to-br ${item.color} p-6 flex flex-col justify-between backdrop-blur-sm h-[140px]`}
          >
            <div className="text-base font-medium text-purple-500/90 text-center">
              {item.label}
            </div>
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600/90 to-indigo-600/90 text-center">
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>
    </ResultCard>
  )
} 