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

const content = {
  zh: {
    title: "个性发现",
    mbtiTest: "MBTI 测试",
    startQuickTest: "开始快速测试 (28题)",
    startFullTest: "开始完整测试 (70题)",
    viewTypes: "查看MBTI类型",
    viewPreviousResult: "查看之前的测试结果",
    backToOptions: "返回选项",
    yourResult: "您的结果",
    yourType: "您的类型：",
    soulForgeDescription: "基于您的MBTI类型生成独特的灵魂图像",
    evolveSelf: "自我进化",
    evolveSelfDescription: "探索成长和自我提升的方法",
    selfReflection: "自我反思",
    selfReflectionDesc: "定期进行自我评估，了解自己的优势和成长领域",
    exploreNewPerspectives: "探索新视角",
    exploreNewPerspectivesDesc: "尝试从不同角度看待事物，拓展思维",
    developComplementarySkills: "发展互补技能",
    developComplementarySkillsDesc: "培养与您的MBTI类型互补的技能，实现全面发展",
    practiceMindfulness: "练习正念",
    practiceMindfulnessDesc: "通过冥想和正念练习提高自我意识",
    historyResults: "历史测试结果",
    expand: "展开",
    collapse: "收起",
    testTime: "测试时间",
    type: "类型",
    scores: "得分",
  },
  en: {
    title: "Persona Discovery",
    mbtiTest: "MBTI Test",
    startQuickTest: "Start Quick Test (28 questions)",
    startFullTest: "Start Full Test (70 questions)",
    viewTypes: "View MBTI Types",
    viewPreviousResult: "View Previous Test Result",
    backToOptions: "Back to Options",
    yourResult: "Your Result",
    yourType: "Your Type: ",
    soulForgeDescription: "Generate a unique soul image based on your MBTI type",
    evolveSelf: "Evolve Self",
    evolveSelfDescription: "Explore ways to grow and improve yourself",
    selfReflection: "Self Reflection",
    selfReflectionDesc: "Regularly assess yourself to understand your strengths and areas for growth",
    exploreNewPerspectives: "Explore New Perspectives",
    exploreNewPerspectivesDesc: "Try to see things from different angles and expand your thinking",
    developComplementarySkills: "Develop Complementary Skills",
    developComplementarySkillsDesc: "Cultivate skills that complement your MBTI type for well-rounded development",
    practiceMindfulness: "Practice Mindfulness",
    practiceMindfulnessDesc: "Enhance self-awareness through meditation and mindfulness practices",
    historyResults: "History Test Results",
    expand: "Expand",
    collapse: "Collapse",
    testTime: "Test Time",
    type: "Type",
    scores: "Scores",
  }
};

// 修改 ResultCard 组件，添加 isLoading 属性
const ResultCard = ({ title, children, isVisible, isLoading = false }: { title: string; children: React.ReactNode; isVisible: boolean; isLoading?: boolean }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-2xl px-6 py-4 mb-6 transition-all duration-300 hover:shadow-xl"
      >
        <h4 className="text-xl font-semibold mb-3 text-purple-800">{title}</h4>
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-purple-600 flex justify-center"
          >
            <RefreshCcw className="w-8 h-8" />
          </motion.div>
        ) : children}
      </motion.div>
    )}
  </AnimatePresence>
)

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

  const t = content[language]

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
    <div className="space-y-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => startTest(true)}
        className="w-full bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors duration-300"
      >
        {t.startQuickTest}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => startTest(false)}
        className="w-full bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors duration-300"
      >
        {t.startFullTest}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowMbtiSelect(!showMbtiSelect)}
        className="w-full bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors duration-300"
      >
        {t.viewTypes}
      </motion.button>
      {showMbtiSelect && (
        <div className="grid grid-cols-4 gap-2 mt-4">
          {['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'].map(type => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => viewMBTI(type)}
              className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg hover:bg-purple-200 transition-colors duration-300"
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
        className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className="bg-purple-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-purple-600 mb-4">问题 {currentQuestion + 1} / {currentQuestions.length}</p>
        <h2 className="text-2xl font-bold mb-4 text-purple-800">{question.question}</h2>
        <div className="flex flex-col gap-2">
          {question.answerOptions.map((option: any) => (
            <motion.button
              key={option.type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(option.type)}
              className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors duration-300"
            >
              {option.answer}
            </motion.button>
          ))}
        </div>
      </motion.div>
    )
  }

  const renderResult = (result: PersonalityClassGroup, isViewing: boolean = false) => (
    <div className="space-y-4">
      <ResultCard title="MBTI 类型和描述" isVisible={!!result}>
        <h2 className="text-2xl font-bold mb-2 text-purple-800">{result.type}</h2>
        <h3 className="text-xl mb-2 text-purple-700">{result.name} - {result.epithet}</h3>
        <p className="text-purple-700">{result.description}</p>
      </ResultCard>

      {!isViewing && (
        <ResultCard title="各维度的得分" isVisible={!!result}>
          <div className="grid grid-cols-2 gap-4 text-purple-700">
            <div>E: {result.scores?.E || 0} - I: {result.scores?.I || 0}</div>
            <div>S: {result.scores?.S || 0} - N: {result.scores?.N || 0}</div>
            <div>T: {result.scores?.T || 0} - F: {result.scores?.F || 0}</div>
            <div>J: {result.scores?.J || 0} - P: {result.scores?.P || 0}</div>
          </div>
        </ResultCard>
      )}

      <ResultCard title="荣格功能偏好" isVisible={!!result}>
        <ul className="list-disc list-inside text-purple-700">
          <li>主导功能：{result.jungianFunctionalPreference.dominant}</li>
          <li>辅助功能：{result.jungianFunctionalPreference.auxiliary}</li>
          <li>第三功能：{result.jungianFunctionalPreference.tertiary}</li>
          <li>劣势功能：{result.jungianFunctionalPreference.inferior}</li>
        </ul>
      </ResultCard>

      <ResultCard title="主要特征" isVisible={!!result}>
        <ul className="list-disc list-inside text-purple-700">
          {result.generalTraits.map((trait: string, index: number) => (
            <li key={index}>{trait}</li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard title="关系优势" isVisible={!!result}>
        <ul className="list-disc list-inside text-purple-700">
          {result.relationshipStrengths.map((strength: string, index: number) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard title="关系劣势" isVisible={!!result}>
        <ul className="list-disc list-inside text-purple-700">
          {result.relationshipWeaknesses.map((weakness: string, index: number) => (
            <li key={index}>{weakness}</li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard title="成功的定义" isVisible={!!result}>
        <p className="text-purple-700">{result.successDefinition}</p>
      </ResultCard>

      <ResultCard title="优势" isVisible={!!result}>
        <ul className="list-disc list-inside text-purple-700">
          {result.strengths.map((strength: string, index: number) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard title="天赋" isVisible={!!result}>
        <ul className="list-disc list-inside text-purple-700">
          {result.gifts.map((gift: string, index: number) => (
            <li key={index}>{gift}</li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard title="潜在问题领域" isVisible={!!result}>
        <ul className="list-disc list-inside text-purple-700">
          {result.potentialProblemAreas.map((area: string, index: number) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard title="问题解释" isVisible={!!result}>
        <p className="text-purple-700">{result.explanationOfProblems}</p>
      </ResultCard>

      <ResultCard title="解决方案" isVisible={!!result}>
        <p className="text-purple-700">{result.solutions}</p>
      </ResultCard>

      <ResultCard title="幸福生活建议" isVisible={!!result}>
        <p className="text-purple-700">{result.livingHappilyTips}</p>
      </ResultCard>

      <ResultCard title="成功生活的十条原则" isVisible={!!result}>
        <ol className="list-decimal list-inside text-purple-700">
          {result.tenRulesToLive.map((rule: string, index: number) => (
            <li key={index}>{rule}</li>
          ))}
        </ol>
      </ResultCard>

      {!isViewing && (
        <ResultCard title="灵魂锻造" isVisible={!!result} isLoading={isGenerating}>
          {generatedImage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full"
            >
              <img src={generatedImage} alt="Generated Soul Image" className="w-full rounded-lg shadow-lg" />
            </motion.div>
          ) : (
            <p className="text-purple-700 text-center">{t.soulForgeDescription}</p>
          )}
        </ResultCard>
      )}
    </div>
  )

  const renderSavedResults = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-2xl px-8 pt-6 pb-8 mb-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-purple-800">{t.historyResults}</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
          className="text-purple-600 hover:text-purple-800"
        >
          {isHistoryExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          <span className="ml-2">{isHistoryExpanded ? t.collapse : t.expand}</span>
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
                  {t.testTime}: {new Date(result.timestamp).toLocaleString()} - 
                  {t.type}: {personalityType.type}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-12 text-purple-800 relative"
        >
          {t.title}
          <motion.span
            className="absolute -top-6 -right-6 text-9xl text-purple-200 opacity-50"
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
          className="bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-6 flex items-center">
            <Compass className="mr-3 text-purple-600" size={32} />
            {t.mbtiTest}
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
              {t.backToOptions}
            </motion.button>
          )}
        </motion.div>

        {savedResults.length > 0 && renderSavedResults()}

        {/* EvolveSelf 部分 */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-8 flex items-center justify-center">
            <Target className="mr-3 text-purple-600" size={32} />
            {t.evolveSelf}
          </h2>
          <p className="text-purple-700 mb-8 text-center max-w-2xl mx-auto">{t.evolveSelfDescription}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EvolveSelfCard
              title={t.selfReflection}
              description={t.selfReflectionDesc}
            />
            <EvolveSelfCard
              title={t.exploreNewPerspectives}
              description={t.exploreNewPerspectivesDesc}
            />
            <EvolveSelfCard
              title={t.developComplementarySkills}
              description={t.developComplementarySkillsDesc}
            />
            <EvolveSelfCard
              title={t.practiceMindfulness}
              description={t.practiceMindfulnessDesc}
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
