"use client"

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [isMobile, setIsMobile] = useState(true) // Start as mobile to prevent flash

  useEffect(() => {
    setMounted(true)
    
    // Check if device is mobile/touch device
    const checkMobile = () => {
      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return true // Default to mobile if we can't check
      }
      
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                            ('ontouchstart' in window) ||
                            (window.innerWidth <= 768) || // Also check screen width
                            ((navigator.maxTouchPoints || 0) > 0)
      return isMobileDevice
    }

    const isMobileDevice = checkMobile()
    setIsMobile(isMobileDevice)

    // Don't activate custom cursor on mobile devices
    if (isMobileDevice) {
      return // Early return, no cleanup needed
    }

    // Activate custom cursor immediately when component mounts (desktop only)
    document.body.classList.add('custom-cursor-active')
    setIsVisible(true)
    
    let timeout: NodeJS.Timeout | null = null

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
      setIsMoving(true)
      
      // Keep custom cursor active while mouse is moving
      document.body.classList.add('custom-cursor-active')
      
      // Hide cursor after mouse stops moving (increased to 5 seconds)
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        setIsVisible(false)
        setIsMoving(false)
        document.body.classList.remove('custom-cursor-active')
      }, 5000)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
      document.body.classList.add('custom-cursor-active')
    }
    
    const handleMouseLeave = (e: MouseEvent) => {
      // Only hide cursor when leaving the entire window
      if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        setIsVisible(false)
        document.body.classList.remove('custom-cursor-active')
      }
    }

    // Add hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a, button')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => setIsHovering(false)

    document.addEventListener('mousemove', updatePosition, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.removeEventListener('mousemove', updatePosition)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      if (timeout) clearTimeout(timeout)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  if (!mounted || isMobile || !isVisible) return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x - 4,
          top: position.y - 4,
          transform: `scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        <div className={`w-2 h-2 bg-neutral-800 dark:bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] shadow-sm ${
          isMoving ? 'opacity-100' : 'opacity-80'
        }`} />
      </div>

      {/* Trailing cursor ring */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          transform: `scale(${isHovering ? 1.8 : 1})`,
        }}
      >
        <div className={`w-8 h-8 border border-neutral-600 dark:border-neutral-300 rounded-full transition-all duration-700 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
          isMoving ? 'opacity-80 dark:opacity-90' : 'opacity-40 dark:opacity-60'
        }`} />
      </div>
    </>
  )
}
