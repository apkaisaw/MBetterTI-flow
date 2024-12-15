'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface WalletContextType {
  walletAddress: string
  setWalletAddress: (address: string) => void
  isConnected: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, handler: (...args: any[]) => void) => void;
      removeListener: (event: string, handler: (...args: any[]) => void) => void;
      selectedAddress?: string;
    };
  }
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [isInitialized, setIsInitialized] = useState(false)

  // 初始化检查连接状态
  useEffect(() => {
    const initializeWallet = async () => {
      if (typeof window === 'undefined') return

      // 首先检查 ethereum.selectedAddress
      if (window.ethereum?.selectedAddress) {
        setWalletAddress(window.ethereum.selectedAddress)
        setIsInitialized(true)
        return
      }

      // 然后尝试获取账户
      try {
        const accounts = await window.ethereum?.request({
          method: 'eth_accounts'
        })
        
        if (accounts && accounts.length > 0) {
          console.log('Found connected account:', accounts[0])
          setWalletAddress(accounts[0])
        }
      } catch (error) {
        console.error('Failed to get accounts:', error)
      }
      
      setIsInitialized(true)
    }

    initializeWallet()
  }, [])

  // 监听账户变化
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      console.log('Accounts changed:', accounts)
      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
      } else {
        setWalletAddress('')
      }
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [])

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      console.log('MetaMask not found')
      return
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts && accounts.length > 0) {
        console.log('Connected to account:', accounts[0])
        setWalletAddress(accounts[0])
      }
    } catch (error) {
      console.error('Failed to connect:', error)
    }
  }

  const disconnectWallet = () => {
    setWalletAddress('')
  }

  if (!isInitialized) {
    return null // 或者返回加载状态
  }

  return (
    <WalletContext.Provider 
      value={{
        walletAddress,
        setWalletAddress,
        isConnected: !!walletAddress,
        connectWallet,
        disconnectWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}