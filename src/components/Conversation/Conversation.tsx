import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState
} from 'react'
import { Button, Form } from 'antd'
import { Conversation as ConversationType } from '@twilio/conversations'

import { ConversationMessages } from '../ConversationMessages/ConversationMessages'
import { WA_BINDING } from '../../helpers'
import AddWASMSParticipant from '../AddWASMSParticipant'
import { createMessage } from '../../services/functions'
import { ConversationsContext } from '../../contexts'
import {
  ButtonsContainer,
  ConversationContainer,
  StyledForm,
  StyledInput
} from './Conversation.styles'

export interface ConversationProps {
  conversation: ConversationType
  setLocalSid?: Dispatch<SetStateAction<string>>
}

export const Conversation = ({
  conversation,
  setLocalSid
}: ConversationProps): JSX.Element => {
  const { identity, setMessages } = useContext(ConversationsContext)
  const [newMessage, setNewMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onMessageChanged = (event: any) => {
    setNewMessage(event.target.value)
  }

  const sendMessage = useCallback(async () => {
    setIsLoading(true)

    // TODO: Create message via SDK and delete function
    try {
      await createMessage({
        conversationSid: conversation.sid,
        author: identity,
        body: newMessage
      })
      setMessages(oldMessages => [...oldMessages, newMessage])
      setNewMessage('')
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }, [newMessage, setNewMessage])

  return (
    <ConversationContainer>
      <ConversationMessages
        conversation={conversation}
        setLocalSid={setLocalSid}
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
