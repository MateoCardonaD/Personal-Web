// Google Analytics configuration and tracking functions
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track CV downloads
export const trackCVDownload = (language: string) => {
  event({
    action: 'download',
    category: 'CV',
    label: language === 'en' ? 'English CV' : 'Spanish CV',
  })
}

// Track project interactions
export const trackProjectView = (projectName: string) => {
  event({
    action: 'view',
    category: 'Project',
    label: projectName,
  })
}

// Track contact form submissions
export const trackContactForm = () => {
  event({
    action: 'submit',
    category: 'Contact',
    label: 'Google Forms',
  })
}

// Track theme changes
export const trackThemeChange = (theme: string) => {
  event({
    action: 'change',
    category: 'Theme',
    label: theme,
  })
}

// Track language changes
export const trackLanguageChange = (language: string) => {
  event({
    action: 'change',
    category: 'Language',
    label: language === 'en' ? 'English' : 'Spanish',
  })
}

// Declare gtag on window object
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

