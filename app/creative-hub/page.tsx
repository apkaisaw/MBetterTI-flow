'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../contexts/LanguageContext'
import { PenTool, X, Upload, DollarSign, Image as ImageIcon, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

// 定义 NFT 类型
interface NFT {
  id: number;
  title: string;
  creator: string;
  price: string;
  image: string;
}

// 模拟NFT数据
const mockNFTs: NFT[] = [
  { id: 1, title: 'Meme Magic', creator: 'Artist A', price: '0.5 ETH', image: 'meme2.jpg' },
  { id: 2, title: 'Digital Laughter', creator: 'Artist B', price: '0.3 ETH', image: 'meme3.jpg' },
  { id: 3, title: 'Viral Visuals', creator: 'Artist C', price: '0.7 ETH', image: 'meme4.jpg' },
  { id: 4, title: 'Internet Gold', creator: 'Artist D', price: '0.4 ETH', image: 'meme5.jpg' },
  { id: 5, title: 'Meme Dreams', creator: 'Artist E', price: '0.6 ETH', image: 'meme6.jpg' },
  { id: 6, title: 'Pixel Perfection', creator: 'Artist F', price: '0.8 ETH', image: 'meme7.jpg' },
  { id: 7, title: 'Meme Masterpiece', creator: 'Artist G', price: '0.9 ETH', image: 'meme8.jpg' },
  { id: 8, title: 'Viral Sensation', creator: 'Artist H', price: '0.5 ETH', image: 'meme9.jpg' },
  { id: 9, title: 'Internet Icon', creator: 'Artist I', price: '0.7 ETH', image: 'meme10.jpg' },
  { id: 10, title: 'Meme Mania', creator: 'Artist J', price: '0.6 ETH', image: 'meme11.jpg' },
  { id: 11, title: 'Digital Delight', creator: 'Artist K', price: '0.4 ETH', image: 'meme12.jpg' },
  { id: 12, title: 'Meme Miracle', creator: 'Artist L', price: '0.8 ETH', image: 'meme13.jpg' },
]

const imageLoader = ({ src }: { src: string }) => {
  return `/images/${src}`
}

export default function CreativeHub() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const { language } = useLanguage()
  const { t } = useTranslation('common')
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowCreateModal(false);
        setSelectedNFT(null);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const nftList = useMemo(() => (
    mockNFTs.map((nft) => (
      <motion.div 
        key={nft.id} 
        whileHover={{ scale: 1.03, boxShadow: "0 20px 30px rgba(124, 58, 237, 0.15)" }}
        className="bg-purple-100 bg-opacity-40 backdrop-blur-md p-1 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="bg-white bg-opacity-70 p-6 rounded-3xl h-full flex flex-col">
          <div className="relative mb-6">
            <Image 
              loader={imageLoader}
              src={imageError[nft.id] ? '/images/placeholder.jpg' : nft.image}
              alt={nft.title}
              width={300}
              height={300}
              className="w-full h-72 object-cover rounded-2xl shadow-md"
              loading="lazy"
              onError={() => setImageError(prev => ({ ...prev, [nft.id]: true }))}
            />
            <div className="absolute top-3 right-3 bg-purple-100 bg-opacity-80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-purple-700">
              {nft.price}
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-2 text-purple-800">{nft.title}</h2>
          <p className="text-purple-600 mb-4 flex items-center">
            <ImageIcon size={16} className="mr-2" />
            {t('creator')}: {nft.creator}
          </p>
          <div className="mt-auto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedNFT(nft)}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-indigo-600 transition duration-300 flex items-center justify-center text-lg font-semibold shadow-md"
            >
              <DollarSign className="mr-2" size={20} />
              {t('buy')}
            </motion.button>
          </div>
        </div>
      </motion.div>
    ))
  ), [mockNFTs, t, imageError]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold text-center mb-16 text-purple-800 relative"
      >
        {t('creativeHubTitle')}
        <motion.span
          className="absolute -top-8 -right-8 text-9xl text-purple-200 opacity-50"
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
        className="mb-16 text-center"
      >
        <motion.button 
          onClick={() => setShowCreateModal(true)}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-10 py-5 rounded-full text-xl font-semibold hover:from-purple-600 hover:to-indigo-600 transition duration-300 shadow-lg will-change-transform"
        >
          <PenTool className="inline-block mr-3 mb-1" size={28} />
          {t('createNewNFT')}
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
      >
        {nftList}
      </motion.div>

      {/* 创建 NFT 模态框 */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white p-10 rounded-3xl w-full max-w-lg relative"
            >
              <button 
                onClick={() => setShowCreateModal(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
              >
                <X size={28} />
              </button>
              <h2 className="text-3xl font-semibold mb-8 text-purple-800">{t('createNewNFT')}</h2>
              <form>
                <div className="mb-6">
                  <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="title">
                    {t('titleLabel')}
                  </label>
                  <input 
                    type="text" 
                    id="title" 
                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" 
                    placeholder={t('titlePlaceholder')}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="price">
                    {t('priceLabel')}
                  </label>
                  <input 
                    type="number" 
                    id="price" 
                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500" 
                    placeholder={t('pricePlaceholder')}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="image">
                    {t('imageLabel')}
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide uppercase border border-purple-500 cursor-pointer hover:bg-purple-500 hover:text-white transition-colors duration-300">
                      <Upload className="w-8 h-8" />
                      <span className="mt-2 text-base leading-normal">{t('imageLabel')}</span>
                      <input type='file' className="hidden" />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end mt-10">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button" 
                    onClick={() => setShowCreateModal(false)}
                    className="bg-gray-200 text-gray-800 px-8 py-4 rounded-full mr-4 hover:bg-gray-300 transition duration-300 text-lg font-semibold"
                  >
                    {t('cancel')}
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit" 
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full hover:from-purple-600 hover:to-indigo-600 transition duration-300 text-lg font-semibold"
                  >
                    {t('create')}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NFT 详情模态框 */}
      <AnimatePresence>
        {selectedNFT && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white p-10 rounded-3xl w-full max-w-xl relative"
            >
              <button 
                onClick={() => setSelectedNFT(null)}
                className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
              >
                <X size={28} />
              </button>
              <Image 
                loader={imageLoader}
                src={selectedNFT.image} 
                alt={selectedNFT.title} 
                width={400} 
                height={320} 
                className="w-full h-80 object-cover mb-8 rounded-2xl" 
              />
              <h2 className="text-3xl font-semibold mb-3 text-purple-800">{selectedNFT.title}</h2>
              <p className="text-purple-600 mb-4 text-lg">{t('creator')}: {selectedNFT.creator}</p>
              <p className="text-3xl font-bold text-indigo-600 mb-8">{selectedNFT.price}</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-4 rounded-full hover:from-indigo-600 hover:to-purple-600 transition duration-300 flex items-center justify-center text-xl font-semibold"
              >
                <DollarSign className="mr-3" size={24} />
                {t('buy')}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
