'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, ArrowRight, Sparkles, RefreshCcw, Brain, Zap, Target, Wallet, X, Check } from 'lucide-react'
import { 
  TestQuestion, 
  PersonalityClassGroup, 
  saveTestResult, 
  getQuestionAnswerScore, 
  getPersonalityClassGroupByTestScores 
} from '../../../lib/personality-test'
import { personalityTest as fullPersonalityTest } from '../../../data/personality-test'
import { personalityTest as quickPersonalityTest } from '../../../data/small-personality-test'
import { useWallet } from '../../../contexts/WalletContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// ResultCard component
const ResultCard = ({ children, isVisible, isLoading = false }: { children: React.ReactNode; isVisible: boolean; isLoading?: boolean }) => {
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

// TestInstructions component
const TestInstructions = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-6"
  >
    <div className="bg-white/30 backdrop-blur-md rounded-[2.5rem] p-8 shadow-lg border border-white/30">
      <div className="space-y-4 text-purple-800">
        <p className="text-base font-medium">
          This test is quick and straightforward—it should only take about 5 to 20 minutes to complete. Here are a few tips:
        </p>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 rounded-full p-1.5 mt-1">
              <span className="font-bold">1</span>
            </div>
            <div>
              <h4 className="font-semibold mb-0.5">There are no right or wrong answers</h4>
              <p className="text-purple-700 text-sm">It&apos;s not about being &quot;correct.&quot; Just go with whatever feels most natural to you.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 rounded-full p-1.5 mt-1">
              <span className="font-bold">2</span>
            </div>
            <div>
              <h4 className="font-semibold mb-0.5">Don&apos;t overthink it—keep it quick and intuitive</h4>
              <p className="text-purple-700 text-sm">Some questions might seem strangely worded or unclear. Trust your instincts and move on.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 rounded-full p-1.5 mt-1">
              <span className="font-bold">3</span>
            </div>
            <div>
              <h4 className="font-semibold mb-0.5">Be yourself—answer as you truly are</h4>
              <p className="text-purple-700 text-sm">Avoid answering based on how you think others see you or how you want to be seen. Be honest and authentic.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-2">
          <p className="text-base font-medium text-purple-900">
            Take a deep breath, trust yourself, and let&apos;s dive in!
          </p>
        </div>
      </div>
    </div>
  </motion.div>
)

// Updated WalletModal component
const WalletModal = ({ 
  isOpen, 
  onClose,
  onConnect 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onConnect: (address: string) => void;
}) => {
  const { connectWallet } = useWallet()
  const [step, setStep] = useState<'select' | 'confirm'>('select')
  
  const connectMetaMask = async () => {
    setStep('confirm')
  }

  const confirmConnection = async () => {
    try {
      await connectWallet()
      onClose()
    } catch (error) {
      console.error('Failed to connect:', error)
      setStep('select')
    }
  }

  const renderContent = () => {
    if (step === 'confirm') {
      return (
        <div className="space-y-6">
          <div className="text-purple-800 space-y-4">
            <h4 className="font-medium">Connect to MetaMask</h4>
            <p className="text-sm">
              By connecting your wallet, you agree to:
            </p>
            <ul className="text-sm space-y-2 list-disc pl-4">
              <li>Share your wallet address</li>
              <li>Sign messages to verify your identity</li>
              <li>Pay gas fees for transactions</li>
            </ul>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setStep('select')}
              className="flex-1 px-4 py-2 rounded-xl border border-purple-200/30 text-purple-600 hover:bg-purple-50/50"
            >
              Cancel
            </button>
            <button
              onClick={confirmConnection}
              className="flex-1 px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
            >
              Connect
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        <button
          className="w-full bg-white/50 hover:bg-white/80 backdrop-blur-sm text-purple-900 px-4 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow flex items-center gap-3 border border-purple-100/20"
          onClick={connectMetaMask}
        >
          <span className="text-2xl">🦊</span>
          <span className="font-medium">MetaMask</span>
        </button>
        
        <button
          className="w-full bg-white/30 text-purple-900/50 px-4 py-3 rounded-xl flex items-center gap-3 border border-purple-100/20 cursor-not-allowed"
          disabled
        >
          <span className="text-2xl">🔗</span>
          <span className="font-medium">WalletConnect (Coming Soon)</span>
        </button>
        <button
          className="w-full bg-white/30 text-purple-900/50 px-4 py-3 rounded-xl flex items-center gap-3 border border-purple-100/20 cursor-not-allowed"
          disabled
        >
          <span className="text-2xl">📱</span>
          <span className="font-medium">Coinbase Wallet (Coming Soon)</span>
        </button>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={() => {
              setStep('select')
              onClose()
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-[360px] bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-purple-100/30">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-purple-900 flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  {step === 'select' ? 'Connect Wallet' : 'Confirm Connection'}
                </h3>
                <button
                  onClick={() => {
                    setStep('select')
                    onClose()
                  }}
                  className="text-purple-500 hover:text-purple-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {renderContent()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Updated MbtiTest component
export default function MbtiTest() {
  const { walletAddress, isConnected } = useWallet()
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [testResult, setTestResult] = useState<PersonalityClassGroup | null>(null)
  const [isQuickTest, setIsQuickTest] = useState(true)
  const [testStarted, setTestStarted] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'dimension' | 'jungian'>('dimension')
  const router = useRouter()

  const handleAnswer = (answer: "A" | "B") => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    const currentQuestions = isQuickTest ? quickPersonalityTest : fullPersonalityTest

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Test complete, calculate result
      const scores = newAnswers.map((answer, index) => 
        getQuestionAnswerScore(currentQuestions[index].no, answer as "A" | "B")
      )

      const result = getPersonalityClassGroupByTestScores(scores)
      
      const dimensionScores = scores.reduce((acc, score) => {
        acc[score] = (acc[score] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      setTestResult({
        ...result,
        scores: dimensionScores
      })

      saveTestResult({
        timestamp: Date.now(),
        testAnswers: newAnswers as ("A" | "B")[],
        testScores: scores
      })
    }
  }

  const startTest = (isQuick: boolean) => {
    setTestStarted(true)
    setIsQuickTest(isQuick)
    setCurrentQuestion(0)
    setAnswers([])
    setTestResult(null)
  }

  const renderInitialOptions = () => (
    <>
      <TestInstructions />
      <div className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => startTest(true)}
          className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-purple-900 px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center text-lg font-semibold border border-white/30 group"
        >
          <Zap className="mr-3 text-purple-500/90" size={22} />
          <span className="group-hover:text-purple-900">Quick Test (28 Q • 8 min)</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => startTest(false)}
          className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-purple-900 px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center text-lg font-semibold border border-white/30 group"
        >
          <Brain className="mr-3 text-purple-500/90" size={22} />
          <span className="group-hover:text-purple-900">Full Test (70 Q • 20 min)</span>
        </motion.button>
      </div>
    </>
  )

  const renderQuestion = (question: TestQuestion) => {
    const currentQuestions = isQuickTest ? quickPersonalityTest : fullPersonalityTest;
    const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;

    return (
      <div className="min-h-screen flex flex-col relative">
        {/* Background gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-100/80 via-indigo-100/80 to-blue-100/80 backdrop-blur-sm"
          style={{
            background: `radial-gradient(circle at ${progress}% 50%, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.05))`,
          }}
        />

        {/* Progress indicator */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
          <div className="flex justify-between items-center text-sm mb-3">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-purple-600/70 flex items-center gap-1.5"
            >
              <Target size={14} className="text-purple-500/70" />
              <span className="font-medium tracking-wide">{currentQuestion + 1} / {currentQuestions.length}</span>
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
                  onClick={() => handleAnswer(option.type as "A" | "B")}
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

  const renderResult = (result: PersonalityClassGroup) => {
    return (
      <div className="space-y-4">
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
            Analysis Complete
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-1"
          >
            <h2 className="text-6xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-600/90 via-indigo-500/90 to-purple-600/90">
              {result.type}
            </h2>
            <p className="text-lg font-medium text-purple-800/70 tracking-wide">
              {result.name}
            </p>
            <p className="text-sm text-purple-600/80 italic">
              {result.epithet}
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
            <ResultCard isVisible={!!result}>
              <div className="space-y-3">
                {/* E-I */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-purple-600/90">
                      <span className="text-purple-600 font-bold">E</span>xtroversion
                    </span>
                    <span className="text-indigo-600/90">
                      <span className="text-indigo-600 font-bold">I</span>ntroversion
                    </span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden flex relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-sm" />
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(result.scores?.E || 0) / ((result.scores?.E || 0) + (result.scores?.I || 0)) * 100}%` 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="relative bg-gradient-to-r from-purple-200/90 via-purple-300/80 to-purple-200/90 rounded-l-full"
                    />
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(result.scores?.I || 0) / ((result.scores?.E || 0) + (result.scores?.I || 0)) * 100}%` 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="relative bg-gradient-to-r from-indigo-200/90 via-indigo-300/80 to-indigo-200/90 rounded-r-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-500 font-medium">{result.scores?.E || 0}</span>
                    <span className="text-indigo-500 font-medium">{result.scores?.I || 0}</span>
                  </div>
                </div>

                {/* S-N */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-purple-600/90">
                      <span className="text-purple-600 font-bold">S</span>ensing
                    </span>
                    <span className="text-indigo-600/90">
                      i<span className="text-indigo-600 font-bold">N</span>tuition
                    </span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden flex relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-sm" />
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(result.scores?.S || 0) / ((result.scores?.S || 0) + (result.scores?.N || 0)) * 100}%` 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="relative bg-gradient-to-r from-purple-200/90 via-purple-300/80 to-purple-200/90 rounded-l-full"
                    />
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(result.scores?.N || 0) / ((result.scores?.S || 0) + (result.scores?.N || 0)) * 100}%` 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="relative bg-gradient-to-r from-indigo-200/90 via-indigo-300/80 to-indigo-200/90 rounded-r-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-500 font-medium">{result.scores?.S || 0}</span>
                    <span className="text-indigo-500 font-medium">{result.scores?.N || 0}</span>
                  </div>
                </div>

                {/* T-F */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-purple-600/90">
                      <span className="text-purple-600 font-bold">T</span>hinking
                    </span>
                    <span className="text-indigo-600/90">
                      <span className="text-indigo-600 font-bold">F</span>eeling
                    </span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden flex relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-sm" />
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(result.scores?.T || 0) / ((result.scores?.T || 0) + (result.scores?.F || 0)) * 100}%` 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="relative bg-gradient-to-r from-purple-200/90 via-purple-300/80 to-purple-200/90 rounded-l-full"
                    />
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(result.scores?.F || 0) / ((result.scores?.T || 0) + (result.scores?.F || 0)) * 100}%` 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="relative bg-gradient-to-r from-indigo-200/90 via-indigo-300/80 to-indigo-200/90 rounded-r-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-500 font-medium">{result.scores?.T || 0}</span>
                    <span className="text-indigo-500 font-medium">{result.scores?.F || 0}</span>
                  </div>
                </div>

                {/* J-P */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-purple-600/90">
                      <span className="text-purple-600 font-bold">J</span>udging
                    </span>
                    <span className="text-indigo-600/90">
                      <span className="text-indigo-600 font-bold">P</span>erceiving
                    </span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden flex relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-sm" />
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(result.scores?.J || 0) / ((result.scores?.J || 0) + (result.scores?.P || 0)) * 100}%` 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="relative bg-gradient-to-r from-purple-200/90 via-purple-300/80 to-purple-200/90 rounded-l-full"
                    />
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ 
                        width: `${(result.scores?.P || 0) / ((result.scores?.J || 0) + (result.scores?.P || 0)) * 100}%` 
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="relative bg-gradient-to-r from-indigo-200/90 via-indigo-300/80 to-indigo-200/90 rounded-r-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-500 font-medium">{result.scores?.J || 0}</span>
                    <span className="text-indigo-500 font-medium">{result.scores?.P || 0}</span>
                  </div>
                </div>
              </div>
            </ResultCard>
          </div>

          <div className={`md:block ${activeTab === 'jungian' ? 'block' : 'hidden'}`}>
            <ResultCard isVisible={!!result}>
              <div className="grid grid-cols-2 gap-3 h-full">
                {[
                  { label: 'Dominant', value: result.jungianFunctionalPreference.dominant, color: 'from-purple-100 to-indigo-50' },
                  { label: 'Auxiliary', value: result.jungianFunctionalPreference.auxiliary, color: 'from-indigo-100 to-violet-50' },
                  { label: 'Tertiary', value: result.jungianFunctionalPreference.tertiary, color: 'from-violet-100 to-purple-50' },
                  { label: 'Inferior', value: result.jungianFunctionalPreference.inferior, color: 'from-fuchsia-100 to-pink-50' }
                ].map((item, index) => (
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
    );
  };

  const handleWalletConnected = (address: string) => {
    setIsWalletModalOpen(false)
  }

  const renderWalletButton = () => {
    if (isConnected) {
      return (
        <Link 
          href="/overview"
          className="group relative px-8 py-3.5 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-3"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-200/80 to-indigo-200/80 backdrop-blur-md" />
          <div className="absolute inset-0 rounded-full bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 text-purple-900">
            {`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
          </span>
          <div className="w-2 h-2 rounded-full bg-green-400 relative z-10" />
          <ArrowRight size={20} className="relative z-10 text-purple-600 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )
    }

    return (
      <button 
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsWalletModalOpen(true)
        }}
        className="group relative px-8 py-3.5 rounded-full text-lg font-medium transition-all duration-300 flex items-center gap-3"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/90 to-indigo-500/90" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/90 to-indigo-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative z-10 text-white">Connect Wallet</span>
        <ArrowRight size={20} className="relative z-10 text-white/90 group-hover:translate-x-0.5 transition-transform" />
      </button>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-1/4 w-1/2 h-1/2 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-1/4 left-1/4 w-1/2 h-1/2 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!testStarted && !testResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen relative flex flex-col items-center justify-center px-4 py-12"
          >
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8 text-center"
            >
              <h1 className="text-6xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-600/90 via-indigo-500/90 to-purple-600/90">
                MBTI
              </h1>
              <p className="text-xl font-medium text-purple-800/70 mt-2 tracking-wide">
                Personality Test
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-3xl backdrop-blur-lg"
            >
              {renderInitialOptions()}
            </motion.div>
          </motion.div>
        )}
        
        {testStarted && !testResult && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
          >
            {renderQuestion(isQuickTest ? quickPersonalityTest[currentQuestion] : fullPersonalityTest[currentQuestion])}
          </motion.div>
        )}
        
        {testResult && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen relative flex flex-col items-center px-4 py-6 md:py-24 lg:py-32"
          >
            <div className="w-full max-w-4xl backdrop-blur-lg">
              {renderResult(testResult)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnected}
      />
    </div>
  )
}