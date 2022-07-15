import { useContext, useState } from 'react'
import { Button, Form, Modal } from 'antd'
import styled from 'styled-components'

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
import { useMessageChange } from '../../hooks'
import { getConversations } from '../../services/functions'
import { sortArray } from '../../helpers'

export const RemoveButton = styled(Button)`
  min-width: 5rem;
`

const { confirm } = Modal

export const Conversation = (): JSX.Element => {
  const {
    conversation,
    setConversation,
    setIsLoading,
    setBadgeStatus,
    setBadgeText,
    setLocalSid,
    setConversations
  } = useContext(ConversationsContext)
  const { newMessage, setNewMessage, onMessageChanged } = useMessageChange()
  const [buttonIsLoading, setButtonIsLoading] = useState<boolean>(false)

  const sendMessage = async () => {
    setButtonIsLoading(true)

    try {
      if (conversation) {
        await conversation.sendMessage(newMessage)

        setNewMessage('')
        setButtonIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setButtonIsLoading(false)
    }
  }

  const handleRemove = async () => {
    setBadgeStatus('warning')
    setBadgeText('Removing conversation')
    setIsLoading(true)

    try {
      if (conversation) {
        await conversation.delete()
        const { conversations } = await getConversations()

        setConversation(null)
        setLocalSid('')
        const sortedArr = sortArray(conversations)
        setConversations(sortedArr)

        setBadgeStatus('success')
        setBadgeText('Conversation removed')
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setBadgeStatus('error')
      setBadgeText('Unable to remove the conversation')
      setIsLoading(false)
    }
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this conversation?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleRemove()
      }
    })
  }

  return conversation ? (
    <ConversationContainer>
      <ConversationMessages />
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
        <RemoveButton danger htmlType='submit' onClick={showDeleteConfirm}>
          Delete Conversation
        </RemoveButton>
      </ButtonsContainer>
    </ConversationContainer>
  ) : (
    <div />
  )
}
