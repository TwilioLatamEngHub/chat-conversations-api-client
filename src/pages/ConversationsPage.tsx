import React, { useContext, useEffect, useState } from 'react'
import { Collapse, Layout } from 'antd'

import { ReactComponent as Logo } from '../assets/twilio-mark-red.svg'
import AddWASMSParticipant from '../components/AddWASMSParticipant'
import { CreateNewConversation, ConversationsList } from '../components'
import { WA_BINDING } from '../helpers'
import { ConversationsContext } from '../contexts'
import { Conversation } from '../components'
import {
  ConversationsWindowContainer,
  ConversationsWindowWrapper,
  HeaderItemContainer,
  SelectedConversation,
  SyledHeader,
  SyledText
} from '../styles'

const { Content, Sider } = Layout
const { Panel } = Collapse

// add React.ElementType to components
const CollapseComponent = Collapse as unknown as React.ElementType
const PanelComponent = Panel as unknown as React.ElementType

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
    <ConversationsWindowWrapper>
      <ConversationsWindowContainer>
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
          <Content>
            <SelectedConversation>{conversationContent}</SelectedConversation>
          </Content>
        </Layout>
      </ConversationsWindowContainer>
    </ConversationsWindowWrapper>
  )
}
