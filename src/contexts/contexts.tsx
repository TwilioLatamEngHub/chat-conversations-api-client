import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

export interface ConversationsContextData {
  identity: string
  setIdentity: Dispatch<SetStateAction<string>>
  selectedConversationSid: string
  setSelectedConversationSid: Dispatch<SetStateAction<string>>
  conversations: any[]
  setConversations: Dispatch<SetStateAction<any[]>>
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  isNewConversation: boolean
  setIsNewConversation: Dispatch<SetStateAction<boolean>>
  conversationContent: JSX.Element | null
  setConversationContent: Dispatch<SetStateAction<JSX.Element | null>>
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
  const [selectedConversationSid, setSelectedConversationSid] =
    useState<string>('')
  const [conversations, setConversations] = useState<any[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [isNewConversation, setIsNewConversation] = useState<boolean>(false)
  const [conversationContent, setConversationContent] =
    useState<JSX.Element | null>(null)

  const conversationsContextDefaultValue = {
    identity,
    setIdentity,
    selectedConversationSid,
    setSelectedConversationSid,
    conversations,
    setConversations,
    showModal,
    setShowModal,
    isNewConversation,
    setIsNewConversation,
    conversationContent,
    setConversationContent
  }

  return (
    <ConversationsContext.Provider value={conversationsContextDefaultValue}>
      {children}
    </ConversationsContext.Provider>
  )
}
