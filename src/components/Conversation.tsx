import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import styled from 'styled-components'

import { ConversationMessages } from './ConversationMessages'
import { COLOR_TWILIO_RED, WA_BINDING } from '../helpers'
import AddWASMSParticipant from './AddWASMSParticipant'
import { Conversation as ConversationType } from '@twilio/conversations'

const ConversationContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  overflow-y: scroll;
`

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  background-color: #001528;
`

const StyledInput = styled(Input)`
  width: 40rem;
  font-size: 14px;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 5rem;
  background-color: ${COLOR_TWILIO_RED};
`

export interface ConversationProps {
  conversation: ConversationType
}

export const Conversation = ({
  conversation
}: ConversationProps): JSX.Element => {
  const [newMessage, setNewMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onMessageChanged = (event: { target: { value: any } }) => {
    setNewMessage(event.target.value)
  }

  const sendMessage = async () => {
    setIsLoading(true)

    try {
      await conversation.sendMessage(newMessage)
      setNewMessage('')
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  // const onDrop = (acceptedFiles: any[]) => {
  //   conversationProxy.sendMessage({
  //     contentType: acceptedFiles[0].type,
  //     media: acceptedFiles[0]
  //   })
  // }

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
        <AddWASMSParticipant binding={WA_BINDING} />
        <AddWASMSParticipant binding={''} />
        <Button danger htmlType='submit' style={{ minWidth: '5rem' }}>
          Remove
        </Button>
      </ButtonsContainer>
    </ConversationContainer>
  )
}
