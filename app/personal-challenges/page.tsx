'use client'
import React, { useEffect } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { ethers } from 'ethers'

const challenges = [
  {
    icon: 'book-heart',
    title: "Emotional Journal Challenge",
    description: "Record your emotional experiences and inner feelings for 7 consecutive days to develop self-awareness and emotional expression.",
    duration: "7 days",
    difficulty: "Easy",
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-100 to-rose-100"
  },
  {
    icon: 'pen-tool',
    title: "Creative Writing Journey",
    description: "Spend 15 minutes daily on free writing, letting your creativity and imagination flow freely.",
    duration: "5 days",
    difficulty: "Medium",
    color: "from-purple-500 to-indigo-500",
    bgColor: "from-purple-100 to-indigo-100"
  },
  {
    icon: 'heart-handshake',
    title: "Acts of Kindness",
    description: "Perform one small act of kindness each day, using your INFP empathy to warm others' hearts.",
    duration: "3 days",
    difficulty: "Easy",
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-100 to-orange-100"
  },
  {
    icon: 'lotus',
    title: "Inner Peace Practice",
    description: "Find 10 minutes daily for solitude, engaging in meditation or quiet reflection.",
    duration: "10 days",
    difficulty: "Advanced",
    color: "from-teal-500 to-emerald-500",
    bgColor: "from-teal-100 to-emerald-100"
  }
];

const handleStartChallenge = async (challenge: {
  title: string;
  duration: string;
  difficulty: string;
}) => {
  try {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask wallet to start the challenge!')
      return
    }

    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    
    const message = `
Wellness Corner Challenge Commitment

I am starting the following challenge:

Challenge: ${challenge.title}
Duration: ${challenge.duration}
Difficulty: ${challenge.difficulty}
Wallet Address: ${await signer.getAddress()}
Timestamp: ${new Date().toISOString()}

By signing this message, I commit to:
- Complete the challenge within the specified duration
- Follow the challenge guidelines honestly
- Share my progress with the community
- Support other participants in their journey

This signature represents my commitment and does not authorize any blockchain transaction.
    `.trim()
    
    const signature = await signer.signMessage(message)
    
    console.log('Challenge commitment signature successful:', signature)
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

export default function PersonalChallenges() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-purple-800 to-indigo-800 bg-clip-text text-transparent">
              Personal Growth Challenges
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <div
                key={challenge.title}
                className="group bg-white/90 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100/50 hover:scale-[1.02]"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${challenge.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <i data-lucide={challenge.icon} className={`w-6 h-6 bg-gradient-to-r ${challenge.color} bg-clip-text text-transparent`}></i>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-purple-50/80 text-purple-600 text-sm rounded-lg font-medium">
                        {challenge.duration}
                      </span>
                      <span className="px-3 py-1 bg-indigo-50/80 text-indigo-600 text-sm rounded-lg font-medium">
                        {challenge.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-purple-800 mb-2 group-hover:text-purple-900 transition-colors">
                    {challenge.title}
                  </h3>
                  <p className="text-purple-600/90 mb-6 flex-grow">
                    {challenge.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto pt-4">
                    <button 
                      className={`px-6 py-2.5 bg-gradient-to-r ${challenge.color} text-white rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-sm hover:shadow-md group-hover:scale-105`}
                      onClick={() => handleStartChallenge(challenge)}
                    >
                      <span>Start Challenge</span>
                      <i data-lucide="arrow-right" className="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                    <button className="p-2 text-purple-400 hover:text-purple-600 transition-colors hover:bg-purple-50 rounded-lg">
                      <i data-lucide="bookmark" className="w-5 h-5"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 