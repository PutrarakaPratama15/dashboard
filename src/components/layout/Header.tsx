'use client'

import { MobileSidebar } from './Sidebar'
import { NotificationCenter } from './NotificationCenter'
import { SearchCommand } from './SearchCommand'
import { UserProfile } from './UserProfile'
import { HelpSupport } from './HelpSupport'
import { Badge } from '@/components/ui/badge'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <div className="mr-6 flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-primary"></div>
            <span className="hidden font-bold sm:inline-block">
              Pupuk Kujang
            </span>
          </div>
        </div>
        
        <MobileSidebar />
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="hidden md:flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Online</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                24 Active Users
              </Badge>
            </div>
          </div>
          
          <nav className="flex items-center space-x-1">
            <SearchCommand />
            <NotificationCenter />
            <HelpSupport />
            
            <div className="ml-2">
              <UserProfile />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
