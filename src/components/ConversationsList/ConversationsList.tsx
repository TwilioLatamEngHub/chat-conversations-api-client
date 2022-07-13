import { useContext, useState } from 'react'
import { Client } from '@twilio/conversations'

import { ConversationsContext } from '../../contexts'
import { Conversation } from '../Conversation/Conversation'
import {
  StyledList,
  ConversationsListItem,
  StyledText
} from './ConversationsList.styles'

export const ConversationsList = (): JSX.Element => {
  const {
    token,
    isLoading,
    setMessages,
    conversations,
    setConversationContent,
    identity,
    setIsLoading
  } = useContext(ConversationsContext)
  const [localSid, setLocalSid] = useState<string>('')

  const handleOnClick = async (sid: string) => {
    setMessages([])
    setIsLoading(true)

    try {
      const client = new Client(token)
      const convo = await client.getConversationBySid(sid)
      const convoParticipant = await convo.getParticipants()

      const isAlreadyParticipant = convoParticipant.find(
        p => p.identity === identity
      )

      if (!isAlreadyParticipant) await convo.add(identity)

      setConversationContent(
        <Conversation conversation={convo} setLocalSid={setLocalSid} />
      )
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <StyledList
      bordered={true}
      loading={isLoading}
      dataSource={conversations}
      renderItem={(item: any) => (
        <ConversationsListItem
          key={item.sid}
          onClick={() => handleOnClick(item.sid)}
          $isItemActive={item.sid === localSid}
        >
          <StyledText strong>{item.friendlyName || item.sid}</StyledText>
        </ConversationsListItem>
      )}
    />
  )
}
