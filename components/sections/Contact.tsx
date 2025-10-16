"use client"

import { FormEvent, useState } from 'react'
import HiddenComment from '@/components/HiddenComment'
import { useLanguage } from '@/components/LanguageProvider'

export default function Contact() {
  const { language } = useLanguage()
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      to: 'mateocardona1031@gmail.com'
    }
    
    // Send to your email using a form service
    fetch('https://formspree.io/f/xayzqkqw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (response.ok) {
        setSent(true)
        // Reset form
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error('Failed to send message')
      }
    })
    .catch(error => {
      console.error('Error:', error)
      alert(language === 'en' ? 'Failed to send message. Please try again.' : 'Error al enviar mensaje. Inténtalo de nuevo.')
    })
  }

  return (
    <>
      <HiddenComment text="Start: Contact" />
      <section id="contact" className="w-full border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{language === 'en' ? 'Contact' : 'Contacto'}</h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-prose mx-auto lg:mx-0">
              {language === 'en' ? 'Tell me what\'s on your mind...' : 'Cuéntame qué tienes en mente...'}
            </p>
          </div>
          <form 
            onSubmit={onSubmit} 
            action="https://formspree.io/f/xayzqkqw"
            method="POST"
            className="grid gap-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {language === 'en' ? 'What do you want to talk about?' : '¿De qué quieres hablar?'}
              </label>
              <input 
                required 
                name="name" 
                placeholder={language === 'en' ? 'Your name' : 'Tu nombre'} 
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 focus:border-neutral-500 dark:focus:border-neutral-400 focus:outline-none transition-colors" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {language === 'en' ? 'How can I reach you?' : '¿Cómo puedo contactarte?'}
              </label>
              <input 
                required 
                type="email" 
                name="email" 
                placeholder={language === 'en' ? 'your.email@example.com' : 'tu.email@ejemplo.com'} 
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 focus:border-neutral-500 dark:focus:border-neutral-400 focus:outline-none transition-colors" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {language === 'en' ? 'Drop your message here...' : 'Deja tu mensaje aquí...'}
              </label>
              <textarea 
                required 
                name="message" 
                rows={4} 
                placeholder={language === 'en' ? 'Ideas, questions, or just say hi!' : '¡Ideas, preguntas, o simplemente di hola!'} 
                className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 focus:border-neutral-500 dark:focus:border-neutral-400 focus:outline-none transition-colors resize-none" 
              />
            </div>
            
            <button 
              type="submit" 
              className="mt-2 inline-flex items-center justify-center rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-6 py-3 text-sm font-medium w-full sm:w-fit hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors duration-200"
            >
              {language === 'en' ? 'Send Message' : 'Enviar Mensaje'}
            </button>
            
            {sent && (
              <p className="text-sm text-green-600 dark:text-green-400 text-center lg:text-left">
                {language === 'en' ? 'Message sent! I\'ll get back to you soon.' : '¡Mensaje enviado! Te responderé pronto.'}
              </p>
            )}
          </form>
        </div>
      </section>
      <HiddenComment text="End: Contact" />
    </>
  )
}

