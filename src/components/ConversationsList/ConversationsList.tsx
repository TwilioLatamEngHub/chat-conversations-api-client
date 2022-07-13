import { useCallback, useContext } from 'react'

import { ConversationsContext } from '../../contexts'
import { Conversation } from '../Conversation/Conversation'
import { addParticipant } from '../../services/functions'
import {
  StyledList,
  ConversationsListItem,
  StyledText
} from './ConversationsList.styles'

export const ConversationsList = (): JSX.Element => {
  const { conversations, setConversationContent, identity, setIsLoading } =
    useContext(ConversationsContext)

  const handleOnClick = useCallback(async (sid: string) => {
    setIsLoading(true)

    try {
      await addParticipant({
        participantType: 'chat',
        conversationSid: sid,
        identity
      })

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
    <StyledList
      bordered={true}
      loading={conversations.length === 0}
      dataSource={conversations}
      renderItem={(item: any) => (
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
