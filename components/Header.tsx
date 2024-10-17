'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LanguageSwitch from './LanguageSwitch'
import { useLanguage } from '../contexts/LanguageContext'

const Header = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')
  const { language } = useLanguage()

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[]
        setAddress(accounts[0])
        setIsConnected(true)
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    } else {
      alert(language === 'zh' ? '请安装MetaMask!' : 'Please install MetaMask!')
    }
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: unknown) => {
        if (Array.isArray(accounts) && accounts.length > 0) {
          setAddress(accounts[0] as string)
          setIsConnected(true)
        } else {
          setAddress('')
          setIsConnected(false)
        }
      })
    }
  }, [])

  const navItems = [
    { href: "/", label: language === 'zh' ? '首页' : 'Home' },
    { href: "/persona-discovery", label: language === 'zh' ? '个性发现' : 'Persona Discovery' },
    { href: "/blog-garden", label: language === 'zh' ? '博客花园' : 'Blog Garden' },
    { href: "/creative-hub", label: language === 'zh' ? '创意中心' : 'Creative Hub' },
  ]

  return (
    <header className="bg-purple-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-purple-300 transition-colors duration-300">Idealist Garden</Link>
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-4">
            {navItems.map((item, index) => (
              <motion.li key={item.href} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link href={item.href} className="hover:text-purple-300 transition-colors duration-300">
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <button onClick={connectWallet} className="bg-indigo-500 p-2 rounded-full hover:bg-indigo-600 transition-colors duration-300">
              <i data-lucide={isConnected ? "wallet" : "wallet-cards"} className="w-6 h-6"></i>
            </button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <button className="bg-indigo-500 p-2 rounded-full hover:bg-indigo-600 transition-colors duration-300">
              <i data-lucide="user" className="w-6 h-6"></i>
            </button>
          </motion.div>
          <LanguageSwitch />
        </div>
      </div>
    </header>
  )
}

export default Header
