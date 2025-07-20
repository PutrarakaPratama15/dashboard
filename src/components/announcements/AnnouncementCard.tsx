'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Announcement } from './AnnouncementList'

interface AnnouncementCardProps {
  announcement: Announcement
  onEdit: (id: string, updatedData: Partial<Announcement>) => void
  onDelete: (id: string) => void
}

export default function AnnouncementCard({ 
  announcement, 
  onEdit, 
  onDelete 
}: AnnouncementCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(announcement.title)
  const [editContent, setEditContent] = useState(announcement.content)
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({})

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
    
    return timestamp.toLocaleDateString()
  }

  const validateEdit = (): boolean => {
    const newErrors: { title?: string; content?: string } = {}
    
    if (!editTitle.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!editContent.trim()) {
      newErrors.content = 'Content is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateEdit()) {
      return
    }

    try {
      onEdit(announcement.id, {
        title: editTitle.trim(),
        content: editContent.trim()
      })
      setIsEditing(false)
      setErrors({})
    } catch (error) {
      console.error('Error saving announcement:', error)
      setErrors({ title: 'Failed to save changes. Please try again.' })
    }
  }

  const handleCancel = () => {
    setEditTitle(announcement.title)
    setEditContent(announcement.content)
    setIsEditing(false)
    setErrors({})
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        onDelete(announcement.id)
      } catch (error) {
        console.error('Error deleting announcement:', error)
      }
    }
  }

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        {isEditing ? (
          <div className="space-y-2">
            <Label htmlFor={`edit-title-${announcement.id}`}>Title</Label>
            <Input
              id={`edit-title-${announcement.id}`}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>
        ) : (
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg leading-tight">
              {announcement.title}
            </CardTitle>
            <div className="flex gap-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-xs"
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="text-xs text-destructive hover:text-destructive"
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="pt-0">
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`edit-content-${announcement.id}`}>Content</Label>
              <Textarea
                id={`edit-content-${announcement.id}`}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={3}
                className={errors.content ? 'border-destructive' : ''}
              />
              {errors.content && (
                <p className="text-sm text-destructive">{errors.content}</p>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave}>
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-foreground leading-relaxed">
              {announcement.content}
            </p>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>By {announcement.author}</span>
              <span>{formatTimestamp(announcement.timestamp)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
