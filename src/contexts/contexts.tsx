import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

export interface ConversationsContextData {
  name: string
  setName: Dispatch<SetStateAction<string>>
  loggedIn: boolean
  setLoggedIn: Dispatch<SetStateAction<boolean>>
  selectedConversationSid: string
  setSelectedConversationSid: Dispatch<SetStateAction<string>>
  conversations: any[]
  setConversations: Dispatch<SetStateAction<any[]>>
}

interface ConversationsContentProviderProps {
  children: React.ReactNode
}

export const ConversationsContext = createContext(
  {} as ConversationsContextData
)

export const ConversationsContentProvider = ({
  children
}: ConversationsContentProviderProps) => {
  const [name, setName] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [selectedConversationSid, setSelectedConversationSid] = useState('')
  const [conversations, setConversations] = useState<any[]>([])

  const conversationsContextDefaultValue = {
    name,
    setName,
    loggedIn,
    setLoggedIn,
    selectedConversationSid,
    setSelectedConversationSid,
    conversations,
    setConversations
  }

  return (
    <ConversationsContext.Provider value={conversationsContextDefaultValue}>
      {children}
    </ConversationsContext.Provider>
  )
}
