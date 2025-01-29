export const CHAIN_ID = 63424;
export const RPC_URL = 'https://testnet.evm.nodes.onflow.org';
export const CHAIN_NAME = 'Flow EVM Testnet';
export const NATIVE_CURRENCY = {
  name: 'Flow',
  symbol: 'FLOW',
  decimals: 18,
};

export const addFlowTestnet = async () => {
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
          blockExplorerUrls: ['https://evm-testnet.flowscan.io/'],
        },
      ],
    });
  } catch (error) {
    console.error('Error adding Flow Testnet:', error);
  }
}; 