"use client"

import { useMemo, useState, useEffect, useRef } from 'react'
import HiddenComment from '@/components/HiddenComment'
import { useLanguage } from '@/components/LanguageProvider'

type Category = 'Architecture' | 'Autodesk' | 'Management' | 'AI & Technology' | 'Business Analysis' | 'Language'

interface CertificationItem {
  title: string
  issuer: string
  year: number
  category: Category
  link?: string
  gpa?: string
  certificateId?: string
}

const getItems = (language: string): CertificationItem[] => [
  // BIM Certifications (at the beginning as requested)
  { title: 'Revit BIM Architectural Design', issuer: 'Autodesk', year: 2024, category: 'Autodesk', certificateId: 'AM0183098022125492623' },
  { title: 'BIM 360 Document Management', issuer: 'Autodesk', year: 2024, category: 'Autodesk', certificateId: 'AM0183098022145492623' },
  { title: 'BIM Fundamentals Simulation-Coordination', issuer: 'Autodesk', year: 2024, category: 'Autodesk', certificateId: 'AM0183098022135492623' },
  
  // Architecture
  { title: language === 'en' ? 'Degree in Architecture' : 'Grado en Arquitectura', issuer: 'Universidad de los Andes', year: 2025, category: 'Architecture', gpa: '4.6' },
  { title: language === 'en' ? 'Minor in Project Design' : 'Minor en Diseño de Proyectos', issuer: 'Universidad de los Andes', year: 2025, category: 'Architecture', gpa: '4.6' },
  
  // Autodesk Certifications
  { title: 'Account Administration', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/f69im7qfkysg' },
  { title: 'Activation', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/59k9padkmaeb' },
  { title: 'Administrator', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/g9538b7ze6oc' },
  { title: 'Assets', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/276mw9ksvjtg' },
  { title: 'Bridge in Build', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/vzu4pct7tjjq' },
  { title: 'Bridge in Docs', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/zw4ddyakwnjr' },
  { title: 'Budget', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/8dfn3i73gmoz' },
  { title: 'Change Order', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/pk9h9iyji6um' },
  { title: 'Changes', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/gs7yx7js5z7v' },
  { title: 'Clashes and Issues', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/a4sn7ojq2q57' },
  { title: 'Correspondence', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/22n6evhpdsr5' },
  { title: 'Cost', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/pfqqzjuavxyf' },
  { title: 'Estimator', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/cyu5ojmmystc' },
  { title: 'Executive Overview', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/7r7vdm444vn3' },
  { title: 'Files', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/96stkwfzud5x' },
  { title: 'Forecast', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/xgq3wftigf87' },
  { title: 'Forms', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/cv75nf3kiyzo' },
  { title: 'Getting Started in AutoSpecs', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/zdbo43o54kf8' },
  { title: 'Getting Started in Autodesk Build', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/ei6mxkry3j8z' },
  { title: 'Getting Started in Autodesk Docs', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/qy86cfj3x5jg' },
  { title: 'Getting Started in Autodesk Takeoff', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/jeajz28yq228' },
  { title: 'Getting Started in Cost Management', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/3haxav92ridh' },
  { title: 'Getting Started in Design Collaboration', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/7fqgiagf3tyy' },
  { title: 'Getting Started in Model Coordination', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/htq9embn47oe' },
  { title: 'Home and Project Status', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/3j3g6rbx43rb' },
  { title: 'Issues in Build', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/qiecy9masym5' },
  { title: 'Issues in Design Collaboration', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/6tio6kvnmqq5' },
  { title: 'Issues in Docs', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/otsbkbpk8c2c' },
  { title: 'Meetings in Build', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/sssurbifp7fe' },
  { title: 'Meetings in Design Collaboration', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/bwh4q6wose6p' },
  { title: 'Meetings in Model Coordination', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/sa3igzr8im2u' },
  { title: 'Models and Views', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/jpnuikiufm96' },
  { title: 'Packages', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/w6f828euqqsi' },
  { title: 'Product Data', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/o6v7budum7tr' },
  { title: 'Project Administration', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/woirabc8iu5q' },
  { title: 'Project Manager', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/34dcbziqn9ae' },
  { title: 'Project Templates', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/p5gmjtjr54ej' },
  { title: 'Project-Level Insight', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/mnanvqfeb2h4' },
  { title: 'RFIs', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/tzgfiysomxac' },
  { title: 'Reports in Build', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/rmcewwb63dyu' },
  { title: 'Reports in Cost Management', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/8q4ps226yfxi' },
  { title: 'Reports in Design Collaboration', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/rkpja8bvfiw2' },
  { title: 'Reports in Docs', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/sb3vatydqxoh' },
  { title: 'Reports in Model Coordination', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/6r39h7jjmuub' },
  { title: 'Reviews', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/gqxvaeknkmr5' },
  { title: 'Schedule', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/9f9qfsnvrrj6' },
  { title: 'Sheets', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/xs3qek4oyhr3' },
  { title: 'Sheets & Models', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/cpoc8es56yt4' },
  { title: 'Smart Register', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/tiz7teoyvm9w' },
  { title: 'Spec View', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/nfoecmxwwm37' },
  { title: 'Specifications', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/3xu4joc3phrw' },
  { title: 'Submittals', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/afvxpmxjj4d4' },
  { title: 'Timeline', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/ptrmzrd6dkso' },
  { title: 'Transmittals', issuer: 'Online Course', year: 2024, category: 'Autodesk', link: 'https://verify.skilljar.com/c/imdcofr7rfn7' },
  { title: 'Working in Smartsheet', issuer: 'Online Course', year: 2025, category: 'Autodesk', link: 'https://verify.skilljar.com/c/22k6mxqjknw4' },
  
  // Management
  { title: 'Business Continuity', issuer: 'PMI', year: 2024, category: 'Management', link: 'https://learning.pmi.org/certificate?id=e1240b79-aae1-4a8e-9df0-46f21d9850c2&_gl=1*4eftk8*_gcl_au*NDcyMjg0NDMxLjE3MzE1ODk2MjYuMjE0MjcxNDk4LjE3MzI2MzU1NTAuMTczMjYzNTU1MA..' },
  { title: 'Career Essentials in Project Management by Microsoft and LinkedIn', issuer: 'Online Course', year: 2024, category: 'Management', link: 'https://www.linkedin.com/learning/certificates/fa68f86505972d13475dc5c519587f6b00c4673e5c598c8d1203e196b4d28158' },
  { title: 'Generative AI Overview for Project Managers', issuer: 'PMI', year: 2024, category: 'Management', link: 'https://www.credly.com/badges/a26ccb02-db0a-4122-ad49-58b77263e5e9/linked_in_profile' },
  { title: 'Professional Soft Skills Learning Pathway', issuer: 'Online Course', year: 2025, category: 'Management', link: 'https://www.linkedin.com/learning/certificates/73cdb286f7a876fec37015523bace4a1efeff10f57bb306c75c76be45efeb583' },
  { title: 'The Basics of Scrum', issuer: 'PMI', year: 2024, category: 'Management', link: 'https://learning.pmi.org/certificate?id=b406a4a2-5d08-4222-833a-ab2b0541bac4' },
  
  // AI & Technology
  { title: 'Artificial Intelligence for Business Leaders by Microsoft and LinkedIn', issuer: 'Online Course', year: 2025, category: 'AI & Technology', link: 'https://www.linkedin.com/learning/certificates/934cc28eab6da9a59fab0a613729220e1ee42c5e6f42644d536c73fedf82138d' },
  { title: 'Professional Fundamentals of Generative AI by Microsoft and LinkedIn', issuer: 'Online Course', year: 2024, category: 'AI & Technology', link: 'https://www.linkedin.com/learning/certificates/187f300b34d1150bb4a231137d1d14f4b75121733ae869d60d24e41e13d12107' },
  { title: 'Innovating with Google Cloud Artificial Intelligence', issuer: 'Online Course', year: 2024, category: 'AI & Technology', link: 'https://www.cloudskillsboost.google/public_profiles/233a135e-2a03-4c7a-8019-f73900df1ff8/badges/12961321?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share' },
  { title: 'Introduction to Generative AI (Google)', issuer: 'Online Course', year: 2024, category: 'AI & Technology', link: 'https://www.cloudskillsboost.google/public_profiles/233a135e-2a03-4c7a-8019-f73900df1ff8/badges/12829053?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share' },
  { title: 'Make Basics', issuer: 'Online Course', year: 2025, category: 'AI & Technology', link: 'https://www.credly.com/badges/5ffda271-37d0-4a3f-8324-db3480c7df05/linked_in_profile' },
  { title: 'Make Foundation', issuer: 'Online Course', year: 2025, category: 'AI & Technology', link: 'https://www.credly.com/badges/8cce18c8-ab70-41d4-9b96-50aab871b68d/linked_in_profile' },
  { title: 'Make Intermediate', issuer: 'Online Course', year: 2025, category: 'AI & Technology', link: 'https://www.credly.com/badges/ebb61cac-9746-4a92-aa15-35a6bde559f8/linked_in_profile' },
  
  // Business Analysis
  { title: 'BCG - Introduction to Strategy Consulting Job Simulation', issuer: 'Online Course', year: 2025, category: 'Business Analysis', link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/SKZxezskWgmFjRvj9/4Rfzeut8gXmNwfxXv_SKZxezskWgmFjRvj9_7pLacCicNE3atQNW3_1752020252531_completion_certificate.pdf' },
  { title: 'Career Essentials in Business Analysis by Microsoft and LinkedIn', issuer: 'Online Course', year: 2025, category: 'Business Analysis', link: 'https://www.linkedin.com/learning/certificates/cab95a098abaa66726577bbeace67690286faff46d424c7ed786672ade30c120' },
  { title: 'Financial Tools for Structuring Real Estate Projects', issuer: 'Universidad de los Andes', year: 2025, category: 'Business Analysis' },
  { title: 'McKinsey Forward Program', issuer: 'Online Course', year: 2025, category: 'Business Analysis', link: 'https://www.credly.com/badges/01bf1415-389b-4b78-a240-a3a2b799925c/linked_in_profile' },
  { title: 'How do I turn my idea into a business?', issuer: 'Online Course – Coursera', year: 2024, category: 'Business Analysis', link: 'https://www.coursera.org/account/accomplishments/records/Y1MB01WRYZVJ' },
  
  // Language
  { title: 'IGCSE', issuer: 'Cambridge International', year: 2022, category: 'Language', certificateId: '0065371438' },
  { title: 'International English Language Testing System (IELTS)', issuer: 'IELTS', year: 2022, category: 'Language', certificateId: '22CO004935CARM001A' },
  { title: 'TOEFL iBT', issuer: 'ETS', year: 2022, category: 'Language', certificateId: '4431010191078793' },
]

const categories: Category[] = ['Architecture', 'Autodesk', 'Management', 'AI & Technology', 'Business Analysis', 'Language']

// Spanish category translations
const categoryTranslations: Record<Category, string> = {
  'Architecture': 'Arquitectura',
  'Autodesk': 'Autodesk',
  'Management': 'Gestión',
  'AI & Technology': 'IA y Tecnología',
  'Business Analysis': 'Análisis de Negocios',
  'Language': 'Idiomas'
}

export default function Certifications() {
  const { language } = useLanguage()
  const [active, setActive] = useState<'All' | Category>('Architecture')
  const [visibleCount, setVisibleCount] = useState(12) // Start with 12 items
  const [isLoading, setIsLoading] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const items = useMemo(() => getItems(language), [language])

  const filtered = useMemo(() => {
    if (active === 'All') return items
    return items.filter(i => i.category === active)
  }, [active, items])

  const visibleItems = useMemo(() => {
    return filtered.slice(0, visibleCount)
  }, [filtered, visibleCount])

  // Intersection Observer for infinite scroll - optimized for fast scrolling
  useEffect(() => {
    if (!loadMoreRef.current) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && !isLoading && visibleCount < filtered.length) {
          setIsLoading(true)
          // Use requestAnimationFrame for smoother loading
          requestAnimationFrame(() => {
            setVisibleCount(prev => Math.min(prev + 12, filtered.length))
            // Shorter delay for faster response
            setTimeout(() => {
              setIsLoading(false)
            }, 150)
          })
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px' // Start loading before reaching the bottom
      }
    )

    observerRef.current.observe(loadMoreRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [visibleCount, filtered.length, isLoading])

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(12)
  }, [active])

  const handleCertificateClick = (link?: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <>
      <HiddenComment text="Start: Certifications" />
      <section id="certifications" className="w-full border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">{language === 'en' ? 'Certifications' : 'Certificaciones'}</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <button onClick={() => setActive('All')} className={`px-3 py-1.5 rounded-md border ${active === 'All' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}>{language === 'en' ? 'All' : 'Todas'}</button>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActive(cat)} className={`px-3 py-1.5 rounded-md border ${active === cat ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900'}`}>
                  {language === 'en' ? cat : categoryTranslations[cat]}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((c, i) => (
              <div 
                key={i} 
                className={`rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 ${c.link ? 'cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors' : ''}`}
                onClick={() => handleCertificateClick(c.link)}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium">{c.title}</h3>
                  <span className="text-xs text-neutral-500">{c.year}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-neutral-500">{c.issuer} — {categoryTranslations[c.category]}</p>
                  {c.gpa && (
                    <span className="text-xs text-neutral-500">GPA: {c.gpa}</span>
                  )}
                </div>
                {c.certificateId && (
                  <div className="mt-1 text-xs text-neutral-500">
                    ID: {c.certificateId}
                  </div>
                )}
                {c.link && (
                  <div className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                    {language === 'en' ? 'Click to view certificate' : 'Clic para ver certificado'}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Load more trigger and loading indicator - minimal for smooth scrolling */}
          {visibleCount < filtered.length && (
            <div ref={loadMoreRef} className="mt-6 flex justify-center min-h-[40px]">
              {isLoading ? (
                <div className="flex items-center gap-2 text-neutral-500">
                  <div className="w-3 h-3 border border-neutral-300 border-t-neutral-600 rounded-full animate-spin"></div>
                  <span className="text-xs">
                    {language === 'en' ? 'Loading...' : 'Cargando...'}
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-xs text-neutral-400">
                    {visibleCount} / {filtered.length}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <HiddenComment text="End: Certifications" />
    </>
  )
}

