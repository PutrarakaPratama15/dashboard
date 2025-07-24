import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pupuk Kujang Dashboard',
  description: 'Professional dashboard for announcements and industry group chat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <div className="flex-1 flex">
            <aside className="hidden w-64 flex-col border-r bg-background md:flex">
              <Sidebar />
            </aside>
            <div className="flex-1 flex flex-col">
              <main className="flex-1 overflow-hidden">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
