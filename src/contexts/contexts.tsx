import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

export interface ConversationsContextData {
  identity: string
  setIdentity: Dispatch<SetStateAction<string>>
  loggedIn: boolean
  setLoggedIn: Dispatch<SetStateAction<boolean>>
  conversations: any[]
  setConversations: Dispatch<SetStateAction<any[]>>
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  conversationContent: JSX.Element | null
  setConversationContent: Dispatch<SetStateAction<JSX.Element | null>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  messages: any[]
  setMessages: Dispatch<SetStateAction<any[]>>
  token: string
  setToken: Dispatch<SetStateAction<string>>
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
  const [identity, setIdentity] = useState<string>('')
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [conversations, setConversations] = useState<any[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [conversationContent, setConversationContent] =
    useState<JSX.Element | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<any[]>([])
  const [token, setToken] = useState<string>('')

  const conversationsContextDefaultValue = {
    identity,
    setIdentity,
    loggedIn,
    setLoggedIn,
    conversations,
    setConversations,
    showModal,
    setShowModal,
    conversationContent,
    setConversationContent,
    isLoading,
    setIsLoading,
    messages,
    setMessages,
    token,
    setToken
  }

  return (
    <ConversationsContext.Provider value={conversationsContextDefaultValue}>
      {children}
    </ConversationsContext.Provider>
  )
}
