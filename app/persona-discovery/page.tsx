'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, CheckCircle, ArrowRight, Sparkles, RefreshCcw, Brain, Zap, Target, ChevronDown, ChevronUp } from 'lucide-react'
import { 
  TestQuestion, 
  PersonalityClassGroup, 
  getAllSavedTestResult, 
  saveTestResult, 
  getQuestionAnswerScore, 
  getPersonalityClassGroupByTestScores 
} from '../../lib/personality-test'
import { personalityTest as fullPersonalityTest } from '../../data/personality-test'
import { personalityTest as quickPersonalityTest } from '../../data/small-personality-test'
import Image from 'next/image'
import DashboardLayout from '../components/DashboardLayout'
import Link from 'next/link'

// MBTI Introduction Card component
const MbtiIntroCard = () => {
  return (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg rounded-3xl px-8 py-6 mb-8 transition-all duration-300 hover:shadow-xl border border-white border-opacity-30">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 text-purple-900">About MBTI</h3>
          <p className="text-purple-800 mb-4">
            The Myers-Briggs Type Indicator (MBTI) is a widely recognized personality assessment tool based on Carl Jung&apos;s theory of psychological types. It helps individuals understand their preferences, strengths, and potential areas for growth.
          </p>
          <p className="text-purple-800">
            By identifying your MBTI type, you can gain valuable insights into your natural tendencies in areas such as communication, decision-making, and personal relationships. This understanding can lead to better self-awareness and more effective interactions with others.
          </p>
        </div>
        <div className="w-full md:w-1/3">
          <Image 
            src="/images/pdmbti.jpg" 
            alt="MBTI Type Diagram" 
            width={400}
            height={300}
            className="rounded-lg shadow-md w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default function PersonaDiscovery() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [testResult, setTestResult] = useState<PersonalityClassGroup | null>(null)
  const [savedResults, setSavedResults] = useState<any[]>([])
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showMbtiSelect, setShowMbtiSelect] = useState(false)
  const [testStarted, setTestStarted] = useState(false)
  const [isQuickTest, setIsQuickTest] = useState(true)
  const [viewingType, setViewingType] = useState<PersonalityClassGroup | null>(null)
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})

  const ResultCard = ({ 
    titleKey, 
    children, 
    isVisible, 
    isLongContent = false 
  }: { 
    titleKey: string; 
    children: React.ReactNode; 
    isVisible: boolean;
    isLongContent?: boolean;
  }) => {
    const isExpanded = expandedCards[titleKey] ?? false;
    const contentRef = useRef<HTMLDivElement>(null);

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg rounded-3xl px-8 py-6 mb-8 transition-all duration-300 hover:shadow-xl border border-white border-opacity-30 relative"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-2xl font-bold mb-4 text-purple-900 flex items-center">
                <Sparkles className="mr-3 text-purple-700" size={24} />
                {titleKey}
              </h4>
              {isLongContent && (
                <button
                  onClick={() => setExpandedCards(prev => ({...prev, [titleKey]: !isExpanded}))}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors"
                >
                  <span className="text-sm">{isExpanded ? 'Show Less' : 'Show More'}</span>
                  <ChevronDown 
                    className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                    size={20} 
                  />
                </button>
              )}
            </div>
            <div
              ref={contentRef}
              className={`text-purple-800 overflow-hidden transition-all duration-300 ${
                isLongContent && !isExpanded ? 'max-h-[200px]' : 'max-h-[2000px]'
              }`}
            >
              {children}
            </div>
            {isLongContent && !isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  useEffect(() => {
    loadSavedResults()
  }, [])

  const loadSavedResults = async () => {
    const results = await getAllSavedTestResult()
    results.match({
      Ok: (option: any) => option.match({
        Some: (data: any) => setSavedResults(data),
        None: () => console.log("没有保存的测试结果"),
      }),
      Error: (error: any) => console.error("加载保存的测试结果时出错:", error),
    })
  }

  const handleAnswer = (answer: "A" | "B") => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    const currentQuestions = isQuickTest ? quickPersonalityTest : fullPersonalityTest

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // 测试完成，计算结
      const scores = newAnswers.map((answer, index) => 
        getQuestionAnswerScore(currentQuestions[index].no, answer as "A" | "B")
      )

      const result = getPersonalityClassGroupByTestScores(scores)
      
      // 统计每个维度的得分
      const dimensionScores = scores.reduce((acc, score) => {
        acc[score] = (acc[score] || 0) + 1
        return acc
      }, {} as Record<string, number>)
      
      setTestResult({
        ...result,
        scores: dimensionScores
      })

      // 保存测试结果
      saveTestResult({
        timestamp: Date.now(),
        testAnswers: newAnswers as ("A" | "B")[],
        testScores: scores
      }).then(() => loadSavedResults())

      // 生成图像
      generateImage(result.type)
    }
  }

  const generateImage = (mbtiType: string) => {
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedImage(`https://source.unsplash.com/random/400x400?abstract&${mbtiType}`)
      setIsGenerating(false)
    }, 2000)
  }

  const startTest = (isQuick: boolean) => {
    setTestStarted(true)
    setIsQuickTest(isQuick)
    setCurrentQuestion(0)
    setAnswers([])
  }

  const viewMBTI = (type: string) => {
    const typeArray = type.split('') as ("E" | "I" | "S" | "N" | "T" | "F" | "J" | "P")[];
    const result = getPersonalityClassGroupByTestScores(typeArray);
    setViewingType(result);
  };

  const renderInitialOptions = () => (
    <div className="space-y-6">
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(138, 43, 226, 0.2)" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => startTest(true)}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center text-lg font-semibold"
      >
        <Zap className="mr-3" size={24} />
        Start Quick Test
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(63, 81, 181, 0.2)" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => startTest(false)}
        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center text-lg font-semibold"
      >
        <Brain className="mr-3" size={24} />
        Start Full Test
      </motion.button>
      <Link
        href="/mbti-test"
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center text-lg font-semibold"
      >
        <Target className="mr-3" size={24} />
        Take MBTI Test
      </Link>
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 150, 136, 0.2)" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowMbtiSelect(!showMbtiSelect)}
        className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center text-lg font-semibold"
      >
        <Target className="mr-3" size={24} />
        View Types
      </motion.button>
      {showMbtiSelect && (
        <div className="grid grid-cols-4 gap-3 mt-6">
          {['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'].map(type => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05, backgroundColor: "#EDE9FE" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => viewMBTI(type)}
              className="bg-purple-100 text-purple-800 px-4 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md font-medium"
            >
              {type}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )

  const renderQuestion = (question: TestQuestion) => {
    const currentQuestions = isQuickTest ? quickPersonalityTest : fullPersonalityTest;
    const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg shadow-xl rounded-3xl px-8 pt-6 pb-8 mb-8 border border-white border-opacity-40"
      >
        <div className="mb-4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-purple-600 mb-4 font-semibold">Question {currentQuestion + 1} / {currentQuestions.length}</p>
        <h2 className="text-2xl font-bold mb-4 text-purple-800">{question.question}</h2>
        <div className="flex flex-col gap-4">
          {question.answerOptions.map((option: any) => (
            <motion.button
              key={option.type}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 16px rgba(138, 43, 226, 0.2)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleAnswer(option.type)}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-opacity-80 backdrop-filter backdrop-blur-sm text-white px-6 py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-between"
            >
              <span>{option.answer}</span>
              <ArrowRight size={20} />
            </motion.button>
          ))}
        </div>
      </motion.div>
    )
  }

  const renderResult = (result: PersonalityClassGroup, isViewing: boolean = false) => (
    <div className="space-y-4">
      <div id="type">
        <ResultCard titleKey="MBTI Type & Description" isVisible={!!result} isLongContent>
          <h2 className="text-2xl font-bold mb-2 text-purple-800">{result.type}</h2>
          <h3 className="text-xl mb-2 text-purple-700">{result.name} - {result.epithet}</h3>
          <p className="text-purple-700">{result.description}</p>
        </ResultCard>
      </div>

      <div id="traits">
        <ResultCard titleKey="General Traits" isVisible={!!result} isLongContent>
          <ul className="list-disc list-inside text-purple-700">
            {result.generalTraits.map((trait: string, index: number) => (
              <li key={index}>{trait}</li>
            ))}
          </ul>
        </ResultCard>
      </div>

      <div id="strengths">
        <ResultCard titleKey="Relationship Strengths" isVisible={!!result} isLongContent>
          <ul className="list-disc list-inside text-purple-700">
            {result.relationshipStrengths.map((strength: string, index: number) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </ResultCard>
      </div>

      <div id="weaknesses">
        <ResultCard titleKey="Relationship Weaknesses" isVisible={!!result} isLongContent>
          <ul className="list-disc list-inside text-purple-700">
            {result.relationshipWeaknesses.map((weakness: string, index: number) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </ResultCard>
      </div>

      <div id="success">
        <ResultCard titleKey="Success Definition" isVisible={!!result} isLongContent>
          <p className="text-purple-700">{result.successDefinition}</p>
        </ResultCard>
      </div>

      <div id="personal-strengths">
        <ResultCard titleKey="Strengths" isVisible={!!result} isLongContent>
          <ul className="list-disc list-inside text-purple-700">
            {result.strengths.map((strength: string, index: number) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </ResultCard>
      </div>

      <div id="gifts">
        <ResultCard titleKey="Gifts" isVisible={!!result} isLongContent>
          <ul className="list-disc list-inside text-purple-700">
            {result.gifts.map((gift: string, index: number) => (
              <li key={index}>{gift}</li>
            ))}
          </ul>
        </ResultCard>
      </div>

      <div id="problems">
        <ResultCard titleKey="Potential Problem Areas" isVisible={!!result} isLongContent>
          <ul className="list-disc list-inside text-purple-700">
            {result.potentialProblemAreas.map((area: string, index: number) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </ResultCard>
      </div>

      <div id="explanation">
        <ResultCard titleKey="Explanation of Problems" isVisible={!!result} isLongContent>
          <p className="text-purple-700">{result.explanationOfProblems}</p>
        </ResultCard>
      </div>

      <div id="solutions">
        <ResultCard titleKey="Solutions" isVisible={!!result} isLongContent>
          <p className="text-purple-700">{result.solutions}</p>
        </ResultCard>
      </div>

      <div id="tips">
        <ResultCard titleKey="Living Happily Tips" isVisible={!!result} isLongContent>
          <p className="text-purple-700">{result.livingHappilyTips}</p>
        </ResultCard>
      </div>

      <div id="rules">
        <ResultCard titleKey="Ten Rules to Live" isVisible={!!result} isLongContent>
          <ol className="list-decimal list-inside text-purple-700">
            {result.tenRulesToLive.map((rule: string, index: number) => (
              <li key={index}>{rule}</li>
            ))}
          </ol>
        </ResultCard>
      </div>
    </div>
  )

  const renderSavedResults = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg shadow-xl rounded-3xl px-8 pt-6 pb-8 mb-8 border border-white border-opacity-40"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-purple-800">History Results</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
          className="text-purple-600 hover:text-purple-800"
        >
          {isHistoryExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          <span className="ml-2">{isHistoryExpanded ? 'Collapse' : 'Expand'}</span>
        </motion.button>
      </div>
      <AnimatePresence>
        {isHistoryExpanded && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-purple-700 overflow-hidden"
          >
            {savedResults.map((result: any, index: number) => {
              const personalityType = getPersonalityClassGroupByTestScores(result.testScores)
              return (
                <li key={index} className="mb-2">
                  Test Time: {new Date(result.timestamp).toLocaleString()} - 
                  Type: {personalityType.type}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex justify-center items-center"
        >
          <motion.h1 
            className="text-3xl font-bold text-purple-800/90 bg-white/50 backdrop-blur-sm px-6 py-2 rounded-2xl"
          >
            MBTI Test Results
          </motion.h1>
          <motion.span
            className="absolute -top-3 -right-3 text-7xl text-purple-400/50" 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles />
          </motion.span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-white border-opacity-30"
        >
          {renderResult(testResult || getPersonalityClassGroupByTestScores(['I','N','F','P']))}
        </motion.div>

        {savedResults.length > 0 && renderSavedResults()}
      </div>
    </DashboardLayout>
  )
}

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-white bg-opacity-90 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
  >
    <div className="text-purple-600 mb-3">{icon}</div>
    <h3 className="text-lg font-semibold text-purple-800 mb-2">{title}</h3>
    <p className="text-purple-600 text-sm">{description}</p>
  </motion.div>
)
