"use client"

import HiddenComment from '@/components/HiddenComment'
import { useLanguage } from '@/components/LanguageProvider'
import { useEffect, useRef, useState } from 'react'

export default function Tagline() {
  const { language } = useLanguage()
  const lines = language === 'en'
    ? ['Imagine.', 'Design.', 'Build.', 'Scale.', 'Impact.']
    : ['Imaginar.', 'Diseñar.', 'Construir.', 'Escalar.', 'Impactar.']

  const rootRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const el = rootRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const enterY = window.innerHeight * 0.75
      const inView = rect.top < enterY && rect.bottom > 0
      setVisible(inView)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <HiddenComment text="Start: Tagline" />
      <section id="tagline" className="w-full">
        <div ref={rootRef} className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <h2 className="tracking-tight text-neutral-800 dark:text-neutral-100 font-bold leading-[1.02] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center sm:text-left">
            {lines.map((l, i) => (
              <span
                key={i}
                className={`block ${i > 0 ? 'mt-1 sm:mt-2' : ''} transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: visible ? `${i * 240}ms` : '0ms' }}
              >
                {l}
              </span>
            ))}
          </h2>
        </div>
      </section>
      <HiddenComment text="End: Tagline" />
    </>
  )
}
