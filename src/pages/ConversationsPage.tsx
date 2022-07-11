import { useContext, useEffect } from 'react'
import { Layout } from 'antd'

import { ReactComponent as Logo } from '../assets/twilio-mark-red.svg'
import {
  CreateNewConversation,
  ConversationsList,
  ConversationModal
} from '../components'
import { ConversationsContext } from '../contexts'
import {
  ConversationsWindowContainer,
  ConversationsWindowWrapper,
  HeaderItemContainer,
  SelectedConversation,
  SyledHeader,
  SyledText
} from '../styles'
import { getConversations } from '../services/functions'

const { Content, Sider } = Layout

export const ConversationsPage = (): JSX.Element => {
  const { conversations, setConversations, conversationContent } =
    useContext(ConversationsContext)

  useEffect(() => {
    const getConvos = async () => {
      const { conversations } = await getConversations()
      if (conversations.length > 0) {
        setConversations(conversations)
      }
    }
    getConvos()
  }, [setConversations])

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
            {conversations.length > 0 && <ConversationsList />}
            <ConversationModal />
          </Sider>
          <Content>
            <SelectedConversation>{conversationContent}</SelectedConversation>
          </Content>
        </Layout>
      </ConversationsWindowContainer>
    </ConversationsWindowWrapper>
  )
}
