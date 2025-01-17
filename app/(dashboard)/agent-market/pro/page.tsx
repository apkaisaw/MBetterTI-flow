'use client'

import { motion } from 'framer-motion';
import { templates } from '../data';
import { TemplateCard } from '../components/TemplateCard';
import AgentMarketTabs from '../../../components/AgentMarketTabs';

export default function ProCoaches() {
  const proTemplates = templates.filter(template => template.type === 'pro');

  const handleGetStarted = () => {
    alert('This is a demo version. Payment and coach activation features will be available in the full release.');
  };

  const handlePreview = () => {
    alert('Coach preview feature will be available in the full release.');
  };

  return (
    <>
      <AgentMarketTabs />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3"
      >
        {proTemplates.map((template) => (
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