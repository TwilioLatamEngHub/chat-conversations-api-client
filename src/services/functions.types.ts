import { ParticipantType } from '@twilio/conversations'

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

export interface GetConversationsReturn {
  conversations: any[]
}

export interface GetTokenReturn {
  accessToken: string
}
