import { Spin } from 'antd'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

import { ConversationsContext } from '../contexts'
import { ConversationProps } from './Conversation'
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

export const ConversationMessages = ({
  conversation
}: ConversationProps): JSX.Element => {
  const { identity, showModal } = useContext(ConversationsContext)
  const [messages, setMessages] = useState<any>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      const { items } = await conversation.getMessages()
      setMessages(items)
    }
    fetchMessages()
  }, [conversation, messages, setMessages])

  return (
    <ConversationMessagesContainer>
      {showModal || !messages ? (
        <Spin tip='Loading conversation messages' size='large' />
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