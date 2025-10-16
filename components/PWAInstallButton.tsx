"use client"

import { usePWA } from '@/hooks/usePWA'
import { useState } from 'react'

export default function PWAInstallButton() {
  const { canInstall, installApp } = usePWA()
  const [isInstalling, setIsInstalling] = useState(false)

  const handleInstall = async () => {
    if (!canInstall) return
    
    setIsInstalling(true)
    try {
      await installApp()
    } catch (error) {
      console.error('Installation failed:', error)
    } finally {
      setIsInstalling(false)
    }
  }

  if (!canInstall) return null

  return (
    <button
      onClick={handleInstall}
      disabled={isInstalling}
      className="fixed bottom-16 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Instalar aplicación"
    >
      {isInstalling ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Instalando...</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span>Instalar App</span>
        </div>
      )}
    </button>
  )
}


