import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { Send } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { 
  fetchMessages, 
  sendMessage, 
  selectMessages, 
  selectMessagesLoading, 
  selectChatError 
} from '@/features/chatSlice'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { selectCurrentUser } from "@/features/authSlice"

const MessageContent = ({ content }: { content: any }) => {
  if (typeof content === 'object' && content !== null) {
    return <pre className="whitespace-pre-wrap">{JSON.stringify(content, null, 2)}</pre>;
  }
  return <p>{content}</p>;
};



export default function ChatPage() {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const messages = useAppSelector(selectMessages)
  const loading = useAppSelector(selectMessagesLoading)
  const error = useAppSelector(selectChatError)
  const user = useAppSelector(selectCurrentUser)

  // Add this new function to determine if message is from the current user
const isCurrentUserMessage = (message: any) => {
  // You can adjust this logic based on how you identify the current user
  return message.sender === user?.username || message.isCurrentUser;
}
  
  const [input, setInput] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (id) {
      dispatch(fetchMessages(parseInt(id)))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    console.log("input",input);
    
    if ( input !== '' && id) {
      await dispatch(sendMessage({ 
        chatId: parseInt(id), 
        content: input 
      }))
      
      setInput('')
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Loading messages...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-xl text-destructive">{error}</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-screen max-h-screen overflow-hidden">
      <header className="flex justify-between items-center p-4 border-b shrink-0">
        <h1 className="text-2xl font-bold">Chat</h1>
      </header>
      <ScrollArea className="flex-1 h-[calc(100vh-8rem)]" ref={scrollAreaRef}>
        <div className="p-4">
          <div className="space-y-4 flex flex-col">
            {messages?.length > 0 && [...messages].reverse().map((message) => (
              <div
                key={message.id}
                className={`flex ${isCurrentUserMessage(message) ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    isCurrentUserMessage(message)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p className="font-semibold">{message.sender}</p>
                  <MessageContent content={message.content} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="p-4 border-t shrink-0">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

