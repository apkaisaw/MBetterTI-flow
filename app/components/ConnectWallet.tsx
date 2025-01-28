'use client';

import { ConnectWallet as TWConnectWallet } from '@thirdweb-dev/react';
import { useEffect } from 'react';
import { addTelosTestnet } from '@/lib/web3/config';

export function ConnectWallet() {
  useEffect(() => {
    addTelosTestnet();
  }, []);

  return (
    <TWConnectWallet
      theme="light"
      btnTitle="Connect Wallet"
      modalTitle="Choose Wallet"
      modalSize="wide"
      welcomeScreen={{
        title: "Welcome to Growth Challenge",
        subtitle: "Please connect your wallet to continue",
      }}
      modalTitleIconUrl="/logo.png"
    />
  );
} 