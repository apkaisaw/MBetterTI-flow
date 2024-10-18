'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { PenTool, X, Upload, DollarSign, Image as ImageIcon, Sparkles } from 'lucide-react'

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
  const [selectedNFT, setSelectedNFT] = useState(null)
  const { language } = useLanguage()

  const t = content[language]
  const nfts = mockNFTs[language]

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold text-center mb-12 text-purple-800 relative"
      >
        {t.title}
        <motion.span
          className="absolute -top-6 -right-6 text-9xl text-purple-200 opacity-50"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles />
        </motion.span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12 text-center"
      >
        <motion.button 
          onClick={() => setShowCreateModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-indigo-600 transition duration-300 shadow-lg"
        >
          <PenTool className="inline-block mr-2 mb-1" size={24} />
          {t.createNew}
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {nfts.map((nft) => (
          <motion.div 
            key={nft.id} 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img src={nft.image} alt={nft.title} className="w-full h-64 object-cover mb-6 rounded-lg" />
            <h2 className="text-2xl font-semibold mb-2 text-purple-800">{nft.title}</h2>
            <p className="text-purple-600 mb-4">{language === 'zh' ? '创作者' : 'Creator'}: {nft.creator}</p>
            <p className="text-2xl font-bold text-indigo-600 mb-6">{nft.price}</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedNFT(nft)}
              className="w-full bg-indigo-500 text-white px-4 py-3 rounded-full hover:bg-indigo-600 transition duration-300 flex items-center justify-center"
            >
              <DollarSign className="mr-2" size={20} />
              {t.buy}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {showCreateModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white p-8 rounded-2xl w-full max-w-md relative"
            >
              <button 
                onClick={() => setShowCreateModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-semibold mb-6 text-purple-800">{t.modalTitle}</h2>
              <form>
                <div className="mb-6">
                  <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="title">
                    {t.titleLabel}
                  </label>
                  <input 
                    type="text" 
                    id="title" 
                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" 
                    placeholder={t.titlePlaceholder}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="price">
                    {t.priceLabel}
                  </label>
                  <input 
                    type="number" 
                    id="price" 
                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" 
                    placeholder={t.pricePlaceholder}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="image">
                    {t.imageLabel}
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide uppercase border border-purple-500 cursor-pointer hover:bg-purple-500 hover:text-white transition-colors duration-300">
                      <Upload className="w-8 h-8" />
                      <span className="mt-2 text-base leading-normal">{t.imageLabel}</span>
                      <input type='file' className="hidden" />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button" 
                    onClick={() => setShowCreateModal(false)}
                    className="bg-gray-300 text-gray-800 px-6 py-3 rounded-full mr-4 hover:bg-gray-400 transition duration-300"
                  >
                    {t.cancel}
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit" 
                    className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300"
                  >
                    {t.create}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedNFT && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white p-8 rounded-2xl w-full max-w-lg relative"
            >
              <button 
                onClick={() => setSelectedNFT(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <img src={selectedNFT.image} alt={selectedNFT.title} className="w-full h-64 object-cover mb-6 rounded-lg" />
              <h2 className="text-2xl font-semibold mb-2 text-purple-800">{selectedNFT.title}</h2>
              <p className="text-purple-600 mb-4">{language === 'zh' ? '创作者' : 'Creator'}: {selectedNFT.creator}</p>
              <p className="text-2xl font-bold text-indigo-600 mb-6">{selectedNFT.price}</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-indigo-500 text-white px-4 py-3 rounded-full hover:bg-indigo-600 transition duration-300 flex items-center justify-center"
              >
                <DollarSign className="mr-2" size={20} />
                {t.buy}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
