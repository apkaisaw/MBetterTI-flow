'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Users, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ChallengesTabs = () => {
  const pathname = usePathname() || '';
  
  const tabs = [
    {
      name: 'Personal',
      path: '/challenges',
      icon: UserCircle
    },
    {
      name: 'Team',
      path: '/challenges/team',
      icon: Users
    },
    {
      name: 'Rater DAO',
      path: '/rater-dao',
      icon: Trophy
    }
  ];

  const getIsActive = (tabPath: string) => {
    return pathname === tabPath;
  };

  const getPageTitle = () => {
    switch (pathname) {
      case '/challenges':
        return 'Personal Challenges';
      case '/challenges/team':
        return 'Team Challenges';
      case '/rater-dao':
        return 'Rater DAO';
      default:
        return 'Challenges';
    }
  };

  return (
    <>
      {/* Fixed Tabs */}
      <div className="fixed top-4 left-0 right-0 z-40 md:hidden flex justify-center px-4">
        <nav className="inline-flex items-center h-9 bg-white/30 backdrop-blur-xl rounded-[1.2rem] shadow-lg border border-white/40 p-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = getIsActive(tab.path);
            
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[1rem] text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/60 text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-purple-500 hover:bg-white/30'
                }`}
              >
                <Icon size={15} className={isActive ? 'text-purple-500' : 'text-gray-500'} />
                <span>{tab.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Spacer for fixed tabs */}
        <div className="h-6 md:h-0" />

        <div className="flex flex-col items-center">
          <motion.h1 
            key={pathname}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            {getPageTitle()}
          </motion.h1>
        </div>
      </div>
    </>
  );
};

export default ChallengesTabs; 