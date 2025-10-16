import './globals.css'
import { LanguageProvider } from '@/components/LanguageProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Mateo Cardona Díaz - Arquitecto y Diseñador</title>
        <meta name="description" content="Arquitecto y diseñador de proyectos con enfoque en espacios funcionales, hermosos y sostenibles." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mateo Portfolio" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="bg-[#F7F4EF] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

