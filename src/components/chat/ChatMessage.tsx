'use client'

import { ChatMessage as ChatMessageType } from './ChatWindow'

interface ChatMessageProps {
  message: ChatMessageType
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    
    return timestamp.toLocaleDateString()
  }

  return (
    <div className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] space-y-1 ${message.isCurrentUser ? 'items-end' : 'items-start'}`}>
        {/* Sender name and timestamp */}
        <div className={`flex items-center gap-2 text-xs text-muted-foreground ${
          message.isCurrentUser ? 'flex-row-reverse' : 'flex-row'
        }`}>
          <span className="font-medium">{message.sender}</span>
          <span>•</span>
          <span>{formatTimestamp(message.timestamp)}</span>
        </div>
        
        {/* Message bubble */}
        <div className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${
          message.isCurrentUser
            ? 'bg-primary text-primary-foreground ml-4'
            : 'bg-muted text-muted-foreground mr-4'
        }`}>
          {message.content}
        </div>
      </div>
    </div>
  )
}
