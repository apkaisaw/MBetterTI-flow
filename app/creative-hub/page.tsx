'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'

const content = {
  zh: {
    title: "创意中心",
    createNew: "创建新NFT",
    modalTitle: "创建新NFT",
    titleLabel: "标题",
    titlePlaceholder: "输入NFT标题",
    priceLabel: "价格 (ETH)",
    pricePlaceholder: "输入NFT价格",
    imageLabel: "上传图片",
    cancel: "取消",
    create: "创建",
    buy: "购买"
  },
  en: {
    title: "Creative Hub",
    createNew: "Create New NFT",
    modalTitle: "Create New NFT",
    titleLabel: "Title",
    titlePlaceholder: "Enter NFT title",
    priceLabel: "Price (ETH)",
    pricePlaceholder: "Enter NFT price",
    imageLabel: "Upload Image",
    cancel: "Cancel",
    create: "Create",
    buy: "Buy"
  }
}

// 模拟NFT数据
const mockNFTs = {
  zh: [
    { id: 1, title: '星空梦境', creator: '艺术家A', price: '0.5 ETH', image: 'https://via.placeholder.com/300' },
    { id: 2, title: '数字世界', creator: '艺术家B', price: '0.3 ETH', image: 'https://via.placeholder.com/300' },
    { id: 3, title: '未来城市', creator: '艺术家C', price: '0.7 ETH', image: 'https://via.placeholder.com/300' },
    { id: 4, title: '抽象思维', creator: '艺术家D', price: '0.4 ETH', image: 'https://via.placeholder.com/300' },
  ],
  en: [
    { id: 1, title: 'Starry Dreams', creator: 'Artist A', price: '0.5 ETH', image: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Digital World', creator: 'Artist B', price: '0.3 ETH', image: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Future City', creator: 'Artist C', price: '0.7 ETH', image: 'https://via.placeholder.com/300' },
    { id: 4, title: 'Abstract Thoughts', creator: 'Artist D', price: '0.4 ETH', image: 'https://via.placeholder.com/300' },
  ]
}

export default function CreativeHub() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { language } = useLanguage()

  const t = content[language]
  const nfts = mockNFTs[language]

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
        className="mb-8 text-center"
      >
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg hover:bg-purple-700 transition duration-300"
        >
          {t.createNew}
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {nfts.map((nft) => (
          <div key={nft.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={nft.image} alt={nft.title} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold mb-2">{nft.title}</h2>
            <p className="text-gray-600 mb-2">{language === 'zh' ? '创作者' : 'Creator'}: {nft.creator}</p>
            <p className="text-indigo-600 font-semibold">{nft.price}</p>
            <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300">
              {t.buy}
            </button>
          </div>
        ))}
      </motion.div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-semibold mb-4">{t.modalTitle}</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  {t.titleLabel}
                </label>
                <input 
                  type="text" 
                  id="title" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  placeholder={t.titlePlaceholder}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  {t.priceLabel}
                </label>
                <input 
                  type="number" 
                  id="price" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  placeholder={t.pricePlaceholder}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  {t.imageLabel}
                </label>
                <input 
                  type="file" 
                  id="image" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition duration-300"
                >
                  {t.cancel}
                </button>
                <button 
                  type="submit" 
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
                >
                  {t.create}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
