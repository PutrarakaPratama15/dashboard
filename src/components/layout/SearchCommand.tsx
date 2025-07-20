'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

interface SearchResult {
  id: string
  title: string
  content: string
  type: 'announcement' | 'message' | 'user' | 'page'
  url?: string
  timestamp?: Date
}

export function SearchCommand() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])

  // Mock search data
  const searchData: SearchResult[] = [
    {
      id: '1',
      title: 'Safety Protocol Implementation',
      content: 'New safety protocols effective immediately. All team members must attend...',
      type: 'announcement',
      url: '/announcements',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Monthly Industry Meeting',
      content: 'Our next monthly meeting is scheduled for next Friday at 2 PM...',
      type: 'announcement',
      url: '/announcements',
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Ahmad Rahman',
      content: 'Good morning everyone! Hope everyone is having a productive day.',
      type: 'message',
      url: '/chat',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
      id: '4',
      title: 'Siti Nurhaliza',
      content: 'Morning Ahmad! Yes, we just finished the quarterly review...',
      type: 'message',
      url: '/chat',
      timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000)
    },
    {
      id: '5',
      title: 'Dashboard',
      content: 'Main dashboard with overview and quick access to all features',
      type: 'page',
      url: '/'
    },
    {
      id: '6',
      title: 'Group Chat',
      content: 'Industry discussions and real-time communication',
      type: 'page',
      url: '/chat'
    }
  ]

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    if (searchQuery.trim() === '') {
      setResults([])
      return
    }

    const filtered = searchData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setResults(filtered)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement':
        return 'bg-blue-100 text-blue-800'
      case 'message':
        return 'bg-green-100 text-green-800'
      case 'user':
        return 'bg-purple-100 text-purple-800'
      case 'page':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatTimestamp = (timestamp?: Date) => {
    if (!timestamp) return ''
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return timestamp.toLocaleDateString()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="hidden md:flex">
          <svg
            className="h-4 w-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Search...
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search announcements, messages, users..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full"
          />
          
          {results.length > 0 && (
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="p-3 rounded-lg border hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => {
                      if (result.url) {
                        window.location.href = result.url
                      }
                      setOpen(false)
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="text-sm font-medium">{result.title}</h4>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${getTypeColor(result.type)}`}
                          >
                            {result.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {result.content}
                        </p>
                      </div>
                      {result.timestamp && (
                        <span className="text-xs text-muted-foreground ml-2">
                          {formatTimestamp(result.timestamp)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
          
          {query && results.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <svg
                className="h-8 w-8 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                />
              </svg>
              <p>No results found for &quot;{query}&quot;</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
