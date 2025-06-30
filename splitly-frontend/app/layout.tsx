import './globals.css'
import type { Metadata } from 'next'
import LayoutWrapper from '@/components/LayoutWrapper'

export const metadata: Metadata = {
  title: 'Splitly',
  description: 'Smart shared subscription manager',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0e0e0e] text-white font-sans">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}