'use client'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const modules = [
  {
    icon: 'box',
    title: "Break MBTI Framework",
    description: "Go beyond traditional MBTI framework to explore deeper self-awareness and potential development.",
    color: "from-purple-200 to-indigo-200"
  },
  {
    icon: 'rocket',
    title: "Potential Development",
    description: "Discover and unleash your hidden potential through scientific methods and tools.",
    color: "from-indigo-200 to-blue-200"
  },
  {
    icon: 'repeat',
    title: "Habit Building",
    description: "Establish sustainable growth habits for continuous self-improvement.",
    color: "from-blue-200 to-purple-200"
  },
  {
    icon: 'seedling',
    title: "Growth Ecosystem",
    description: "Build a complete personal growth ecosystem for comprehensive self-development.",
    color: "from-purple-200 to-indigo-200"
  }
]

export default function SoulBecoming() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useTranslation('common');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <div className="min-h-screen p-8">
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-purple-800 mb-8 text-center">
          Growth Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <div
              key={module.title}
              className={`relative overflow-hidden rounded-lg transition-all duration-300 ease-in-out
                        bg-gradient-to-br ${module.color} hover:shadow-lg hover:scale-105`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="p-6 h-full flex flex-col justify-between">
                <i data-lucide={module.icon} className="text-purple-700 mb-4 w-10 h-10"></i>
                <div>
                  <h3 className="text-2xl font-semibold text-purple-800 mb-2">{module.title}</h3>
                  <p className={`text-purple-600 transition-all duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-80'}`}>
                    {module.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 