import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { fetchChats, selectChats, selectChatsLoading, selectChatError } from '@/features/chatSlice'

export default function Chat() {
  const dispatch = useAppDispatch()
  const chats = useAppSelector(selectChats)
  const loading = useAppSelector(selectChatsLoading)
  const error = useAppSelector(selectChatError)

  useEffect(() => {
    dispatch(fetchChats())
  }, [dispatch])

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Loading chats...</p>
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

  if (chats.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-xl text-muted-foreground">No chats available</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <p className="text-xl text-muted-foreground">Select a chat to start messaging</p>
    </div>
  )
}

