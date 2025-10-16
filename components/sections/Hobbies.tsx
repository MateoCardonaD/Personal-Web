"use client"

import HiddenComment from '@/components/HiddenComment'
import { useLanguage } from '@/components/LanguageProvider'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const hobbies = [
  'Golf',
  'Squash', 
  'Chess',
  'Piano',
  'Painting',
  'Plants',
  'Cooking',
  'Eating',
  'Music',
  'Books',
  'Travel',
  'Hiking',
  'Writing',
  'Board games',
  'Cinema',
  'Gardening',
  'Web design'
]

// Spanish translations for hobbies
const hobbiesEs = [
  'Golf',
  'Squash', 
  'Ajedrez',
  'Piano',
  'Pintura',
  'Plantas',
  'Cocina',
  'Comida',
  'Música',
  'Libros',
  'Viajes',
  'Senderismo',
  'Escritura',
  'Juegos de mesa',
  'Cine',
  'Jardinería',
  'Diseño web'
]

// Tooltip data for specific hobbies
const hobbyTooltips: Record<string, { message: string; link?: string }> = {
  'Books': {
    message: 'Always up for a book suggestion 📖',
    link: 'https://www.goodreads.com/user/show/144426188-mateo-cardona-d-az'
  },
  'Chess': {
    message: 'My Elo? Emotionally low ♟️',
    link: 'https://www.chess.com/member/MateoCardona31'
  },
  'Cinema': {
    message: 'Movie recommendations welcome (and appreciated)',
    link: 'https://letterboxd.com/MateoCardona/'
  },
  'Piano': {
    message: 'Concert pianist (in my living room) 🎹'
  },
  'Web design': {
    message: 'Need a site? I swear I made this one 💻'
  },
  'Cooking': {
    message: 'Carbonara philosopher… also low-key empanada poet 🤌'
  },
  'Travel': {
    message: 'Coffee in one hand, boarding pass in the other ✈️'
  },
  'Plants': {
    message: 'Yes, I talk to them… and yes, it works 🌱'
  },
  'Golf': {
    message: 'Still chasing that perfect swing ⛳'
  },
  'Squash': {
    message: 'My knees haven\'t quit… yet'
  },
  'Painting': {
    message: 'Impressionist… of my own impressions 🎨'
  },
  'Music': {
    message: 'Spotify doesn\'t pay me, but they should 🎵',
    link: 'https://open.spotify.com/user/312ozzpkch3aycuosz2eknyf5eoe?si=a41f521654a4403c'
  },
  'Board games': {
    message: 'No friends, only sheep 🐑'
  },
  'Writing': {
    message: 'Someday I\'ll write a book… probably 📚'
  },
  'Gardening': {
    message: 'One day I\'ll open a nursery 🌱'
  },
  'Hiking': {
    message: 'Why do I do this? Oh, the view ⛰️'
  },
  'Eating': {
    message: 'Food is life—especially when shared with good company'
  }
}

// Spanish tooltips
const hobbyTooltipsEs: Record<string, { message: string; link?: string }> = {
  'Libros': {
    message: 'Siempre abierto a sugerencias de libros 📖',
    link: 'https://www.goodreads.com/user/show/144426188-mateo-cardona-d-az'
  },
  'Ajedrez': {
    message: '¿Mi Elo? Emocionalmente bajo ♟️',
    link: 'https://www.chess.com/member/MateoCardona31'
  },
  'Cine': {
    message: 'Recomendaciones de películas bienvenidas (y apreciadas)',
    link: 'https://letterboxd.com/MateoCardona/'
  },
  'Piano': {
    message: 'Pianista de concierto (en mi sala) 🎹'
  },
  'Diseño web': {
    message: '¿Necesitas un sitio? Juro que hice este 💻'
  },
  'Cocina': {
    message: 'Amo la pasta 🤌'
  },
  'Viajes': {
    message: 'Café en una mano, tarjeta de embarque en la otra ✈️'
  },
  'Plantas': {
    message: 'Sí, les hablo… y sí, funciona 🌱'
  },
  'Golf': {
    message: 'Aún persiguiendo ese swing perfecto ⛳'
  },
  'Squash': {
    message: 'Mis rodillas no se han rendido… aún'
  },
  'Pintura': {
    message: 'Impresionista… de mis propias impresiones 🎨'
  },
  'Música': {
    message: 'Spotify no me paga, pero debería 🎵',
    link: 'https://open.spotify.com/user/312ozzpkch3aycuosz2eknyf5eoe?si=a41f521654a4403c'
  },
  'Juegos de mesa': {
    message: 'Nadda de amigos, solo ovejas 🐑'
  },
  'Escritura': {
    message: 'Algún día escribiré un libro… 📚'
  },
  'Jardinería': {
    message: 'Un día abriré un vivero 🌱'
  },
  'Senderismo': {
    message: '¿Por qué hago esto? Ah, la vista ⛰️'
  },
  'Comida': {
    message: 'La comida es vida—especialmente cuando se comparte con buena compañía'
  }
}

export default function Hobbies() {
  const { language } = useLanguage()
  const tickerRef = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef(0)
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredHobby, setHoveredHobby] = useState<string | null>(null)
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  // Handle scroll to hide tooltips
  useEffect(() => {
    const handleScroll = () => {
      // Hide tooltip when scrolling
      setActiveTooltip(null)
      setHoveredHobby(null)
      setIsPaused(false)
    }

    const handleResize = () => {
      // Hide tooltip when resizing window
      setActiveTooltip(null)
      setHoveredHobby(null)
      setIsPaused(false)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Helper function to get tooltip data for a hobby
  const getTooltipData = (hobby: string) => {
    const tooltips = language === 'en' ? hobbyTooltips : hobbyTooltipsEs
    return tooltips[hobby]
  }

    // Handle tooltip hover - calculate position for portal
    const handleHobbyHover = (hobby: string, event: React.MouseEvent | React.TouchEvent) => {
      console.log('Hovering over:', hobby)
      setHoveredHobby(hobby)
      setIsPaused(true) // Pause ticker when hovering
      setActiveTooltip(hobby)
      
      // Calculate position for portal tooltip
      const element = event.currentTarget as HTMLElement
      const rect = element.getBoundingClientRect()
      setTooltipPos({
        x: rect.left + rect.width / 2, // Center horizontally
        y: rect.top - 10 // 10px above the hobby
      })
    }
    
    // Handle touch events for mobile
    const handleHobbyTouch = (hobby: string, event: React.TouchEvent) => {
      event.preventDefault()
      handleHobbyHover(hobby, event)
    }

  const handleHobbyLeave = () => {
    console.log('Leaving hobby')
    setHoveredHobby(null)
    // Small delay to prevent flickering when moving to tooltip
    setTimeout(() => {
      if (!activeTooltip) {
        setIsPaused(false)
      }
    }, 50)
  }

  // Handle tooltip hover to keep it visible
  const handleTooltipHover = () => {
    // Keep ticker paused while hovering over tooltip
  }

  const handleTooltipLeave = () => {
    setHoveredHobby(null)
    setIsPaused(false)
    setActiveTooltip(null)
  }

  // Simple and stable pause logic
  useEffect(() => {
    if (hoveredHobby || activeTooltip) {
      // Keep paused while hovering over hobby OR tooltip
      setIsPaused(true)
      console.log('Keeping ticker paused')
    } else {
      // Resume when not hovering over anything
      setIsPaused(false)
      console.log('Resuming ticker')
    }
  }, [hoveredHobby, activeTooltip])

  useEffect(() => {
    const ticker = tickerRef.current
    if (!ticker) return

    let animationId: number
    // Faster speed on mobile devices
    const scrollSpeed = window.innerWidth <= 768 ? 1.2 : 0.4

    const animate = () => {
      if (!isPaused) {
        scrollPositionRef.current += scrollSpeed
        
        // Reset position when we've scrolled the full width
        if (scrollPositionRef.current >= ticker.scrollWidth / 2) {
          scrollPositionRef.current = 0
        }
        
        ticker.scrollLeft = scrollPositionRef.current
      }
      animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isPaused])

  return (
    <>
      <HiddenComment text="Start: Hobbies" />
      
      
        <section id="hobbies" className="w-full border-t border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-center sm:text-left">Hobbies :)</h2>
          
          <div className="mt-6 relative overflow-visible pb-4">
             {/* Scrolling ticker */}
              <div 
                ref={tickerRef}
                className="flex whitespace-nowrap overflow-hidden py-4"
                style={{ scrollBehavior: 'auto' }}
              >
                 {/* Duplicate hobbies for seamless loop */}
                 {(language === 'en' ? [...hobbies, ...hobbies] : [...hobbiesEs, ...hobbiesEs]).map((hobby, i) => {
                   const tooltips = language === 'en' ? hobbyTooltips : hobbyTooltipsEs;
                   const tooltip = tooltips[hobby];
                   const hasLink = tooltip?.link;
                   
                   const baseClassName = `inline-block px-3 sm:px-3 py-2 sm:py-2 mx-1 sm:mx-1 rounded-full text-sm sm:text-sm font-medium transition-all duration-300 ease-out cursor-pointer border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 relative z-10 ${
                     hoveredHobby === hobby 
                       ? 'transform -translate-y-1 sm:-translate-y-2 scale-105 sm:scale-110' 
                       : ''
                   }`;

                   const mouseProps = {
                     onMouseEnter: (e: any) => handleHobbyHover(hobby, e),
                     onMouseLeave: handleHobbyLeave,
                     onTouchStart: (e: any) => handleHobbyTouch(hobby, e)
                   };

                   return (
                     <div key={`${hobby}-${i}`} className="relative inline-block">
                       <span 
                         className={baseClassName}
                         {...mouseProps}
                       >
                         {hobby}
                       </span>
                     </div>
                   );
                 })}
               </div>
          </div>
        </div>
        </section>
        
        {/* Portal tooltip - renders outside the component tree */}
        {typeof window !== 'undefined' && activeTooltip && createPortal(
          <div 
            className="fixed z-[50] transform transition-all duration-300 ease-out"
            style={{
              left: tooltipPos.x,
              top: tooltipPos.y,
              transform: 'translateX(-50%) translateY(-100%)'
            }}
          >
            <div className="bg-neutral-900/95 dark:bg-neutral-100/95 backdrop-blur-md border border-neutral-600/40 dark:border-neutral-400/40 rounded-lg shadow-xl shadow-neutral-900/50 dark:shadow-neutral-900/30 px-3 py-2 max-w-xs">
              <div className="text-xs text-neutral-50 dark:text-neutral-900 leading-relaxed font-medium text-center">
                {getTooltipData(activeTooltip)?.message}
              </div>
              {getTooltipData(activeTooltip)?.link && (
                <div className="mt-2 pt-2 border-t border-neutral-600/40 dark:border-neutral-400/40">
                  <a 
                    href={getTooltipData(activeTooltip)?.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-white dark:text-neutral-900 hover:text-neutral-200 dark:hover:text-neutral-700 transition-colors duration-200 bg-neutral-800/50 dark:bg-neutral-200/50 px-2 py-1 rounded hover:bg-neutral-700/50 dark:hover:bg-neutral-300/50"
                    onClick={(e) => {
                      console.log('Tooltip link clicked:', activeTooltip, getTooltipData(activeTooltip)?.link);
                    }}
                  >
                    Visit
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
        
        <HiddenComment text="End: Hobbies" />
      </>
    )
  }

