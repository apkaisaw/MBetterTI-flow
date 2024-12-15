'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation('common')

  return (
    <header className="bg-gradient-to-r from-purple-300/70 via-purple-400/70 to-indigo-400/70 backdrop-blur-md text-purple-900 py-4 px-6 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-purple-700 transition-colors duration-300 flex items-center">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Sparkles className="w-8 h-8 mr-3 text-purple-800" />
          </motion.div>
          <div className="flex items-center gap-1">
            <span className="text-purple-800">M</span>
            <span className="text-purple-800">Better</span>
            <span className="text-purple-800">T</span>
            <span className="text-purple-800">I</span>
          </div>
        </Link>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="/mbti-test" 
            className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300 flex items-center"
          >
            Start Your Journey
          </Link>
        </motion.div>
      </div>
    </header>
  )
}

export default Header