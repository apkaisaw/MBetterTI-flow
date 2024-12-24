/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const modules = [
  {
    icon: "brain", 
    title: "MBTI + AI Life Coach",
    description: "Get personalized AI Life Coaching based on your MBTI results to unlock your strengths and improve weaknesses.",
    link: "/ai-life-coach",
    color: "from-purple-200 to-indigo-200",
    image: "/images/persona-discovery.jpg"
  },
  {
    icon: "link", 
    title: "On-Chain Growth Records",
    description: "Store your growth records permanently on the blockchain and earn unique achievement badges (NFTs).",
    link: "/growth-records",
    color: "from-indigo-200 to-purple-200",
    image: "/images/ai-life-coach.jpg"
  },
  {
    icon: "target", 
    title: "Personalized Growth Challenges",
    description: "Take tailored growth challenges designed to elevate you to higher personality levels.",
    link: "/challenges",
    color: "from-purple-200 to-pink-200",
    image: "/images/wellness-corner.jpg"
  }
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
    title: "MBTI Test",
    description: "Complete our scientifically designed MBTI assessment",
    icon: "clipboard-check",
    color: "from-purple-100 to-indigo-100"
  },
  {
    number: "02",
    title: "AI Life Coach",
    description: "Get personalized guidance and growth plans",
    icon: "robot",
    color: "from-indigo-100 to-purple-100"
  },
  {
    number: "03",
    title: "Complete Challenges",
    description: "Earn on-chain records and achievement badges",
    icon: "trophy",
    color: "from-purple-100 to-pink-100"
  },
  {
    number: "04",
    title: "Growth Archive",
    description: "Upload and trade your growth journey",
    icon: "archive",
    color: "from-pink-100 to-purple-100"
  }
]

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }

    // Add parallax effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((element) => {
        if (element instanceof HTMLElement) {
          const speed = element.getAttribute('data-speed') || '0.5';
          const yPos = -(scrolled * parseFloat(speed));
          element.style.transform = `translateY(${yPos}px)`;
        }
      });

      // Add fade-in effect for sections
      const fadeElements = document.querySelectorAll('.fade-in-section');
      fadeElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
        if (isVisible) {
          element.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/back.jpg"
            alt="Hero background"
            fill
            style={{ objectFit: 'cover' }}
            priority
            className="parallax scale-110"
            data-speed="0.5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-purple-900/70 to-purple-900/90 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="animate-fade-in-up">
            <h1 className="text-8xl font-bold mb-8 text-white tracking-tight">
              <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 text-transparent bg-clip-text">M</span>
              <span className="text-purple-200">Better</span>
              <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 text-transparent bg-clip-text">TI</span>
            </h1>
            <p className="text-3xl text-purple-200 mb-12 font-light tracking-wide">
              Discover your true potential through AI-powered personality insights
            </p>
            <Link href="/mbti-test" 
                  className="group inline-block bg-white/10 backdrop-blur-md text-white px-16 py-5 rounded-full text-xl 
                           hover:bg-white/20 transition-all duration-500 border border-white/20">
              <span className="inline-flex items-center gap-2">
                Begin Your Journey
                <i data-lucide="arrow-right" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"></i>
              </span>
            </Link>
          </div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <i data-lucide="chevrons-down" className="w-8 h-8 text-purple-200/50"></i>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-purple-900 to-purple-800 py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-40">
            {modules.map((module, index) => (
              <div key={module.title} 
                   className={`fade-in-section flex flex-col md:flex-row items-center gap-20 opacity-0 transition-all duration-1000 ${
                     index % 2 === 1 ? "md:flex-row-reverse" : ""
                   }`}>
                <div className="flex-1 text-left">
                  <h2 className="text-5xl font-bold text-white mb-8 tracking-tight">{module.title}</h2>
                  <p className="text-xl text-purple-200 mb-10 leading-relaxed">{module.description}</p>
                  <Link href={module.link} 
                        className="group inline-flex items-center text-purple-200 hover:text-white transition-all">
                    <span className="mr-2">Explore More</span>
                    <i data-lucide="arrow-right" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
                <div className="flex-1 relative h-[600px] w-full overflow-hidden rounded-3xl transform hover:scale-105 transition-all duration-700">
                  <Image
                    src={module.image}
                    alt={module.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transform hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/30 to-transparent"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-purple-800 to-purple-900 py-32">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="fade-in-section text-6xl font-bold text-center text-white mb-32 tracking-tight opacity-0">Your Journey</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600/0 via-purple-300 to-purple-600/0"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
              {steps.map((step, index) => (
                <div key={index} className="fade-in-section relative opacity-0" style={{ transitionDelay: `${index * 200}ms` }}>
                  <div className="text-center group">
                    <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-purple-700/50 backdrop-blur-md
                                  flex items-center justify-center border border-purple-300/30
                                  transform group-hover:scale-110 transition-all duration-500">
                      <i data-lucide={step.icon} className="w-10 h-10 text-purple-200"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-purple-200 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-purple-900 to-purple-800 py-32">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="fade-in-section text-6xl font-bold text-center text-white mb-32 tracking-tight opacity-0">Community Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="fade-in-section relative opacity-0" style={{ transitionDelay: `${index * 200}ms` }}>
                <div className="text-left space-y-8 group">
                  <i data-lucide="quote" className="w-12 h-12 text-purple-400/30 mb-4 transform group-hover:scale-110 transition-all duration-500"></i>
                  <p className="text-2xl text-purple-200 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden transform group-hover:scale-110 transition-all duration-500">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-purple-300">{testimonial.role} • {testimonial.mbti}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative min-h-[80vh] bg-gradient-to-b from-purple-800 to-purple-900 flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-purple-900/70 to-purple-900/90 backdrop-blur-sm"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="fade-in-section opacity-0">
            <h2 className="text-6xl font-bold text-white mb-8 tracking-tight">Ready to Transform?</h2>
            <p className="text-2xl text-purple-200 mb-12 leading-relaxed">
              Join our community of visionaries and start your journey today
            </p>
            <Link href="/mbti-test" 
                  className="group inline-block bg-white/10 backdrop-blur-md text-white px-16 py-5 rounded-full text-xl 
                           hover:bg-white/20 transition-all duration-500 border border-white/20">
              <span className="inline-flex items-center gap-2">
                Start Now
                <i data-lucide="arrow-right" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"></i>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900/90 backdrop-blur-md text-purple-200 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div>
              <Link href="/" className="flex items-center gap-1 mb-8 group">
                <span className="text-white text-3xl font-bold group-hover:text-purple-200 transition-colors">M</span>
                <span className="text-purple-300 text-3xl font-bold group-hover:text-purple-200 transition-colors">Better</span>
                <span className="text-white text-3xl font-bold group-hover:text-purple-200 transition-colors">TI</span>
              </Link>
              <p className="text-purple-300 text-lg leading-relaxed">
                Empowering personal growth through AI and MBTI insights
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white text-xl mb-8">Features</h4>
              <ul className="space-y-6">
                <li><Link href="/ai-life-coach" className="hover:text-white transition-colors text-lg">AI Life Coach</Link></li>
                <li><Link href="/growth-records" className="hover:text-white transition-colors text-lg">Growth Records</Link></li>
                <li><Link href="/challenges" className="hover:text-white transition-colors text-lg">Challenges</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white text-xl mb-8">Resources</h4>
              <ul className="space-y-6">
                <li><Link href="/mbti-test" className="hover:text-white transition-colors text-lg">MBTI Test</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors text-lg">Blog</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors text-lg">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white text-xl mb-8">Contact</h4>
              <ul className="space-y-6">
                <li className="hover:text-white transition-colors text-lg">support@mbetterti.com</li>
                <li className="hover:text-white transition-colors text-lg">Follow us on Twitter</li>
                <li className="hover:text-white transition-colors text-lg">Join our Discord</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-purple-800/50 text-center">
            <p className="text-purple-400">© 2024 MBetterTI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
