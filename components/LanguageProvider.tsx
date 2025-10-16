"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type LanguageCode = 'en' | 'es'

interface LanguageContextValue {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en')

  useEffect(() => {
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lang') as LanguageCode | null
      const initial = stored ?? 'en'
      setLanguageState(initial)
      document.documentElement.setAttribute('lang', initial)
    }
  }, [])

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', lang)
      document.documentElement.setAttribute('lang', lang)
    }
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'es' : 'en')
  }, [language, setLanguage])

  const value = useMemo(() => ({ language, setLanguage, toggleLanguage }), [language, setLanguage, toggleLanguage])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

