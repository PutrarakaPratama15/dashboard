'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ChatInputProps {
  onSend: (message: string) => void
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSending, setIsSending] = useState(false)

  const validateMessage = (msg: string): boolean => {
    if (!msg.trim()) {
      setError('Message cannot be empty')
      return false
    }
    
    if (msg.trim().length > 500) {
      setError('Message is too long (max 500 characters)')
      return false
    }
    
    setError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateMessage(message)) {
      return
    }

    setIsSending(true)
    
    try {
      onSend(message)
      setMessage('')
      setError('')
    } catch (error) {
      console.error('Error sending message:', error)
      setError('Failed to send message. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMessage(value)
    
    // Clear error when user starts typing
    if (error && value.trim()) {
      setError('')
    }
  }

  return (
    <div className="space-y-2">
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={isSending}
          className={`flex-1 ${error ? 'border-destructive' : ''}`}
          maxLength={500}
        />
        
        <Button 
          type="submit" 
          disabled={!message.trim() || isSending}
          className="px-6"
        >
          {isSending ? 'Sending...' : 'Send'}
        </Button>
      </form>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span>{message.length}/500</span>
      </div>
    </div>
  )
}
