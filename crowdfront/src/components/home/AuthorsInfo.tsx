import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/store/store'
import { createChat } from '@/features/chatSlice'

export default function AuthorInfo({author, authorId}:{author:string, authorId: number}) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleMessageClick = async () => {
    try {
      console.log(authorId,"authorId")
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
    <div className="flex flex-col md:flex-row items-center justify-between py-6 border-b border-gray-700">
      <div className="flex items-center mb-4 md:mb-0">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Author" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold text-gray-100">{author}</h2>
          <p className="text-gray-400">Project Author</p>
        </div>
      </div>
      <Button 
        className="bg-blue-600 hover:bg-blue-700 text-white"
        onClick={handleMessageClick}
      >
        <MessageCircle className="mr-2 h-4 w-4" /> Message
      </Button>
    </div>
  )
}

