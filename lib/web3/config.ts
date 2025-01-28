export const CHAIN_ID = 41;
export const RPC_URL = 'https://testnet.telos.net/evm';
export const CHAIN_NAME = 'Telos EVM Testnet';
export const NATIVE_CURRENCY = {
  name: 'Telos',
  symbol: 'TLOS',
  decimals: 18,
};

export const addTelosTestnet = async () => {
  if (typeof window === 'undefined' || !window.ethereum) return;

  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `0x${CHAIN_ID.toString(16)}`,
          chainName: CHAIN_NAME,
          nativeCurrency: NATIVE_CURRENCY,
          rpcUrls: [RPC_URL],
          blockExplorerUrls: ['https://testnet.teloscan.io/'],
        },
      ],
    });
  } catch (error) {
    console.error('Error adding Telos Testnet:', error);
  }
}; 