import { Spin } from 'antd'
import { useContext, useEffect } from 'react'
import { Message } from '@twilio/conversations'

import { ConversationsContext } from '../../contexts'
import { MessageBubble } from '../MessageBubble'
import {
  ConversationMessagesContainer,
  SpinnerContainer,
  StyledUl
} from './ConversationMessages.styles'
import { ConversationProps } from '../Conversation/'

export const ConversationMessages = ({
  conversation
}: ConversationProps): JSX.Element => {
  const {
    messages,
    setMessages,
    identity,
    showModal,
    isLoading,
    setIsLoading,
    setLocalSid
  } = useContext(ConversationsContext)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const result = await conversation.getMessages()
        console.log('messages')
        console.log(result)
        setMessages(result.items)
        setLocalSid(conversation.sid)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    }
    fetchMessages()
  }, [conversation])

  useEffect(() => {
    conversation.on('messageAdded', message => {
      setIsLoading(true)
      setMessages(oldMessages => [...oldMessages, message])
      setIsLoading(false)
    })
  }, [])

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
                const direction =
                  m.author === identity ? 'outgoing' : 'incoming'

                return (
                  <MessageBubble
                    key={m.sid}
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
