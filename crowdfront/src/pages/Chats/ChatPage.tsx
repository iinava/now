import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { Send } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const demoChats = {
  '1': [
    { id: 1, sender: 'John', content: 'Hey, how are you?' },
    { id: 2, sender: 'You', content: 'I\'m good, thanks! How about you?' },
    { id: 3, sender: 'John', content: 'Doing well, thanks for asking!' },
  ],
  '2': [
    { id: 1, sender: 'Jane', content: 'Did you finish the project?' },
    { id: 2, sender: 'You', content: 'Almost done, just need to add some final touches.' },
    { id: 3, sender: 'Jane', content: 'Great! Let me know when it\'s ready for review.' },
  ],
  '3': [
    { id: 1, sender: 'Bob', content: 'Are we still on for lunch tomorrow?' },
    { id: 2, sender: 'You', content: 'Yes, definitely! Same place as usual?' },
    { id: 3, sender: 'Bob', content: 'Sounds good, see you then!' },
  ],
  '4': [
    { id: 1, sender: 'Alice', content: 'Have you seen the latest movie?' },
    { id: 2, sender: 'You', content: 'Not yet, is it worth watching?' },
    { id: 3, sender: 'Alice', content: 'You should check it out this weekend.' },
  ],
  '5': [
    { id: 1, sender: 'Charlie', content: 'Don\'t forget about the meeting at 3 PM.' },
    { id: 2, sender: 'You', content: 'Thanks for the reminder. I\'ll be there.' },
    { id: 3, sender: 'Charlie', content: 'Great, see you in the conference room.' },
  ],
}

export default function ChatPage() {
  const { id } = useParams()
  
  const [messages, setMessages] = useState(demoChats[id] || [])
  const [input, setInput] = useState('')
  const scrollAreaRef = useRef(null)

  useEffect(() => {
    setMessages(demoChats[id] || [])
    
  }, [id])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: 'You', content: input.trim() }
      ])
      setInput('')
    }
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
       <header className="flex justify-between items-center p-4 border-b">
          <h1 className="text-2xl font-bold">Neil </h1>
        </header>
      <ScrollArea className="flex-1">
        <div className="p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message:any) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === 'You'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p className="font-semibold">{message.sender}</p>
                  <p>{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
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

