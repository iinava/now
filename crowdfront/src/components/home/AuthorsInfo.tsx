import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store/store'
import { createChat } from '@/features/chatSlice'

export default function AuthorInfo({ author, authorId, isOwner }: { author: string, authorId: number, isOwner: boolean }) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
console.log(isOwner, "isOwner");

  const handleMessageClick = async () => {
    try {
      console.log(authorId, "authorId")
      // Create or get existing chat
      const resultAction = await dispatch(createChat({ receiver: authorId }))
      if (createChat.fulfilled.match(resultAction)) {
        // Navigate to the chat page with the chat ID
        navigate(`/chats/${resultAction.payload.id}`)
      }
    } catch (error) {
      console.error('Failed to create chat:', error)
    }
  }

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3 bg-orange-500"></Avatar>
        <div className="flex items-center text-sm text-gray-400">
          <span>{author}</span>
          <span className="mx-2">•</span>
          <span>5 min read</span>
        </div>
      </div>
      {
      isOwner ? '' :
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-gray-300"
          onClick={handleMessageClick}
        >
          <MessageCircle className="mr-2 h-4 w-4" /> Message
        </Button>
        }
    </div>
  )
}

