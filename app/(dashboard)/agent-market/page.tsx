'use client'

import { motion } from 'framer-motion';
import { Brain, Plus } from 'lucide-react';
import AgentMarketTabs from '../../components/AgentMarketTabs';

export default function AgentMarket() {
  return (
    <>
      <AgentMarketTabs />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3"
      >
        {/* Create New Coach Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card-base rounded-xl md:rounded-2xl p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-2 border-dashed border-purple-200 flex flex-col items-center justify-center gap-4 text-center cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
            <Plus className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Create Your AI Coach</h3>
            <p className="text-sm text-purple-600/80">
              Design a personalized AI coach that understands your unique personality and goals
            </p>
          </div>
        </motion.div>

        {/* Default AI Coach Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="card-base rounded-xl md:rounded-2xl p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 flex flex-col items-center justify-center gap-4 text-center cursor-pointer"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
            <Brain className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Default AI Life Coach</h3>
            <p className="text-sm text-purple-600/80">
              Start with our general-purpose AI coach, trained to support personal growth and development
            </p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
} 