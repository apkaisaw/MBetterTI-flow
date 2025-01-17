'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { OKXUniversalConnectUI, THEME } from '@okxconnect/ui';
import { ethers } from 'ethers';

interface AuthContextType {
  connected: boolean;
  walletAddress: string | null;
  chainId: string | null;
  balance: string | null;
  logIn: () => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [client, setClient] = useState<OKXUniversalConnectUI | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);

  const fetchBalance = async (address: string) => {
    try {
      const provider = new ethers.JsonRpcProvider('https://testnet.evm.nodes.onflow.org');
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.formatEther(balance);
      setBalance(Number(formattedBalance).toFixed(4));
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      setBalance(null);
    }
  };

  useEffect(() => {
    const initClient = async () => {
      try {
        const uiClient = await OKXUniversalConnectUI.init({
          dappMetaData: {
            name: 'MBetterTI Flow',
            icon: 'https://cryptologos.cc/logos/flow-flow-logo.png',
          },
          actionsConfiguration: {
            returnStrategy: 'none',
            modals: 'all',
          },
          uiPreferences: {
            theme: THEME.LIGHT,
          },
        });
        setClient(uiClient);
      } catch (error) {
        console.error('Failed to initialize OKX UI:', error);
      }
    };
    initClient();
  }, []);

  useEffect(() => {
    if (walletAddress && connected) {
      fetchBalance(walletAddress);
    }
  }, [walletAddress, connected]);

  const logIn = async () => {
    if (!client) return;
    try {
      const session = await client.openModal({
        namespaces: {
          eip155: {
            chains: ['eip155:545'],
            defaultChain: '545',
          },
        },
      });

      if (!session || !session.namespaces.eip155) {
        console.error('Session is undefined or invalid');
        return;
      }

      const address = session.namespaces.eip155.accounts[0]?.split(':')[2];
      const rawChainId = session.namespaces.eip155.chains[0];
      const chain = rawChainId?.split(':')[1] || null;

      setWalletAddress(address);
      setChainId(chain);
      setConnected(true);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const logOut = async () => {
    if (!client) return;
    try {
      await client.disconnect();
      setWalletAddress(null);
      setChainId(null);
      setConnected(false);
      setBalance(null);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        connected,
        walletAddress,
        chainId,
        balance,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
}; 