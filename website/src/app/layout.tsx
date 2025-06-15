import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navigation } from '@/components/navigation'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Automation Empire - Dominate Markets 24/7/365',
  description: 'Transform wishful thinking into unstoppable automated empires that dominate markets, create wealth, and expand human potential.',
  keywords: 'automation, n8n, workflows, business automation, AI automation',
  authors: [{ name: 'Automation Empire' }],
  openGraph: {
    title: 'Automation Empire',
    description: 'Build unstoppable automated empires',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <main className="min-h-screen bg-gradient-to-br from-empire-950 via-empire-900 to-empire-950">
            {children}
          </main>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}