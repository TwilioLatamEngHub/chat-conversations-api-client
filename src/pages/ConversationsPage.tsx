import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Collapse, Layout, Typography } from 'antd'

import { ReactComponent as Logo } from '../assets/twilio-mark-red.svg'
import AddWASMSParticipant from '../components/AddWASMSParticipant'
import { CreateNewConversation, ConversationsList } from '../components'
import { WA_BINDING } from '../helpers'
import { ConversationsContext } from '../contexts'
import { Conversation } from '../components'

const { Content, Sider, Header } = Layout
const { Text } = Typography
const { Panel } = Collapse

// add React.ElementType to components
const CollapseComponent = Collapse as unknown as React.ElementType
const PanelComponent = Panel as unknown as React.ElementType

const SyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  padding: 0;
`

const HeaderItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 1.5rem;
`

const SyledText = styled(Text)`
  color: #fff;
  font-weight: bold;
  margin-left: 1rem;
`

export const ConversationsPage = (): JSX.Element => {
  const { conversations, selectedConversationSid, setSelectedConversationSid } =
    useContext(ConversationsContext)
  const [showComponent, setShowComponent] = useState(false)

  useEffect(() => {
    if (conversations.length !== 0) {
      setShowComponent(true)
    }
  }, [conversations.length, setShowComponent])

  // TODO: Fix logOut button action bug
  // const logOut = (event: { preventDefault: () => void }) => {
  //   if (event) {
  //     event.preventDefault()
  //   }

  //   setName('')
  //   setLoggedIn(false)
  //   setConversations([])

  //   localStorage.removeItem('name')
  //   window.conversationsClient.shutdown()
  // }

  const selectedConversation = conversations.find(
    it => it.sid === selectedConversationSid
  )

  // TODO: Fix multiple same conversation bug
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
        <SyledHeader>
          <HeaderItemContainer>
            <Logo />
            <SyledText>Twilio Conversations API Demo</SyledText>
          </HeaderItemContainer>
        </SyledHeader>
        <Layout>
          <Sider theme={'light'} width={250}>
            <CreateNewConversation />
            {showComponent && (
              <>
                {/* TODO: Fix multiple same conversation bug */}
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
