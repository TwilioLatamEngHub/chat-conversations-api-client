import { useContext } from 'react'
import { List, Typography } from 'antd'

import conversationsItemStyles from '../assets/ConversationsItem.module.css'

import { joinClassNames } from '../utils/class-name'
import { ConversationsContext } from '../contexts'
import { COLOR_TWILIO_RED } from '../helpers'

const { Text } = Typography

export const ConversationsList = (): JSX.Element => {
  const {
    conversations,
    setShowModal,
    setIsNewConversation,
    selectedConversationSid,
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
      renderItem={item => {
        const activeChannel = item.sid === selectedConversationSid
        const conversationItemClassName = joinClassNames([
          conversationsItemStyles['conversation-item'],
          activeChannel && conversationsItemStyles['conversation-item--active']
        ])

        return (
          <>
            <List.Item
              key={item.sid}
              onClick={() => handleOnClick(item.sid)}
              className={conversationItemClassName}
            >
              <Text
                strong
                className={conversationsItemStyles['conversation-item-text']}
              >
                {item.friendlyName || item.sid}
              </Text>
            </List.Item>
          </>
        )
      }}
    />
  )
}
