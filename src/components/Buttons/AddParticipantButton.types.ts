import { Conversation as ConversationType } from '@twilio/conversations'

export const WA_BINDING = 'wa'
export const SMS_BINDING = 'sms'
export const CHAT_BINDING = 'chat'

export type Bindings =
  | typeof WA_BINDING
  | typeof SMS_BINDING
  | typeof CHAT_BINDING

export interface AddParticipantButtonProps {
  binding: Bindings
  conversation: ConversationType
}
