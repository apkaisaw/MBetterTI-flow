'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
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
import { useTranslation } from 'react-i18next'  // 修改这一行

// 修改 ResultCard 组件
const ResultCard = ({ titleKey, children, isVisible, isLoading = false }: { titleKey: string; children: React.ReactNode; isVisible: boolean; isLoading?: boolean }) => {
  const { t } = useTranslation('common');

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg rounded-3xl px-8 py-6 mb-8 transition-all duration-300 hover:shadow-xl border border-white border-opacity-30"
        >
          <h4 className="text-2xl font-bold mb-4 text-purple-900 flex items-center">
            <Sparkles className="mr-3 text-purple-700" size={24} />
            {t(titleKey)}
          </h4>
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="text-purple-700 flex justify-center"
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

export default function PersonaDiscovery() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [testResult, setTestResult] = useState<PersonalityClassGroup | null>(null)
  const [savedResults, setSavedResults] = useState<any[]>([])
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { language } = useLanguage()
  const [showMbtiSelect, setShowMbtiSelect] = useState(false)
  const [testStarted, setTestStarted] = useState(false)
  const [isQuickTest, setIsQuickTest] = useState(true)
  const [viewingType, setViewingType] = useState<PersonalityClassGroup | null>(null)
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false)
  const { t } = useTranslation('common');  // 使用 'common' 命名空间

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
    <div className="space-y-6">
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(138, 43, 226, 0.2)" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => startTest(true)}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center text-lg font-semibold"
      >
        <Zap className="mr-3" size={24} />
        {t('startQuickTest')}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(63, 81, 181, 0.2)" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => startTest(false)}
        className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center text-lg font-semibold"
      >
        <Brain className="mr-3" size={24} />
        {t('startFullTest')}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 150, 136, 0.2)" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowMbtiSelect(!showMbtiSelect)}
        className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center text-lg font-semibold"
      >
        <Target className="mr-3" size={24} />
        {t('viewTypes')}
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
        <p className="text-sm text-purple-600 mb-4 font-semibold">问题 {currentQuestion + 1} / {currentQuestions.length}</p>
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
      <ResultCard titleKey="mbtiTypeAndDescription" isVisible={!!result}>
        <h2 className="text-2xl font-bold mb-2 text-purple-800">{result.type}</h2>
        <h3 className="text-xl mb-2 text-purple-700">{result.name} - {result.epithet}</h3>
        <p className="text-purple-700">{result.description}</p>
      </ResultCard>

      {!isViewing && (
        <ResultCard titleKey="dimensionScores" isVisible={!!result}>
          <div className="grid grid-cols-2 gap-4 text-purple-700">
            <div>E: {result.scores?.E || 0} - I: {result.scores?.I || 0}</div>
            <div>S: {result.scores?.S || 0} - N: {result.scores?.N || 0}</div>
            <div>T: {result.scores?.T || 0} - F: {result.scores?.F || 0}</div>
            <div>J: {result.scores?.J || 0} - P: {result.scores?.P || 0}</div>
          </div>
        </ResultCard>
      )}

      <ResultCard titleKey="jungianFunctionalPreference" isVisible={!!result}>
        <ul className="list-disc list-inside text-purple-700">
          <li>{t('dominantFunction')}: {result.jungianFunctionalPreference.dominant}</li>
          <li>{t('auxiliaryFunction')}: {result.jungianFunctionalPreference.auxiliary}</li>
          <li>{t('tertiaryFunction')}: {result.jungianFunctionalPreference.tertiary}</li>
          <li>{t('inferiorFunction')}: {result.jungianFunctionalPreference.inferior}</li>
        </ul>
      </ResultCard>

      <ResultCard titleKey="generalTraits" isVisible={!!result}>
        <ul className="list-disc list-inside text-purple-700">
          {result.generalTraits.map((trait: string, index: number) => (
            <li key={index}>{trait}</li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard titleKey="relationshipStrengths" isVisible={!!result}>
        <ul className="list-disc list-inside text-purple-700">
          {result.relationshipStrengths.map((strength: string, index: number) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard titleKey="relationshipWeaknesses" isVisible={!!result}>
        <ul className="list-disc list-inside text-purple-700">
          {result.relationshipWeaknesses.map((weakness: string, index: number) => (
            <li key={index}>{weakness}</li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard titleKey="successDefinition" isVisible={!!result}>
        <p className="text-purple-700">{result.successDefinition}</p>
      </ResultCard>

      <ResultCard titleKey="strengths" isVisible={!!result}>
        <ul className="list-disc list-inside text-purple-700">
          {result.strengths.map((strength: string, index: number) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard titleKey="gifts" isVisible={!!result}>
        <ul className="list-disc list-inside text-purple-700">
          {result.gifts.map((gift: string, index: number) => (
            <li key={index}>{gift}</li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard titleKey="potentialProblemAreas" isVisible={!!result}>
        <ul className="list-disc list-inside text-purple-700">
          {result.potentialProblemAreas.map((area: string, index: number) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard titleKey="explanationOfProblems" isVisible={!!result}>
        <p className="text-purple-700">{result.explanationOfProblems}</p>
      </ResultCard>

      <ResultCard titleKey="solutions" isVisible={!!result}>
        <p className="text-purple-700">{result.solutions}</p>
      </ResultCard>

      <ResultCard titleKey="livingHappilyTips" isVisible={!!result}>
        <p className="text-purple-700">{result.livingHappilyTips}</p>
      </ResultCard>

      <ResultCard titleKey="tenRulesToLive" isVisible={!!result}>
        <ol className="list-decimal list-inside text-purple-700">
          {result.tenRulesToLive.map((rule: string, index: number) => (
            <li key={index}>{rule}</li>
          ))}
        </ol>
      </ResultCard>

      {!isViewing && (
        <ResultCard titleKey="soulForge" isVisible={!!result} isLoading={isGenerating}>
          {generatedImage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full"
            >
              <img src={generatedImage} alt="Generated Soul Image" className="w-full rounded-lg shadow-lg" />
            </motion.div>
          ) : (
            <p className="text-purple-700 text-center">{t('soulForgeDescription')}</p>
          )}
        </ResultCard>
      )}
    </div>
  )

  const renderSavedResults = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg shadow-xl rounded-3xl px-8 pt-6 pb-8 mb-8 border border-white border-opacity-40"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-purple-800">{t('historyResults')}</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
          className="text-purple-600 hover:text-purple-800"
        >
          {isHistoryExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          <span className="ml-2">{isHistoryExpanded ? t('collapse') : t('expand')}</span>
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
                  {t('testTime')}: {new Date(result.timestamp).toLocaleString()} - 
                  {t('type')}: {personalityType.type}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-12 text-purple-800 relative"
        >
          {t('title')}
          <motion.span
            className="absolute -top-6 -right-6 text-9xl text-purple-400 opacity-70" // 修改这里
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles />
          </motion.span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-white border-opacity-30"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-6 flex items-center">
            <Compass className="mr-3 text-purple-600" size={32} />
            {t('mbtiTest')}
          </h2>
          {!testStarted && !testResult && !viewingType && renderInitialOptions()}
          {testStarted && !testResult && renderQuestion(isQuickTest ? quickPersonalityTest[currentQuestion] : fullPersonalityTest[currentQuestion])}
          {testResult && renderResult(testResult)}
          {viewingType && renderResult(viewingType, true)}
          {(viewingType || testResult) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setViewingType(null)
                setTestResult(null)
                setTestStarted(false)
              }}
              className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              {t('backToOptions')}
            </motion.button>
          )}
        </motion.div>

        {savedResults.length > 0 && renderSavedResults()}

        {/* EvolveSelf 部分 */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white border-opacity-40"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-8 flex items-center justify-center">
            <Target className="mr-3 text-purple-600" size={32} />
            {t('evolveSelf')}
          </h2>
          <p className="text-purple-700 mb-8 text-center max-w-2xl mx-auto">{t('evolveSelfDescription')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EvolveSelfCard
              title={t('selfReflection')}
              description={t('selfReflectionDesc')}
            />
            <EvolveSelfCard
              title={t('exploreNewPerspectives')}
              description={t('exploreNewPerspectivesDesc')}
            />
            <EvolveSelfCard
              title={t('developComplementarySkills')}
              description={t('developComplementarySkillsDesc')}
            />
            <EvolveSelfCard
              title={t('practiceMindfulness')}
              description={t('practiceMindfulnessDesc')}
            />
          </div>
        </motion.section>
      </div>
    </div>
  )
}

const EvolveSelfCard = ({ title, description }: { title: string; description: string }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
  >
    <h3 className="text-xl font-semibold text-purple-700 mb-2">{title}</h3>
    <p className="text-purple-600">{description}</p>
  </motion.div>
)
