'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, X } from 'lucide-react'
import { useAuth } from '../../../contexts/AuthContext'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (address: string) => void
}

export const WalletModal = ({ isOpen, onClose, onConnect }: WalletModalProps) => {
  const { logIn } = useAuth()
  const [step, setStep] = useState<'select' | 'confirm'>('select')
  
  const connectOKX = async () => {
    setStep('confirm')
  }

  const confirmConnection = async () => {
    try {
      await logIn()
      onClose()
    } catch (error) {
      console.error('Failed to connect:', error)
      setStep('select')
    }
  }

  const renderContent = () => {
    if (step === 'confirm') {
      return (
        <div className="space-y-6">
          <div className="text-purple-800 space-y-4">
            <h4 className="font-medium">Connect to OKX Wallet</h4>
            <p className="text-sm">
              By connecting your wallet, you agree to:
            </p>
            <ul className="text-sm space-y-2 list-disc pl-4">
              <li>Share your wallet address</li>
              <li>Sign messages to verify your identity</li>
              <li>Pay gas fees for transactions</li>
            </ul>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setStep('select')}
              className="flex-1 px-4 py-2 rounded-xl border border-purple-200/30 text-purple-600 hover:bg-purple-50/50"
            >
              Cancel
            </button>
            <button
              onClick={confirmConnection}
              className="flex-1 px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
            >
              Connect
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        <button
          className="w-full bg-white/50 hover:bg-white/80 backdrop-blur-sm text-purple-900 px-4 py-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow flex items-center gap-3 border border-purple-100/20"
          onClick={connectOKX}
        >
          <span className="text-2xl">🦊</span>
          <span className="font-medium">OKX Wallet</span>
        </button>
        
        <button
          className="w-full bg-white/30 text-purple-900/50 px-4 py-3 rounded-xl flex items-center gap-3 border border-purple-100/20 cursor-not-allowed"
          disabled
        >
          <span className="text-2xl">🔗</span>
          <span className="font-medium">WalletConnect (Coming Soon)</span>
        </button>
        <button
          className="w-full bg-white/30 text-purple-900/50 px-4 py-3 rounded-xl flex items-center gap-3 border border-purple-100/20 cursor-not-allowed"
          disabled
        >
          <span className="text-2xl">📱</span>
          <span className="font-medium">Coinbase Wallet (Coming Soon)</span>
        </button>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={() => {
              setStep('select')
              onClose()
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-[360px] bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-purple-100/30">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-purple-900 flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  {step === 'select' ? 'Connect Wallet' : 'Confirm Connection'}
                </h3>
                <button
                  onClick={() => {
                    setStep('select')
                    onClose()
                  }}
                  className="text-purple-500 hover:text-purple-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {renderContent()}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 