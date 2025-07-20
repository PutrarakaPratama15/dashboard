import ChatWindow from '@/components/chat/ChatWindow'
import { Badge } from '@/components/ui/badge'

export default function ChatPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Industry Group Chat</h2>
          <p className="text-muted-foreground">
            Connect and communicate with industry professionals in real-time
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">24 Online</Badge>
        </div>
      </div>
      
      <div className="max-w-4xl">
        <ChatWindow />
      </div>
    </div>
  )
}
