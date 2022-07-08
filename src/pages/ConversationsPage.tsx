import React, { useContext } from 'react'
import { Badge, Collapse, Layout, Typography } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'

import { ReactComponent as Logo } from '../assets/twilio-mark-red.svg'
import RemoveButton from '../components/RemoveButton'
import AddWASMSParticipant from '../components/AddWASMSParticipant'
import { ConversationsList } from '../components/ConversationsList'
import { HeaderItem } from '../components'
import { PARTICIPANTS, WA_BINDING } from '../helpers'
import { ConversationsContext } from '../contexts'
import Conversation from '../components/Conversation'

const { Content, Sider, Header } = Layout
const { Text } = Typography
const { Panel } = Collapse

// add React.ElementType to components
const CollapseComponent = Collapse as unknown as React.ElementType
const PanelComponent = Panel as unknown as React.ElementType

export const ConversationsPage = (): JSX.Element => {
  const {
    status,
    name,
    setName,
    setLoggedIn,
    statusString,
    conversations,
    setConversations,
    selectedConversationSid,
    setSelectedConversationSid
  } = useContext(ConversationsContext)

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
            <ConversationsList
              conversations={conversations}
              selectedConversationSid={selectedConversationSid}
              onConversationClick={(item: {
                sid: React.SetStateAction<string>
              }) => setSelectedConversationSid(item.sid as string)}
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
  )
}
