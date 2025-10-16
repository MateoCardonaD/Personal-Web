"use client"

import HiddenComment from '@/components/HiddenComment'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'

const LINKS = {
  linkedin: 'https://www.linkedin.com/in/mateo-cardona-díaz/',
  instagram: 'https://www.instagram.com/mateocardona31/',
  email: 'mailto:mateocardona1031@gmail.com',
}

function ULink(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }
) {
  const { children, ...rest } = props
  return (
    <a
      {...rest}
      className="underline underline-offset-[4px] decoration-neutral-400 hover:decoration-neutral-700 dark:text-white dark:decoration-white dark:hover:decoration-neutral-300"
    >
      {children}
    </a>
  )
}

function UText({ children }: { children: React.ReactNode }) {
  return (
    <span className="underline underline-offset-[4px] decoration-neutral-400 dark:decoration-neutral-600">
      {children}
    </span>
  )
}

export default function Downloads() {
  const { language } = useLanguage()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setVisible(true)
          else if (entry.intersectionRatio === 0) setVisible(false)
        })
      },
      { threshold: [0, 0.4], rootMargin: '0px 0px -15% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const base = `transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform`

  return (
    <>
      <HiddenComment text="Start: Connect Intro" />
      <section id="connect" className="w-full">
        <div ref={rootRef} className="mx-auto max-w-4xl px-4 py-16 sm:py-20 text-center">
          <p
            className={`${base} text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            style={{ transitionDelay: visible ? '0ms' : '0ms' }}
          >
            {language === 'en' ? 'Before you continue...' : 'Antes de continuar...'}
          </p>
          <h2
            className={`${base} mt-2 text-[clamp(22px,3.4vw,34px)] font-semibold text-neutral-900 dark:text-neutral-50 leading-tight ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: visible ? '150ms' : '0ms' }}
          >
            {language === 'en' 
              ? "If you resonate with a creative energy and a drive to transform spaces and experiences, I'd love to connect with you."
              : "Si resuenas con una energía creativa y un impulso por transformar espacios y experiencias, me encantaría conectar contigo."
            }
          </h2>
          <p
            className={`${base} mt-4 text-[clamp(16px,2vw,20px)] text-neutral-700 dark:text-neutral-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: visible ? '300ms' : '0ms' }}
          >
            {language === 'en' 
              ? "You can find me on LinkedIn, Instagram — or just drop me an email."
              : "Puedes encontrarme en LinkedIn, Instagram — o simplemente envíame un correo."
            }
          </p>
          <p
            className={`${base} mt-3 text-[clamp(16px,2vw,20px)] text-neutral-700 dark:text-neutral-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: visible ? '450ms' : '0ms' }}
          >
            {language === 'en' 
              ? "Don't forget to download my CV and portfolio to learn more about my work"
              : "No olvides descargar mi CV y portafolio para conocer más sobre mi trabajo"
            }
          </p>
          <p
            className={`${base} mt-1 text-[clamp(14px,1.8vw,18px)] italic text-neutral-600 dark:text-neutral-300 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{ transitionDelay: visible ? '600ms' : '0ms' }}
          >
            {language === 'en' 
              ? "yes, you have to click the underlined words — no pressure :)"
              : "sí, tienes que hacer clic en las palabras subrayadas — sin presión :)"
            }
          </p>
          <p
            className={`${base} mt-3 text-[clamp(16px,2vw,20px)] text-neutral-700 dark:text-neutral-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            style={{ transitionDelay: visible ? '750ms' : '0ms' }}
          >
            {language === 'en' 
              ? "Keep exploring the site to discover all that I can offer."
              : "Sigue explorando el sitio para descubrir todo lo que puedo ofrecer."
            }
          </p>
          <p
            className={`${base} mt-3 text-[clamp(16px,2vw,20px)] text-neutral-700 dark:text-neutral-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            style={{ transitionDelay: visible ? '900ms' : '0ms' }}
          >
            {language === 'en' 
              ? "Looking forward to hearing from you soon!"
              : "¡Espero saber de ti pronto!"
            }
          </p>
        </div>
      </section>
      <HiddenComment text="End: Connect Intro" />
    </>
  )
}
