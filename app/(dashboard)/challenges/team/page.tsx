'use client'

import React, { useEffect } from 'react'
import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import { useAuth } from '../../../../contexts/AuthContext'

const teamChallenges = [
  {
    icon: 'coins',
    title: "Creative Idealists Pool",
    description: "Stake 50 FLOW to join a group of INFP creatives. Share your artistic works, stories, or innovative ideas weekly. Completed submissions unlock others' stakes, fostering authentic creative expression.",
    duration: "30 days",
    difficulty: "Medium",
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-100 to-orange-100",
    traits: ["Creative Expression", "Authentic Sharing", "Idealistic Growth"],
    participants: "5-10 people",
    stakeAmount: "50 FLOW",
    rewardMechanism: "Share Stake Pool"
  },
  {
    icon: 'gem',
    title: "Empathy NFT Evolution",
    description: "Transform your emotional intelligence into an evolving NFT. Complete empathy-building exercises and support team members' emotional growth. Your NFT levels up with each meaningful connection made.",
    duration: "60 days",
    difficulty: "Advanced",
    color: "from-blue-500 to-indigo-500",
    bgColor: "from-blue-100 to-indigo-100",
    traits: ["Emotional Depth", "Supportive Connection", "Personal Values"],
    participants: "3-8 people",
    stakeAmount: "1 NFT",
    rewardMechanism: "NFT Level Up + Tokens"
  },
  {
    icon: 'target',
    title: "Harmony Seekers DAO",
    description: "Join a DAO focused on INFP growth through collective decision-making. Vote on creative projects, mentor others, and build consensus. Earn rewards for fostering group harmony and authentic leadership.",
    duration: "45 days",
    difficulty: "Medium",
    color: "from-purple-500 to-violet-500",
    bgColor: "from-purple-100 to-violet-100",
    traits: ["Harmonious Leadership", "Value-Driven Growth", "Authentic Impact"],
    participants: "8-15 people",
    stakeAmount: "80 FLOW",
    rewardMechanism: "Governance Weight + Rewards"
  }
] as const;

const handleStartChallenge = async (challenge: {
  title: string;
  duration: string;
  difficulty: string;
  participants: string;
  stakeAmount: string;
  rewardMechanism: string;
}) => {
  try {
    const { connected, walletAddress } = useAuth()
    
    if (!connected || !walletAddress) {
      alert('Please connect your OKX wallet to start the challenge!')
      return
    }

    const message = `
Wellness Corner Team Challenge Commitment

I am starting the following challenge:

Challenge: ${challenge.title}
Duration: ${challenge.duration}
Difficulty: ${challenge.difficulty}
Participants: ${challenge.participants}
Stake Amount: ${challenge.stakeAmount}
Wallet Address: ${walletAddress}
Timestamp: ${new Date().toISOString()}

By signing this message, I commit to:
- Complete the challenge within the specified duration
- Follow the challenge guidelines honestly
- Share my progress with the community
- Support other participants in their journey

This signature represents my commitment and does not authorize any blockchain transaction.
    `.trim()
    
    // TODO: Implement message signing with OKX wallet
    // const signature = await signer.signMessage(message)
    
    console.log('Challenge commitment prepared:', message)
    alert('Challenge commitment confirmed! Your journey begins now.')
    
  } catch (error: any) {
    console.error('Challenge commitment failed:', error)
    if (error.code === 4001) {
      alert('Challenge commitment cancelled. You can start anytime when ready.')
    } else {
      alert('An error occurred while starting the challenge. Please try again.')
    }
  }
}

export default function TeamChallenges() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-6 max-w-6xl"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {teamChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
              className="bg-white/60 backdrop-blur-md rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-white/30 group hover:scale-[1.02]"
            >
              <div className="p-4 sm:p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r ${challenge.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <i data-lucide={challenge.icon} className={`w-5 sm:w-6 h-5 sm:h-6 bg-gradient-to-r ${challenge.color} bg-clip-text text-transparent`}></i>
                  </div>
                  <div className="flex gap-1.5 sm:gap-2">
                    <span className="px-2 sm:px-3 py-1 bg-purple-50/80 text-purple-600 text-xs sm:text-sm rounded-lg font-medium">
                      {challenge.duration}
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-indigo-50/80 text-indigo-600 text-xs sm:text-sm rounded-lg font-medium">
                      {challenge.difficulty}
                    </span>
                    <span className="px-2 sm:px-3 py-1 bg-blue-50/80 text-blue-600 text-xs sm:text-sm rounded-lg font-medium">
                      {challenge.participants}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg sm:text-xl font-semibold text-purple-800 mb-2 group-hover:text-purple-900 transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-sm sm:text-base text-purple-600/90 mb-3 sm:mb-4 flex-grow">
                  {challenge.description}
                </p>
                
                <div className="mb-4 sm:mb-6">
                  <div className="text-xs sm:text-sm font-medium text-purple-700 mb-2">Traits you'll develop:</div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {challenge.traits.map((trait, index) => (
                      <span
                        key={index}
                        className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r ${challenge.bgColor} text-gray-700`}
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mb-2 md:mb-3">
                  <span className="px-2 sm:px-3 py-1 bg-yellow-50/80 text-yellow-600 text-xs sm:text-sm rounded-lg font-medium">
                    Stake: {challenge.stakeAmount}
                  </span>
                  <span className="px-2 sm:px-3 py-1 bg-green-50/80 text-green-600 text-xs sm:text-sm rounded-lg font-medium">
                    {challenge.rewardMechanism}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-auto pt-3 sm:pt-4">
                  <div className="flex items-center gap-2">
                    <button 
                      className={`px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r ${challenge.color} text-white text-sm sm:text-base rounded-lg sm:rounded-xl opacity-50 cursor-not-allowed flex items-center gap-1.5 sm:gap-2 shadow-sm`}
                      disabled
                    >
                      <span>Start Challenge</span>
                      <i data-lucide="arrow-right" className="w-3.5 sm:w-4 h-3.5 sm:h-4"></i>
                    </button>
                    <span className="text-xs sm:text-sm text-purple-500 font-medium bg-purple-50 px-2 py-1 rounded-lg">
                      Coming Soon
                    </span>
                  </div>
                  <button className="p-1.5 sm:p-2 text-purple-400 hover:text-purple-600 transition-colors hover:bg-purple-50 rounded-lg">
                    <i data-lucide="bookmark" className="w-4 sm:w-5 h-4 sm:h-5"></i>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
} 