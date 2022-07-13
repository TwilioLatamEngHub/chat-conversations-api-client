import { useContext, useState, useEffect } from 'react'
import { Badge, Layout } from 'antd'
import { PresetStatusColorType } from 'antd/lib/_util/colors'

import { ReactComponent as Logo } from '../../assets/twilio-mark-red.svg'
import { CreateNewConversation, ConversationsList } from '../../components'
import { ConversationsContext } from '../../contexts'
import {
  BadgeSpan,
  ConversationsWindowContainer,
  ConversationsWindowWrapper,
  HeaderItemLeftContainer,
  SelectedConversation,
  SyledHeader,
  SyledText
} from './ConversationsPage.styles'
import { getConversations, getToken } from '../../services/functions'

const { Content, Sider } = Layout

export const ConversationsPage = (): JSX.Element => {
  const {
    conversations,
    setConversations,
    conversationContent,
    identity,
    setToken
  } = useContext(ConversationsContext)
  const [badgeStatus, setBadgeStatus] =
    useState<PresetStatusColorType>('warning')
  const [badgeText, setBadgeText] = useState<string>('Disconnected')

  useEffect(() => {
    const getConvos = async () => {
      try {
        setBadgeStatus('warning')
        setBadgeText('Loading')

        const { conversations } = await getConversations()
        const { accessToken } = await getToken(identity)

        setBadgeStatus('success')
        setBadgeText('Connected')

        if (conversations.length > 0) {
          setConversations(conversations)
        }

        setToken(accessToken)
      } catch (error) {
        console.log(error)
        setBadgeStatus('error')
        setBadgeText('An error has occurred')
      }
    }
    getConvos()
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
