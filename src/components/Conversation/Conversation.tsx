import { useCallback, useState } from 'react'
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

export interface ConversationProps {
  conversation: ConversationType
}

export const Conversation = ({
  conversation
}: ConversationProps): JSX.Element => {
  const [newMessage, setNewMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onMessageChanged = (event: any) => {
    setNewMessage(event.target.value)
  }

  const sendMessage = useCallback(async () => {
    setIsLoading(true)

    try {
      await conversation.sendMessage(newMessage)

      setNewMessage('')
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
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
            disabled={isLoading}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType='submit'
            style={{ minWidth: '5rem', fontSize: '14px' }}
            loading={isLoading}
          >
            Enter
          </Button>
        </Form.Item>
      </StyledForm>
      <ButtonsContainer>
        <AddParticipantButton binding={WA_BINDING} />
        <AddParticipantButton binding={SMS_BINDING} />
        <AddParticipantButton binding={CHAT_BINDING} />
        <Button danger htmlType='submit' style={{ minWidth: '5rem' }}>
          Remove
        </Button>
      </ButtonsContainer>
    </ConversationContainer>
  )
}
