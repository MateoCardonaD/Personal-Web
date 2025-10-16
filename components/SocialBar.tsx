"use client"

import { useLanguage } from './LanguageProvider'

function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  )
}
function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 17v-7M8 7.5h.01M12 17v-4.5a2.5 2.5 0 0 1 5 0V17" />
    </svg>
  )
}
function IconBehance(props: React.SVGProps<SVGSVGElement>) {
  // Simple Be monogram for clarity at small sizes
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth={1.6} />
      <text x="7" y="16" fontSize="10" fontWeight="600" fill="currentColor">B</text>
      <text x="14" y="13" fontSize="8" fontWeight="600" fill="currentColor">ē</text>
    </svg>
  )
}
function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r=".9" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconWhatsApp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" {...props}>
      <path d="M20 11.5A8.5 8.5 0 0 1 7.6 19.4L4 20l.6-3.6A8.5 8.5 0 1 1 20 11.5Z" />
      <path d="M16.2 14.2c-.3.8-1.7.9-1.7.9-1.5 0-3.5-1.2-4.5-2.7-1.2-1.9-1.2-3-.9-3.4.2-.3.6-.5 1-.3l1.2.6c.3.2.4.6.3 1l-.2.6c.3.6 1 1.3 1.6 1.6l.6-.2c.4-.1.8 0 1 .3l.6 1.2c.1.3.1.5 0 .8Z" />
    </svg>
  )
}

export default function SocialBar() {
  const { language } = useLanguage()
  const t = {
    email: language === 'en' ? 'Email' : 'Correo',
    linkedin: 'LinkedIn',
    behance: 'Behance',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
  }

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {/* Email pill with label (label hidden on small screens) */}
      <a
        href="mailto:hello@example.com"
        className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3 py-1.5 text-sm text-neutral-900 dark:text-neutral-100 shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
        aria-label={t.email}
        title={t.email}
      >
        <IconMail className="h-4 w-4" />
        <span className="hidden sm:inline">{t.email}</span>
      </a>

      {/* Icon-only buttons */}
      <a
        href="https://www.linkedin.com/in/mateo-cardona-díaz/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
        aria-label={t.linkedin}
        title={t.linkedin}
      >
        <IconLinkedIn className="h-4 w-4" />
      </a>
      <a
        href="https://www.behance.net/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
        aria-label={t.behance}
        title={t.behance}
      >
        <IconBehance className="h-4 w-4" />
      </a>
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
        aria-label={t.instagram}
        title={t.instagram}
      >
        <IconInstagram className="h-4 w-4" />
      </a>
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
        aria-label={t.whatsapp}
        title={t.whatsapp}
      >
        <IconWhatsApp className="h-4 w-4" />
      </a>
    </div>
  )
}
