'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

const modules = [
  { 
    icon: 'compass', 
    title: "Persona Discovery", 
    description: "Start your journey of self-discovery with our innovative MBTI-based insights.", 
    details: "Unlock your personality type through scientific assessments and gain deep insights into your cognitive preferences, strengths, and growth areas.",
    link: "/persona-discovery", 
    color: "from-purple-200 to-blue-200", 
    image: "/persona-discovery.jpg" 
  },
  { 
    icon: 'heart', 
    title: "AI Life Coach", 
    description: "Gain deeper insights beyond MBTI and unlock your true potential.", 
    details: "Experience personalized coaching powered by AI that adapts to your unique personality type, helping you overcome challenges and achieve personal growth.",
    link: "/ai-life-coach", 
    color: "from-purple-200 to-indigo-200", 
    image: "/ai-life-coach.jpg" 
  },
  { 
    icon: 'book-open', 
    title: "Wellness Corner", 
    description: "Explore and share transformative insights for personal growth.", 
    details: "Join a supportive community of like-minded individuals, share experiences, and access curated resources tailored to your personality type.",
    link: "/wellness-corner", 
    color: "from-blue-200 to-purple-200", 
    image: "/wellness-corner.jpg" 
  },
]

const testimonials = [
  { 
    avatar: '/images/user1.jpg',
    name: "Sarah Chen",
    role: "Software Engineer",
    mbti: "INFJ",
    content: "This platform helped me understand myself better than years of self-reflection. The AI coaching is like having a personal mentor!",
  },
  { 
    avatar: '/images/user2.jpg',
    name: "Michael Park",
    role: "Creative Director",
    mbti: "ENFP",
    content: "The insights I gained here transformed how I approach both my creative work and personal relationships.",
  },
  { 
    avatar: '/images/user3.jpg',
    name: "Emma Wilson",
    role: "Teacher",
    mbti: "ISFJ",
    content: "Finally found a community that understands personality types beyond just basic descriptions. The growth journey here is incredible!",
  },
]

const steps = [
  { 
    number: "01", 
    title: "Take the Assessment", 
    description: "Complete our scientifically designed MBTI assessment to discover your personality type",
    icon: 'clipboard-check',
    color: "from-blue-100 to-purple-100"
  },
  { 
    number: "02", 
    title: "Get Your Results", 
    description: "Receive detailed insights about your personality type, strengths, and growth areas",
    icon: 'bar-chart',
    color: "from-purple-100 to-pink-100"
  },
  { 
    number: "03", 
    title: "Start Your Journey", 
    description: "Begin your personal growth journey with tailored recommendations and AI coaching",
    icon: 'rocket',
    color: "from-pink-100 to-blue-100"
  }
];

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
        <h1 className="text-5xl font-bold mb-6 flex justify-center items-center gap-1">
          <span className="bg-gradient-to-r from-purple-800 to-purple-900 text-transparent bg-clip-text">M</span>
          <span className="text-purple-300">Better</span>
          <span className="bg-gradient-to-r from-purple-800 to-purple-900 text-transparent bg-clip-text">T</span>
          <span className="bg-gradient-to-r from-purple-800 to-purple-900 text-transparent bg-clip-text">I</span>
        </h1>
        
        {/* Value Proposition */}
        <div className="mb-12">
          <p className="text-2xl text-purple-600 mb-6">
            I&apos;m better through insight
          </p>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-purple-700 mb-8">
              Transform your self-understanding with AI-powered personality insights. 
              Get personalized guidance and join a community of growth-minded individuals.
            </p>
            <div className="flex justify-center gap-8 mb-10">
              <div className="flex items-center space-x-2">
                <i data-lucide="check-circle" className="w-5 h-5 text-purple-600"></i>
                <span className="text-purple-700">Scientific Assessment</span>
              </div>
              <div className="flex items-center space-x-2">
                <i data-lucide="check-circle" className="w-5 h-5 text-purple-600"></i>
                <span className="text-purple-700">AI-Powered Coaching</span>
              </div>
              <div className="flex items-center space-x-2">
                <i data-lucide="check-circle" className="w-5 h-5 text-purple-600"></i>
                <span className="text-purple-700">Supportive Community</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Hero Image */}
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
            <span className="text-sm tracking-wide">Discover Your Better Self</span>
            <i data-lucide="arrow-down" className="w-4 h-4"></i>
          </span>
        </div>
      </section>

      {/* Main Modules */}
      <section className="w-full max-w-6xl">
        <h2 className="text-3xl font-semibold text-purple-800 mb-8">
          {t('exploreEcosystem')}
        </h2>
        <div className="flex flex-col gap-8">
          {modules.map((module, index) => (
            <div key={module.title} 
                 className={`flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} gap-6`}>
              <Link
                href={module.link}
                className={`flex-1 relative overflow-hidden rounded-lg transition-all duration-300 ease-in-out
                            bg-gradient-to-br ${module.color} hover:shadow-lg hover:scale-105`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="p-6 h-full flex flex-col items-center justify-between text-center">
                  <i data-lucide={module.icon} className="text-purple-700 mb-4 w-12 h-12"></i>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-purple-800">{module.title}</h3>
                    <p className="text-purple-700 font-medium">
                      {module.description}
                    </p>
                    <p className={`text-purple-600 text-sm transition-all duration-300 ${
                      activeIndex === index ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
                    } overflow-hidden`}>
                      {module.details}
                    </p>
                    <div className={`mt-4 inline-flex items-center text-purple-700 transition-all duration-300 ${
                      activeIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <span className="mr-2">Learn More</span>
                      <i data-lucide="arrow-right" className="w-4 h-4"></i>
                    </div>
                  </div>
                </div>
              </Link>
              
              <div className="flex-1 relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src={module.image}
                  alt={module.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <section className="w-full max-w-6xl">
        <h2 className="text-3xl font-semibold text-purple-800 mb-4">
          {t('howItWorks')}
        </h2>
        <p className="text-purple-600 mb-12 text-lg">
          Your journey to self-discovery starts here
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-24 left-0 w-full h-0.5 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div className={`bg-gradient-to-br ${step.color} rounded-lg p-6 h-full
                              transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
                {/* Step Number */}
                <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center
                               text-xl font-bold text-purple-600 mb-6 mx-auto
                               shadow-md">
                  {step.number}
                </div>
                
                {/* Icon */}
                <div className="mb-4 flex justify-center">
                  <i data-lucide={step.icon} className="w-8 h-8 text-purple-600"></i>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-purple-600">
                    {step.description}
                  </p>
                </div>
              </div>
              
              {/* Arrow for mobile */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <i data-lucide="arrow-down" className="w-6 h-6 text-purple-400"></i>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full max-w-6xl">
        <h2 className="text-3xl font-semibold text-purple-800 mb-4">
          What Our Users Say
        </h2>
        <p className="text-purple-600 mb-12 text-lg">
          Real stories from our community members
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} 
                 className="bg-white bg-opacity-50 p-8 rounded-lg shadow-md 
                           hover:shadow-lg transition-all duration-300 flex flex-col">
              {/* Quote Icon */}
              <div className="mb-6">
                <i data-lucide="quote" className="text-purple-300 w-8 h-8"></i>
              </div>
              
              {/* Testimonial Content */}
              <p className="text-purple-600 mb-8 flex-grow italic text-left">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              
              {/* User Info */}
              <div className="flex items-center border-t border-purple-100 pt-6">
                <div className="relative w-12 h-12 mr-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-purple-800">
                    {testimonial.name}
                  </span>
                  <div className="flex items-center text-sm text-purple-600 space-x-2">
                    <span>{testimonial.role}</span>
                    <span>•</span>
                    <span className="font-medium">{testimonial.mbti}</span>
                  </div>
                </div>
              </div>
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
