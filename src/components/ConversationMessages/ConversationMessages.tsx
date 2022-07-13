import { Spin } from 'antd'
import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { Conversation as ConversationType } from '@twilio/conversations'

import { ConversationsContext } from '../../contexts'
import { getMessages } from '../../services/functions'
import { MessageBubble } from '../MessageBubble'
import {
  ConversationMessagesContainer,
  StyledUl
} from './ConversationMessages.styles'

interface ConversationMessagesProps {
  conversation: ConversationType
  messages: any[]
  setMessages: Dispatch<SetStateAction<any[]>>
}

export const ConversationMessages = ({
  conversation,
  messages,
  setMessages
}: ConversationMessagesProps): JSX.Element => {
  const { identity, showModal, isLoading } = useContext(ConversationsContext)

  useEffect(() => {
    const fetchMessages = async () => {
      const { messages } = await getMessages(conversation.sid)
      setMessages(messages)
    }
    fetchMessages()
  }, [])

  const hasSpinner = showModal || !messages || isLoading

  console.log('messages')
  console.log(messages)

  return (
    <ConversationMessagesContainer>
      {hasSpinner ? (
        <Spin tip='Loading' size='large' />
      ) : (
        <StyledUl>
          {/* {messages &&
            messages.map((m: any) =>
              m.author === identity ? (
                <MessageBubble key={m.index} direction='outgoing' message={m} />
              ) : (
                <MessageBubble key={m.index} direction='incoming' message={m} />
              )
            )} */}
        </StyledUl>
      )}
    </ConversationMessagesContainer>
  )
}
