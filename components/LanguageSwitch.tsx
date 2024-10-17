'use client'

import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
    >
      {language === 'zh' ? '中文' : 'English'}
    </motion.button>
  );
}
