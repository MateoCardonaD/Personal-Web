"use client"

import HiddenComment from '@/components/HiddenComment'
import { useLanguage } from '@/components/LanguageProvider'
import { useRepeatingAnimation } from '@/hooks/useRepeatingAnimation'

export default function ReachOut() {
  const { language } = useLanguage()
  const { isVisible, elementRef: sectionRef } = useRepeatingAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: false // This allows animations to repeat
  })

  return (
    <>
      <HiddenComment text="Start: ReachOut" />
      <section id="contact" ref={sectionRef} className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-gradient-to-b from-transparent to-neutral-50/30 dark:to-neutral-900/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Services Section */}
          <div className="text-center mb-12 sm:mb-16 space-y-4 sm:space-y-6">
            <h2 className={`text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 transition-all duration-[1200ms] ease-workshop animate-smooth ${
              isVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-6 scale-98'
            }`} style={{ transitionDelay: '100ms' }}>
              {language === 'en' ? 'A full-spectrum design & growth model.' : 'Un modelo integral de diseño y crecimiento.'}
            </h2>
            <p className={`text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed transition-all duration-[1400ms] ease-workshop animate-smooth ${
              isVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-6 scale-98'
            }`} style={{ transitionDelay: '300ms' }}>
              {language === 'en' 
                ? 'We work with clients at different stages — whether you need architectural expertise, a digital boost, or both — we have solutions tailored to your goals.'
                : 'Trabajamos con clientes en diferentes etapas — ya sea que necesites experiencia arquitectónica, un impulso digital, o ambos — tenemos soluciones adaptadas a tus objetivos.'
              }
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
            {/* Architecture Services */}
            <div className={`group bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-700 transition-all duration-500 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] hover:shadow-2xl hover:scale-[1.015] hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '50ms' }}>
              <div className="space-y-4">
                <div className={`transition-all duration-300 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-3'
                }`} style={{ transitionDelay: '100ms' }}>
                  <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100 underline decoration-neutral-300 dark:decoration-neutral-600 underline-offset-4">
                    {language === 'en' ? 'Architecture.' : 'Arquitectura.'}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                    {language === 'en' ? 'Project-based / ongoing' : 'Por proyecto / continuo'}
                  </p>
                </div>
                <p className={`text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed transition-all duration-300 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-3'
                }`} style={{ transitionDelay: '150ms' }}>
                  {language === 'en'
                    ? 'Providing design solutions from concept to execution, ensuring functional, beautiful, and sustainable spaces.'
                    : 'Proporciono soluciones de diseño desde el concepto hasta la ejecución, asegurando espacios funcionales, hermosos y sostenibles.'
                  }
                </p>
                <ul className="space-y-2">
                  <li className={`flex items-center text-sm sm:text-base text-neutral-700 dark:text-neutral-300 transition-all duration-300 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-3'
                  }`} style={{ transitionDelay: '200ms' }}>
                    <span className="text-neutral-400 dark:text-neutral-500 mr-2 transition-all duration-300 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] group-hover:text-neutral-600 dark:group-hover:text-neutral-300 group-hover:scale-110 group-hover:opacity-90">+</span>
                    {language === 'en' ? 'Residential & commercial design' : 'Diseño y conceptualización'}
                  </li>
                  <li className={`flex items-center text-sm sm:text-base text-neutral-700 dark:text-neutral-300 transition-all duration-300 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-3'
                  }`} style={{ transitionDelay: '250ms' }}>
                    <span className="text-neutral-400 dark:text-neutral-500 mr-2 transition-all duration-300 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] group-hover:text-neutral-600 dark:group-hover:text-neutral-300 group-hover:scale-110 group-hover:opacity-90">+</span>
                    {language === 'en' ? 'Technical design coordination' : 'Coordinación técnica'}
                  </li>
                  <li className={`flex items-center text-sm sm:text-base text-neutral-700 dark:text-neutral-300 transition-all duration-300 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-3'
                  }`} style={{ transitionDelay: '300ms' }}>
                    <span className="text-neutral-400 dark:text-neutral-500 mr-2 transition-all duration-300 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] group-hover:text-neutral-600 dark:group-hover:text-neutral-300 group-hover:scale-110 group-hover:opacity-90">+</span>
                    {language === 'en' ? 'Visualization & graphic representation' : 'Visualización y representación gráfica'}
                  </li>
                  <li className={`flex items-center text-sm sm:text-base text-neutral-700 dark:text-neutral-300 transition-all duration-300 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-3'
                  }`} style={{ transitionDelay: '350ms' }}>
                    <span className="text-neutral-400 dark:text-neutral-500 mr-2 transition-all duration-300 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] group-hover:text-neutral-600 dark:group-hover:text-neutral-300 group-hover:scale-110 group-hover:opacity-90">+</span>
                    {language === 'en' ? 'Construction detailing' : 'Detalles de construcción'}
                  </li>
                </ul>
                <div className={`pt-4 transition-all duration-300 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-3'
                }`} style={{ transitionDelay: '450ms' }}>
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSccX78Xv2TCWjh4VdHo_393RaUG1EqflMWrLX1h0M4Ct_uuxw/viewform?usp=header" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full sm:w-auto text-center bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 px-6 py-3 rounded-lg font-medium transition-all duration-400 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] hover:scale-105 hover:shadow-lg"
                  >
                    {language === 'en' ? 'Get in touch' : 'Hablemos'}
                  </a>
                </div>
              </div>
            </div>

            {/* Digital Marketing Services */}
            <div className={`group bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-700 transition-all duration-500 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] hover:shadow-2xl hover:scale-[1.015] hover:border-neutral-300 dark:hover:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`} style={{ transitionDelay: '200ms' }}>
              <div className="space-y-4">
                <div className={`transition-all duration-300 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-3'
                }`} style={{ transitionDelay: '250ms' }}>
                  <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100 underline decoration-neutral-300 dark:decoration-neutral-600 underline-offset-4">
                    {language === 'en' ? 'RAMP. – Digital Marketing & Growth.' : 'RAMP. – Marketing Digital y Crecimiento.'}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {language === 'en' ? 'Specialized in architecture firms & related industries' : 'Especializados en firmas de arquitectura e industrias afines'}
                    </p>
                    <a 
                      href="https://rampmarketing.com.co/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 font-medium transition-all duration-300 hover:gap-2 border-b border-transparent hover:border-neutral-400 dark:hover:border-neutral-500"
                    >
                      {language === 'en' ? 'Visit Website' : 'Visitar Sitio'}
                      <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
                <p className={`text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed transition-all duration-300 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-3'
                }`} style={{ transitionDelay: '300ms' }}>
                  {language === 'en'
                    ? 'Helping architecture firms and design studios grow through strategic digital marketing, web presence, and creative content tailored specifically for the AEC industry.'
                    : 'Ayudamos a firmas de arquitectura y estudios de diseño a crecer a través de marketing digital estratégico, presencia web y contenido creativo.'
                  }
                </p>
                <ul className="space-y-2">
                  <li className={`flex items-center text-sm sm:text-base text-neutral-700 dark:text-neutral-300 transition-all duration-400 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-3'
                  }`} style={{ transitionDelay: '500ms' }}>
                    <span className="text-neutral-400 mr-2 transition-all duration-200 ease-out group-hover:text-neutral-600 dark:group-hover:text-neutral-300 group-hover:scale-110 group-hover:opacity-90">+</span>
                    {language === 'en' ? 'Meta & Google Ads campaigns' : 'Campañas de Meta y Google Ads'}
                  </li>
                  <li className={`flex items-center text-sm sm:text-base text-neutral-700 dark:text-neutral-300 transition-all duration-400 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-3'
                  }`} style={{ transitionDelay: '550ms' }}>
                    <span className="text-neutral-400 mr-2 transition-all duration-200 ease-out group-hover:text-neutral-600 dark:group-hover:text-neutral-300 group-hover:scale-110 group-hover:opacity-90">+</span>
                    {language === 'en' ? 'Website & landing page design' : 'Diseño de sitios web y páginas de aterrizaje'}
                  </li>
                  <li className={`flex items-center text-sm sm:text-base text-neutral-700 dark:text-neutral-300 transition-all duration-400 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-3'
                  }`} style={{ transitionDelay: '600ms' }}>
                    <span className="text-neutral-400 mr-2 transition-all duration-200 ease-out group-hover:text-neutral-600 dark:group-hover:text-neutral-300 group-hover:scale-110 group-hover:opacity-90">+</span>
                    {language === 'en' ? 'Content creation & UGC videos' : 'Creación de contenido y videos UGC'}
                  </li>
                  <li className={`flex items-center text-sm sm:text-base text-neutral-700 dark:text-neutral-300 transition-all duration-400 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-3'
                  }`} style={{ transitionDelay: '650ms' }}>
                    <span className="text-neutral-400 mr-2 transition-all duration-200 ease-out group-hover:text-neutral-600 dark:group-hover:text-neutral-300 group-hover:scale-110 group-hover:opacity-90">+</span>
                    {language === 'en' ? 'Analytics & performance optimization' : 'Analíticas y optimización de rendimiento'}
                  </li>
                </ul>
                <div className={`pt-4 transition-all duration-400 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-3'
                }`} style={{ transitionDelay: '700ms' }}>
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSc4kuxl01cq6ZLnPTPsCKrsDQUFnNIbq8Ywh_Ws2ZY60xTFoQ/viewform?usp=header" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full sm:w-auto text-center bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 px-6 py-3 rounded-lg font-medium transition-all duration-400 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] hover:scale-105 hover:shadow-lg"
                  >
                    {language === 'en' ? 'Get in touch' : 'Hablemos'}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Message Section - Restored Original Format */}
          <div className="mt-16 sm:mt-20 text-center space-y-6 sm:space-y-8">
            <p className={`text-lg sm:text-xl leading-relaxed text-neutral-700 dark:text-neutral-200 max-w-4xl mx-auto font-light transition-all duration-700 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`} style={{ transitionDelay: '100ms' }}>
              {language === 'en' 
                ? "I believe great projects start with genuine conversations—over coffee, a book, a game of chess, or a sketch on a napkin. That's how architecture, and life, often begin."
                : "Creo que los grandes proyectos comienzan con conversaciones genuinas—sobre café, un libro, una partida de ajedrez, o un boceto en una servilleta. Así es como la arquitectura, y la vida, suelen comenzar."
              }
            </p>
            
            <p className={`text-base sm:text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto font-medium transition-all duration-700 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-6 scale-95'
            }`} style={{ transitionDelay: '300ms' }}>
              {language === 'en'
                ? "Feel free to reach out anytime, I'd love to hear from you."
                : "No dudes en contactarme en cualquier momento, me encantaría saber de ti."
              }
            </p>

            <div className="flex justify-center">
              <div className="text-center space-y-6 sm:space-y-8">
                <p className={`text-sm text-neutral-500 dark:text-neutral-400 font-medium tracking-wide transition-all duration-700 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-6 scale-95'
                }`} style={{ transitionDelay: '500ms' }}>
                  {language === 'en' ? 'Looking forward to it,' : 'Nos vemos por ahí,'}
                </p>
                
                <div className={`flex justify-center transition-all duration-800 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`} style={{ transitionDelay: '700ms' }}>
                  {/* Black signature for light mode */}
                  <img 
                    src="/signature-black.png" 
                    alt="Mateo" 
                    className="h-20 sm:h-28 w-auto dark:hidden drop-shadow-sm"
                  />
                  {/* White signature for dark mode */}
                  <img 
                    src="/signature-white.png" 
                    alt="Mateo" 
                    className="h-20 sm:h-28 w-auto hidden dark:block drop-shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HiddenComment text="End: ReachOut" />
    </>
  )
}
