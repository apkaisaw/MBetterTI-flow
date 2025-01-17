'use client'

import { motion } from 'framer-motion';
import { templates } from '../data';
import { TemplateCard } from '../components/TemplateCard';
import AgentMarketTabs from '../../../components/AgentMarketTabs';

export default function CommunityCoaches() {
  const experienceTemplates = templates.filter(template => template.type === 'experience');

  const handleGetStarted = () => {
    alert('This is a demo version. Payment and coach activation features will be available in the full release.');
  };

  const handlePreview = () => {
    alert('Coach preview feature will be available in the full release.');
  };

  return (
    <>
      <AgentMarketTabs />
      
      <div className="flex justify-center mt-4 mb-2">
        <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-lg font-medium text-sm">Coming Soon</span>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3"
      >
        {experienceTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onGetStarted={handleGetStarted}
            onPreview={handlePreview}
          />
        ))}
      </motion.div>
    </>
  );
} 