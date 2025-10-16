"use client"

import HiddenComment from '@/components/HiddenComment'
import { useLanguage } from '@/components/LanguageProvider'
import { useEffect, useMemo, useRef, useState } from 'react'

export default function Hero() {
  const { language } = useLanguage()
  const [showDetails, setShowDetails] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const introRef = useRef<HTMLDivElement | null>(null)
  const detailsRef = useRef<HTMLDivElement | null>(null)
  const carouselRef = useRef<HTMLDivElement | null>(null)

  // Photo carousel data - Barcelona siempre primera, obra en posición 4, paracaidas en posición 7
  const photos = [
    {
      src: '/mateo-sagrada-familia.jpg',
      alt: language === 'en' ? 'Mateo jumping with joy in front of Sagrada Familia in Barcelona' : 'Mateo saltando de alegría frente a la Sagrada Familia en Barcelona'
    },
    {
      src: '/mateo-grado.jpeg',
      alt: language === 'en' ? 'Mateo graduation photo' : 'Foto de graduación de Mateo'
    },
    {
      src: '/mateo-gaudi.jpg',
      alt: language === 'en' ? 'Mateo at Gaudi architecture' : 'Mateo en arquitectura de Gaudi'
    },
    {
      src: '/mateo-obra.jpg',
      alt: language === 'en' ? 'Mateo at construction site' : 'Mateo en obra de construcción'
    },
    {
      src: '/mateo-viena.png',
      alt: language === 'en' ? 'Mateo in Vienna' : 'Mateo en Viena'
    },
    {
      src: '/mateo-golf.png',
      alt: language === 'en' ? 'Mateo playing golf' : 'Mateo jugando golf'
    },
    {
      src: '/mateo-lisboa.png',
      alt: language === 'en' ? 'Mateo in Lisbon' : 'Mateo en Lisboa'
    },
    {
      src: '/mateo-paracaidas.jpg',
      alt: language === 'en' ? 'Mateo skydiving adventure' : 'Mateo en paracaidismo'
    },
    {
      src: '/mateo-barcelona.jpg',
      alt: language === 'en' ? 'Mateo in Barcelona' : 'Mateo en Barcelona'
    },
    {
      src: '/mateo-paris.jpg',
      alt: language === 'en' ? 'Mateo in Paris' : 'Mateo en París'
    },
    {
      src: '/mateo-kenai.png',
      alt: language === 'en' ? 'Mateo in Kenai' : 'Mateo en Kenai'
    },
    {
      src: '/mateo-baguette.jpg',
      alt: language === 'en' ? 'Mateo with baguette' : 'Mateo con baguette'
    }
  ]

  // Smoothly trigger details on small scroll
  useEffect(() => {
    const onScroll = () => setShowDetails(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-play carousel - más lento y elegante
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % photos.length)
    }, 6000) // Cambiar cada 6 segundos (más elegante)

    return () => clearInterval(interval)
  }, [isAutoPlaying, photos.length])

  // Pause auto-play on hover
  const handleCarouselHover = () => setIsAutoPlaying(false)
  const handleCarouselLeave = () => setIsAutoPlaying(true)

  // Manual navigation
  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 6 seconds
    setTimeout(() => setIsAutoPlaying(true), 6000)
  }

  const meetWord = useMemo(() => (language === 'en' ? 'Meet' : 'Conoce a'), [language])
  const nameWord = 'Mateo'
  
  const renderDescriptionLine = (idx: number) => {
    if (language === 'en') {
      if (idx === 0) {
        return (
          <p key={idx} className={idx > 0 ? 'mt-3' : undefined}>
            That's me. I'm an{' '}
            <span className="font-medium text-neutral-800 dark:text-neutral-100">
              architect, project designer,
            </span>{' '}
            and{' '}
            <span className="font-medium text-neutral-800 dark:text-neutral-100">
              creative mind
            </span>{' '}
            obsessed with redefining living through design, innovation, and technology.
          </p>
        )
      } else if (idx === 1) {
        return (
          <p key={idx} className={idx > 0 ? 'mt-3' : undefined}>
            Always exploring how to create spaces that{' '}
            are{' '}
            <span className="font-medium text-neutral-800 dark:text-neutral-100">
              smarter, more human, and truly memorable
            </span>{' '}
            — from intimate homes to city-scale visions.
          </p>
        )
      } else if (idx === 2) {
        return (
          <p key={idx} className={idx > 0 ? 'mt-3' : undefined}>
            <span className="font-medium text-neutral-800 dark:text-neutral-100">
              Always with purpose.
            </span>
          </p>
        )
      }
    } else {
      // Spanish version with JSX formatting
      if (idx === 0) {
        return (
          <p key={idx} className={idx > 0 ? 'mt-3' : undefined}>
            Soy{' '}
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">
              arquitecto
            </span>{' '}
            y{' '}
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">
              diseñador de proyectos
            </span>
            , con la curiosidad constante de descubrir cómo el diseño, la innovación y la tecnología pueden{' '}
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">
              transformar
            </span>{' '}
            la forma en que vivimos.
          </p>
        )
      } else if (idx === 1) {
        return (
          <p key={idx} className={idx > 0 ? 'mt-3' : undefined}>
            Me encanta{' '}
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">
              imaginar
            </span>{' '}
            y{' '}
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">
              crear
            </span>{' '}
            espacios pensados para las{' '}
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">
              personas
            </span>
            : inteligentes, humanos y memorables... desde el rincón de una casa hasta proyectos a escala urbana.
          </p>
        )
      } else if (idx === 2) {
        return (
          <p key={idx} className={idx > 0 ? 'mt-3' : undefined}>
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">
              Siempre con propósito
            </span>
            .
          </p>
        )
      }
    }
  }

  // Description lines are now handled directly in renderDescriptionLine function
  const descriptionLines = [0, 1, 2] // Just indices for the function

  return (
    <>
      <HiddenComment text="Start: Hero" />
      <section id="hero" className="w-full">
        <div className="h-[100vh] flex items-center justify-center px-4">
          <div className="relative w-full max-w-6xl">
            {/* Intro layer with slow curtain split */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                ref={introRef}
                className="flex items-baseline text-neutral-700 dark:text-neutral-200 select-none will-change-transform"
                style={{
                  gap: showDetails ? '7rem' : '0.6rem',
                  transition: 'gap 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                aria-hidden={showDetails}
              >
                <span
                  className={`leading-none font-medium tracking-tight text-[clamp(36px,6.5vw,76px)] will-change-transform transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    showDetails ? '-translate-x-16 opacity-0' : 'translate-x-0 opacity-100'
                  }`}
                >
                  {meetWord}
                </span>
                <span className="w-3 sm:w-4" aria-hidden />
                <span
                  className={`leading-none font-medium tracking-tight text-[clamp(36px,6.5vw,76px)] will-change-transform transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    showDetails ? 'translate-x-16 opacity-0' : 'translate-x-0 opacity-100'
                  }`}
                >
                  {nameWord}
                </span>
              </div>
            </div>

            {/* Details layer */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                ref={detailsRef}
                className={`w-full max-w-5xl will-change-transform transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  showDetails ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
                style={{ transformOrigin: '50% 50%' }}
                aria-hidden={!showDetails}
              >
                <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 items-center justify-items-center sm:justify-items-start w-full">
                  {/* Elegant Photo Carousel - Ultra Smooth & Sophisticated */}
                  <div className="flex justify-center sm:justify-start w-full">
                    <div 
                      ref={carouselRef}
                      className="relative w-[240px] sm:w-[360px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer"
                      onMouseEnter={handleCarouselHover}
                      onMouseLeave={handleCarouselLeave}
                    >
                      {/* Main Image */}
                      <div className="relative w-full h-full">
                        {photos.map((photo, index) => (
                          <img
                            key={photo.src}
                            src={photo.src}
                            alt={photo.alt}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-workshop animate-smooth ${
                              index === currentImageIndex 
                                ? 'opacity-100 scale-100' 
                                : 'opacity-0 scale-110'
                            }`}
                            loading={index === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                            style={{
                              // Ajustar centrado específicamente para la foto de obra y Viena - más centrado
                              objectPosition: photo.src === '/mateo-obra.jpg' ? 'center 30%' : 
                                            photo.src === '/mateo-viena.png' ? 'center 30%' : 
                                            'center center'
                            }}
                          />
                        ))}
                      </div>

                      {/* Click Navigation Areas - Completely invisible, no hover effects */}
                      <button
                        onClick={() => {
                          setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length)
                          setIsAutoPlaying(false)
                          setTimeout(() => setIsAutoPlaying(true), 6000)
                        }}
                        className="absolute left-0 top-0 w-1/2 h-full bg-transparent"
                        aria-label={language === 'en' ? 'Previous photo' : 'Foto anterior'}
                      />
                      <button
                        onClick={() => {
                          setCurrentImageIndex((prev) => (prev + 1) % photos.length)
                          setIsAutoPlaying(false)
                          setTimeout(() => setIsAutoPlaying(true), 6000)
                        }}
                        className="absolute right-0 top-0 w-1/2 h-full bg-transparent"
                        aria-label={language === 'en' ? 'Next photo' : 'Siguiente foto'}
                      />

                      {/* Navigation Dots - Ultra Elegant and Sophisticated */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2.5">
                        {photos.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ease-workshop animate-smooth ${
                              index === currentImageIndex 
                                ? 'bg-white scale-125 shadow-lg' 
                                : 'bg-white/30 hover:bg-white/50 hover:scale-110'
                            }`}
                            aria-label={language === 'en' ? `Go to photo ${index + 1}` : `Ir a foto ${index + 1}`}
                          />
                        ))}
                      </div>

                      {/* Auto-play Indicator - Ultra Subtle */}
                      <div className="absolute top-4 right-4">
                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ease-out ${
                          isAutoPlaying ? 'bg-emerald-400/80 shadow-emerald-400/30' : 'bg-neutral-400/60'
                        } ${isAutoPlaying ? 'animate-pulse' : ''}`} />
                      </div>
                    </div>
                  </div>
                  <div className="text-center sm:text-left text-neutral-700 dark:text-neutral-300 text-[clamp(18px,2.2vw,28px)] leading-snug max-w-[40ch]">
                    {descriptionLines.map((idx) => renderDescriptionLine(idx))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HiddenComment text="End: Hero" />
    </>
  )
}
