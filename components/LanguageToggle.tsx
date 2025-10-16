"use client"

import { useLanguage } from './LanguageProvider'

export default function LanguageToggle() {
  const { language, setLanguage, toggleLanguage } = useLanguage()

  return (
    <div className="inline-flex items-center gap-1 text-sm">
      <button
        type="button"
        aria-pressed={language === 'en'}
        onClick={() => setLanguage('en')}
        className={`px-1 py-0.5 rounded ${language === 'en' ? 'font-medium' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
      >
        EN
      </button>
      <span className="text-neutral-400">/</span>
      <button
        type="button"
        aria-pressed={language === 'es'}
        onClick={() => setLanguage('es')}
        className={`px-1 py-0.5 rounded ${language === 'es' ? 'font-medium' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
      >
        ES
      </button>
    </div>
  )
}
