import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { fetchChats, selectChats, selectChatsLoading } from '@/features/chatSlice'
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from '@/lib/utils'

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const chats = useAppSelector(selectChats)
  const loading = useAppSelector(selectChatsLoading)
  const { id } = useParams()

  useEffect(() => {
    dispatch(fetchChats())    
  }, [dispatch])

  if (loading) {
    return (
      <div className="w-80 border-r p-4">
        <p className="text-muted-foreground">Loading chats...</p>
      </div>
    )
  }

  return (
    <div className="w-80 border-r">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Chats</h2>
      </div>
      <ScrollArea className="h-[calc(90vh-65px)]">
        <div className="p-2">
          {chats?.length>0 && chats.map((chat) => (
            <Link
              key={chat.id}
              to={`/chats/${chat.id}`}
              className={cn(
                "block p-3 rounded-lg hover:bg-secondary transition-colors",
                id === chat.id.toString() && "bg-secondary"
              )}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{chat.sender}</p>
                  {chat.last_message && (
                    <p className="text-sm text-muted-foreground truncate">
                      {chat.last_message.content}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

