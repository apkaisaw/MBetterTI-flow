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
} from '../../../../lib/personality-test'
import { personalityTest as fullPersonalityTest } from '../../../../data/personality-test'
import { personalityTest as quickPersonalityTest } from '../../../../data/small-personality-test'
import Image from 'next/image'
import Link from 'next/link'

// MBTI Introduction Card component
const MbtiIntroCard = () => {
  return (
    <div className="card-base shadow-lg rounded-3xl px-4 sm:px-8 py-4 sm:py-6 mb-0 sm:mb-8 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col md:flex-row gap-4 sm:gap-8 items-center">
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-purple-900">About MBTI</h3>
          <p className="text-sm sm:text-base text-purple-800 mb-3 sm:mb-4">
            The Myers-Briggs Type Indicator (MBTI) is a widely recognized personality assessment tool based on Carl Jung&apos;s theory of psychological types. It helps individuals understand their preferences, strengths, and potential areas for growth.
          </p>
          <p className="text-sm sm:text-base text-purple-800">
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
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [shouldShowButton, setShouldShowButton] = useState(false);
    const [contentHeight, setContentHeight] = useState<number>(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
      const updateHeight = () => {
        if (contentRef.current) {
          const height = contentRef.current.scrollHeight;
          setContentHeight(height);
          setShouldShowButton(height > 200);
        }
      };

      // 初始更新
      updateHeight();

      // 监听窗口大小变化
      window.addEventListener('resize', updateHeight);

      // 清理函数
      return () => window.removeEventListener('resize', updateHeight);
    }, [children]);

    // 监听展开状态变化，重新计算高度
    useEffect(() => {
      if (isExpanded && contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }, [isExpanded]);

    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative group mb-4 sm:mb-6"
          >
            {/* 简化的背景效果 */}
            <div className="absolute inset-0 card-base rounded-2xl sm:rounded-3xl shadow-sm group-hover:shadow-md transition-all duration-300" />
            
            {/* 内容容器 */}
            <div className="relative px-4 sm:px-8 py-4 sm:py-6 rounded-2xl sm:rounded-3xl border border-purple-100/50">
              {/* 标题区域 */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="p-2 bg-purple-50/80 rounded-lg">
                  <Sparkles className="text-purple-600/90 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-purple-900">
                  {titleKey}
                </h4>
              </div>
              
              {/* 内容区域 */}
              <motion.div
                ref={contentRef}
                animate={{ 
                  height: isExpanded ? 'auto' : shouldShowButton ? 199 : 'auto',
                  opacity: 1 
                }}
                initial={false}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="relative overflow-hidden"
              >
                <div className="text-purple-800/90 prose prose-purple max-w-none prose-li:marker:text-purple-400">
                  {children}
                </div>
              </motion.div>

              {/* 展开/收起按钮 */}
              {shouldShowButton && (
                <div 
                  className={`absolute left-0 right-0 flex flex-col items-center transition-all duration-300 ${
                    isExpanded ? 'bottom-0' : '0'
                  }`}
                >
                  {!isExpanded && (
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/30 to-transparent pointer-events-none rounded-b-2xl sm:rounded-b-3xl ${
                        isExpanded ? 'hidden' : ''
                      }`}
                    />
                  )}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="transition-all duration-300 
                      flex items-center
                      relative z-10
                      mb-0"
                  >
                    <ChevronDown 
                      className={`w-5 h-5 text-purple-500/60 transition-transform duration-300 hover:text-purple-500/80 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
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
      // 测试完成，计算结果
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => startTest(true)}
        className="p-4 sm:p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-100/80 to-white rounded-xl">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-purple-900">Quick Test</h3>
          <p className="text-sm sm:text-base text-purple-700">Complete a shorter version of the test in about 5 minutes</p>
        </div>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => startTest(false)}
        className="p-4 sm:p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-purple-100/50 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-100/80 to-white rounded-xl">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-purple-900">Full Test</h3>
          <p className="text-sm sm:text-base text-purple-700">Take the complete test for more accurate results (15-20 minutes)</p>
        </div>
      </motion.button>
    </div>
  )

  const renderQuestion = (question: TestQuestion) => {
    const currentQuestions = isQuickTest ? quickPersonalityTest : fullPersonalityTest;
    const progress = ((currentQuestion + 1) / currentQuestions.length) * 100;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-base rounded-3xl px-8 pt-6 pb-8 mb-8 shadow-xl"
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

      <div id="rules">
        <ResultCard titleKey="Ten Rules" isVisible={!!result} isLongContent>
          <ol className="list-decimal list-inside text-purple-700">
            {result.tenRulesToLive.map((rule: string, index: number) => (
              <li key={index}>{rule}</li>
            ))}
          </ol>
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
        <ResultCard titleKey="Living Tips" isVisible={!!result} isLongContent>
          <p className="text-purple-700">{result.livingHappilyTips}</p>
        </ResultCard>
      </div>
    </div>
  )

  const renderSavedResults = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-base rounded-3xl px-8 pt-6 pb-8 mb-8 shadow-xl"
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
    <div className="space-y-6 pt-8 sm:pt-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center mb-0 sm:mb-8"
      >
        <div className="relative">
          <motion.h1 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-800 mb-2"
          >
            Personality Insights
          </motion.h1>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>
        </div>
        <p className="text-sm sm:text-base text-purple-600/80 mt-2 text-center max-w-md">
          Discover your unique personality type and unlock deeper self-understanding
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 sm:space-y-6"
      >
        {renderResult(testResult || getPersonalityClassGroupByTestScores(['I','N','F','P']))}
      </motion.div>

      {savedResults.length > 0 && renderSavedResults()}
    </div>
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

