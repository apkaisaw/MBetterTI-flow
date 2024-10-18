'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { Search, PenTool, Heart, MessageCircle, Repeat2, Share2, TrendingUp, Filter, User, BookOpen, BarChart2, Sparkles } from 'lucide-react'

const content = {
  zh: {
    title: "博客花园",
    searchPlaceholder: "搜索博客文章...",
    createNew: "创建新博客文章",
    whatOnMind: "你在想什么？",
    post: "发布",
    likes: "喜欢",
    comments: "评论",
    reposts: "转发",
    shares: "分享",
    personalStats: "个人统计",
    postsCount: "发帖数",
    followersCount: "关注者",
    followingCount: "正在关注",
    mbtiActivityBoard: "MBTI 活跃度看板",
    filterByMBTI: "按MBTI筛选",
    interestedPeople: "你可能感兴趣的人",
    trendingTopics: "趋势话题",
    recommendedPosts: "推荐文章",
    follow: "关注",
    allTypes: "所有类型",
    viewMore: "查看更多"
  },
  en: {
    title: "Blog Garden",
    searchPlaceholder: "Search blog posts...",
    createNew: "Create New Blog Post",
    whatOnMind: "What's on your mind?",
    post: "Post",
    likes: "Likes",
    comments: "Comments",
    reposts: "Reposts",
    shares: "Shares",
    personalStats: "Personal Stats",
    postsCount: "Posts",
    followersCount: "Followers",
    followingCount: "Following",
    mbtiActivityBoard: "MBTI Activity Board",
    filterByMBTI: "Filter by MBTI",
    interestedPeople: "People You May Be Interested In",
    trendingTopics: "Trending Topics",
    recommendedPosts: "Recommended Posts",
    follow: "Follow",
    allTypes: "All Types",
    viewMore: "View More"
  }
}

// 模拟博客文章数据
const mockPosts = {
  zh: [
    { id: 1, author: '张三', avatar: 'https://i.pravatar.cc/150?img=1', content: '创造力是一种可以通过练习和正确的方法来培养的技能...', likes: 15, comments: 3, reposts: 2, shares: 1 },
    { id: 2, author: '李四', avatar: 'https://i.pravatar.cc/150?img=2', content: '规律的冥想练习可以显著改善心理健康,减少压力和焦虑...', likes: 20, comments: 5, reposts: 4, shares: 2 },
    { id: 3, author: '王五', avatar: 'https://i.pravatar.cc/150?img=3', content: '个人成长是一个持续的过程,有多种方法可以促进自我发展...', likes: 10, comments: 2, reposts: 1, shares: 0 },
  ],
  en: [
    { id: 1, author: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=4', content: 'Creativity is a skill that can be cultivated through practice and proper methods...', likes: 15, comments: 3, reposts: 2, shares: 1 },
    { id: 2, author: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=5', content: 'Regular meditation practice can significantly improve mental health, reducing stress and anxiety...', likes: 20, comments: 5, reposts: 4, shares: 2 },
    { id: 3, author: 'Bob Johnson', avatar: 'https://i.pravatar.cc/150?img=6', content: 'Personal growth is an ongoing process, and there are many ways to promote self-development...', likes: 10, comments: 2, reposts: 1, shares: 0 },
  ]
}

const mbtiTypes = ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ']

const mbtiActivityData = [
  { type: 'INTJ', activity: 72 },
  { type: 'INTP', activity: 68 },
  { type: 'ENTJ', activity: 95 },
  { type: 'ENTP', activity: 89 },
  { type: 'INFJ', activity: 78 },
  { type: 'INFP', activity: 85 },
  { type: 'ENFJ', activity: 88 },
  { type: 'ENFP', activity: 92 },
  { type: 'ISTJ', activity: 70 },
  { type: 'ISFJ', activity: 76 },
  { type: 'ESTJ', activity: 87 },
  { type: 'ESFJ', activity: 91 },
]

const getColor = (activity: number) => {
  const hue = 240 - (activity * 2.4) // 从蓝色(240)到紫色(0)
  return `hsl(${hue}, 70%, 60%)`
}

const interestedPeople = [
  { id: 1, name: "Alice Johnson", mbti: "INFJ", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Bob Smith", mbti: "ENTP", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Carol Williams", mbti: "ISFP", avatar: "https://i.pravatar.cc/150?img=3" },
]

const trendingTopics = ['#MBTIGrowth', '#CreativityBoost', '#SelfDiscovery', '#MindfulnessForAll', '#INFPCreativity']

export default function BlogGarden() {
  const [searchTerm, setSearchTerm] = useState('')
  const [newPost, setNewPost] = useState('')
  const [selectedMBTI, setSelectedMBTI] = useState('')
  const { language } = useLanguage()

  const t = content[language]
  const posts = mockPosts[language]

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold text-center mb-12 text-purple-800 relative"
      >
        {t.title}
        <span className="absolute -top-6 -right-6 text-9xl text-purple-200 opacity-50 transform rotate-12">🌿</span>
      </motion.h1>

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
              {t.personalStats}
            </h2>
            <div className="space-y-2">
              <p className="text-purple-700">{t.postsCount}: <span className="font-bold">42</span></p>
              <p className="text-purple-700">{t.followersCount}: <span className="font-bold">1,234</span></p>
              <p className="text-purple-700">{t.followingCount}: <span className="font-bold">567</span></p>
            </div>
          </div>

          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-purple-800">
              <BarChart2 className="mr-2" size={24} />
              {t.mbtiActivityBoard}
            </h2>
            <div className="grid grid-cols-4 gap-2">
              {mbtiActivityData.map((mbti) => (
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
          <div className="relative">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 rounded-full border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white bg-opacity-80 backdrop-blur-lg"
            />
            <Search className="absolute left-4 top-4 text-purple-400" />
          </div>

          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <textarea
              placeholder={t.whatOnMind}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="w-full p-4 rounded-lg border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none bg-transparent"
              rows={3}
            />
            <div className="flex justify-end mt-4">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgb(167, 139, 250)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full transition duration-300 flex items-center overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center">
                  <PenTool className="mr-2" size={18} />
                  {t.post}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>

          <div className="space-y-8">
            {filteredPosts.map((post) => (
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
                <div className="flex justify-between text-purple-600">
                  <InteractionButton icon={Heart} count={post.likes} label={t.likes} />
                  <InteractionButton icon={MessageCircle} count={post.comments} label={t.comments} />
                  <InteractionButton icon={Repeat2} count={post.reposts} label={t.reposts} />
                  <InteractionButton icon={Share2} count={post.shares} label={t.shares} />
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
              <Filter className="mr-2" size={24} />
              {t.filterByMBTI}
            </h2>
            <select
              value={selectedMBTI}
              onChange={(e) => setSelectedMBTI(e.target.value)}
              className="w-full p-3 rounded-full border-2 border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-transparent"
            >
              <option value="">{t.allTypes}</option>
              {mbtiTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-purple-800">
              <User className="mr-2" size={24} />
              {t.interestedPeople}
            </h2>
            {interestedPeople.map((person) => (
              <div key={person.id} className="flex items-center justify-between mb-4 last:mb-0">
                <div className="flex items-center">
                  <img src={person.avatar} alt={person.name} className="w-10 h-10 rounded-full mr-3 border-2 border-purple-300" />
                  <div>
                    <p className="font-semibold text-purple-800">{person.name}</p>
                    <p className="text-sm text-purple-600">{person.mbti}</p>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition duration-300"
                >
                  {t.follow}
                </motion.button>
              </div>
            ))}
          </div>

          <div className="bg-white bg-opacity-80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-purple-800">
              <TrendingUp className="mr-2" size={24} />
              {t.trendingTopics}
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
              {t.recommendedPosts}
            </h2>
            {posts.slice(0, 3).map((post) => (
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
              {t.viewMore}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// 新增的 InteractionButton 组件
const InteractionButton = ({ icon: Icon, count, label }) => (
  <motion.button 
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="flex items-center space-x-1 bg-purple-100 hover:bg-purple-200 text-purple-600 px-3 py-1 rounded-full transition-colors duration-300"
  >
    <Icon size={18} />
    <span>{count}</span>
    <span className="hidden sm:inline">{label}</span>
  </motion.button>
)
