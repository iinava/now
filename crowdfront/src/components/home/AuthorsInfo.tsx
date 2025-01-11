import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle } from 'lucide-react'

export default function AuthorInfo() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-6 border-b border-gray-700">
      <div className="flex items-center mb-4 md:mb-0">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Author" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold text-gray-100">John Doe</h2>
          <p className="text-gray-400">Project Lead</p>
        </div>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        <MessageCircle className="mr-2 h-4 w-4" /> Message
      </Button>
    </div>
  )
}

