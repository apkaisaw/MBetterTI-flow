'use client';

import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function WalletConnection() {
  const { connected, walletAddress, chainId, logIn, logOut } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/30">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-purple-900 mb-2">
              OKX Wallet Connect
            </h1>
            <p className="text-purple-800/70">
              {connected 
                ? 'Thanks for connecting your wallet!'
                : 'Connect your wallet with OKX'}
            </p>
          </div>

          {connected ? (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="bg-white/30 rounded-2xl p-4">
                  <p className="text-sm font-medium text-purple-900/70 mb-1">
                    Wallet Address
                  </p>
                  <p className="font-mono text-sm text-purple-900 break-all">
                    {walletAddress}
                  </p>
                </div>

                {chainId && (
                  <div className="bg-white/30 rounded-2xl p-4">
                    <p className="text-sm font-medium text-purple-900/70 mb-1">
                      Chain ID
                    </p>
                    <p className="font-mono text-sm text-purple-900">
                      {chainId}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={logOut}
                className="w-full group relative px-8 py-3 rounded-xl text-white font-medium transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/90 to-pink-500/90" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/90 to-pink-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Disconnect Wallet
                  <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={logIn}
              className="w-full group relative px-8 py-3 rounded-xl text-white font-medium transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/90 to-indigo-500/90" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/90 to-indigo-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Connect OKX Wallet
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
} 