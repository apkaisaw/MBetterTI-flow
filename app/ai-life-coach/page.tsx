'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import DashboardLayout from '../components/DashboardLayout'

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

export default function SoulBecoming() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [responseIndex, setResponseIndex] = useState(0);
  const { t } = useTranslation('common');
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

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
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <section className="mb-12">
          {/* Chat Card */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 mb-12 border border-purple-100/50">
            {/* Chat Header */}
            <div className="flex items-center justify-between mb-6 border-b border-purple-100/50 pb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg ring-4 ring-white">
                  <i data-lucide="brain" className="w-6 h-6 text-white"></i>
                </div>
                <div className="ml-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-900 to-indigo-900 bg-clip-text text-transparent">
                      AI Life Coach
                    </h3>
                    <span className="px-3 py-1 bg-purple-100/50 text-purple-600 text-sm rounded-full font-medium">
                      for INFP
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse ring-2 ring-green-400/30"></span>
                    <p className="text-sm text-purple-600/80">Online</p>
                  </div>
                </div>
              </div>
              <button className="text-purple-400 hover:text-purple-600 transition-colors p-2 hover:bg-purple-50 rounded-xl">
                <i data-lucide="settings" className="w-5 h-5"></i>
              </button>
            </div>

            {/* Chat Content - 增加高度 */}
            <div className="flex flex-col h-[600px] bg-gradient-to-br from-white to-purple-50/50 rounded-2xl p-4 shadow-inner">
              {/* Messages Area */}
              <div 
                ref={messageContainerRef}
                className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent pr-4"
              >
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-purple-400 space-y-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg ring-4 ring-white">
                      <i data-lucide="message-circle" className="w-10 h-10 text-white"></i>
                    </div>
                    <p className="text-lg text-purple-600/80 font-medium">Start a conversation with your AI Life Coach</p>
                    <div className="flex flex-wrap gap-3 justify-center max-w-md">
                      {["Tell me about MBTI", "How to build better habits?", "How can I achieve success?"].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-5 py-2.5 bg-white rounded-xl text-sm text-purple-600 hover:bg-purple-100 hover:text-purple-700 transition-all duration-300 border border-purple-100/50 shadow-sm hover:shadow-md"
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
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center shadow-md ring-2 ring-white">
                            <i data-lucide="brain" className="w-4 h-4 text-white"></i>
                          </div>
                        )}
                        <div
                          className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${
                            message.isUser
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-sm'
                              : 'bg-white text-purple-900 rounded-bl-sm'
                          }`}
                        >
                          {message.content}
                        </div>
                        {message.isUser && (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center shadow-md ring-2 ring-white">
                            <i data-lucide="user" className="w-4 h-4 text-white"></i>
                          </div>
                        )}
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start group items-end gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center shadow-md ring-2 ring-white">
                          <i data-lucide="brain" className="w-4 h-4 text-white"></i>
                        </div>
                        <div className="bg-white text-purple-900 rounded-2xl rounded-bl-sm p-4 shadow-sm">
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

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="flex gap-3 pt-4 border-t border-purple-100/50">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 border border-purple-100/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent bg-white/80 placeholder-purple-300 shadow-inner"
                  placeholder="Type your message..."
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md disabled:hover:shadow-sm"
                >
                  <span>Send</span>
                  <i data-lucide="send" className="w-4 h-4"></i>
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
} 