'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, Twitter, Facebook, Instagram } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useTranslation } from 'react-i18next'

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const { t } = useTranslation('common');

  const sections = [
    {
      title: t('footer.products'),
      items: [
        { name: t('footerPremiumSuite'), link: "/premium" },
        { name: t('footerTeamAssessment'), link: "/team" },
        { name: t('footerProfessionalTests'), link: "/tests" }
      ]
    },
    {
      title: t('footerResources'),
      items: [
        { name: t('footerPersonalityTest'), link: "/personality-test" },
        { name: t('footerPersonalityTypes'), link: "/types" },
        { name: t('footerArticles'), link: "/articles" }
      ]
    },
    {
      title: t('footerHelp'),
      items: [
        { name: t('footerContactUs'), link: "/contact" },
        { name: t('footerFAQ'), link: "/faq" },
        { name: t('footerProfile'), link: "/profile" }
      ]
    },
    {
      title: t('footerOtherCreations'),
      items: [
        { name: t('footerBlog'), link: "#" },
        { name: t('footerPodcast'), link: "#" },
        { name: t('footerCommunity'), link: "#" }
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-purple-100 via-indigo-100 to-purple-200 py-6 md:py-10 border-t border-purple-200">
      <div className="container mx-auto px-8 sm:px-16 md:px-24 lg:px-32">
        <nav className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-purple-300">
          {sections.map((section, index) => (
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
            <p className="text-purple-700 mb-1">{t('footerCopyright')}</p>
            <ul className="flex space-x-4">
              <li><Link href="/terms" className="text-purple-600 hover:text-purple-800">{t('footerTerms')}</Link></li>
              <li><Link href="/privacy" className="text-purple-600 hover:text-purple-800">{t('footerPrivacy')}</Link></li>
            </ul>
          </div>
          <div className="mt-3 md:mt-0 flex space-x-4">
            <a href="#" className="text-purple-600 hover:text-purple-800" aria-label={t('footerEmail')}>
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
