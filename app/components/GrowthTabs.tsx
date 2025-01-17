'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, Hammer, ClipboardList } from 'lucide-react';

const GrowthTabs = () => {
  const pathname = usePathname() || '';
  
  const tabs = [
    {
      name: 'Growth Chain',
      path: '/my-growth/growth-chain',
      icon: Layers
    },
    {
      name: 'Soul Mint',
      path: '/my-growth/soul-mint',
      icon: Hammer
    },
    {
      name: 'Persona',
      path: '/my-growth/persona-discovery',
      icon: ClipboardList
    }
  ];

  return (
    <>
      <div className={`${pathname === '/my-growth/persona-discovery' ? 'h-6' : 'h-14'} md:hidden`} /> {/* Spacer */}
      <div className="fixed top-4 left-0 right-0 z-40 md:hidden flex justify-center px-4">
        <nav className="inline-flex items-center h-9 bg-white/30 backdrop-blur-xl rounded-[1.2rem] shadow-lg border border-white/40 p-0.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.path;
            
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
    </>
  );
};

export default GrowthTabs; 