"use client"

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'white'
  className?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary',
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const colorClasses = {
    primary: 'border-neutral-300 border-t-neutral-600 dark:border-neutral-600 dark:border-t-neutral-300',
    secondary: 'border-neutral-200 border-t-neutral-500 dark:border-neutral-700 dark:border-t-neutral-400',
    white: 'border-white/30 border-t-white'
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} ${colorClasses[color]} border-2 rounded-full animate-spin ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  )
}

export function LoadingDots({ className = '' }: { className?: string }) {
  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-neutral-400 dark:bg-neutral-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export function LoadingBar({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1 overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-gradient-to-r from-neutral-400 to-neutral-600 dark:from-neutral-500 dark:to-neutral-300"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

