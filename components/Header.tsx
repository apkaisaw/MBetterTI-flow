'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LanguageSwitch from './LanguageSwitch'
import { useLanguage } from '../contexts/LanguageContext'
import { Wallet, WalletCards, User, Home, Lightbulb, BookOpen, Palette, Flower } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')
  const { language } = useLanguage()
  const { t } = useTranslation('common')

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
      alert(t('installMetaMask'))
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
    { href: "/", label: t('home'), icon: Home },
    { href: "/persona-discovery", label: t('personaDiscovery'), icon: Lightbulb },
    { href: "/blog-garden", label: t('blogGarden'), icon: BookOpen },
    { href: "/creative-hub", label: t('creativeHub'), icon: Palette },
  ]

  return (
    <header className="bg-gradient-to-r from-purple-300/70 via-purple-400/70 to-indigo-400/70 backdrop-blur-md text-purple-900 py-4 px-6 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-purple-700 transition-colors duration-300 flex items-center">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <Flower className="w-8 h-8 mr-3 text-purple-700" />
          </motion.div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-700">
            {t('idealistGarden')}
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <motion.div key={item.href} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Link href={item.href} className="px-4 py-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-300 flex items-center">
                <item.icon className="w-5 h-5 mr-2" />
                <span>{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={connectWallet}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full transition-all duration-300 flex items-center"
          >
            {isConnected ? <Wallet className="w-5 h-5 mr-2" /> : <WalletCards className="w-5 h-5 mr-2" />}
            <span>{isConnected ? t('connected') : t('connectWallet')}</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all duration-300"
          >
            <User className="w-5 h-5" />
          </motion.button>
          <LanguageSwitch />
        </div>
      </div>
    </header>
  )
}

export default Header
