"use client"

import HiddenComment from '@/components/HiddenComment'
import { useLanguage } from '@/components/LanguageProvider'
import { useEffect, useState } from 'react'

export default function BuyCoffee() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Delay the appearance for a subtle entrance
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <HiddenComment text="Start: Buy Me a Coffee Floating Button" />
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-800 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
          isVisible 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 translate-y-8 scale-95'
        }`}
      >
        <a
          href="https://buymeacoffee.com/mateocardona"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center rounded-full bg-yellow-400 text-neutral-900 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-500 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] hover:scale-105 hover:bg-yellow-300 transform-gpu overflow-hidden w-12 h-12 hover:w-auto hover:px-4 hover:py-3"
          title={language === 'en' ? 'Support my work with a coffee' : 'Apoya mi trabajo con un café'}
        >
          {/* Coffee emoji - always visible and centered */}
          <span className="text-lg transition-all duration-400 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] group-hover:rotate-6 flex-shrink-0">
            ☕
          </span>
          
          {/* Expanding text with smooth transitions */}
          <span className="transition-all duration-500 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] overflow-hidden whitespace-nowrap max-w-0 group-hover:max-w-32 group-hover:opacity-100 group-hover:ml-2 opacity-0 ml-0">
            <span className="text-neutral-900 font-medium">
              {language === 'en' ? 'Buy me a coffee' : 'Invítame un café'}
            </span>
          </span>
        </a>
      </div>
      <HiddenComment text="End: Buy Me a Coffee Floating Button" />
    </>
  )
}

