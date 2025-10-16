"use client"

import { useEffect, useRef, useState } from 'react'

interface SmoothSectionTransitionProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  threshold?: number
  rootMargin?: string
}

export default function SmoothSectionTransition({ 
  children, 
  className = "",
  staggerDelay = 100,
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px"
}: SmoothSectionTransitionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), staggerDelay)
        } else {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin, staggerDelay])

  return (
    <section 
      ref={sectionRef} 
      className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      } ${className}`}
    >
      {children}
    </section>
  )
}


