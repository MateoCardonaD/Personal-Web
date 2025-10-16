"use client"

import { useRef, useState, useEffect } from 'react'

interface HoverEffectsProps {
  children: React.ReactNode
  className?: string
  magnetic?: boolean
  tilt?: boolean
  scale?: boolean
  glow?: boolean
}

export default function HoverEffects({ 
  children, 
  className = "",
  magnetic = false,
  tilt = false,
  scale = true,
  glow = false
}: HoverEffectsProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    if (magnetic) {
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const deltaX = (x - centerX) * 0.1
      const deltaY = (y - centerY) * 0.1
      setPosition({ x: deltaX, y: deltaY })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-300 ease-out ${
        scale ? 'hover:scale-105' : ''
      } ${glow ? 'hover:shadow-2xl hover:shadow-blue-500/20' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) ${
          tilt && isHovered ? 'rotateX(5deg) rotateY(5deg)' : ''
        }`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  )
}

// Specialized hover effect components
export function MagneticButton({ children, className = "", ...props }: any) {
  return (
    <HoverEffects 
      magnetic={true} 
      scale={true} 
      glow={true}
      className={`cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </HoverEffects>
  )
}

export function TiltCard({ children, className = "", ...props }: any) {
  return (
    <HoverEffects 
      tilt={true} 
      scale={true} 
      glow={true}
      className={`${className}`}
      {...props}
    >
      {children}
    </HoverEffects>
  )
}


