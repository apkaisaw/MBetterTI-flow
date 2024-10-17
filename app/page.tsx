'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '../contexts/LanguageContext'

const modules = {
  zh: [
    { icon: 'compass', title: "个性发现", description: "探索并发现你独特的数字身份。", link: "/persona-discovery", color: "from-purple-200 to-indigo-200" },
    { icon: 'palette', title: "创意中心", description: "将你的艺术、文学和想法作为NFT分享。", link: "/creative-hub", color: "from-indigo-200 to-blue-200" },
    { icon: 'book-open', title: "博客花园", description: "写作、阅读并参与引人深思的内容。", link: "/blog-garden", color: "from-blue-200 to-purple-200" },
  ],
  en: [
    { icon: 'compass', title: "Persona Discovery", description: "Explore and discover your unique digital identity.", link: "/persona-discovery", color: "from-purple-200 to-indigo-200" },
    { icon: 'palette', title: "Creative Hub", description: "Share your art, literature, and ideas as NFTs.", link: "/creative-hub", color: "from-indigo-200 to-blue-200" },
    { icon: 'book-open', title: "Blog Garden", description: "Write, read, and engage with thought-provoking content.", link: "/blog-garden", color: "from-blue-200 to-purple-200" },
  ]
}

const features = {
  zh: [
    { icon: 'sparkles', title: "独特的数字身份", description: "通过我们创新的基于MBTI的系统创建和发展你的数字角色。" },
    { icon: 'users', title: "理想主义者社区", description: "与志同道合的人联系,他们和你一样热衷于创造力和积极变革。" },
    { icon: 'globe', title: "去中心化平台", description: "享受Web3生态系统的好处,确保你的内容真正属于你。" },
  ],
  en: [
    { icon: 'sparkles', title: "Unique Digital Identity", description: "Create and evolve your digital persona through our innovative MBTI-based system." },
    { icon: 'users', title: "Community of Idealists", description: "Connect with like-minded individuals who share your passion for creativity and positive change." },
    { icon: 'globe', title: "Decentralized Platform", description: "Enjoy the benefits of a Web3 ecosystem, ensuring your content remains truly yours." },
  ]
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  const currentModules = modules[language];
  const currentFeatures = features[language];

  return (
    <div className="text-center min-h-screen flex flex-col justify-center items-center p-4 space-y-16">
      {/* 英雄部分 */}
      <section className="max-w-4xl">
        <h1 className="text-5xl font-bold text-purple-800 mb-6">
          {language === 'zh' ? '欢迎来到理想主义者花园' : 'Welcome to Idealist Garden'}
        </h1>
        <p className="text-xl text-purple-600 mb-10">
          {language === 'zh' 
            ? '一个去中心化的Web3平台,供富有创造力的理想主义者表达、联系和产生影响。'
            : 'A decentralized Web3 platform for creative idealists to express, connect, and make a difference.'}
        </p>
        <Link href="/persona-discovery" className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors duration-300">
          {language === 'zh' ? '开始你的旅程' : 'Start Your Journey'}
        </Link>
      </section>

      {/* 主要模块 */}
      <section className="w-full max-w-6xl">
        <h2 className="text-3xl font-semibold text-purple-800 mb-8">
          {language === 'zh' ? '探索我们的生态系统' : 'Explore Our Ecosystem'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentModules.map((module, index) => (
            <Link
              key={module.title}
              href={module.link}
              className={`relative overflow-hidden rounded-lg transition-all duration-300 ease-in-out
                          bg-gradient-to-br ${module.color} hover:shadow-lg hover:scale-105`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="p-6 h-full flex flex-col justify-between">
                <i data-lucide={module.icon} className="text-purple-700 mb-4 w-10 h-10"></i>
                <div>
                  <h3 className="text-2xl font-semibold text-purple-800 mb-2">{module.title}</h3>
                  <p className={`text-purple-600 transition-all duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                    {module.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 特性部分 */}
      <section className="w-full max-w-6xl">
        <h2 className="text-3xl font-semibold text-purple-800 mb-8">
          {language === 'zh' ? '为什么选择理想主义者花园？' : 'Why Choose Idealist Garden?'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentFeatures.map((feature, index) => (
            <div key={index} className="bg-white bg-opacity-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <i data-lucide={feature.icon} className="text-purple-600 mb-4 w-8 h-8"></i>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">{feature.title}</h3>
              <p className="text-purple-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 行动号召部分 */}
      <section className="w-full max-w-4xl bg-purple-100 p-8 rounded-lg">
        <h2 className="text-3xl font-semibold text-purple-800 mb-4">
          {language === 'zh' ? '准备好产生影响了吗？' : 'Ready to Make a Difference?'}
        </h2>
        <p className="text-xl text-purple-600 mb-6">
          {language === 'zh'
            ? '加入我们富有创造力的理想主义者社区,开始塑造更美好的未来。'
            : 'Join our community of creative idealists and start shaping a better future today.'}
        </p>
        <Link href="/persona-discovery" className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors duration-300">
          {language === 'zh' ? '创建你的角色' : 'Create Your Persona'}
        </Link>
      </section>
    </div>
  )
}
