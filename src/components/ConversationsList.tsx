import { useContext } from 'react'
import { List, Typography } from 'antd'
import styled from 'styled-components'

import { ConversationsContext } from '../contexts'
import { COLOR_TWILIO_RED } from '../helpers'
import { ConversationsListItem } from '../styles'

const { Text } = Typography

const StyledText = styled(Text)`
  color: #fff;
`

export const ConversationsList = (): JSX.Element => {
  const {
    conversations,
    setShowModal,
    setIsNewConversation,
    setSelectedConversationSid
  } = useContext(ConversationsContext)

  const handleOnClick = (sid: string) => {
    setShowModal(true)
    setSelectedConversationSid(sid)
    setIsNewConversation(false)
  }

  return (
    <List
      style={{ cursor: 'pointer', backgroundColor: COLOR_TWILIO_RED }}
      bordered={true}
      loading={conversations.length === 0}
      dataSource={conversations}
      renderItem={item => (
        <ConversationsListItem
          key={item.sid}
          onClick={() => handleOnClick(item.sid)}
        >
          <StyledText strong>{item.friendlyName || item.sid}</StyledText>
        </ConversationsListItem>
      )}
    />
  )
}
