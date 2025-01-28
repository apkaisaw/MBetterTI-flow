import { ethers } from 'ethers';
import { toast } from 'sonner';

export class GrowthPlatform {
  private contract: ethers.Contract | null = null;
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  private static instance: GrowthPlatform;
  private challengesCache: Map<string, any> = new Map();
  private submissionsCache: Map<string, any[]> = new Map();

  private constructor() {}

  public static getInstance(): GrowthPlatform {
    if (!GrowthPlatform.instance) {
      GrowthPlatform.instance = new GrowthPlatform();
    }
    return GrowthPlatform.instance;
  }

  public async init(contractAddress: string, contractABI: any[]) {
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('MetaMask not installed');
      }

      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      this.contract = new ethers.Contract(contractAddress, contractABI, this.signer);

      // 设置事件监听
      this.setupEventListeners();
      
      return true;
    } catch (error: any) {
      console.error('初始化合约失败:', error);
      toast.error('初始化合约失败: ' + error.message);
      return false;
    }
  }

  private setupEventListeners() {
    if (!this.contract) return;

    this.contract.on('ChallengeCreated', (challengeId: string) => {
      this.challengesCache.delete(challengeId);
      toast.success('新挑战已创建！');
    });

    this.contract.on('SubmissionPosted', (user: string, challengeId: string, tweetUrl: string) => {
      this.submissionsCache.delete(user);
      toast.success('新提交已记录！');
    });

    this.contract.on('ChallengeRated', (rater: string, target: string, challengeId: string, score: number) => {
      this.submissionsCache.delete(target);
      toast.success('评分已更新！');
    });
  }

  public async createChallenge(title: string, description: string) {
    try {
      if (!this.contract) throw new Error('Contract not initialized');

      const challengeId = ethers.id(title);
      const ipfsHash = ethers.id(description); // 简化版：实际应该上传到IPFS

      const tx = await this.contract.createChallenge(challengeId, ipfsHash);
      await tx.wait();
      return true;
    } catch (error: any) {
      console.error('创建挑战失败:', error);
      throw error;
    }
  }

  public async submitChallenge(challengeId: string, tweetUrl: string) {
    try {
      if (!this.contract) throw new Error('Contract not initialized');

      const tx = await this.contract.submitChallenge(challengeId, tweetUrl);
      await tx.wait();
      return true;
    } catch (error: any) {
      console.error('提交挑战失败:', error);
      throw error;
    }
  }

  public async rateSubmission(targetUser: string, submissionIndex: number, score: number) {
    try {
      if (!this.contract) throw new Error('Contract not initialized');

      const tx = await this.contract.rateChallenge(targetUser, submissionIndex, score);
      await tx.wait();
      return true;
    } catch (error: any) {
      console.error('评分失败:', error);
      throw error;
    }
  }

  public async getChallenge(challengeId: string) {
    try {
      if (!this.contract) throw new Error('Contract not initialized');

      if (this.challengesCache.has(challengeId)) {
        return this.challengesCache.get(challengeId);
      }

      const challenge = await this.contract.challenges(challengeId);
      this.challengesCache.set(challengeId, challenge);
      return challenge;
    } catch (error: any) {
      console.error('获取挑战信息失败:', error);
      throw error;
    }
  }

  public async getUserSubmissions(userAddress: string) {
    try {
      if (!this.contract) throw new Error('Contract not initialized');

      if (this.submissionsCache.has(userAddress)) {
        return this.submissionsCache.get(userAddress);
      }

      const submissions = [];
      let index = 0;
      
      while (true) {
        try {
          const submission = await this.contract.userSubmissions(userAddress, index);
          if (!submission.challengeId) break;
          
          const averageScore = await this.contract.getAverageScore(userAddress, index);
          submissions.push({
            ...submission,
            averageScore,
            index
          });
          
          index++;
        } catch (error) {
          break;
        }
      }

      this.submissionsCache.set(userAddress, submissions);
      return submissions;
    } catch (error: any) {
      console.error('获取用户提交记录失败:', error);
      throw error;
    }
  }

  public async checkAdminRole(address: string) {
    try {
      if (!this.contract) throw new Error('Contract not initialized');

      const adminRole = await this.contract.ADMIN_ROLE();
      return await this.contract.hasRole(adminRole, address);
    } catch (error: any) {
      console.error('检查管理员权限失败:', error);
      throw error;
    }
  }

  public disconnect() {
    if (this.contract) {
      this.contract.removeAllListeners();
    }
    this.contract = null;
    this.provider = null;
    this.signer = null;
    this.challengesCache.clear();
    this.submissionsCache.clear();
  }
} 