import React, { useContext } from 'react'
import { List, Typography } from 'antd'

import conversationsItemStyles from '../assets/ConversationsItem.module.css'

import { joinClassNames } from '../utils/class-name'
import { ConversationsContext } from '../contexts'
import { COLOR_TWILIO_RED } from '../helpers'

const { Text } = Typography

interface ConversationsListProps {
  onConversationClick: (item: { sid: React.SetStateAction<string> }) => void
}

export const ConversationsList = ({
  onConversationClick
}: ConversationsListProps): JSX.Element => {
  const { conversations, selectedConversationSid } =
    useContext(ConversationsContext)

  return (
    <List
      style={{ cursor: 'pointer', backgroundColor: COLOR_TWILIO_RED }}
      bordered={true}
      loading={conversations.length === 0}
      dataSource={conversations}
      renderItem={item => {
        const activeChannel = item.sid === selectedConversationSid
        const conversationItemClassName = joinClassNames([
          conversationsItemStyles['conversation-item'],
          activeChannel && conversationsItemStyles['conversation-item--active']
        ])

        return (
          <List.Item
            key={item.sid}
            onClick={() => onConversationClick(item)}
            className={conversationItemClassName}
          >
            <Text
              strong
              className={conversationsItemStyles['conversation-item-text']}
            >
              {item.friendlyName || item.sid}
            </Text>
          </List.Item>
        )
      }}
    />
  )
}
