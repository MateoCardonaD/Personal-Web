import { useEffect, useRef, useState } from 'react'

interface UseRepeatingAnimationProps {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useRepeatingAnimation({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = false
}: UseRepeatingAnimationProps = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // If triggerOnce is true, only animate once
          if (triggerOnce && hasAnimated) {
            return
          }
          
          // Small delay to ensure smooth animation trigger
          setTimeout(() => {
            setIsVisible(true)
            setHasAnimated(true)
          }, 150)
        } else {
          // Reset animation state when element is out of view
          if (!triggerOnce) {
            setIsVisible(false)
          }
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce, hasAnimated])

  return { isVisible, elementRef }
}

