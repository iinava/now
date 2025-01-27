import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { fetchChats, selectChats, selectChatsLoading } from '@/features/chatSlice'
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const chats = useAppSelector(selectChats)
  const loading = useAppSelector(selectChatsLoading)
  const { id } = useParams()
  const [isExpanded, setIsExpanded] = useState(true)

  useEffect(() => {
    dispatch(fetchChats())    
  }, [dispatch])

  if (loading) {
    return (
      <div className={cn(
        "border-r transition-all duration-300 flex flex-col",
        isExpanded ? "w-80" : "w-16"
      )}>
        <p className="text-muted-foreground p-4">Loading...</p>
      </div>
    )
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase()
  }

  return (
    <div className={cn(
      "border-r transition-all duration-300 flex flex-col relative",
      isExpanded ? "w-80" : "w-16"
    )}>
      {/* Header */}
      <div className="p-5 border-b flex justify-between items-center">
        {isExpanded ? (
          <h2 className="font-semibold">Chats</h2>
        ) : (
          <h2 className="font-semibold text-center w-full">💬</h2>
        )}
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-20 z-50 rounded-full bg-primary text-primary-foreground w-8 h-8"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>

      {/* Chat List */}
      <ScrollArea className="h-[calc(90vh-65px)]">
        <div className="p-2">
          {chats?.length > 0 && chats.map((chat) => (
            <Link
              key={chat.id}
              to={`/chats/${chat.id}`}
              className={cn(
                "block rounded-lg hover:bg-secondary transition-colors",
                id === chat.id.toString() && "bg-secondary",
                isExpanded ? "p-3" : "p-2"
              )}
            >
              <div className="flex justify-between items-start">
                {isExpanded ? (
                  <div>
                    <p className="font-medium">{chat.sender}</p>
                    {chat.last_message && (
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.last_message.content}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="w-full text-center">
                    <div className="w-8 h-8 rounded-full bg-secondary-foreground/10 flex items-center justify-center mx-auto">
                      <span className="text-sm font-medium">
                        {getInitials(chat.sender)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

