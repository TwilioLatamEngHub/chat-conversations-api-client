import { useContext, useState, useEffect } from 'react'
import { Badge, Layout } from 'antd'
import { PresetStatusColorType } from 'antd/lib/_util/colors'

import { ReactComponent as Logo } from '../assets/twilio-mark-red.svg'
import { CreateNewConversation, ConversationsList } from '../components'
import { ConversationsContext } from '../contexts'
import {
  BadgeSpan,
  ConversationsWindowContainer,
  ConversationsWindowWrapper,
  HeaderItemLeftContainer,
  SelectedConversation,
  SyledHeader,
  SyledText
} from './ConversationsPage.styles'
import { getConversations } from '../services/functions'

const { Content, Sider } = Layout

export const ConversationsPage = (): JSX.Element => {
  const { conversations, setConversations, conversationContent } =
    useContext(ConversationsContext)
  const [badgeStatus, setBadgeStatus] =
    useState<PresetStatusColorType>('warning')
  const [badgeText, setBadgeText] = useState<string>('Disconnected')

  // Fix conversations list to highlight selected conversation
  useEffect(() => {
    const getConvos = async () => {
      setBadgeStatus('warning')
      setBadgeText('Loading')
      const { conversations } = await getConversations()
      setBadgeStatus('success')
      setBadgeText('Connected')
      console.log('getConversations response')
      console.log(conversations)

      if (conversations.length > 0) {
        setConversations(conversations)
      }
    }
    getConvos()

    // Need to run only once, so empty deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ConversationsWindowWrapper>
      <ConversationsWindowContainer>
        <SyledHeader>
          <HeaderItemLeftContainer>
            <Logo />
            <SyledText>Twilio Conversations API Demo</SyledText>
          </HeaderItemLeftContainer>
          <>
            <Badge dot={true} status={badgeStatus} />
            <BadgeSpan>{`${badgeText}`}</BadgeSpan>
          </>
        </SyledHeader>
        <Layout>
          <Sider theme={'light'} width={270}>
            <CreateNewConversation />
            {conversations.length > 0 && <ConversationsList />}
          </Sider>
          <Content>
            <SelectedConversation>{conversationContent}</SelectedConversation>
          </Content>
        </Layout>
      </ConversationsWindowContainer>
    </ConversationsWindowWrapper>
  )
}
