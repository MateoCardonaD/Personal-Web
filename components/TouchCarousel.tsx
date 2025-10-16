"use client"

import { useRef, useState, useEffect, useCallback } from 'react'

interface TouchCarouselProps {
  children: React.ReactNode[]
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  showArrows?: boolean
}

export default function TouchCarousel({
  children,
  className = "",
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true
}: TouchCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [momentum, setMomentum] = useState(0)
  
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout>()

  const goToSlide = useCallback((index: number) => {
    if (!carouselRef.current) return
    
    const container = carouselRef.current
    const slideWidth = container.scrollWidth / children.length
    const targetScroll = index * slideWidth
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
    
    setCurrentIndex(index)
  }, [children.length])

  const nextSlide = useCallback(() => {
    const next = (currentIndex + 1) % children.length
    goToSlide(next)
  }, [currentIndex, children.length, goToSlide])

  const prevSlide = useCallback(() => {
    const prev = (currentIndex - 1 + children.length) % children.length
    goToSlide(prev)
  }, [currentIndex, children.length, goToSlide])

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
    setMomentum(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    
    e.preventDefault()
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    const newScrollLeft = scrollLeft - walk
    
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = newScrollLeft
    }
    
    // Calculate momentum
    const deltaX = e.touches[0].pageX - startX
    setMomentum(deltaX)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    
    // Apply momentum
    if (Math.abs(momentum) > 50) {
      if (momentum > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    } else {
      // Snap to nearest slide
      if (carouselRef.current) {
        const container = carouselRef.current
        const slideWidth = container.scrollWidth / children.length
        const currentScroll = container.scrollLeft
        const targetIndex = Math.round(currentScroll / slideWidth)
        goToSlide(targetIndex)
      }
    }
  }

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    e.preventDefault()
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    const newScrollLeft = scrollLeft - walk
    
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = newScrollLeft
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    
    // Snap to nearest slide
    if (carouselRef.current) {
      const container = carouselRef.current
      const slideWidth = container.scrollWidth / children.length
      const currentScroll = container.scrollLeft
      const targetIndex = Math.round(currentScroll / slideWidth)
      goToSlide(targetIndex)
    }
  }

  // Auto-play
  useEffect(() => {
    if (autoPlay && !isDragging) {
      autoPlayRef.current = setInterval(nextSlide, autoPlayInterval)
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [autoPlay, autoPlayInterval, nextSlide, isDragging])

  // Pause auto-play on hover/touch
  const pauseAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }

  const resumeAutoPlay = () => {
    if (autoPlay && !isDragging) {
      autoPlayRef.current = setInterval(nextSlide, autoPlayInterval)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseEnter={pauseAutoPlay}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full snap-center"
            style={{ minWidth: '100%' }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      {showDots && (
        <div className="flex justify-center mt-4 space-x-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-600 w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}

