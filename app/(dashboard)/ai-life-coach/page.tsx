'use client'
import React, { useState, useEffect, useRef } from 'react'
import { SendHorizontal } from 'lucide-react'

// 预设的AI回复
const predefinedResponses = [
  "INFP's are creative, sensitive souls who take their lives very seriously. They seek harmony and authenticity in their relationships with others. They value creativity, spirituality, and honoring the individual self above all else. They are very tuned into inequity and unfairness against people, and get great satisfaction from conquering such injustices. An INFP is a perfectionist who will rarely allow themselves to feel successful, although they will be keenly aware of failures. INFP's also get satisfaction from being in touch with their creativity. For the INFP, personal success depends upon the condition of their closest relationships, the development of their creative abilities, and the continual support of humanity by serving people in need, fighting against injustice, or in some other way working to make the world a better place to be.",

  "Highly creative, artistic and spiritual, they can produce wonderful works of art, music and literature. INFP's are natural artists. They will find great satisfaction if they encourage and develop their artistic abilities. That doesn't mean that an INFP has to be a famous writer or painter in order to be content. Simply the act of 'creating' will be a fulfilling source of renewal and refreshment to the INFP. An INFP should allow himself or herself some artistic outlet, because it will add enrichment and positive energy to their life. They're more spiritually aware than most people, and are more in touch with their soul than others. Most INFP's have strong Faith. Those that don't may feel as if they're missing something important. An INFP should nourish their faith.",

  "May be extremely sensitive to any kind of criticism. May perceive criticism where none was intended. May have skewed or unrealistic ideas about reality. May be unable to acknowledge or hear anything that goes against their personal ideas and opinions. May blame their problems on other people, seeing themselves as victims who are treated unfairly.",

  "Feed Your Strengths! Encourage your natural artistic abilities and creativity. Nourish your spirituality. Give yourself opportunities to help the needy or underprivileged. Face Your Weaknesses! Realize and accept that some traits are strengths and some are weaknesses. Facing and dealing with your weaknesses doesn't mean that you have to change who you are; it means that you want to be the best you possible. By facing your weaknesses, you are honoring your true self, rather than attacking yourself. Express Your Feelings. Don't let unexpressed emotions build up inside of you. If you have strong feelings, sort them out and express them, don't let them build up inside you to the point where they become unmanageable!",

  "You can accept the challenges I provide to improve yourself."
];

// 定义消息类型
interface Message {
  content: string;
  isUser: boolean;
}

// 在文件顶部添加新的接口定义
interface ChatSession {
  id: string;
  date: string;
  preview: string;
}

// 添加新的接口定义
interface CoachRole {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  specialties: string[];
  gradient: string;
}

export default function SoulBecoming() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [responseIndex, setResponseIndex] = useState(0);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      date: '2024-12-20',
      preview: 'Discussion about MBTI personality'
    },
    {
      id: '2',
      date: '2024-12-19',
      preview: 'Building better habits'
    },
    {
      id: '3',
      date: '2024-12-18',
      preview: 'Career development plan'
    },
    {
      id: '4',
      date: '2024-12-15',
      preview: 'Personal growth strategies'
    },
    {
      id: '5',
      date: '2024-12-12',
      preview: 'Understanding emotional intelligence'
    }
  ]);

  // 添加角色列表状态
  const [coachRoles] = useState<CoachRole[]>([
    {
      id: 'life-coach',
      name: 'Life Coach',
      title: 'Personal Growth Expert',
      description: 'Helping you navigate life transitions and achieve personal goals with empathy and strategic guidance.',
      icon: 'compass',
      specialties: ['Goal Setting', 'Life Balance', 'Personal Development'],
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'career-coach',
      name: 'Career Coach',
      title: 'Career Development Specialist',
      description: 'Guiding you through career transitions and professional growth with practical strategies.',
      icon: 'briefcase',
      specialties: ['Career Planning', 'Interview Skills', 'Professional Growth'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'mindfulness-coach',
      name: 'Mindfulness Coach',
      title: 'Emotional Wellness Guide',
      description: 'Supporting your emotional well-being through mindfulness and stress management techniques.',
      icon: 'heart',
      specialties: ['Stress Management', 'Meditation', 'Emotional Intelligence'],
      gradient: 'from-green-500 to-teal-500'
    }
  ]);
  
  const [selectedRole, setSelectedRole] = useState<CoachRole>(coachRoles[0]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent | Event) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      content: inputMessage,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const aiMessage: Message = {
      content: predefinedResponses[responseIndex % predefinedResponses.length],
      isUser: false,
    };

    setMessages(prev => [...prev, aiMessage]);
    setResponseIndex(prev => prev + 1);
    setIsTyping(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    const fakeEvent = new Event('submit') as any;
    handleSendMessage(fakeEvent);
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="fixed inset-0 bottom-16 md:bottom-0 md:top-16 md:left-64">
      <div className="flex h-full">
        {/* 主聊天区域 */}
        <section className="flex-1 flex flex-col bg-white/90">
          {/* 角色选择器 - 居中显示 */}
          <div className="flex justify-center border-b border-purple-100/50 py-2 md:py-3 px-4 md:px-6 pt-3 md:pt-3">
            <div className="flex gap-2 overflow-x-auto max-w-full md:max-w-[600px] scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
              {coachRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`flex-shrink-0 px-3 md:px-4 py-1.5 md:py-2 rounded-xl transition-all duration-300 ${
                    selectedRole.id === role.id
                      ? `bg-gradient-to-r ${role.gradient} text-white shadow-md`
                      : 'bg-white text-purple-600 hover:bg-purple-50'
                  } border border-purple-100/50 text-sm md:text-base`}
                >
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <i data-lucide={role.icon} className="w-3.5 h-3.5 md:w-4 md:h-4"></i>
                    <span>{role.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 当前角色信息 */}
          <div className="flex items-center justify-between py-2 md:py-4 border-b border-purple-100/50 px-4 md:px-6">
            <div className="flex items-center">
              <div className={`w-10 md:w-12 h-10 md:h-12 rounded-2xl bg-gradient-to-r ${selectedRole.gradient} flex items-center justify-center shadow-lg ring-4 ring-white`}>
                <i data-lucide={selectedRole.icon} className="w-5 md:w-6 h-5 md:h-6 text-white"></i>
              </div>
              <div className="ml-3 md:ml-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-purple-900 to-indigo-900 bg-clip-text text-transparent">
                    {selectedRole.name}
                  </h3>
                  <span className="px-2 md:px-3 py-0.5 md:py-1 bg-purple-100/50 text-purple-600 text-xs md:text-sm rounded-full font-medium">
                    {selectedRole.title}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 md:gap-2 mt-1">
                  {selectedRole.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className={`px-2 py-0.5 rounded-lg text-[10px] md:text-xs font-medium bg-white text-purple-600 border border-purple-100/50`}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button className="text-purple-400 hover:text-purple-600 transition-colors p-2 hover:bg-purple-50 rounded-xl md:block hidden">
              <i data-lucide="settings" className="w-5 h-5"></i>
            </button>
          </div>

          {/* Chat Content Area */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Messages Area */}
            <div 
              ref={messageContainerRef}
              className="flex-1 overflow-y-auto"
            >
              <div className="h-full px-4 md:px-6 py-3 md:py-4 space-y-4 pb-10">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-purple-400 space-y-4 md:space-y-6">
                    <div className={`w-16 md:w-20 h-16 md:h-20 rounded-2xl bg-gradient-to-r ${selectedRole.gradient} flex items-center justify-center shadow-lg ring-4 ring-white`}>
                      <i data-lucide={selectedRole.icon} className="w-8 md:w-10 h-8 md:h-10 text-white"></i>
                    </div>
                    <p className="text-base md:text-lg text-purple-600/80 font-medium text-center px-4">Start a conversation with your {selectedRole.name}</p>
                    <div className="flex flex-wrap gap-2 md:gap-3 justify-center max-w-md px-4">
                      {["Tell me about MBTI", "How to build better habits?", "How can I achieve success?"].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-4 md:px-5 py-2 md:py-2.5 bg-white rounded-xl text-xs md:text-sm text-purple-600 hover:bg-purple-100 hover:text-purple-700 transition-all duration-300 border border-purple-100/50 shadow-sm hover:shadow-md"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} group items-end gap-2`}
                      >
                        {!message.isUser && (
                          <div className={`w-7 md:w-8 h-7 md:h-8 rounded-xl bg-gradient-to-r ${selectedRole.gradient} flex items-center justify-center shadow-md ring-2 ring-white`}>
                            <i data-lucide={selectedRole.icon} className="w-3.5 md:w-4 h-3.5 md:h-4 text-white"></i>
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] md:max-w-[70%] rounded-2xl p-3 md:p-4 shadow-sm ${
                            message.isUser
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-sm'
                              : 'bg-white text-purple-900 rounded-bl-sm'
                          } text-sm md:text-base`}
                        >
                          {message.content}
                        </div>
                        {message.isUser && (
                          <div className="w-7 md:w-8 h-7 md:h-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-md ring-2 ring-white">
                            <i data-lucide="user" className="w-3.5 md:w-4 h-3.5 md:h-4 text-white"></i>
                          </div>
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start group items-end gap-2">
                        <div className={`w-7 md:w-8 h-7 md:h-8 rounded-xl bg-gradient-to-r ${selectedRole.gradient} flex items-center justify-center shadow-md ring-2 ring-white`}>
                          <i data-lucide={selectedRole.icon} className="w-3.5 md:w-4 h-3.5 md:h-4 text-white"></i>
                        </div>
                        <div className="bg-white text-purple-900 rounded-2xl rounded-bl-sm p-3 md:p-4 shadow-sm">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-2 h-2 bg-purple-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-purple-100/50 px-4 md:px-6 py-3 md:py-4 bg-white/95 backdrop-blur-sm -mt-10 mb-0 md:mb-0 pb-8 md:pb-4">
              <form onSubmit={handleSendMessage} className="flex gap-2 md:gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 border border-purple-100/50 rounded-xl px-3 md:px-4 py-2 md:py-3 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent bg-white/80 placeholder-purple-300 shadow-inner text-sm md:text-base"
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl hover:opacity-90 transition-all flex items-center gap-1.5 md:gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md disabled:hover:shadow-sm text-sm md:text-base"
                >
                  <span className="hidden md:inline">Send</span>
                  <SendHorizontal className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* 聊天记录侧边栏 */}
        <aside className="w-80 bg-white/95 border-l border-purple-100/50 hidden md:block">
          <div className="h-full p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6 border-b border-purple-100/50 pb-4">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-900 to-indigo-900 bg-clip-text text-transparent">
                Chat History
              </h3>
              <button className="text-purple-400 hover:text-purple-600 transition-colors p-2 hover:bg-purple-50 rounded-xl">
                <i data-lucide="search" className="w-4 h-4"></i>
              </button>
            </div>
            
            <div className="space-y-3">
              {chatSessions.map((session) => (
                <button
                  key={session.id}
                  className="w-full p-4 rounded-xl bg-white hover:bg-purple-50 transition-all group border border-purple-100/50 shadow-sm hover:shadow-md"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-purple-900">
                      {session.date}
                    </span>
                    <i data-lucide="chevron-right" className="w-4 h-4 text-purple-400 group-hover:text-purple-600"></i>
                  </div>
                  <p className="text-sm text-left text-purple-600 line-clamp-2">
                    {session.preview}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
} 