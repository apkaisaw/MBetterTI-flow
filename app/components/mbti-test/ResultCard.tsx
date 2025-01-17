'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCcw } from 'lucide-react'

interface ResultCardProps {
  children: React.ReactNode
  isVisible: boolean
  isLoading?: boolean
}

export const ResultCard = ({ children, isVisible, isLoading = false }: ResultCardProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white/10 backdrop-filter backdrop-blur-lg shadow-lg rounded-[2.5rem] px-8 py-6 mb-6 transition-all duration-300 hover:shadow-xl border border-white/20"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-purple-700/70 flex justify-center"
            >
              <RefreshCcw className="w-10 h-10" />
            </motion.div>
          ) : (
            <div className="text-purple-800">{children}</div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
} 