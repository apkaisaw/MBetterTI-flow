import contractABI from './GrowthPlatform.abi.json';
import { CHAIN_ID } from '../web3/config';

export const CONTRACT_ADDRESS = '0x0ecD0d3c30d4523EB5804C65bb774A194d909b22';
export const CONTRACT_ABI = contractABI;

export const checkNetwork = async () => {
  if (typeof window === 'undefined' || !window.ethereum) return false;

  try {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    return parseInt(chainId, 16) === CHAIN_ID;
  } catch (error) {
    console.error('Error checking network:', error);
    return false;
  }
};

export const switchNetwork = async () => {
  if (typeof window === 'undefined' || !window.ethereum) return false;

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
    });
    return true;
  } catch (error: any) {
    if (error.code === 4902) {
      // 如果网络不存在，添加网络
      return false;
    }
    console.error('Error switching network:', error);
    return false;
  }
}; 