import { useContext, useState, useEffect } from 'react'
import { Badge, Layout } from 'antd'
import { Client } from '@twilio/conversations'

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
    identity,
    conversations,
    setConversations,
    conversationContent,
    badgeStatus,
    setBadgeStatus,
    badgeText,
    setBadgeText
  } = useContext(ConversationsContext)
  const [client, setClient] = useState<Client | null>(null)

  useEffect(() => {
    setBadgeStatus('warning')
    setBadgeText('Loading conversations list')

    const fetchConversations = async () => {
      const { conversations } = await getConversations()

      const { accessToken } = await getToken(identity)
      const client = new Client(accessToken)
      setClient(client)

      if (conversations.length > 0) {
        const sortedArr = conversations.sort((a, b) => {
          return a.dateCreated < b.dateCreated ? 1 : -1
        })
        setConversations(sortedArr)
      }
    }
    fetchConversations()

    setBadgeStatus('success')
    setBadgeText('Connected')
  }, [])

  const hasConversations = conversations.length > 0

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
            {client && (
              <>
                <CreateNewConversation client={client} />
                {hasConversations && <ConversationsList client={client} />}
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
