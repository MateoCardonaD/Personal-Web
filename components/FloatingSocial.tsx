"use client"

import { useLanguage } from './LanguageProvider'
import { useEffect, useRef, useState } from 'react'

function IconPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export default function FloatingSocial() {
  const { language } = useLanguage()
  const t = {
    more: language === 'en' ? 'Contacts' : 'Contactos',
    email: language === 'en' ? 'Email' : 'Correo',
    linkedin: 'LinkedIn',
    behance: 'Behance',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
  }

  const items = [
    { href: 'mailto:mateocardona1031@gmail.com', label: t.email },
          { href: 'https://www.linkedin.com/in/mateo-cardona-díaz/', label: t.linkedin },
    { href: 'https://www.behance.net/mateocardonadaz', label: t.behance },
    { href: 'https://www.instagram.com/mateocardona31/', label: t.instagram },
    { href: 'https://wa.me/message/XIXY4NUSRHMEC1', label: t.whatsapp },
  ]

  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  // Close on outside click or Escape
  useEffect(() => {
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (!wrapperRef.current) return
      const target = e.target as Node
      if (!wrapperRef.current.contains(target)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const handleLinkClick = () => setOpen(false)

  const animBase = 'transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform'

  return (
    <div className="fixed bottom-4 right-4 z-50" ref={wrapperRef}>
      <div className="relative flex flex-col items-end gap-6">
        {/* Items stack with only labels */}
        <div className="flex flex-col items-end gap-6" aria-hidden={!open}>
          {items.map(({ href, label }, idx) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              onClick={(e) => {
                setOpen(false)
                // Force open in WhatsApp app on mobile for WhatsApp links
                if (href.includes('wa.me') && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                  e.preventDefault()
                  window.location.href = 'whatsapp://send?text=¡Hola Mateo!👋🏼, Vi tu página y me gustaría conversar sobre un proyecto…'
                }
              }}
              className={`group ${animBase} ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'}`}
              style={{ transitionDelay: open ? `${idx * 100}ms` : '0ms' }}
              aria-label={label}
              title={label}
            >
              <span className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 bg-white/90 dark:bg-neutral-950/90 border border-neutral-200 dark:border-neutral-800 backdrop-blur rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 shadow-sm hover:bg-white dark:hover:bg-neutral-900">{label}</span>
            </a>
          ))}
        </div>

        {/* Trigger with rotation */}
        <button
          type="button"
          aria-label={t.more}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className={`inline-flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur text-neutral-700 dark:text-neutral-300 shadow-md transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
        >
          <IconPlus className="h-7 w-7" />
        </button>
      </div>
    </div>
  )
}
