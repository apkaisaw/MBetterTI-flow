'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { Search, PenTool, Heart, MessageCircle, Repeat2, Share2, TrendingUp, Filter, User, BookOpen, BarChart2, Sparkles, LucideIcon, Star, Trophy, Users, CreditCard } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ethers } from 'ethers'

// 添加更多模板文章
const mockPosts = [
  { 
    id: 1, 
    author: 'Sarah Chen', 
    avatar: 'https://i.pravatar.cc/150?img=4', 
    content: 'Just tried a 15-minute mindfulness meditation session. It really helped calm my mind. I recommend trying it during work breaks to reduce stress...', 
    comments: 0,
    rating: 0
  },
  { 
    id: 2, 
    author: 'Mike Wilson', 
    avatar: 'https://i.pravatar.cc/150?img=5', 
    content: 'Sharing a tip for better sleep quality: Turn off all electronic devices 1 hour before bed, drink warm chamomile tea, and do 10 minutes of gentle stretching...', 
    comments: 0,
    rating: 0
  },
  { 
    id: 3, 
    author: 'Emma Liu', 
    avatar: 'https://i.pravatar.cc/150?img=6', 
    content: 'When work stress hits, I use the 4-7-8 breathing technique: inhale for 4s, hold for 7s, exhale for 8s. It works wonders, give it a try...', 
    comments: 0,
    rating: 0
  },
  {
    id: 4,
    author: 'David Park',
    avatar: 'https://i.pravatar.cc/150?img=7',
    content: 'Started my morning with a 20-minute yoga session. The combination of gentle movements and deep breathing really sets a positive tone for the day. Anyone else have a morning wellness routine?',
    comments: 0,
    rating: 0
  },
  {
    id: 5,
    author: 'Rachel Green',
    avatar: 'https://i.pravatar.cc/150?img=8',
    content: 'Today\'s mental health tip: Practice gratitude by writing down three things you\'re thankful for each evening. It\'s amazing how this simple habit can shift your perspective...',
    comments: 0,
    rating: 0
  },
  {
    id: 6,
    author: 'James Lee',
    avatar: 'https://i.pravatar.cc/150?img=9',
    content: 'Just completed a 30-day healthy eating challenge! Learned so much about nutrition and meal planning. The key is to make small, sustainable changes rather than drastic ones...',
    comments: 0,
    rating: 0
  }
]

const wellnessCategories = [
  'Meditation', 'Exercise', 'Nutrition', 'Sleep', 
  'Mental Health', 'Yoga', 'Breathing', 'Mindfulness',
  'Relaxation', 'Emotions', 'Energy', 'Balance'
]

const categoryActivityData = [
  { type: 'Meditation', activity: 72 },
  { type: 'Exercise', activity: 85 },
  { type: 'Nutrition', activity: 78 },
  { type: 'Sleep', activity: 92 },
  { type: 'Mental Health', activity: 70 },
  { type: 'Yoga', activity: 76 },
  { type: 'Breathing', activity: 87 },
  { type: 'Mindfulness', activity: 91 },
  { type: 'Relaxation', activity: 68 },
  { type: 'Emotions', activity: 89 },
  { type: 'Energy', activity: 78 },
  { type: 'Balance', activity: 85 },
]

const getColor = (activity: number) => {
  const hue = 240 - (activity * 2.4) // 从蓝色(240)到紫色(0)
  return `hsl(${hue}, 70%, 60%)`
}

const interestedPeople = [
  { id: 1, name: "Alice Wang", title: "Meditation Guide", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Tom Zhang", title: "Nutritionist", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Linda Li", title: "Yoga Instructor", avatar: "https://i.pravatar.cc/150?img=3" },
]

const trendingTopics = [
  '#MindfulLiving', 
  '#HealthyEating', 
  '#QualitySleep', 
  '#StressManagement', 
  '#EmotionalBalance'
]

export default function BlogGarden() {
  const [totalPoints, setTotalPoints] = useState(0)
  const [postRatings, setPostRatings] = useState<{[key: number]: number}>({})
  const { language } = useLanguage()
  const { t } = useTranslation('common')

  const handleRate = (postId: number, rating: number) => {
    if (!postRatings[postId]) {
      setTotalPoints(prev => prev + 1)
      setPostRatings(prev => ({
        ...prev,
        [postId]: rating
      }))
    }
  }

  const handleRedeemPoints = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask wallet to claim your points!')
        return
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      
      // Create a more professional message
      const message = `
Wellness Corner Points Claim Request

I am claiming my earned points on Wellness Corner:

Total Points: ${totalPoints}
Wallet Address: ${await signer.getAddress()}
Timestamp: ${new Date().toISOString()}

By signing this message, I confirm that:
- These points were earned through my participation
- I am the rightful owner of this wallet
- This is my first time claiming these points

This signature does not authorize any blockchain transaction.
      `.trim()
      
      const signature = await signer.signMessage(message)
      
      console.log('Signature successful:', signature)
      alert('Points claim signature successful! Your points will be processed shortly.')
      
    } catch (error) {
      console.error('Signature failed:', error)
      if (error.code === 4001) {
        alert('Points claim cancelled. You can try again anytime.')
      } else {
        alert('An error occurred while claiming points. Please try again.')
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-purple-800 relative"
        >
          Wellness Corner
          <span className="absolute -top-6 -right-6 text-9xl text-purple-200 opacity-50 transform rotate-12">🌿</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-xl text-purple-600 max-w-2xl mx-auto"
        >
          Share your wellness journey, complete challenges together, and earn points while supporting each other's growth
        </motion.p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* 左侧栏 */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:w-1/4 space-y-8"
        >
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-opacity-80 backdrop-blur-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-purple-800">
              <BarChart2 className="mr-2" size={24} />
              {t('personalStats')}
            </h2>
            <div className="space-y-2">
              <p className="text-purple-700">{t('meditationMinutes')}: <span className="font-bold">420</span></p>
              <p className="text-purple-700">{t('wellnessScore')}: <span className="font-bold">85</span></p>
              <p className="text-purple-700">{t('streakDays')}: <span className="font-bold">12</span></p>
            </div>
          </div>

          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-purple-800">
              <BarChart2 className="mr-2" size={24} />
              {t('wellnessActivityBoard')}
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {categoryActivityData.map((mbti) => (
                <motion.div
                  key={mbti.type}
                  className="relative overflow-hidden rounded-lg"
                  style={{ aspectRatio: '1 / 1' }}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="absolute inset-0 transition-all duration-300 ease-out"
                    style={{
                      backgroundColor: getColor(mbti.activity),
                      clipPath: `polygon(0 ${100 - mbti.activity}%, 100% ${100 - mbti.activity}%, 100% 100%, 0 100%)`,
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs font-bold text-white shadow-sm">
                      {mbti.type}
                    </span>
                    <span className="text-xs text-white shadow-sm">
                      {mbti.activity}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 中间主要内容 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:w-2/4 space-y-8"
        >
          <div className="space-y-8">
            {mockPosts.map((post) => (
              <motion.div 
                key={post.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full mr-4 border-2 border-purple-300" />
                  <h2 className="text-xl font-semibold text-purple-800">{post.author}</h2>
                </div>
                <p className="mb-4 text-purple-700">{post.content}</p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <StarRating 
                    rating={postRatings[post.id] || 0}
                    onRate={(rating) => handleRate(post.id, rating)}
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full hover:bg-purple-200 transition duration-300"
                  >
                    <MessageCircle size={18} />
                    <span>{post.comments} Comments</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 右侧栏 */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:w-1/4 space-y-8"
        >
          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-purple-800">
              <Sparkles className="mr-2" size={24} />
              Points Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-2 rounded-lg bg-purple-50">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                    <Star size={16} className="text-purple-600" />
                  </div>
                  <span className="text-purple-600">Rating Points</span>
                </div>
                <span className="font-bold text-purple-800">+{Object.keys(postRatings).length}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-purple-50">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                    <Trophy size={16} className="text-purple-600" />
                  </div>
                  <span className="text-purple-600">Challenge Points</span>
                </div>
                <span className="font-bold text-purple-800">+0</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-purple-50">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                    <Users size={16} className="text-purple-600" />
                  </div>
                  <span className="text-purple-600">Support Points</span>
                </div>
                <span className="font-bold text-purple-800">+0</span>
              </div>
              <div className="border-t border-purple-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-purple-700">Total Points</span>
                  <motion.span 
                    key={totalPoints}
                    initial={{ scale: 1.2, color: '#10B981' }}
                    animate={{ scale: 1, color: '#6B21A8' }}
                    transition={{ duration: 0.5 }}
                    className="font-bold text-xl text-purple-800"
                  >
                    {totalPoints}
                  </motion.span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-xl font-semibold mt-4 flex items-center justify-center"
                onClick={handleRedeemPoints}
              >
                <CreditCard className="mr-2" size={18} />
                Redeem Points
              </motion.button>
            </div>
          </div>

          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-purple-800">
              <User className="mr-2" size={24} />
              {t('interestedPeople')}
            </h2>
            {interestedPeople.map((person) => (
              <div key={person.id} className="flex items-center justify-between mb-4 last:mb-0">
                <div className="flex items-center">
                  <img src={person.avatar} alt={person.name} className="w-10 h-10 rounded-full mr-3 border-2 border-purple-300" />
                  <div>
                    <p className="font-semibold text-purple-800">{person.name}</p>
                    <p className="text-sm text-purple-600">{person.title}</p>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition duration-300"
                >
                  {t('follow')}
                </motion.button>
              </div>
            ))}
          </div>

          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-purple-800">
              <TrendingUp className="mr-2" size={24} />
              {t('trendingTopics')}
            </h2>
            <ul className="space-y-2">
              {trendingTopics.map((topic, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="text-purple-600 hover:text-purple-800 cursor-pointer transition duration-300"
                >
                  {topic}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-purple-800">
              <BookOpen className="mr-2" size={24} />
              {t('recommendedPosts')}
            </h2>
            {mockPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="mb-4 pb-4 border-b border-purple-100 last:border-b-0">
                <h3 className="font-semibold text-purple-800 hover:text-purple-600 transition duration-300">{post.author}</h3>
                <p className="text-sm text-purple-600 truncate">{post.content}</p>
              </div>
            ))}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-purple-600 hover:text-purple-800 font-semibold transition duration-300"
            >
              {t('viewMore')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// 添加新的 StarRating 组件
interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRate(star)}
          className={`text-2xl ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </motion.button>
      ))}
      <span className="ml-2 text-purple-600 text-sm">
        {rating > 0 ? `${rating}/5` : 'Rate this'}
      </span>
    </div>
  );
};
