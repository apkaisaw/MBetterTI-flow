import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home,
  User,
  Brain, 
  Trophy,
  Users,
  Settings,
  LogOut, 
  Wallet,
  WalletCards,
  ClipboardList,
  Award,
  Target,
  UserPlus,
  MessageSquare,
  Store
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface NavSubItem {
  name: string;
  path: string;
  subItems?: NavSubItem[];
}

interface NavItem {
  name: string;
  path?: string;
  icon: any;
  subItems?: NavSubItem[];
}

const navItems: NavItem[] = [
  {
    name: 'Home',
    path: '/dashboard',
    icon: Home
  },
  {
    name: 'My Growth',
    icon: User,
    subItems: [
      { 
        name: 'Test Results', 
        path: '/persona-discovery',
        subItems: [
          { name: 'MBTI Type & Description', path: '/persona-discovery#type' },
          { name: 'General Traits', path: '/persona-discovery#traits' },
          { name: 'Relationship Strengths', path: '/persona-discovery#strengths' },
          { name: 'Relationship Weaknesses', path: '/persona-discovery#weaknesses' },
          { name: 'Success Definition', path: '/persona-discovery#success' },
          { name: 'Strengths', path: '/persona-discovery#personal-strengths' },
          { name: 'Gifts', path: '/persona-discovery#gifts' },
          { name: 'Potential Problem Areas', path: '/persona-discovery#problems' },
          { name: 'Explanation of Problems', path: '/persona-discovery#explanation' },
          { name: 'Solutions', path: '/persona-discovery#solutions' },
          { name: 'Living Happily Tips', path: '/persona-discovery#tips' },
          { name: 'Ten Rules to Live', path: '/persona-discovery#rules' }
        ]
      },
      { name: 'Growth Records', path: '/persona-discovery/records' },
      { name: 'Badges', path: '/persona-discovery/badges' }
    ]
  },
  {
    name: 'AI Life Coach',
    path: '/ai-life-coach',
    icon: Brain
  },
  {
    name: 'Challenges',
    path: '/personal-challenges',
    icon: Trophy
  },
  {
    name: 'Community',
    path: '/community',
    icon: Users,
    subItems: [
      { name: 'Partner Network', path: '/community/partners' },
      { name: 'Social Hub', path: '/community/social' }
    ]
  },
  {
    name: 'Agent Market',
    path: '/profile',
    icon: Store
  }
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { t } = useTranslation('common');
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>(() => 
    navItems
      .filter(item => item.subItems && item.path)
      .map(item => item.path!)
  );
  
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[];
        setAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert(t('installMetaMask'));
    }
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[];
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          console.error('Failed to check wallet connection:', error);
        }
      }
    };

    checkWalletConnection();

    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: unknown) => {
        if (Array.isArray(accounts) && accounts.length > 0) {
          setAddress(accounts[0] as string);
          setIsConnected(true);
        } else {
          setAddress('');
          setIsConnected(false);
        }
      });
    }
  }, []);

  const toggleExpand = (path: string | undefined) => {
    if (!path) return;
    setExpandedItems(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="fixed top-0 left-0 h-screen w-66 flex flex-col bg-purple-50/80 backdrop-blur-lg border-r border-purple-100">
        <div className="p-6">
          <Link href="/" className="block">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              MBetterTI
            </h1>
            <p className="text-sm text-purple-600 mt-1">
              Discover Your Potential with MBTI and AI Coaching
            </p>
          </Link>
        </div>
        
        <nav className="flex-1 mt-0 px-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = !item.subItems && pathname === item.path;
            const isExpanded = item.path ? expandedItems.includes(item.path) : false;
            const hasSubItems = item.subItems && item.subItems.length > 0;
            
            return (
              <div key={item.path} className="mb-2">
                {hasSubItems ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.path)}
                      className={`group flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' 
                          : 'text-purple-600 hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} className={isActive ? 'text-white' : 'text-purple-600 group-hover:text-purple-700'} />
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className={`text-xs transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
                    </button>

                    {isExpanded && (
                      <div className="pl-4 ml-4 border-l border-purple-100">
                        {item.subItems?.map((subItem) => {
                          const isSubActive = pathname === subItem.path;
                          const hasThirdLevel = subItem.subItems && subItem.subItems.length > 0;
                          const isSubExpanded = expandedItems.includes(subItem.path);

                          return (
                            <div key={subItem.path}>
                              {hasThirdLevel ? (
                                <>
                                  <button
                                    onClick={() => toggleExpand(subItem.path)}
                                    className={`flex items-center justify-between w-full py-1.5 px-4 text-xs rounded-lg transition-colors ${
                                      isSubActive
                                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                                        : 'text-purple-600 hover:bg-purple-50/50'
                                    }`}
                                  >
                                    <span>{subItem.name}</span>
                                    <span className={`text-[10px] transition-transform duration-200 ${isSubExpanded ? 'rotate-180' : ''}`}>▼</span>
                                  </button>

                                  {isSubExpanded && (
                                    <div className="pl-4 ml-4 border-l border-purple-100">
                                      {subItem.subItems?.map((thirdItem) => (
                                        <Link
                                          key={thirdItem.path}
                                          href={thirdItem.path}
                                          className="block py-0.5 px-4 text-[10px] text-purple-600/60 hover:text-purple-800 hover:bg-purple-50/50 rounded-lg transition-colors"
                                        >
                                          {thirdItem.name}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <Link
                                  href={subItem.path}
                                  className={`block py-2 px-4 text-sm rounded-lg transition-colors ${
                                    isSubActive
                                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                                      : 'text-purple-600 hover:bg-purple-50/50'
                                  }`}
                                >
                                  {subItem.name}
                                </Link>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className={`group flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' 
                        : 'text-purple-600 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={20} className={isActive ? 'text-white' : 'text-purple-600 group-hover:text-purple-700'} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-purple-100 bg-purple-50/80 backdrop-blur-lg">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-indigo-500 flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-purple-900">Keith</span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                  INFP
                </span>
              </div>
            </div>
            <button 
              className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
              aria-label="Settings"
            >
              <Settings size={18} className="text-purple-600" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={connectWallet}
              className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                isConnected 
                  ? 'bg-purple-50 text-purple-700' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {isConnected ? <Wallet size={16} /> : <WalletCards size={16} />}
              <span className="truncate">
                {isConnected 
                  ? `${address.slice(0, 6)}...${address.slice(-4)}`
                  : 'Connect'
                }
              </span>
            </button>
            
            <button 
              className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-purple-600 hover:bg-purple-50 transition-all"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 ml-66 min-h-screen bg-white">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
} 