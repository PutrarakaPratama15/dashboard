'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import AnnouncementCard from './AnnouncementCard'

export interface Announcement {
  id: string
  title: string
  content: string
  timestamp: Date
  author: string
}

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Welcome to Pupuk Kujang Industry Dashboard',
      content: 'This platform will help us stay connected and share important updates across our industry network.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      author: 'Admin'
    },
    {
      id: '2',
      title: 'Monthly Industry Meeting',
      content: 'Our next monthly meeting is scheduled for next Friday at 2 PM. Please prepare your quarterly reports.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      author: 'Management'
    }
  ])

  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: { title?: string; content?: string } = {}
    
    if (!newTitle.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!newContent.trim()) {
      newErrors.content = 'Content is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        title: newTitle.trim(),
        content: newContent.trim(),
        timestamp: new Date(),
        author: 'Current User'
      }

      setAnnouncements(prev => [newAnnouncement, ...prev])
      setNewTitle('')
      setNewContent('')
      setErrors({})
    } catch (error) {
      console.error('Error creating announcement:', error)
      setErrors({ title: 'Failed to create announcement. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (id: string, updatedData: Partial<Announcement>) => {
    try {
      setAnnouncements(prev =>
        prev.map(announcement =>
          announcement.id === id
            ? { ...announcement, ...updatedData }
            : announcement
        )
      )
    } catch (error) {
      console.error('Error updating announcement:', error)
    }
  }

  const handleDelete = (id: string) => {
    try {
      setAnnouncements(prev => prev.filter(announcement => announcement.id !== id))
    } catch (error) {
      console.error('Error deleting announcement:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Create Announcement Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter announcement title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className={errors.title ? 'border-destructive' : ''}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Enter announcement content..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
                className={errors.content ? 'border-destructive' : ''}
              />
              {errors.content && (
                <p className="text-sm text-destructive">{errors.content}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Creating...' : 'Create Announcement'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">No announcements yet.</p>
            </CardContent>
          </Card>
        ) : (
          announcements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  )
}
