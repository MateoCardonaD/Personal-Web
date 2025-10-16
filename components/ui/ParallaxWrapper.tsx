"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ParallaxWrapperProps {
  children: React.ReactNode
  speed?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  offset?: number
}

export default function ParallaxWrapper({ 
  children, 
  speed = 0.5, 
  className = '',
  direction = 'up',
  offset = 0
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const getTransform = () => {
    const baseTransform = useTransform(scrollYProgress, [0, 1], [0, speed * 100])
    
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [offset, offset - speed * 100])
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [offset, offset + speed * 100])
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [offset, offset - speed * 100])
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [offset, offset + speed * 100])
      default:
        return baseTransform
    }
  }

  const y = direction === 'up' || direction === 'down' ? getTransform() : 0
  const x = direction === 'left' || direction === 'right' ? getTransform() : 0

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y,
        x
      }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxImage({ 
  src, 
  alt, 
  speed = 0.3, 
  className = '' 
}: { 
  src: string
  alt: string
  speed?: number
  className?: string 
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={{ y }}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </motion.div>
  )
}

