import { useCallback, useContext, useEffect, useState } from 'react'
import { Button, Form } from 'antd'
import { Conversation as ConversationType } from '@twilio/conversations'

import { ConversationMessages } from '../ConversationMessages'
import {
  AddParticipantButton,
  WA_BINDING,
  SMS_BINDING,
  CHAT_BINDING
} from '../Buttons'
import {
  ButtonsContainer,
  ConversationContainer,
  StyledForm,
  StyledInput
} from './Conversation.styles'
import { ConversationsContext } from '../../contexts'

export interface ConversationProps {
  conversation: ConversationType
}

export const Conversation = ({
  conversation
}: ConversationProps): JSX.Element => {
  const { setIsLoading, setMessages } = useContext(ConversationsContext)
  const [newMessage, setNewMessage] = useState<string>('')
  const [buttonIsLoading, setButtonIsLoading] = useState<boolean>(false)

  useEffect(() => {
    conversation.on('messageAdded', message => {
      setIsLoading(true)
      setMessages(oldMessages => [...oldMessages, message])
      setIsLoading(false)
    })
  }, [conversation])

  const onMessageChanged = (event: any) => {
    setNewMessage(event.target.value)
  }

  const sendMessage = useCallback(async () => {
    setButtonIsLoading(true)

    try {
      await conversation.sendMessage(newMessage)

      setNewMessage('')
      setButtonIsLoading(false)
    } catch (error) {
      console.log(error)
      setButtonIsLoading(false)
    }
  }, [newMessage, setNewMessage])

  return (
    <ConversationContainer>
      <ConversationMessages conversation={conversation} />
      <StyledForm size='large' layout='inline' onFinish={sendMessage}>
        <Form.Item>
          <StyledInput
            placeholder={'Type your message here...'}
            type={'text'}
            name={'message'}
            autoComplete={'off'}
            onChange={onMessageChanged}
            value={newMessage}
            disabled={buttonIsLoading}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType='submit'
            style={{ minWidth: '5rem', fontSize: '14px' }}
            loading={buttonIsLoading}
          >
            Enter
          </Button>
        </Form.Item>
      </StyledForm>
      <ButtonsContainer>
        <AddParticipantButton
          conversation={conversation}
          binding={CHAT_BINDING}
        />
        <AddParticipantButton
          conversation={conversation}
          binding={WA_BINDING}
        />
        <AddParticipantButton
          conversation={conversation}
          binding={SMS_BINDING}
        />
        <Button danger htmlType='submit' style={{ minWidth: '5rem' }}>
          Remove
        </Button>
      </ButtonsContainer>
    </ConversationContainer>
  )
}
