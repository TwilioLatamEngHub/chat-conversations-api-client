import { useContext, useState } from 'react'
import { Button, Form, Input } from 'antd'
import styled from 'styled-components'
import { Conversation as ConversationType } from '@twilio/conversations'

import { ConversationMessages } from './ConversationMessages'
import { COLOR_TWILIO_RED, WA_BINDING } from '../helpers'
import AddWASMSParticipant from './AddWASMSParticipant'
import { createMessage } from '../services/functions'
import { ConversationsContext } from '../contexts'

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
  const { identity } = useContext(ConversationsContext)
  const [newMessage, setNewMessage] = useState<string>('')
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onMessageChanged = (event: any) => {
    setNewMessage(event.target.value)
    setMessages(oldMessages => [...oldMessages, newMessage])
  }

  const sendMessage = async () => {
    setIsLoading(true)

    try {
      await createMessage({
        conversationSid: conversation.sid,
        author: identity,
        body: newMessage
      })
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
      <ConversationMessages
        conversation={conversation}
        messages={messages}
        setMessages={setMessages}
      />
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
