import { useContext, useEffect } from 'react'
import { Badge, Layout } from 'antd'
import { Client } from '@twilio/conversations'

import { ReactComponent as Logo } from '../../assets/twilio-mark-red.svg'
import { CreateNewConversation, ConversationsList } from '../../components'
import { ConversationsContext } from '../../contexts'
import {
  BadgeContainer,
  BadgeSpan,
  ConversationsWindowContainer,
  ConversationsWindowWrapper,
  HeaderItemLeftContainer,
  PowerOffContainer,
  SelectedConversation,
  StyledPoweroffOutlined,
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
    setBadgeText,
    setIsLoading,
    client,
    setClient,
    setIdentity
  } = useContext(ConversationsContext)

  useEffect(() => {
    try {
      const fetchConversations = async () => {
        setBadgeStatus('warning')
        setBadgeText('Loading conversations list')

        const { accessToken } = await getToken(identity)
        const client = new Client(accessToken)
        setClient(client)

        const { conversations } = await getConversations()
        if (conversations.length > 0) {
          const sortedArr = conversations.sort((a, b) => {
            return a.dateCreated < b.dateCreated ? 1 : -1
          })
          setConversations(sortedArr)
        }

        setBadgeStatus('success')
        setBadgeText('Connected')
      }
      fetchConversations()
    } catch (error) {
      console.log(error)
      setBadgeStatus('error')
      setBadgeText('An error has occured')
    }
  }, [])

  const handlePowerOff = () => {
    setIsLoading(true)
    setBadgeStatus('warning')
    setBadgeText('Disconnecting')
    setClient(null)
    setIdentity('')
    window.location.reload()
  }

  const hasConversations = conversations.length > 0

  return (
    <ConversationsWindowWrapper>
      <ConversationsWindowContainer>
        <SyledHeader>
          <HeaderItemLeftContainer>
            <Logo />
            <SyledText>Twilio Conversations API Demo</SyledText>
          </HeaderItemLeftContainer>
          <BadgeContainer>
            <Badge dot={true} status={badgeStatus} />
            <BadgeSpan>{`${badgeText}`}</BadgeSpan>
          </BadgeContainer>
          <PowerOffContainer onClick={handlePowerOff}>
            <StyledPoweroffOutlined />
          </PowerOffContainer>
        </SyledHeader>
        <Layout>
          <Sider theme={'light'} width={270}>
            {client && (
              <>
                <CreateNewConversation />
                {hasConversations && <ConversationsList />}
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
