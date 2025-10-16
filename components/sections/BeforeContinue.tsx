"use client"

import HiddenComment from '@/components/HiddenComment'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'

export default function BeforeContinue() {
  const { language } = useLanguage()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        } else {
          setVisible(false)
        }
      },
      { threshold: 0.1 }
    )

    if (rootRef.current) {
      observer.observe(rootRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const base = 'transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]'

  return (
    <>
      <HiddenComment text="Start: BeforeContinue" />
      <section id="before-continue" className="w-full">
        <div ref={rootRef} className="mx-auto max-w-4xl px-4 py-16 sm:py-20 text-center">
          <p
            className={`${base} text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: visible ? '0ms' : '0ms' }}
          >
            {language === 'en' ? 'Before you continue...' : 'Antes de continuar...'}
          </p>
          <h2
            className={`${base} mt-2 text-[clamp(22px,3.4vw,34px)] font-semibold text-neutral-900 dark:text-neutral-50 leading-tight ${
              visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
            }`}
            style={{ transitionDelay: visible ? '200ms' : '0ms' }}
          >
            {language === 'en' 
              ? "If you resonate with a creative energy and a drive to transform spaces and experiences, I'd love to connect with you."
              : "Si resuenas con una energía creativa y un impulso por transformar espacios y experiencias, me encantaría conectar contigo."
            }
          </h2>
          <p
            className={`${base} mt-4 text-[clamp(16px,2vw,20px)] text-neutral-700 dark:text-neutral-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: visible ? '400ms' : '0ms' }}
          >
            {language === 'en'
              ? "You can find me on "
              : "Puedes encontrarme en "
            }
            <a 
                              href="https://www.linkedin.com/in/mateo-cardona-díaz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-300 ease-out"
            >
              LinkedIn
            </a>
            {language === 'en' ? ", " : ", "}
            <a 
              href="https://www.instagram.com/mateocardona31/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-300 ease-out"
            >
              Instagram
            </a>
            {language === 'en' ? " — or just drop me an " : " — o simplemente enviarme un "}
            <a 
              href="mailto:mateocardona1031@gmail.com"
              className="underline hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-300 ease-out"
            >
              email
            </a>
            .
          </p>
          <p
            className={`${base} mt-3 text-[clamp(16px,2vw,20px)] text-neutral-700 dark:text-neutral-200 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: visible ? '600ms' : '0ms' }}
          >
            {language === 'en'
              ? "Don't forget to download my "
              : "No olvides descargar mi "
            }
            <a 
              href={language === 'en' ? '/CV Mateo Cardona_EN.pdf' : '/CV Mateo Cardona_ES.pdf'}
              download
              className="underline hover:text-neutral-900 dark:text-white dark:hover:text-neutral-100 transition-colors duration-300 ease-out"
            >
              CV
            </a>
            {language === 'en'
              ? " and "
              : " y "
            }
            <a 
              href={language === 'en' ? '/Portfolio Mateo_Cardona_EN.pdf' : '/Portfolio Mateo_Cardona_ES.pdf'}
              download
              className="underline hover:text-neutral-900 dark:text-white dark:hover:text-neutral-100 transition-colors duration-300 ease-out"
            >
              {language === 'en' ? 'portfolio' : 'portafolio'}
            </a>
            {language === 'en'
              ? " to learn more about my work."
              : " para conocer más sobre mi trabajo."
            }
          </p>
        </div>
      </section>
      <HiddenComment text="End: BeforeContinue" />
    </>
  )
}
