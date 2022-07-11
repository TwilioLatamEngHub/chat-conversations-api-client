import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Button, Form, Input } from 'antd'
import styled from 'styled-components'

import '../assets/Conversation.css'
import styles from '../assets/Conversation.module.css'
import ConversationsMessages from './ConversationsMessages'
import { ConversationsContext } from '../contexts'
import { COLOR_TWILIO_RED, WA_BINDING } from '../helpers'
import AddWASMSParticipant from './AddWASMSParticipant'

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

interface ConversationProps {
  selectedConversation: any
}

export const Conversation = ({
  selectedConversation
}: ConversationProps): JSX.Element => {
  const count = useRef(0)
  const { name } = useContext(ConversationsContext)
  const [newMessage, setNewMessage] = useState('')
  const [conversationProxy] = useState<any>(selectedConversation)
  const [messages, setMessages] = useState<any[]>([])
  const [loadingState, setLoadingState] = useState('initializing')
  const [boundConversations, setBoundConversations] = useState(new Set())

  const loadMessagesFor = useCallback(
    (thisConversation: any) => {
      if (conversationProxy === thisConversation) {
        thisConversation
          .getMessages()
          .then((messagePaginator: any) => {
            if (conversationProxy === thisConversation) {
              setMessages(messagePaginator.items)
              setLoadingState('ready')
            }
          })
          .catch((err: any) => {
            console.error("Couldn't fetch messages IMPLEMENT RETRY", err)
            setLoadingState('failed')
          })
      }
    },
    [conversationProxy]
  )

  const messageAdded = useCallback(
    (message: any, targetConversation: any) => {
      if (targetConversation === conversationProxy) {
        setMessages(oldMessages => [...oldMessages, message])
      }
    },
    [conversationProxy]
  )

  useEffect(() => {
    if (count.current === 0) {
      if (conversationProxy) {
        loadMessagesFor(conversationProxy)

        if (!boundConversations.has(conversationProxy)) {
          let newConversation = conversationProxy
          newConversation.on('messageAdded', (message: any) => {
            messageAdded(message, newConversation)
            setBoundConversations(
              new Set([...boundConversations, newConversation])
            )
          })
        }
      }
      count.current++
    } else {
      if (conversationProxy !== selectedConversation) {
        loadMessagesFor(conversationProxy)

        if (!boundConversations.has(conversationProxy)) {
          let newConversation = conversationProxy
          newConversation.on('messageAdded', (message: any) => {
            messageAdded(message, newConversation)
            setBoundConversations(
              new Set([...boundConversations, newConversation])
            )
          })
        }
      }
    }
  })

  const onMessageChanged = (event: { target: { value: any } }) => {
    setNewMessage(event.target.value)
  }

  const sendMessage = () => {
    conversationProxy.sendMessage(newMessage)
    setNewMessage('')
  }

  // const onDrop = (acceptedFiles: any[]) => {
  //   conversationProxy.sendMessage({
  //     contentType: acceptedFiles[0].type,
  //     media: acceptedFiles[0]
  //   })
  // }

  return (
    <div className={styles.messages} style={{ overflowY: 'scroll' }}>
      <ConversationsMessages identity={name} messages={messages} />
      <StyledForm
        size='large'
        layout='inline'
        onFinish={(values: any) => {
          setNewMessage(values)
          sendMessage()
        }}
      >
        <Form.Item>
          <Input
            placeholder={'Type your message here...'}
            type={'text'}
            name={'message'}
            id={styles['type-a-message']}
            autoComplete={'off'}
            disabled={loadingState !== 'ready'}
            onChange={onMessageChanged}
            value={newMessage}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' style={{ minWidth: '5rem' }}>
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
