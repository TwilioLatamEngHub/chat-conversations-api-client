import { useCallback, useContext } from 'react'
import { List, Typography } from 'antd'
import styled from 'styled-components'

import { ConversationsContext } from '../contexts'
import { COLOR_TWILIO_RED } from '../helpers'
import { Conversation } from './Conversation/Conversation'
import { addParticipant } from '../services/functions'

const { Text } = Typography

export const ConversationsListItem = styled(List.Item)`
  &:hover {
    cursor: pointer;
    margin-right: -2px;
    margin-left: -1px;
  }
`

const StyledText = styled(Text)`
  color: #fff;
`

export const ConversationsList = (): JSX.Element => {
  const { conversations, setConversationContent, identity, setIsLoading } =
    useContext(ConversationsContext)

  const handleOnClick = useCallback(async (sid: string) => {
    setIsLoading(true)

    try {
      const { participantSid } = await addParticipant({
        participantType: 'chat',
        conversationSid: sid,
        identity
      })
      console.log('Participant added. SID:')
      console.log(participantSid)

      const selectedConversation = conversations.find(it => it.sid === sid)
      setConversationContent(
        <Conversation conversation={selectedConversation} />
      )
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }, [])

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
