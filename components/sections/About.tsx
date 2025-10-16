"use client"

import HiddenComment from '@/components/HiddenComment'
import { useLanguage } from '@/components/LanguageProvider'
import { useEffect, useRef, useState } from 'react'

export default function About() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Always trigger animation when entering viewport
          setIsVisible(false) // Reset first
          setTimeout(() => {
            setIsVisible(true) // Then trigger animation
            setHasAnimated(true)
          }, 150)
        } else {
          // Reset when leaving viewport to allow re-triggering
          setIsVisible(false)
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3],
        rootMargin: '0px 0px -100px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <HiddenComment text="Start: About" />
      <section 
        ref={sectionRef}
        id="about" 
        className="w-full border-t border-neutral-200 dark:border-neutral-800"
      >
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-12 sm:grid-cols-[280px,1fr] items-center">
            {/* Image Container - Elegant fade animation */}
            <div className="flex justify-center sm:justify-start">
              <div 
                className={`relative rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 aspect-square w-64 h-64 shadow-lg transition-all duration-700 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}
              >
                {/* Actual profile image with elegant fade */}
                <img
                  src="/mateo-about.jpg"
                  alt={language === 'en' ? 'Mateo about photo' : 'Foto de Mateo'}
                  className="w-full h-full object-cover rounded-2xl transition-transform duration-300 ease-out hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={256}
                  height={256}
                />
              </div>
            </div>

            {/* Content Container */}
            <div className="space-y-6">
              <h2 
                className={`text-2xl font-semibold tracking-tight text-neutral-700 dark:text-neutral-200 transition-all duration-700 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
              >
                {language === 'en' ? 'About' : 'Sobre mí'}
              </h2>
              
              <div className="space-y-5 text-neutral-600 dark:text-neutral-300 max-w-prose">
                <p 
                  className={`text-lg leading-relaxed transition-all duration-700 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: isVisible ? '300ms' : '0ms' }}
                >
                  {language === 'en' ? (
                    <>I'm an <span className="font-semibold">architect</span> and <span className="font-semibold">project designer</span> who believes spaces should feel as good as they look. I've worked on everything from cozy homes to large-scale institutional projects, mixing design, technology, and a hands-on approach to make ideas real.</>
                  ) : (
                    <>Soy <span className="font-semibold">arquitecto</span> y <span className="font-semibold">diseñador de proyectos</span>, y creo que los espacios deben sentirse tan bien como se ven. A lo largo de mi experiencia he trabajado en todo tipo de proyectos, desde hogares acogedores hasta instituciones a gran escala, combinando diseño, tecnología y un enfoque práctico para hacer realidad las ideas.</>
                  )}
                </p>
                
                <p 
                  className={`text-lg leading-relaxed transition-all duration-700 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: isVisible ? '600ms' : '0ms' }}
                >
                  {language === 'en' ? (
                    <>When I'm not deep in plans and sketches, you'll probably find me hiking, painting, trying to improve my golf swing, cooking, dancing, or getting lost in the tiny details most people overlook.</>
                  ) : (
                    <>Cuando no estoy entre planos y bocetos, seguramente estoy caminando, pintando, jugando golf, bailando o perdiéndome en esos pequeños detalles que casi nadie nota.</>
                  )}
                </p>
                
                <p 
                  className={`text-lg leading-relaxed transition-all duration-700 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: isVisible ? '800ms' : '0ms' }}
                >
                  {language === 'en' ? (
                    <>For me, design is more than walls and roofs — it's the feeling you get when a place just <em>clicks</em>. It's about <span className="font-semibold">experiences, stories, and moments</span> that make life richer.</>
                  ) : (
                    <>Para mí, el diseño es más que paredes y techos — es la sensación que tienes cuando un lugar simplemente encaja. Se trata de <span className="font-semibold">experiencias, historias y momentos</span> que hacen la vida más interesante.</>
                  )}
                </p>
                
                <p 
                  className={`text-lg leading-relaxed transition-all duration-700 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-0'
                  }`}
                  style={{ transitionDelay: isVisible ? '1000ms' : '0ms' }}
                >
                  {language === 'en'
                    ? "Almost forgot — I'm also the founder of "
                    : "Soy también fundador de "}
                  <a 
                    href="https://rampmarketing.com.co/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline underline-offset-[4px] decoration-neutral-400 dark:text-white dark:decoration-white hover:decoration-neutral-600 dark:hover:decoration-neutral-300 transition-all duration-300"
                  >
                    <span className="font-semibold">RAMP.</span>
                  </a>
                  {language === 'en' ? (
                    <>, where we <span className="font-semibold">help architecture firms and design studios grow</span> through ads, web design, and creative strategies for the AEC world. Go check out what we do!</>
                  ) : (
                    <>, donde <span className="font-semibold">ayudamos a firmas de arquitectura y estudios de diseño a crecer</span> con anuncios, diseño web y estrategias creativas. ¡Te invito a ver lo que hacemos!</>
                  )}
                </p>
                
                <p 
                  className={`text-lg leading-relaxed transition-all duration-1000 ease-workshop animate-smooth ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: isVisible ? '1200ms' : '0ms' }}
                >
                  {language === 'en' ? (
                    <>Curious about my professional journey? Take a look at my trajectory and architectural projects — it's all in my </>
                  ) : (
                    <>¿Quieres conocer más sobre mi experiencia? Echa un vistazo a mi trayectoria y proyectos arquitectónicos — está todo en mi </>
                  )}
                                      <a 
                      href={language === 'en' ? '/CV Mateo Cardona_EN.pdf' : '/CV Mateo Cardona_ES.pdf'}
                      download
                      className="underline underline-offset-[4px] decoration-neutral-400 dark:text-neutral-600 hover:decoration-neutral-600 dark:hover:decoration-neutral-400 transition-all duration-300 cursor-pointer"
                    >
                      <span className="font-semibold">{language === 'en' ? 'CV' : 'CV'}</span>
                    </a>
                  {language === 'en' ? '.' : '.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HiddenComment text="End: About" />
    </>
  )
}

