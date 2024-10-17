'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

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
  const { language } = useLanguage()

  const t = content[language]

  const startMBTITest = () => {
    console.log("Starting MBTI test")
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
    setGeneratedImage(`https://source.unsplash.com/random/400x400?abstract&${mbtiType}`)
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <div className="bg-white bg-opacity-70 rounded-lg shadow-lg p-8 mb-8">
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <div className="flex items-center justify-center mb-6">
          <i data-lucide="compass" className="text-purple-600 mr-4 w-12 h-12"></i>
          <h1 className="text-4xl font-bold text-purple-800">{t.title}</h1>
        </div>
        <p className="text-purple-700 mb-8 text-center text-xl">{t.subtitle}</p>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-semibold text-purple-800 mb-6">{t.mbtiTest}</h2>
        <p className="text-purple-700 mb-4">{t.mbtiDescription}</p>
        {!mbtiResult && (
          <div className="flex space-x-4">
            <button onClick={startMBTITest} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300 flex items-center">
              {t.startTest}
              <i data-lucide="arrow-right" className="ml-2 w-5 h-5"></i>
            </button>
            <button onClick={() => setShowMbtiSelect(!showMbtiSelect)} className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300 flex items-center">
              {t.selectType}
              <i data-lucide="check-circle" className="ml-2 w-5 h-5"></i>
            </button>
          </div>
        )}
        {showMbtiSelect && (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {mbtiTypes.map(type => (
              <button
                key={type}
                onClick={() => selectMBTI(type)}
                className="bg-purple-200 text-purple-800 px-4 py-2 rounded-md hover:bg-purple-300 transition-colors duration-300 text-sm"
              >
                {type}
              </button>
            ))}
          </div>
        )}
        {mbtiResult && (
          <div className="mt-4 p-4 bg-purple-100 rounded-lg">
            <h3 className="text-2xl font-semibold text-purple-800 mb-4 flex items-center">
              <i data-lucide="check-circle" className="mr-2 text-green-600 w-6 h-6"></i>
              {t.yourResult}
            </h3>
            <p className="text-purple-700 text-xl">{t.yourType} <span className="font-bold text-purple-900">{mbtiResult}</span></p>
          </div>
        )}
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-semibold text-purple-800 mb-6">{t.soulForge}</h2>
        <p className="text-purple-700 mb-4">{t.soulForgeDescription}</p>
        <div className="flex flex-col items-center">
          {generatedImage ? (
            <div className="mt-4 p-4 bg-purple-100 rounded-lg">
              <img src={generatedImage} alt="Generated Soul Image" className="w-full max-w-md rounded-lg shadow-lg" />
            </div>
          ) : mbtiResult ? (
            <p className="text-purple-600">{t.generating}</p>
          ) : (
            <p className="text-purple-700">{t.completeTest}</p>
          )}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-3xl font-semibold text-purple-800 mb-6">{t.evolveSelf}</h2>
        <p className="text-purple-700 mb-4">{t.evolveSelfDescription}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    <div className="bg-purple-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <h3 className="text-2xl font-semibold text-purple-800 mb-3 flex items-center">
        <i data-lucide="sparkles" className="mr-2 text-yellow-500 w-6 h-6"></i>
        {title}
      </h3>
      <p className="text-purple-700">{description}</p>
    </div>
  )
}
