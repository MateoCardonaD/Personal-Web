"use client"

import HiddenComment from '@/components/HiddenComment'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'

interface ProjectItem {
  title: string
  year: number
  type: string
  image: string
  description: {
    en: string
    es: string
  }
  link: string
}

const projects: ProjectItem[] = [
  { 
    title: 'Mayukwayukwa Refugee Camp', 
    year: 2024, 
    type: 'Competition', 
    image: '/mayukwayuwa-project.png', 
    description: {
      en: 'Finalist for a sustainable center in Zambia using local materials.',
      es: 'Finalista para un centro sostenible en Zambia utilizando materiales locales.'
    },
    link: 'https://www.behance.net/gallery/163896683/MAYUKWAYUKWA-REFUGEE-CAMP-COMPETITION'
  },
  { 
    title: 'WERK 12- MVRDV', 
    year: 2024, 
    type: 'Modeling', 
    image: '/werk-project.jpg', 
    description: {
      en: 'Modeling WERK 12 in Revit, BIM Revit Certification',
      es: 'Modelado de WERK 12 en Revit, Certificación BIM Revit'
    },
    link: 'https://www.behance.net/gallery/216484195/BIM-REVIT-CERTIFICATION-WERK-12-MVRDV'
  },
  { 
    title: 'Home of Hope', 
    year: 2023, 
    type: 'Competition', 
    image: '/hope-project.png', 
    description: {
      en: 'Proposal for contest 6 of Microhome 2023. Finalist project.',
      es: 'Propuesta para el concurso 6 de Microhome 2023. Proyecto finalista.'
    },
    link: 'https://www.behance.net/gallery/215857735/HOME-OF-HOPE-COMPETITION'
  },
  { 
    title: 'Casita', 
    year: 2023, 
    type: 'Competition', 
    image: '/hospice-project.png', 
    description: {
      en: 'Hospice Competition: tradition, nature, and dignity woven into Colombian landscape.',
      es: 'Concurso de Hospicios: tradición, naturaleza y dignidad entrelazadas en el paisaje colombiano.'
    },
    link: 'https://www.behance.net/gallery/228675035/CASITA-HOSPICE-COMPETITION'
  },
  { 
    title: 'Brise-Vent Havre', 
    year: 2023, 
    type: 'Competition', 
    image: '/brise-project.png', 
    description: {
      en: 'Revitalizing Brise-Vent: museum competition merging culture, community, sustainability.',
      es: 'Revitalizando Brise-Vent: concurso de museos que fusiona cultura, comunidad y sostenibilidad.'
    },
    link: 'https://www.behance.net/gallery/215855225/BRISE-VENT-HAVRE-COMPETITION'
  },
  { 
    title: 'Limitless Deprivation', 
    year: 2023, 
    type: 'Thesis', 
    image: '/tesis_-roject.jpg', 
    description: {
      en: 'Transforming El Buen Pastor prison through open, sustainable, socially inclusive architecture.',
      es: 'Transformando la prisión El Buen Pastor a través de una arquitectura abierta, sostenible y socialmente inclusiva.'
    },
    link: 'https://www.behance.net/gallery/216622095/TESIS-PRIVACION-SIN-LIMITES'
  },
]

function IconChevron(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export default function Projects() {
  const { language } = useLanguage()
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    let isDown = false
    let startX = 0
    let scrollLeft = 0
    let momentum = 0
    let lastX = 0
    let animationId: number | null = null
    let touchStartX = 0
    let touchStartTime = 0

    const onMouseDown = (e: MouseEvent) => {
      isDown = true
      el.style.cursor = 'grabbing'
      startX = e.pageX - el.offsetLeft
      scrollLeft = el.scrollLeft
      lastX = e.pageX
      momentum = 0
      
      // Cancel any ongoing momentum animation
      if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchStartX = touch.clientX
      touchStartTime = Date.now()
      isDown = true
      startX = touch.clientX - el.offsetLeft
      scrollLeft = el.scrollLeft
      lastX = touch.clientX
      momentum = 0
      
      // Cancel any ongoing momentum animation
      if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
    }
    
    const onMouseLeave = () => {
      if (isDown) {
        onMouseUp()
      }
    }
    
    const onMouseUp = () => {
      if (isDown) {
        isDown = false
        el.style.cursor = 'grab'
        
        // Apply momentum scrolling
        if (Math.abs(momentum) > 0.5) {
          const applyMomentum = () => {
            el.scrollLeft += momentum
            momentum *= 0.92 // Slower decay for smoother momentum
            
            if (Math.abs(momentum) > 0.5) {
              animationId = requestAnimationFrame(applyMomentum)
            }
          }
          applyMomentum()
        }
      }
    }
    
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      
      const x = e.pageX - el.offsetLeft
      const walk = (x - startX) * 1.8
      el.scrollLeft = scrollLeft - walk
      
      // Calculate momentum
      momentum = e.pageX - lastX
      lastX = e.pageX
    }

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollBy({ left: e.deltaY * 0.8, behavior: 'smooth' })
        e.preventDefault()
      }
    }

    const calcActive = () => {
      const children = Array.from(el.querySelectorAll('article')) as HTMLElement[]
      if (children.length === 0) return
      const center = el.scrollLeft + el.clientWidth / 2
      let bestIdx = 0
      let bestDist = Infinity
      children.forEach((c, idx) => {
        const mid = c.offsetLeft + c.offsetWidth / 2
        const dist = Math.abs(mid - center)
        if (dist < bestDist) { bestDist = dist; bestIdx = idx }
      })
      setActive(bestIdx)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isDown || e.touches.length !== 1) return
      e.preventDefault()
      
      const touch = e.touches[0]
      const x = touch.clientX - el.offsetLeft
      const walk = (x - startX) * 2.0 // Increased multiplier for better responsiveness
      el.scrollLeft = scrollLeft - walk
      
      momentum = touch.clientX - lastX
      lastX = touch.clientX
    }
    
    const onTouchEnd = () => {
      if (isDown) {
        isDown = false
        el.style.cursor = 'grab'
        
        if (Math.abs(momentum) > 0.5) {
          const applyMomentum = () => {
            el.scrollLeft += momentum
            momentum *= 0.88
            
            if (Math.abs(momentum) > 0.5) {
              animationId = requestAnimationFrame(applyMomentum)
            }
          }
          applyMomentum()
        }
      }
    }

    // Add event listeners
    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('scroll', calcActive, { passive: true })
    window.addEventListener('resize', calcActive)
    
    // Touch events for mobile
    el.addEventListener('touchstart', onTouchStart, { passive: false })
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('touchend', onTouchEnd, { passive: true })

    // Add global mouse up listener to handle cases where mouse leaves the element
    const onGlobalMouseUp = () => {
      if (isDown) {
        onMouseUp()
      }
    }
    document.addEventListener('mouseup', onGlobalMouseUp)

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('scroll', calcActive)
      window.removeEventListener('resize', calcActive)
      document.removeEventListener('mouseup', onGlobalMouseUp)
      
      // Remove touch events
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  const scrollToIndex = (idx: number, behavior: ScrollBehavior = 'smooth') => {
    const el = scrollerRef.current
    if (!el) return
    const child = el.querySelectorAll('article')[idx] as HTMLElement | undefined
    if (!child) return
    const x = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2
    const clamped = Math.max(0, Math.min(x, el.scrollWidth - el.clientWidth))
    el.scrollTo({ left: clamped, behavior })
    setActive(idx)
  }

  return (
    <>
      <HiddenComment text="Start: Projects" />
      <section id="projects" className="w-full border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-3 sm:mb-4">
              {language === 'en' ? 'Take a look at some of my projects...' : 'Mira algunos de mis proyectos...'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto px-4 sm:px-0 mb-4">
              {language === 'en' 
                ? 'Competitions push me to explore and think differently, and I\'m always working on new ideas and projects to see them come alive.'
                : 'Los retos me inspiran a explorar y pensar distinto, y siempre estoy metido en nuevas ideas y proyectos para verlos cobrar vida.'
              }
            </p>
            
            {/* Academic Portfolio Link */}
            <div className="flex justify-center">
              <a 
                href="https://www.behance.net/mateocardonadaz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-md"
              >
                {language === 'en' ? 'View Academic Portfolio' : 'Ver Portafolio Académico'}
                <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Projects Carousel - Full width with margin freedom */}
          <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
            <div
              ref={scrollerRef}
              className="flex px-4 sm:px-6 lg:px-8 overflow-x-auto select-none cursor-grab [-ms-overflow-style:none] [scrollbar-width:none] gap-2 snap-x snap-mandatory touch-pan-x"
              style={{ 
                userSelect: 'none', 
                WebkitUserSelect: 'none',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                cursor: 'grab',
                scrollSnapType: 'x mandatory',
                touchAction: 'pan-x pinch-zoom'
              }}
            >
              {projects.map((p, i) => (
                <article
                  key={i}
                  className="shrink-0 min-w-[85%] sm:min-w-[70%] md:min-w-[55%] lg:min-w-[32%] xl:min-w-[30%] 2xl:min-w-[28%] rounded-2xl overflow-hidden relative shadow-lg hover:shadow-2xl transition-all duration-500 ease-workshop group cursor-pointer snap-start"
                  style={{ marginRight: '8px' }}
                >
                  {/* Background with Image */}
                  <div className="relative aspect-[3/4] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 transition-transform duration-500 ease-workshop group-hover:scale-[1.02] overflow-hidden">
                    {/* Project Image */}
                    <img 
                      src={p.image} 
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-workshop group-hover:scale-105"
                    />
                    
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 ease-workshop group-hover:opacity-90" />
                    
                    {/* Project Info - Top Left */}
                    <div className="absolute inset-x-0 top-0 p-3 sm:p-4 lg:p-5 text-white">
                      <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1">{p.title}</h3>
                      <p className="text-xs opacity-90">{p.type} • {p.year}</p>
                    </div>
                    

                    
                    {/* Description - Bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 lg:p-5 text-white">
                      <p className="text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 opacity-95">{p.description[language]}</p>
                      
                      {/* Action Links */}
                      <div className="flex flex-col gap-1.5 sm:gap-2 text-xs sm:text-sm">
                        <a 
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-neutral-200 font-medium transition-all duration-300 ease-workshop text-center sm:text-left group-hover:underline underline-offset-2"
                        >
                          {language === 'en' ? 'View Project' : 'Ver Proyecto'}
                        </a>
                        <a 
                          href="https://www.behance.net/mateocardonadaz"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-200 hover:text-white transition-all duration-300 ease-workshop text-center sm:text-left opacity-80 group-hover:opacity-100"
                        >
                          {language === 'en' ? 'Portfolio' : 'Portafolio'}
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="mt-4 sm:mt-6 lg:mt-8 flex items-center justify-center gap-1.5 sm:gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                aria-label={language === 'en' ? `Go to slide ${i + 1}` : `Ir a diapositiva ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ease-out ${active === i ? 'w-4 sm:w-6 lg:w-8 bg-neutral-800 dark:bg-neutral-200' : 'w-1.5 sm:w-2 bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500'}`}
              />
            ))}
          </div>
        </div>
      </section>
      <HiddenComment text="End: Projects" />
    </>
  )
}

