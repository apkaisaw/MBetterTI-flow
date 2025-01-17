'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '../../../../contexts/AuthContext'
import { DimensionScores, JungianFunctions } from '../../../components/mbti-test/index'
import { useRouter } from 'next/navigation'
import { getAllSavedTestResult } from '../../../../lib/personality-test'
import type { PersonalityClassGroup } from '../../../../lib/personality-test'

export default function MbtiTestResult() {
  const router = useRouter()
  const { walletAddress, connected: isConnected, logIn } = useAuth()
  const [activeTab, setActiveTab] = useState<'dimension' | 'jungian'>('dimension')
  const [testResult, setTestResult] = useState<PersonalityClassGroup | null>(null)

  useEffect(() => {
    // 从localStorage或API获取最新的测试结果
    getAllSavedTestResult().then((results) => {
      results.match({
        Ok: (option) => option.match({
          Some: (data) => {
            // 获取最新的测试结果
            const latestResult = data.sort((a, b) => b.timestamp - a.timestamp)[0]
            if (latestResult?.result) {
              setTestResult(latestResult.result)
            }
          },
          None: () => console.log("没有保存的测试结果"),
        }),
        Error: (error) => console.error("加载保存的测试结果时出错:", error),
      })
    })
  }, [])

  const renderWalletButton = () => {
    if (isConnected) {
      return (
        <Link 
          href="/overview"
          className="group relative px-8 py-2.5 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-3"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-200/80 to-indigo-200/80 backdrop-blur-md" />
          <div className="absolute inset-0 rounded-full bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 text-purple-900">
            {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Unknown'}
          </span>
          <div className="w-2 h-2 rounded-full bg-green-400 relative z-10" />
          <ArrowRight size={20} className="relative z-10 text-purple-600 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )
    }

    return (
      <button
        onClick={logIn}
        className="group relative px-8 py-2.5 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-3"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/90 to-indigo-500/90" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/90 to-indigo-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative z-10 text-white">Connect Wallet</span>
        <ArrowRight size={20} className="relative z-10 text-white/90 group-hover:translate-x-0.5 transition-transform" />
      </button>
    )
  }

  if (!testResult) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
            <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
          </div>
        </div>

        <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-purple-900">No Test Result Found</h1>
            <p className="text-purple-800/70">Please take the MBTI test first to see your results.</p>
            {renderWalletButton()}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center px-4 pt-20 pb-8 sm:py-28 md:py-36 lg:py-40">
        <div className="w-full max-w-4xl backdrop-blur-lg space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-4"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block bg-white/20 backdrop-blur-md px-5 py-1.5 rounded-full text-sm font-medium text-purple-800 mb-2 border border-white/30"
            >
              Your MBTI Type
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-1"
            >
              <h2 className="text-6xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-600/90 via-indigo-500/90 to-purple-600/90">
                {testResult.type}
              </h2>
              <p className="text-lg font-medium text-purple-800/70 tracking-wide">
                {testResult.name}
              </p>
              <p className="text-sm text-purple-600/80 italic">
                {testResult.epithet}
              </p>
            </motion.div>
          </motion.div>

          {/* Mobile tab switcher */}
          <div className="md:hidden flex justify-center gap-3 mb-4">
            <motion.button
              onClick={() => setActiveTab('dimension')}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'dimension'
                  ? 'text-white'
                  : 'text-purple-800/70 hover:text-purple-900'
              }`}
            >
              <AnimatePresence mode="wait">
                {activeTab === 'dimension' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/90 to-indigo-500/90 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
              <span className="relative z-10">
                Dimension Scores
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveTab('jungian')}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === 'jungian'
                  ? 'text-white'
                  : 'text-purple-800/70 hover:text-purple-900'
              }`}
            >
              <AnimatePresence mode="wait">
                {activeTab === 'jungian' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/90 to-indigo-500/90 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
              <span className="relative z-10">
                Jungian Functions
              </span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`md:block ${activeTab === 'dimension' ? 'block' : 'hidden'}`}>
              <DimensionScores scores={testResult.scores || {}} isVisible={!!testResult} />
            </div>

            <div className={`md:block ${activeTab === 'jungian' ? 'block' : 'hidden'}`}>
              <JungianFunctions functions={testResult.jungianFunctionalPreference} isVisible={!!testResult} />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex flex-col items-center space-y-4">
              {renderWalletButton()}
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <p className="text-purple-800/70 text-sm font-medium">
                  {isConnected ? 'Click to continue your journey' : 'Connect wallet to start your growth journey'}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 