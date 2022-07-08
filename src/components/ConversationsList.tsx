import React, { useContext } from 'react'
import { List, Typography } from 'antd'

import conversationsListStyles from '../assets/ConversationsList.module.css'
import conversationsItemStyles from '../assets/ConversationsItem.module.css'

import { joinClassNames } from '../utils/class-name'
import { ConversationsContext } from '../contexts'

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
      style={{ cursor: 'pointer', backgroundColor: '#f22e45' }}
      className={conversationsListStyles['conversations-list']}
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
