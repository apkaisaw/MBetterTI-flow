'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Zap } from 'lucide-react'
import { 
  saveTestResult, 
  getQuestionAnswerScore, 
  getPersonalityClassGroupByTestScores 
} from '../../../lib/personality-test'
import { personalityTest as fullPersonalityTest } from '../../../data/personality-test'
import { personalityTest as quickPersonalityTest } from '../../../data/small-personality-test'
import { useRouter } from 'next/navigation'
import {
  TestInstructions,
  TestQuestion
} from '../../components/mbti-test/index'

export default function MbtiTest() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [isQuickTest, setIsQuickTest] = useState(true)
  const [testStarted, setTestStarted] = useState(false)

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
      
      // 保存结果
      const testResult = {
        ...result,
        scores: dimensionScores
      }

      saveTestResult({
        timestamp: Date.now(),
        testAnswers: newAnswers as ("A" | "B")[],
        testScores: scores,
        result: testResult
      })

      // 跳转到结果页面
      router.push('/mbti-test/result')
    }
  }

  const startTest = (isQuick: boolean) => {
    setTestStarted(true)
    setIsQuickTest(isQuick)
    setCurrentQuestion(0)
    setAnswers([])
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
        {!testStarted && (
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
        
        {testStarted && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
          >
            <TestQuestion
              question={isQuickTest ? quickPersonalityTest[currentQuestion] : fullPersonalityTest[currentQuestion]}
              currentQuestion={currentQuestion}
              totalQuestions={isQuickTest ? quickPersonalityTest.length : fullPersonalityTest.length}
              onAnswer={handleAnswer}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}