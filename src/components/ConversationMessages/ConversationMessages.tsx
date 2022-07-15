import { Spin } from 'antd'
import { useContext, useEffect } from 'react'
import { Message } from '@twilio/conversations'
import { v4 } from 'uuid'

import { ConversationsContext } from '../../contexts'
import { MessageBubble } from '../MessageBubble'
import {
  ConversationMessagesContainer,
  SpinnerContainer,
  StyledUl
} from './ConversationMessages.styles'

export const ConversationMessages = (): JSX.Element => {
  const {
    conversation,
    setIsLoading,
    setMessages,
    messages,
    identity,
    showModal,
    isLoading
  } = useContext(ConversationsContext)

  useEffect(() => {
    if (conversation) {
      conversation.on('messageAdded', message => {
        setIsLoading(true)
        setMessages(oldMessages => [...oldMessages, message])
        setIsLoading(false)
      })
    }
  }, [conversation])

  const hasMessages = messages.length > 0
  const hasSpinner = showModal || isLoading

  return (
    <>
      {hasSpinner ? (
        <SpinnerContainer>
          <Spin tip='Loading' size='large' />
        </SpinnerContainer>
      ) : (
        <ConversationMessagesContainer>
          <StyledUl>
            {hasMessages &&
              messages.map((m: Message) => {
                const key = v4()
                const direction =
                  m.author === identity ? 'outgoing' : 'incoming'

                return (
                  <MessageBubble
                    key={key}
                    message={m}
                    messageDirection={direction}
                  />
                )
              })}
          </StyledUl>
        </ConversationMessagesContainer>
      )}
    </>
  )
}
