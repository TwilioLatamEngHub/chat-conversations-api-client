import { useContext } from 'react'
import { message } from 'antd'
import { Client as ConversationsClient } from '@twilio/conversations'

import { addChatParticipant } from '../services/functions'
import { ConversationsContext } from '../contexts'
import { getToken } from '../services/functions'

declare global {
  interface Window {
    conversationsClient: any
  }
}

interface useInitConversationsReturn {
  handleInitConversations: (name: string) => Promise<void>
}

const handleAddChatParticipant = async (name: string): Promise<void> => {
  try {
    const response = await addChatParticipant(name)
    if (response.participantSid !== undefined) {
      message.success('Username added as a chat participant')
    } else {
      message.success('Username already exists as a chat participant')
    }
  } catch (error) {
    console.log(error)
  }
}

export const useInitConversations = (): useInitConversationsReturn => {
  const {
    setStatus,
    setStatusString,
    setLoggedIn,
    conversations,
    setConversations
  } = useContext(ConversationsContext)

  const handleInitConversations = async (name: string): Promise<void> => {
    const response = Promise.resolve(getToken(name))

    return response
      .then((res: any) => {
        setLoggedIn(true)
        return res.accessToken
      })
      .then(async token => {
        console.log('token')
        console.log(token)
        if (token) {
          window.conversationsClient = await ConversationsClient.create(token)
          const conversationsClient = window.conversationsClient

          setStatusString('Connecting to Twilio…')

          conversationsClient.on('connectionStateChanged', (state: string) => {
            if (state === 'connecting') {
              setStatusString('Connecting to Twilio…')
              setStatus('default')
            }
            if (state === 'connected') {
              setStatusString('You are connected.')
              setStatus('success')

              handleAddChatParticipant(name)
            }
            if (state === 'disconnecting') {
              setStatusString('Disconnecting from Twilio…')
              setStatus('default')
            }
            if (state === 'disconnected') {
              setStatusString('Disconnected')
              setStatus('warning')
            }
            if (state === 'denied') {
              setStatusString('Failed to connect.')
              setStatus('error')
            }
          })

          conversationsClient.on('conversationJoined', (conversation: any) => {
            setConversations([...conversations, conversation])
          })

          conversationsClient.on('conversationLeft', (conversation: any) => {
            setConversations([
              ...conversations.filter(it => it !== conversation)
            ])
          })
        }
      })
      .catch((err: any) => console.error(err))
  }

  return { handleInitConversations }
}