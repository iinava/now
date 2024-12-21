import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const chatList = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Bob Johnson' },
  { id: '4', name: 'Alice Williams' },
  { id: '5', name: 'Charlie Brown' },
  { id: '6', name: 'Eva Green' },
  { id: '7', name: 'Frank White' },
  { id: '8', name: 'Grace Lee' },
  { id: '9', name: 'Henry Ford' },
  { id: '10', name: 'Ivy Chen' },
  { id: '11', name: 'Jack Black' },
  { id: '12', name: 'Kelly Clarkson' },
  { id: '13', name: 'Liam Neeson' },
  { id: '14', name: 'Mia Wallace' },
  { id: '15', name: 'Nathan Drake' },
]

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation()

  return (
    <aside 
      className={`border-r transition-all duration-300 flex flex-col h- ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex justify-between items-center p-[14px] border-b shrink-0 ">
        {!isCollapsed && <h2 className="text-xl font-semibold">Chats</h2>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-2">
          {chatList.map((chat) => (
            <Button
              key={chat.id}
              variant={location.pathname === `/chats/${chat.id}` ? "secondary" : "ghost"}
              className="w-full justify-start mb-1"
              asChild
            >
              <Link to={`/chats/${chat.id}`}>
                {isCollapsed ? chat.name[0] : chat.name}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t shrink-0">
        <Button size="icon" className="w-full">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </aside>
  )
}

