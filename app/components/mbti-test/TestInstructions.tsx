'use client'

import React from 'react'
import { motion } from 'framer-motion'

export const TestInstructions = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-6"
  >
    <div className="bg-white/30 backdrop-blur-md rounded-[2.5rem] p-8 shadow-lg border border-white/30">
      <div className="space-y-4 text-purple-800">
        <p className="text-base font-medium">
          This test is quick and straightforward—it should only take about 5 to 20 minutes to complete. Here are a few tips:
        </p>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 rounded-full p-1.5 mt-1">
              <span className="font-bold">1</span>
            </div>
            <div>
              <h4 className="font-semibold mb-0.5">There are no right or wrong answers</h4>
              <p className="text-purple-700 text-sm">It&apos;s not about being &quot;correct.&quot; Just go with whatever feels most natural to you.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 rounded-full p-1.5 mt-1">
              <span className="font-bold">2</span>
            </div>
            <div>
              <h4 className="font-semibold mb-0.5">Don&apos;t overthink it—keep it quick and intuitive</h4>
              <p className="text-purple-700 text-sm">Some questions might seem strangely worded or unclear. Trust your instincts and move on.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 rounded-full p-1.5 mt-1">
              <span className="font-bold">3</span>
            </div>
            <div>
              <h4 className="font-semibold mb-0.5">Be yourself—answer as you truly are</h4>
              <p className="text-purple-700 text-sm">Avoid answering based on how you think others see you or how you want to be seen. Be honest and authentic.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-2">
          <p className="text-base font-medium text-purple-900">
            Take a deep breath, trust yourself, and let&apos;s dive in!
          </p>
        </div>
      </div>
    </div>
  </motion.div>
) 