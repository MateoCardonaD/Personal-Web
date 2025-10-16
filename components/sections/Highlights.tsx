"use client"

import HiddenComment from '@/components/HiddenComment'
import { useLanguage } from '@/components/LanguageProvider'
import { useEffect, useRef, useState } from 'react'

interface HighlightItem {
  title: string
  body: string
}

const items: HighlightItem[] = [
  { title: 'Value', body: 'Purpose-driven design with precision, creativity, and a bias for action.' },
  { title: 'Insights', body: 'I bridge the worlds of architecture, marketing, and technology — making ideas tangible, impactful, and scalable.' },
  { title: 'Growth', body: 'From concept to execution, I build systems and teams that can deliver and grow at speed.' },
  { title: 'Fun', body: 'Golf on weekends, cooking new recipes, playing piano late at night — and yes, getting my boots dirty on-site.' },
  { title: 'Collaboration', body: 'Thrives in high-energy, multidisciplinary teams — where ideas collide and solutions spark.' },
  { title: 'Mindset', body: 'Always curious, always learning. From AI tools to construction details, I\'m wired to explore and improve.' },
  { title: 'Recharge', body: 'Fueling ideas with good books and strong coffee — moments of calm that spark creativity and focus.' },
  { title: 'Resilience', body: 'Embracing challenges head-on — adapting, learning, and pushing forward no matter what.' },
  { title: 'Connection', body: 'Building genuine relationships — whether with clients, teammates, or in the quiet moments that inspire great work.' },
]

// Spanish translations
const itemsEs: HighlightItem[] = [
  { title: 'Valor', body: 'Diseño con propósito, impulsado por la creatividad, la precisión y las ganas de hacer que las cosas pasen.' },
  { title: 'Perspectivas', body: 'Conecto los mundos de la arquitectura y la tecnología — transformando ideas en algo tangible, impactante y escalable.' },
  { title: 'Crecimiento', body: 'Desde el concepto hasta la ejecución, construyo sistemas y equipos que entregan resultados y crecen rápidamente.' },
  { title: 'Diversión', body: 'Golf los fines de semana, probar nuevas recetas en la cocina, tocar piano a medianoche… y sí, también ensuciarme las botas en obra.' },
  { title: 'Colaboración', body: 'Me desarrollo mejor en equipos multidisciplinarios con mucha energía — donde las ideas se combinan y las soluciones brillan.' },
  { title: 'Mentalidad', body: 'Desde herramientas de IA hasta detalles de construcción, tengo la mentalidad de explorar y mejorar constantemente.' },
  { title: 'Recarga', body: 'Mis ideas crecen entre buenos libros y un buen café — instantes de calma que encienden mi creatividad y enfoque.' },
  { title: 'Resiliencia', body: 'Enfrento los desafíos de frente — adaptándome, aprendiendo y avanzando sin importar las circunstancias.' },
  { title: 'Conexión', body: 'Construyo relaciones genuinas — ya sea con clientes, compañeros de equipo, o en los momentos tranquilos que inspiran un gran trabajo.' },
]

function IconChevron(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...props}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function easeOutQuint(t: number) {
  return 1 - Math.pow(1 - t, 5)
}

function smoothScrollTo(element: HTMLElement, to: number, duration = 1100) {
  const start = element.scrollLeft
  const change = to - start
  const startTime = performance.now()

  function animate(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(1, elapsed / duration)
    const eased = easeOutQuint(progress)
    element.scrollLeft = start + change * eased
    if (progress < 1) requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}

export default function Highlights() {
  const { language } = useLanguage()
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const triggerY = window.innerHeight * 0.85
      const inView = rect.top < triggerY && rect.bottom > 0
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

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const calcActive = () => {
      const children = Array.from(scroller.querySelectorAll('article')) as HTMLElement[]
      if (children.length === 0) return
      const center = scroller.scrollLeft + scroller.clientWidth / 2
      let bestIdx = 0
      let bestDist = Infinity
      children.forEach((el, idx) => {
        const mid = el.offsetLeft + el.offsetWidth / 2
        const dist = Math.abs(mid - center)
        if (dist < bestDist) {
          bestDist = dist
          bestIdx = idx
        }
      })
      setActive(bestIdx)
    }
    calcActive()
    scroller.addEventListener('scroll', calcActive, { passive: true })
    window.addEventListener('resize', calcActive)
    return () => {
      scroller.removeEventListener('scroll', calcActive)
      window.removeEventListener('resize', calcActive)
    }
  }, [])

  const scrollToIndex = (idx: number) => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const children = Array.from(scroller.querySelectorAll('article')) as HTMLElement[]
    if (idx >= children.length) return
    const target = children[idx]
    const targetLeft = target.offsetLeft - (scroller.clientWidth - target.offsetWidth) / 2
    smoothScrollTo(scroller, targetLeft)
  }

  useEffect(() => {
    if (paused || prefersReduced) return
    const id = window.setInterval(() => {
      const next = (active + 1) % (language === 'en' ? items.length : itemsEs.length)
      scrollToIndex(next)
    }, 6000)
    return () => window.clearInterval(id)
  }, [active, paused, prefersReduced])

  const onPrev = () => {
    const idx = (active - 1 + (language === 'en' ? items.length : itemsEs.length)) % (language === 'en' ? items.length : itemsEs.length)
    scrollToIndex(idx)
  }
  const onNext = () => {
    const idx = (active + 1) % (language === 'en' ? items.length : itemsEs.length)
    scrollToIndex(idx)
  }

  return (
    <>
      <HiddenComment text="Start: Highlights" />
      <section id="highlights" className="w-full">
        <div ref={wrapRef} className="mx-auto max-w-6xl px-4 py-14 sm:py-18">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-neutral-700 dark:text-neutral-200 text-[clamp(18px,3vw,28px)] font-semibold">
              {language === 'en' ? "Here's what you can expect from me..." : "¿Qué puedes esperar de mí?"}
            </h2>
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                aria-label={language === 'en' ? 'Previous' : 'Anterior'}
                onClick={onPrev}
                className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
              >
                <IconChevron className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                aria-label={language === 'en' ? 'Next' : 'Siguiente'}
                onClick={onNext}
                className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
              >
                <IconChevron className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative mt-5">
            <div
              ref={scrollerRef}
              id="highlights-scroller"
              className={`flex gap-8 px-6 sm:px-12 overflow-x-auto snap-x snap-mandatory scroll-px-12 [-ms-overflow-style:none] [scrollbar-width:none] ${
                visible ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-700`}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setPaused(false)}
            >
              <style jsx>{`
                #highlights-scroller::-webkit-scrollbar { display: none; }
              `}</style>
              {(language === 'en' ? items : itemsEs).map((item, i) => (
                <article
                  key={item.title}
                  aria-current={active === i}
                  className={`snap-center snap-always shrink-0 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 bg-[#F7F4EF] dark:bg-neutral-950 p-7 sm:p-9 shadow-sm min-w-full md:min-w-[94%] lg:min-w-[90%] transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] scroll-ml-12 scroll-mr-12 ${
                    active === i ? 'opacity-100 translate-y-0' : 'opacity-80 translate-y-1'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {item.title}
                  </div>
                  <h3 className="mt-3 text-neutral-900 dark:text-neutral-50 font-semibold text-[clamp(18px,2.2vw,28px)] leading-relaxed max-w-[38ch] sm:max-w-[50ch] md:max-w-[62ch] break-words">
                    {item.body}
                  </h3>
                </article>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {(language === 'en' ? items : itemsEs).map((_, i) => (
                <button
                  key={i}
                  aria-label={language === 'en' ? `Go to slide ${i + 1}` : `Ir a diapositiva ${i + 1}`}
                  onClick={() => scrollToIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${active === i ? 'w-6 bg-neutral-800 dark:bg-neutral-200' : 'w-2.5 bg-neutral-400/70 dark:bg-neutral-700'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <HiddenComment text="End: Highlights" />
    </>
  )
}

