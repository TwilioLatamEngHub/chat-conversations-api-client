/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react'
import { Button, Form, Input } from 'antd'
import styled from 'styled-components'

import '../assets/Conversation.css'
import styles from '../assets/Conversation.module.css'
import { ConversationsMessages } from './ConversationsMessages'
import { COLOR_TWILIO_RED, WA_BINDING } from '../helpers'
import AddWASMSParticipant from './AddWASMSParticipant'
import { Conversation as ConversationType } from '@twilio/conversations'

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  background-color: #001528;
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
    <div className={styles.messages} style={{ overflowY: 'scroll' }}>
      <ConversationsMessages conversation={conversation} />
      <StyledForm size='large' layout='inline' onFinish={sendMessage}>
        <Form.Item>
          <Input
            placeholder={'Type your message here...'}
            type={'text'}
            name={'message'}
            id={styles['type-a-message']}
            autoComplete={'off'}
            onChange={onMessageChanged}
            value={newMessage}
            disabled={isLoading}
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType='submit'
            style={{ minWidth: '5rem' }}
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
    </div>
  )
}
