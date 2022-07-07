import React, { useEffect, useState, FC } from 'react'
import { Client as ConversationsClient } from '@twilio/conversations'
import { Badge, Collapse, Icon, Layout, message, Typography } from 'antd'

import '../assets/Conversation.css'
import '../assets/ConversationSection.css'
import { ReactComponent as Logo } from '../assets/twilio-mark-red.svg'

import Conversation from '../components/Conversation'
import RemoveButton from '../components/RemoveButton'
import LoginPage from './LoginPage'
import AddWASMSParticipant from '../components/AddWASMSParticipant'
import { ConversationsList } from '../components/ConversationsList'
import { HeaderItem } from '../components/HeaderItem'
import { PARTICIPANTS, WA_BINDING } from '../helpers/constants'
import { addChatParticipant, getToken } from '../services/functions'

const { Panel } = Collapse
const { Content, Sider, Header } = Layout
const { Text } = Typography

// add React.ElementType to components
const IconComponent = Icon as unknown as React.ElementType
const CollapseComponent = Collapse as unknown as React.ElementType
const PanelComponent = Panel as unknown as React.ElementType
const LoginPageComponent = LoginPage as React.ElementType

declare global {
  interface Window {
    conversationsClient: any
  }
}

type badgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning'

export const ConversationsApp: FC = (): JSX.Element => {
  const [name, setName] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [status, setStatus] = useState<badgeStatus>('default')
  const [statusString, setStatusString] = useState('')
  const [conversations, setConversations] = useState<any[]>([])
  const [selectedConversationSid, setSelectedConversationSid] = useState('')

  useEffect(() => {
    setStatusString('Fetching credentials')
  }, [])

  const logIn = async (username: string): Promise<any> => {
    if (username !== '') {
      localStorage.setItem('name', username)
      setName(username)
      setLoggedIn(true)
    }

    try {
      const response = await getToken(username)
      initConversations(response.accessToken)
    } catch (error) {
      console.error(error)
    }
  }

  const logOut = (event: { preventDefault: () => void }) => {
    if (event) {
      event.preventDefault()
    }

    setName('')
    setLoggedIn(false)
    setConversations([])

    localStorage.removeItem('name')
    window.conversationsClient.shutdown()
  }

  const handleAddChatParticipant = async (name: string): Promise<void> => {
    const response = await addChatParticipant(name)

    if (response.participantSid !== undefined) {
      message.success('Username added as a chat participant')
    } else {
      message.success('Username already exists as a chat participant')
    }
  }

  const initConversations = async (token: string): Promise<void> => {
    try {
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
        setConversations([...conversations.filter(it => it !== conversation)])
      })
    } catch (err) {
      console.error(err)
    }
  }

  const selectedConversation = conversations.find(
    it => it.sid === selectedConversationSid
  )

  let conversationContent: JSX.Element | string
  if (selectedConversation) {
    conversationContent = (
      <Conversation
        conversationProxy={selectedConversation}
        myIdentity={name}
      />
    )
  } else if (status !== 'success') {
    conversationContent = 'Loading your conversation!'
  } else {
    conversationContent = ''
  }

  return loggedIn ? (
    <div className='conversations-window-wrapper'>
      <Layout className='conversations-window-container'>
        <Header style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
          <div
            style={{
              maxWidth: '250px',
              width: '100%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <HeaderItem style={{ paddingRight: '0', display: 'flex' }}>
              <Logo />
            </HeaderItem>
            <HeaderItem>
              <Text strong style={{ color: 'white' }}>
                Conversations
              </Text>
            </HeaderItem>
          </div>
          <div style={{ display: 'flex', width: '100%' }}>
            <HeaderItem>
              <Text strong style={{ color: 'white' }}>
                {selectedConversation &&
                  (selectedConversation.friendlyName ||
                    selectedConversation.sid)}
              </Text>
            </HeaderItem>
            <HeaderItem style={{ float: 'right', marginLeft: 'auto' }}>
              <span style={{ color: 'white' }}>{` ${statusString}`}</span>
              <Badge dot={true} status={status} style={{ marginLeft: '1em' }} />
            </HeaderItem>
            <HeaderItem>
              <IconComponent
                type='poweroff'
                onClick={logOut}
                style={{
                  color: 'white',
                  fontSize: '20px',
                  marginLeft: 'auto'
                }}
              />
            </HeaderItem>
          </div>
        </Header>
        <Layout>
          <Sider theme={'light'} width={250}>
            <ConversationsList
              conversations={conversations}
              selectedConversationSid={selectedConversationSid}
              onConversationClick={(item: {
                sid: React.SetStateAction<string>
              }) => setSelectedConversationSid(item.sid)}
            />
            <CollapseComponent>
              <PanelComponent header='Menu'>
                <AddWASMSParticipant binding={WA_BINDING} />
                <AddWASMSParticipant binding={''} />
                <RemoveButton target={PARTICIPANTS} />
                <RemoveButton target={''} />
              </PanelComponent>
            </CollapseComponent>
          </Sider>
          <Content className='conversation-section'>
            <div id='SelectedConversation'>{conversationContent}</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  ) : (
    <LoginPageComponent logIn={logIn} />
  )
}
