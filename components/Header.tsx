"use client"

import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import HiddenComment from './HiddenComment'
import { useLanguage } from './LanguageProvider'

const navigation = [
  { href: '#about', labelEn: 'About', labelEs: 'Sobre mí' },
  { href: '#projects', labelEn: 'Projects', labelEs: 'Proyectos' },
  { href: '#contact', labelEn: 'Contact', labelEs: 'Contacto' },
]

const moreNavigation = [
  { href: '#certifications', labelEn: 'Certifications', labelEs: 'Certificaciones' },
          { href: '#hobbies', labelEn: 'Hobbies', labelEs: 'Hobbies' },
]

export default function Header() {
  const { language } = useLanguage()
  const [openMobile, setOpenMobile] = useState(false)
  const [openMore, setOpenMore] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const greeting = language === 'en' ? "Hey! I'm Mateo" : 'Hola! Soy Mateo'

  return (
    <>
      <HiddenComment text="Start: Header" />
      <header
        className={`w-full sticky top-0 z-50 transition-all duration-300 ${
          visible ? 'bg-[#F7F4EF]/80 dark:bg-neutral-950/70 border-b border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur' : 'bg-transparent border-transparent'
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="h-14 md:h-16 flex items-center gap-2 sm:gap-3">
            {/* Left: greeting */}
            <div className="min-w-max text-neutral-700 dark:text-neutral-200 text-xs sm:text-sm md:text-base font-medium truncate">
              {greeting}
            </div>

            {/* Center: nav (desktop only) */}
            <div className="flex-1 hidden md:flex items-center justify-center">
              <nav className="rounded-full border border-neutral-200/70 dark:border-neutral-800/70 bg-[#F7F4EF]/80 dark:bg-neutral-950/70 backdrop-blur px-3 py-1 shadow-sm">
                <ul className="flex items-center gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                  {navigation.map(item => (
                    <li key={item.href}>
                      <a href={item.href} className="px-3 py-1.5 rounded-full hover:bg-neutral-100/60 dark:hover:bg-neutral-900/70">
                        {language === 'en' ? item.labelEn : item.labelEs}
                      </a>
                    </li>
                  ))}
                  <li className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenMore(v => !v)}
                      aria-expanded={openMore}
                      className="px-3 py-1.5 rounded-full hover:bg-neutral-100/60 dark:hover:bg-neutral-900/70"
                    >
                      {language === 'en' ? 'More' : 'Más'}
                    </button>
                    {openMore && (
                      <div
                        role="menu"
                        className="absolute right-0 mt-2 w-56 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-[#F7F4EF] dark:bg-neutral-950 shadow-lg p-2 grid gap-1 z-50"
                      >
                        {moreNavigation.map(item => (
                          <a
                            key={item.href}
                            href={item.href}
                            className="px-3 py-2 rounded hover:bg-neutral-100/60 dark:hover:bg-neutral-900"
                            onClick={() => setOpenMore(false)}
                          >
                            {language === 'en' ? item.labelEn : item.labelEs}
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                </ul>
              </nav>
            </div>

            {/* Right: controls and mobile toggle */}
            <div className="min-w-max ml-auto flex items-center gap-1 sm:gap-2">
              <LanguageToggle />
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setOpenMobile(v => !v)}
                className="md:hidden inline-flex items-center rounded-md px-2 sm:px-3 py-1.5 text-xs sm:text-sm hover:bg-neutral-100/60 dark:hover:bg-neutral-900"
                aria-expanded={openMobile}
                aria-controls="mobile-nav"
              >
                {language === 'en' ? 'Menu' : 'Menú'}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div id="mobile-nav" hidden={!openMobile} className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-[#F7F4EF]/80 dark:bg-neutral-950/70 backdrop-blur">
            <div className="px-2 sm:px-4 py-4 grid gap-3 text-sm">
              {moreNavigation.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-2 px-3 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-900/70 transition-colors"
                  onClick={() => setOpenMobile(false)}
                >
                  {language === 'en' ? item.labelEn : item.labelEs}
                </a>
              ))}
              {navigation.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-2 px-3 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-900/70 transition-colors"
                  onClick={() => setOpenMobile(false)}
                >
                  {language === 'en' ? item.labelEn : item.labelEs}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>
      <HiddenComment text="End: Header" />
    </>
  )
}
