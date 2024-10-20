'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, Twitter, Facebook, Instagram } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const footerContent = {
  zh: {
    sections: [
      {
        title: "产品",
        items: [
          { name: "高级套件", link: "/premium" },
          { name: "团队评估", link: "/team" },
          { name: "专业测试", link: "/tests" }
        ]
      },
      {
        title: "资源",
        items: [
          { name: "性格测试", link: "/personality-test" },
          { name: "性格类型", link: "/types" },
          { name: "文章", link: "/articles" }
        ]
      },
      {
        title: "帮助",
        items: [
          { name: "联系我们", link: "/contact" },
          { name: "常见问题", link: "/faq" },
          { name: "个人资料", link: "/profile" }
        ]
      },
      {
        title: "其他创作",
        items: [
          { name: "博客", link: "#" },
          { name: "播客", link: "#" },
          { name: "社区", link: "#" }
        ]
      }
    ],
    copyright: "© 2024 理想主义花园. 保留所有权利。",
    terms: "服务条款",
    privacy: "隐私政策"
  },
  en: {
    sections: [
      {
        title: "Products",
        items: [
          { name: "Premium Suite", link: "/premium" },
          { name: "Team Assessment", link: "/team" },
          { name: "Professional Tests", link: "/tests" }
        ]
      },
      {
        title: "Resources",
        items: [
          { name: "Personality Test", link: "/personality-test" },
          { name: "Personality Types", link: "/types" },
          { name: "Articles", link: "/articles" }
        ]
      },
      {
        title: "Help",
        items: [
          { name: "Contact Us", link: "/contact" },
          { name: "FAQ", link: "/faq" },
          { name: "Profile", link: "/profile" }
        ]
      },
      {
        title: "Other Creations",
        items: [
          { name: "Blog", link: "#" },
          { name: "Podcast", link: "#" },
          { name: "Community", link: "#" }
        ]
      }
    ],
    copyright: "© 2024 Idealist Garden. All rights reserved.",
    terms: "Terms of Service",
    privacy: "Privacy Policy"
  }
}

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const content = footerContent[language];

  return (
    <footer className="bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-200 py-6 md:py-10 border-t border-purple-200">
      <div className="container mx-auto px-8 sm:px-16 md:px-24 lg:px-32">
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-purple-300">
          {content.sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-3 text-purple-800 text-sm">{section.title}</h3>
              <ul className="space-y-1 text-sm">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link href={item.link} className="text-purple-600 hover:text-purple-800">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="md:flex md:justify-between md:items-center text-sm">
          <div>
            <p className="text-purple-700 mb-1">{content.copyright}</p>
            <ul className="flex space-x-4">
              <li><Link href="/terms" className="text-purple-600 hover:text-purple-800">{content.terms}</Link></li>
              <li><Link href="/privacy" className="text-purple-600 hover:text-purple-800">{content.privacy}</Link></li>
            </ul>
          </div>
          <div className="mt-3 md:mt-0 flex space-x-4">
            <a href="#" className="text-purple-600 hover:text-purple-800" aria-label="邮件">
              <Mail size={18} />
            </a>
            <a href="#" className="text-purple-600 hover:text-purple-800" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-purple-600 hover:text-purple-800" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="#" className="text-purple-600 hover:text-purple-800" aria-label="Instagram">
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
