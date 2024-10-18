'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { Compass, CheckCircle, ArrowRight, Sparkles, RefreshCcw, Brain, Zap, Target } from 'lucide-react'

const mbtiTypes = ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ']

const content = {
  zh: {
    title: "个性发现",
    subtitle: "探索并发现你独特的数字身份。",
    mbtiTest: "MBTI测试",
    mbtiDescription: "通过我们全面的MBTI测试发现你的性格类型,或选择你已知的类型。",
    startTest: "开始MBTI测试",
    selectType: "选择MBTI类型",
    yourResult: "你的MBTI结果",
    yourType: "你的MBTI类型:",
    soulForge: "灵魂锻造",
    soulForgeDescription: "基于你的MBTI类型,代表你数字灵魂的独特图像。",
    generating: "正在生成你的灵魂锻造图像...",
    completeTest: "完成MBTI测试或选择你的类型以生成灵魂锻造图像。",
    evolveSelf: "自我进化",
    evolveSelfDescription: "基于你的MBTI类型的个性化进化建议。",
    selfReflection: "自我反思",
    selfReflectionDesc: "每天花时间反思你的想法和行动。这种做法可以帮助你更好地理解你的动机和决策过程。",
    exploreNewPerspectives: "探索新视角",
    exploreNewPerspectivesDesc: "挑战自己从不同的角度看问题。这可以拓宽你的理解并提高你的人际交往能力。",
    developComplementarySkills: "发展互补技能",
    developComplementarySkillsDesc: "专注于可能不是你天生擅长的领域。这可以帮助创造一个更全面的性格和技能组合。",
    practiceMindfulness: "练习正念",
    practiceMindfulnessDesc: "进行正念练习以提高你的自我意识和情商。"
  },
  en: {
    title: "Persona Discovery",
    subtitle: "Explore and discover your unique digital identity.",
    mbtiTest: "MBTI Test",
    mbtiDescription: "Discover your personality type with our comprehensive MBTI test or select your known type.",
    startTest: "Start MBTI Test",
    selectType: "Select MBTI Type",
    yourResult: "Your MBTI Result",
    yourType: "Your MBTI type:",
    soulForge: "SoulForge",
    soulForgeDescription: "Your unique image representing your digital soul, based on your MBTI type.",
    generating: "Your SoulForge image is being generated...",
    completeTest: "Complete the MBTI test or select your type to generate your SoulForge image.",
    evolveSelf: "EvolveSelf",
    evolveSelfDescription: "Personalized suggestions to evolve based on your MBTI type.",
    selfReflection: "Self-Reflection",
    selfReflectionDesc: "Take time each day to reflect on your thoughts and actions. This practice can help you better understand your motivations and decision-making processes.",
    exploreNewPerspectives: "Explore New Perspectives",
    exploreNewPerspectivesDesc: "Challenge yourself to see situations from different viewpoints. This can broaden your understanding and improve your interpersonal skills.",
    developComplementarySkills: "Develop Complementary Skills",
    developComplementarySkillsDesc: "Focus on areas that may not come naturally to you. This can help create a more well-rounded personality and skill set.",
    practiceMindfulness: "Practice Mindfulness",
    practiceMindfulnessDesc: "Engage in mindfulness exercises to increase your self-awareness and emotional intelligence."
  }
}

export default function PersonaDiscovery() {
  const [mbtiResult, setMbtiResult] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [showMbtiSelect, setShowMbtiSelect] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const { language } = useLanguage()

  const t = content[language]

  const startMBTITest = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const randomMBTI = mbtiTypes[Math.floor(Math.random() * mbtiTypes.length)]
      setMbtiResult(randomMBTI)
      generateImage(randomMBTI)
    }, 2000)
  }

  const selectMBTI = (type: string) => {
    setMbtiResult(type)
    generateImage(type)
  }

  const generateImage = (mbtiType: string) => {
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedImage(`https://source.unsplash.com/random/400x400?abstract&${mbtiType}`)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
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
      <p className="text-xl text-center text-purple-600 mb-16">{t.subtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.section 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-6 flex items-center">
            <Brain className="mr-3 text-purple-600" size={32} />
            {t.mbtiTest}
          </h2>
          <p className="text-purple-700 mb-8">{t.mbtiDescription}</p>
          {!mbtiResult && (
            <div className="flex flex-col space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startMBTITest}
                className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center"
              >
                {t.startTest}
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMbtiSelect(!showMbtiSelect)}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
              >
                {t.selectType}
                <CheckCircle className="ml-2 w-5 h-5" />
              </motion.button>
            </div>
          )}
          <AnimatePresence>
            {showMbtiSelect && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 grid grid-cols-4 gap-2"
              >
                {mbtiTypes.map(type => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => selectMBTI(type)}
                    className="bg-purple-100 text-purple-800 px-3 py-2 rounded-lg hover:bg-purple-200 transition-colors duration-300 text-sm"
                  >
                    {type}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          {mbtiResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-purple-100 rounded-lg shadow-inner"
            >
              <h3 className="text-2xl font-semibold text-purple-800 mb-4 flex items-center">
                <CheckCircle className="mr-2 text-green-600 w-6 h-6" />
                {t.yourResult}
              </h3>
              <p className="text-purple-700 text-xl">{t.yourType} <span className="font-bold text-purple-900">{mbtiResult}</span></p>
            </motion.div>
          )}
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-semibold text-purple-800 mb-6 flex items-center">
            <Zap className="mr-3 text-purple-600" size={32} />
            {t.soulForge}
          </h2>
          <p className="text-purple-700 mb-8">{t.soulForgeDescription}</p>
          <div className="flex flex-col items-center">
            {generatedImage ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md"
              >
                <img src={generatedImage} alt="Generated Soul Image" className="w-full rounded-lg shadow-lg" />
              </motion.div>
            ) : mbtiResult ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-purple-600"
              >
                <RefreshCcw className="w-16 h-16" />
              </motion.div>
            ) : (
              <p className="text-purple-700 text-center">{t.completeTest}</p>
            )}
          </div>
        </motion.section>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16"
      >
        <h2 className="text-3xl font-semibold text-purple-800 mb-8 flex items-center justify-center">
          <Target className="mr-3 text-purple-600" size={32} />
          {t.evolveSelf}
        </h2>
        <p className="text-purple-700 mb-8 text-center max-w-2xl mx-auto">{t.evolveSelfDescription}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
  )
}

interface EvolveSelfCardProps {
  title: string
  description: string
}

const EvolveSelfCard: React.FC<EvolveSelfCardProps> = ({ title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-purple-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
    >
      <h3 className="text-2xl font-semibold text-purple-800 mb-3 flex items-center">
        <Sparkles className="mr-2 text-yellow-500 w-6 h-6" />
        {title}
      </h3>
      <p className="text-purple-700">{description}</p>
    </motion.div>
  )
}
