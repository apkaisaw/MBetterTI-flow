'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Wallet } from 'lucide-react';
import { addFlowTestnet } from '@/lib/web3/config';

export function ConnectWallet() {
  const { connected, walletAddress, logIn } = useAuth();

  useEffect(() => {
    addFlowTestnet();
  }, []);

  return (
    <button
      onClick={logIn}
      className="px-4 py-2 bg-gradient-to-r from-purple-500/90 to-indigo-500/90 hover:from-purple-600/90 hover:to-indigo-600/90 text-white rounded-lg transition-all duration-300 flex items-center gap-2"
    >
      <Wallet size={16} />
      {connected ? (
        <span>{`${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}`}</span>
      ) : (
        <span>Connect Wallet</span>
      )}
      {connected && <div className="w-2 h-2 rounded-full bg-green-400" />}
    </button>
  );
} 