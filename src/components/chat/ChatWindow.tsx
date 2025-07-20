'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'

export interface ChatMessage {
  id: string
  sender: string
  content: string
  timestamp: Date
  isCurrentUser?: boolean
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'Ahmad Rahman',
      content: 'Good morning everyone! Hope everyone is having a productive day.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      isCurrentUser: false
    },
    {
      id: '2',
      sender: 'Siti Nurhaliza',
      content: 'Morning Ahmad! Yes, we just finished the quarterly review. Results look promising.',
      timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000), // 2.5 hours ago
      isCurrentUser: false
    },
    {
      id: '3',
      sender: 'Budi Santoso',
      content: 'That\'s great news! Can we schedule a meeting to discuss the next quarter planning?',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isCurrentUser: false
    },
    {
      id: '4',
      sender: 'You',
      content: 'I agree, let\'s set up a meeting for next week. I\'ll send out calendar invites.',
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
      isCurrentUser: true
    },
    {
      id: '5',
      sender: 'Dewi Kartika',
      content: 'Perfect! Looking forward to it. Also, has anyone reviewed the new safety protocols?',
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      isCurrentUser: false
    }
  ])

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (content: string) => {
    try {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'You',
        content: content.trim(),
        timestamp: new Date(),
        isCurrentUser: true
      }

      setMessages(prev => [...prev, newMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Industry Discussion</span>
          <span className="text-sm font-normal text-muted-foreground">
            {messages.length} messages
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
          <div className="space-y-4 py-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Chat Input */}
        <div className="border-t border-border p-4">
          <ChatInput onSend={handleSendMessage} />
        </div>
      </CardContent>
    </Card>
  )
}
