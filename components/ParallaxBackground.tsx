"use client"

import { useEffect, useRef, useState } from 'react'

interface ParallaxBackgroundProps {
  imageUrl: string
  alt?: string
  speed?: number
  className?: string
  children?: React.ReactNode
}

export default function ParallaxBackground({ 
  imageUrl, 
  alt = "Background", 
  speed = 0.5, 
  className = "",
  children 
}: ParallaxBackgroundProps) {
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const rate = scrolled * -speed
        setOffset(rate)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${offset}px)`,
          willChange: 'transform'
        }}
        aria-hidden="true"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}


