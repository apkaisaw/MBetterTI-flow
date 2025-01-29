'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { GrowthPlatform } from '@/lib/contracts/GrowthPlatform';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contracts/config';
import { Challenge, Submission } from '@/lib/contracts/types';
import { ConnectWallet } from '@/app/components/ConnectWallet';

export default function GrowthChallenges() {
  const [address, setAddress] = useState<string | null>(null);
  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeDescription, setChallengeDescription] = useState('');
  const [tweetUrl, setTweetUrl] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkWallet = async () => {
      if (typeof window !== 'undefined' && window.okxwallet) {
        try {
          const accounts = await window.okxwallet.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAddress(accounts[0]);
          }
        } catch (error) {
          console.error('Failed to get accounts:', error);
        }
      }
      // 无论是否连接钱包，都结束加载状态
      setIsLoading(false);
    };

    checkWallet();
    window.okxwallet?.on('accountsChanged', (accounts: string[]) => {
      setAddress(accounts[0] || null);
    });
  }, []);

  useEffect(() => {
    const initContract = async () => {
      setIsLoading(true); // 开始合约初始化时设置加载状态
      try {
        const platform = GrowthPlatform.getInstance();
        const success = await platform.init(CONTRACT_ADDRESS, CONTRACT_ABI);
        
        if (success && address) {
          const adminStatus = await platform.checkAdminRole(address);
          setIsAdmin(adminStatus);
          await loadChallenges();
          await loadSubmissions();
        }
      } catch (error) {
        console.error('Failed to initialize contract:', error);
        toast.error('Failed to initialize contract');
      } finally {
        setIsLoading(false); // 无论成功失败都结束加载状态
      }
    };

    if (address) {
      initContract();
    }

    return () => {
      GrowthPlatform.getInstance().disconnect();
    };
  }, [address]);

  const createChallenge = async () => {
    try {
      const platform = GrowthPlatform.getInstance();
      await platform.createChallenge(challengeTitle, challengeDescription);
      toast.success('Challenge created successfully!');
      setChallengeTitle('');
      setChallengeDescription('');
      await loadChallenges();
    } catch (error: any) {
      toast.error('Failed to create challenge: ' + error.message);
    }
  };

  const submitChallenge = async () => {
    try {
      const platform = GrowthPlatform.getInstance();
      await platform.submitChallenge(selectedChallenge, tweetUrl);
      toast.success('Submission successful!');
      setTweetUrl('');
      await loadSubmissions();
    } catch (error: any) {
      toast.error('Failed to submit: ' + error.message);
    }
  };

  const rateSubmission = async (targetUser: string, submissionIndex: number, score: number) => {
    try {
      const platform = GrowthPlatform.getInstance();
      await platform.rateSubmission(targetUser, submissionIndex, score);
      toast.success('Rating submitted successfully!');
      await loadSubmissions();
    } catch (error: any) {
      toast.error('Failed to rate: ' + error.message);
    }
  };

  const loadChallenges = async () => {
    try {
      // Implementation needed for loading challenge list
      // Since the contract doesn't provide a method to get all challenges,
      // we need to implement it using events or other methods
      // Temporarily using empty array
      setChallenges([]);
    } catch (error: any) {
      console.error('Failed to load challenges:', error);
    }
  };

  const loadSubmissions = async () => {
    try {
      if (!address) return;
      
      const platform = GrowthPlatform.getInstance();
      const userSubmissions = await platform.getUserSubmissions(address);
      if (userSubmissions) {
        setSubmissions(userSubmissions);
      }
    } catch (error: any) {
      console.error('Failed to load submissions:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please Connect Your Wallet</h1>
          <p className="text-gray-600 mb-4">You need to connect your wallet to use this feature</p>
          <ConnectWallet />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Growth Challenges</h1>
        <ConnectWallet />
      </div>
      
      {isAdmin && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Challenge</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Challenge Title"
              className="w-full p-2 border rounded"
              value={challengeTitle}
              onChange={(e) => setChallengeTitle(e.target.value)}
            />
            <textarea
              placeholder="Challenge Description"
              className="w-full p-2 border rounded"
              value={challengeDescription}
              onChange={(e) => setChallengeDescription(e.target.value)}
            />
            <button
              onClick={createChallenge}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Challenge
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Submit Challenge</h2>
        <div className="space-y-4">
          <select
            className="w-full p-2 border rounded"
            value={selectedChallenge}
            onChange={(e) => setSelectedChallenge(e.target.value)}
          >
            <option value="">Select Challenge</option>
            {challenges.map((challenge) => (
              <option key={challenge.id} value={challenge.id}>
                {challenge.title || challenge.id}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Tweet URL"
            className="w-full p-2 border rounded"
            value={tweetUrl}
            onChange={(e) => setTweetUrl(e.target.value)}
          />
          <button
            onClick={submitChallenge}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            disabled={!selectedChallenge || !tweetUrl}
          >
            Submit Challenge
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Submission History</h2>
        <div className="space-y-4">
          {submissions.length === 0 ? (
            <p className="text-gray-500">No submissions yet</p>
          ) : (
            submissions.map((submission, index) => (
              <div key={index} className="border p-4 rounded">
                <p>Challenge ID: {submission.challengeId}</p>
                <p>Tweet URL: <a href={submission.tweetUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{submission.tweetUrl}</a></p>
                <p>Average Score: {submission.averageScore}</p>
                <div className="mt-2">
                  <p>Rate:</p>
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      onClick={() => rateSubmission(address, submission.index, score)}
                      className="mr-2 px-3 py-1 border rounded hover:bg-gray-100"
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 