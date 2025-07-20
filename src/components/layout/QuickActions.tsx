'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

export function QuickActions() {
  const [quickAnnouncementOpen, setQuickAnnouncementOpen] = useState(false)
  const [quickMessageOpen, setQuickMessageOpen] = useState(false)
  const [announcement, setAnnouncement] = useState({ title: '', content: '' })
  const [message, setMessage] = useState('')

  const handleQuickAnnouncement = () => {
    // Handle quick announcement creation
    console.log('Quick announcement:', announcement)
    setAnnouncement({ title: '', content: '' })
    setQuickAnnouncementOpen(false)
  }

  const handleQuickMessage = () => {
    // Handle quick message sending
    console.log('Quick message:', message)
    setMessage('')
    setQuickMessageOpen(false)
  }

  return (
    <div className="px-3 py-2">
      <h3 className="mb-2 px-4 text-sm font-semibold tracking-tight text-muted-foreground">
        Quick Actions
      </h3>
      <div className="space-y-2 px-4">
        {/* Quick Announcement */}
        <Dialog open={quickAnnouncementOpen} onOpenChange={setQuickAnnouncementOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <svg className="h-3 w-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              Quick Announcement
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quick Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="quick-title">Title</Label>
                <Input
                  id="quick-title"
                  value={announcement.title}
                  onChange={(e) => setAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Announcement title..."
                />
              </div>
              <div>
                <Label htmlFor="quick-content">Content</Label>
                <Textarea
                  id="quick-content"
                  value={announcement.content}
                  onChange={(e) => setAnnouncement(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Announcement content..."
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setQuickAnnouncementOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleQuickAnnouncement}>
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Quick Message */}
        <Dialog open={quickMessageOpen} onOpenChange={setQuickMessageOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs">
              <svg className="h-3 w-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Quick Message
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Quick Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="quick-message">Message</Label>
                <Textarea
                  id="quick-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setQuickMessageOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleQuickMessage}>
                  Send
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Quick Actions Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="ghost" size="sm" className="h-auto p-2 flex flex-col items-center text-xs">
            <svg className="h-4 w-4 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </Button>
          <Button variant="ghost" size="sm" className="h-auto p-2 flex flex-col items-center text-xs">
            <svg className="h-4 w-4 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V7a2 2 0 012-2h5m5 0v5" />
            </svg>
            Alerts
          </Button>
        </div>

        {/* Recent Activity Summary */}
        <div className="mt-4 p-2 bg-muted rounded-md">
          <div className="text-xs font-medium mb-2">Todays Activity</div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Messages sent</span>
              <Badge variant="secondary" className="text-xs">12</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Announcements</span>
              <Badge variant="secondary" className="text-xs">1</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Time online</span>
              <Badge variant="secondary" className="text-xs">4h</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
