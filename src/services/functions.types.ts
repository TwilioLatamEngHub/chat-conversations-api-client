type ParticipantType = 'whatsapp' | 'sms' | 'chat'

export interface AddParticipantParams {
  participantType: ParticipantType
  conversationSid: string
  identity?: string
  number?: string
}

export interface AddParticipantReturn {
  participantSid: string
}

export interface CreateConversationReturn {
  conversation: any
}

export interface CreateMessageParams {
  conversationSid: string
  author: string
  body: string
}

export interface CreateMessageReturn {
  message: any
}

export interface GetConversationsReturn {
  conversations: any[]
}

export interface GetMessagesReturn {
  messages: any[]
}

export interface GetTokenReturn {
  accessToken: string
}
