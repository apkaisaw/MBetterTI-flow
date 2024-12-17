'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, Twitter, Facebook, Instagram } from 'lucide-react'

const Footer: React.FC = () => {
  const sections = [
    {
      title: 'Products',
      items: [
        { name: 'Premium Suite', link: "/premium" },
        { name: 'Team Assessment', link: "/team" },
        { name: 'Professional Tests', link: "/tests" }
      ]
    },
    {
      title: 'Resources',
      items: [
        { name: 'Personality Test', link: "/personality-test" },
        { name: 'Personality Types', link: "/types" },
        { name: 'Articles', link: "/articles" }
      ]
    },
    {
      title: 'Help',
      items: [
        { name: 'Contact Us', link: "/contact" },
        { name: 'FAQ', link: "/faq" },
        { name: 'Profile', link: "/profile" }
      ]
    },
    {
      title: 'Other Creations',
      items: [
        { name: 'Blog', link: "#" },
        { name: 'Podcast', link: "#" },
        { name: 'Community', link: "#" }
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
            <p className="text-purple-700 mb-1">© 2024 Idealist Garden. All rights reserved.</p>
            <ul className="flex space-x-4">
              <li><Link href="/terms" className="text-purple-600 hover:text-purple-800">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-purple-600 hover:text-purple-800">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="mt-3 md:mt-0 flex space-x-4">
            <a href="#" className="text-purple-600 hover:text-purple-800" aria-label="Email">
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
