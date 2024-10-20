'use client'

import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
    >
      {language === 'zh' ? '中文' : 'English'}
    </motion.button>
  );
}
