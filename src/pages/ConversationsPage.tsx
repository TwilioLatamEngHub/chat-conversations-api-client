import React, { useContext, useEffect, useState } from 'react'
import { PoweroffOutlined } from '@ant-design/icons'
import { Badge, Collapse, Layout, Typography } from 'antd'

import { ReactComponent as Logo } from '../assets/twilio-mark-red.svg'
import AddWASMSParticipant from '../components/AddWASMSParticipant'
import {
  HeaderItem,
  CreateNewConversation,
  ConversationsList
} from '../components'
import { WA_BINDING } from '../helpers'
import { ConversationsContext } from '../contexts'
import { Conversation } from '../components'

const { Content, Sider, Header } = Layout
const { Text } = Typography
const { Panel } = Collapse

// add React.ElementType to components
const CollapseComponent = Collapse as unknown as React.ElementType
const PanelComponent = Panel as unknown as React.ElementType

export const ConversationsPage = (): JSX.Element => {
  const {
    status,
    setName,
    setLoggedIn,
    statusString,
    conversations,
    setConversations,
    selectedConversationSid,
    setSelectedConversationSid
  } = useContext(ConversationsContext)
  const [showComponent, setShowComponent] = useState(false)

  useEffect(() => {
    if (conversations.length !== 0) {
      setShowComponent(true)
    }
  }, [conversations.length, setShowComponent])

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

  const selectedConversation = conversations.find(
    it => it.sid === selectedConversationSid
  )

  let conversationContent: JSX.Element | null
  if (selectedConversation) {
    conversationContent = (
      <Conversation selectedConversation={selectedConversation} />
    )
  } else {
    conversationContent = null
  }

  return (
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
            <HeaderItem style={{ float: 'right', marginLeft: 'auto' }}>
              <span style={{ color: 'white' }}>{` ${statusString}`}</span>
              <Badge dot={true} status={status} style={{ marginLeft: '1em' }} />
            </HeaderItem>
            <HeaderItem>
              <PoweroffOutlined
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
            <CreateNewConversation />
            {showComponent && (
              <>
                <ConversationsList
                  onConversationClick={(item: {
                    sid: React.SetStateAction<string>
                  }) => setSelectedConversationSid(item.sid as string)}
                />
                <CollapseComponent>
                  <PanelComponent header='Menu'>
                    <AddWASMSParticipant binding={WA_BINDING} />
                    <AddWASMSParticipant binding={''} />
                    {/* TODO: Fix functions */}
                    {/* <RemoveButton target={PARTICIPANTS} />
                    <RemoveButton target={''} /> */}
                  </PanelComponent>
                </CollapseComponent>
              </>
            )}
          </Sider>
          <Content className='conversation-section'>
            <div id='SelectedConversation'>{conversationContent}</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}
