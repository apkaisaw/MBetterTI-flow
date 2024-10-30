'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

const modules = [
  { icon: 'heart', title: "Soul Becoming", description: "Break through MBTI framework and discover your true potential.", link: "/soul-becoming", color: "from-purple-200 to-indigo-200" },
  { icon: 'palette', title: "Creative Hub", description: "Share your art, literature, and ideas as NFTs.", link: "/creative-hub", color: "from-indigo-200 to-blue-200" },
  { icon: 'book-open', title: "Blog Garden", description: "Write, read, and engage with thought-provoking content.", link: "/blog-garden", color: "from-blue-200 to-purple-200" },
]

const features = [
  { icon: 'sparkles', title: "Personal Growth Journey", description: "Explore and evolve beyond traditional personality frameworks through our innovative system." },
  { icon: 'users', title: "Community of Idealists", description: "Connect with like-minded individuals who share your passion for creativity and positive change." },
  { icon: 'globe', title: "Decentralized Platform", description: "Enjoy the benefits of a Web3 ecosystem, ensuring your content remains truly yours." },
]

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useTranslation('common');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <div className="text-center min-h-screen flex flex-col justify-center items-center p-4 space-y-16">
      {/* Hero Section */}
      <section className="max-w-6xl w-full">
        <h1 className="text-5xl font-bold text-purple-800 mb-6">
          {t('welcomeTitle')}
        </h1>
        <p className="text-xl text-purple-600 mb-10">
          {t('welcomeDescription')}
        </p>
        
        {/* New Image Card */}
        <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden">
          <Image
            src="/back.jpg"
            alt="Hero background"
            fill
            style={{ objectFit: 'cover' }}
            priority
            className=""
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(243_232_255/0.4)_0%,transparent_10%,transparent_90%,rgb(243_232_255/0.4)_100%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(243_232_255/0.4)_0%,transparent_10%,transparent_90%,rgb(243_232_255/0.4)_100%)]"></div>
        </div>

        <Link href="/persona-discovery" className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors duration-300">
          {t('startJourney')}
        </Link>
        <div className="mt-4 text-center">
          <span className="inline-flex items-center justify-center space-x-2 text-purple-700 font-medium animate-pulse">
            <i data-lucide="arrow-down" className="w-4 h-4"></i>
            <span className="text-sm tracking-wide">Start Your Persona Discovery Here!</span>
            <i data-lucide="arrow-down" className="w-4 h-4"></i>
          </span>
        </div>
      </section>

      {/* Main Modules */}
      <section className="w-full max-w-6xl">
        <h2 className="text-3xl font-semibold text-purple-800 mb-8">
          {t('exploreEcosystem')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => (
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

      {/* Features Section */}
      <section className="w-full max-w-6xl">
        <h2 className="text-3xl font-semibold text-purple-800 mb-8">
          {t('whyChooseUs')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white bg-opacity-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <i data-lucide={feature.icon} className="text-purple-600 mb-4 w-8 h-8"></i>
              <h3 className="text-xl font-semibold text-purple-800 mb-2">{feature.title}</h3>
              <p className="text-purple-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-4xl bg-purple-100 p-8 rounded-lg">
        <h2 className="text-3xl font-semibold text-purple-800 mb-4">
          {t('readyToMakeADifference')}
        </h2>
        <p className="text-xl text-purple-600 mb-6">
          {t('joinCommunity')}
        </p>
        <Link href="/persona-discovery" className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors duration-300">
          {t('createPersona')}
        </Link>
      </section>
    </div>
  )
}
