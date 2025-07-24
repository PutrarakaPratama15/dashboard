'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 py-6">
        <div className="grid gap-6 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">PT Pupuk Kujang</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>Professional industry communication platform</p>
              <p>Connecting teams and streamlining operations</p>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>All systems operational</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
       <div className="space-y-3">
          <h3 className="text-sm font-semibold">Quick Links</h3>
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="block w-full text-left h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" className="block w-full text-left h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
              Announcements
            </Button>
            <Button variant="ghost" size="sm" className="block w-full text-left h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
              Group Chat
            </Button>
            <Button variant="ghost" size="sm" className="block w-full text-left h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
              Help & Support
            </Button>
          </div>
        </div>



          {/* Platform Stats */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Platform Stats</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Active Users</span>
                <Badge variant="secondary" className="text-xs">24</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Messages</span>
                <Badge variant="secondary" className="text-xs">1,247</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Announcements</span>
                <Badge variant="secondary" className="text-xs">3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Uptime</span>
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">99.9%</Badge>
              </div>
            </div>
          </div>

          {/* Support & Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Support</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>support@pupukkujang.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Mon-Fri: 9AM-6PM WIB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span>© 2024 PT Pupuk Kujang. All rights reserved.</span>
              <span>•</span>
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Last updated: July 24, 2025</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
                Terms of Service
              </Button>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
                Security
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
