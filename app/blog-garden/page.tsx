'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

const content = {
  zh: {
    title: "博客花园",
    searchPlaceholder: "搜索博客文章...",
    createNew: "创建新博客文章",
    readMore: "阅读更多"
  },
  en: {
    title: "Blog Garden",
    searchPlaceholder: "Search blog posts...",
    createNew: "Create New Blog Post",
    readMore: "Read More"
  }
}

// 模拟博客文章数据
const mockPosts = {
  zh: [
    { id: 1, title: '如何培养创造力', excerpt: '创造力是一种可以通过练习和正确的方法来培养的技能...' },
    { id: 2, title: '冥想对心理健康的影响', excerpt: '规律的冥想练习可以显著改善心理健康,减少压力和焦虑...' },
    { id: 3, title: '探索个人成长的不同途径', excerpt: '个人成长是一个持续的过程,有多种方法可以促进自我发展...' },
  ],
  en: [
    { id: 1, title: 'How to Cultivate Creativity', excerpt: 'Creativity is a skill that can be cultivated through practice and proper methods...' },
    { id: 2, title: 'The Impact of Meditation on Mental Health', excerpt: 'Regular meditation practice can significantly improve mental health, reducing stress and anxiety...' },
    { id: 3, title: 'Exploring Different Paths to Personal Growth', excerpt: 'Personal growth is an ongoing process, and there are many ways to promote self-development...' },
  ]
}

export default function BlogGarden() {
  const [searchTerm, setSearchTerm] = useState('')
  const { language } = useLanguage()

  const t = content[language]
  const posts = mockPosts[language]

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-8"
      >
        {t.title}
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded border border-gray-300"
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p>{post.excerpt}</p>
            <button className="mt-4 text-indigo-600 hover:text-indigo-800">{t.readMore}</button>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <button className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-700 transition duration-300">
          {t.createNew}
        </button>
      </motion.div>
    </div>
  )
}
