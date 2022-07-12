import { Spin } from 'antd'
import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Conversation as ConversationType } from '@twilio/conversations'

import { ConversationsContext } from '../contexts'
import { getMessages } from '../services/functions'
import MessageBubble from './MessageBubble'

const ConversationMessagesContainer = styled.div`
  margin: 0.5rem;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledUl = styled.ul`
  padding: 0 40px;
  width: 100%;
  max-height: 95%;
`

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
      // Create Get Messages function
      const { messages } = await getMessages(conversation.sid)
      console.log('getMessages response')
      console.log(messages)
      setMessages(messages)
    }
    fetchMessages()
  }, [])

  const hasSpinner = showModal || !messages || isLoading

  return (
    <ConversationMessagesContainer>
      {hasSpinner ? (
        <Spin tip='Loading' size='large' />
      ) : (
        <StyledUl>
          {messages &&
            messages.map((m: any) =>
              m.author === identity ? (
                <MessageBubble key={m.index} direction='outgoing' message={m} />
              ) : (
                <MessageBubble key={m.index} direction='incoming' message={m} />
              )
            )}
        </StyledUl>
      )}
    </ConversationMessagesContainer>
  )
}
