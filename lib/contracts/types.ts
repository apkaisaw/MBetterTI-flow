export interface Challenge {
  id: string;
  ipfsHash: string;
  active: boolean;
  title?: string; // 从IPFS加载的标题
  description?: string; // 从IPFS加载的描述
}

export interface Submission {
  challengeId: string;
  tweetUrl: string;
  totalScore: number;
  ratingCount: number;
  averageScore: number;
  index: number;
  user?: string;
} 