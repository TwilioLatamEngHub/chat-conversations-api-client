import { useContext, useEffect, useState } from 'react'
import { Client } from '@twilio/conversations'

import { ConversationsContext } from '../../contexts'
import { Conversation } from '../Conversation/Conversation'
import {
  StyledList,
  ConversationsListItem,
  StyledText
} from './ConversationsList.styles'

interface ConversationsListProps {
  client: Client
}

export const ConversationsList = ({
  client
}: ConversationsListProps): JSX.Element => {
  const {
    isLoading,
    setMessages,
    conversations,
    setConversationContent,
    identity,
    setIsLoading,
    localSid
  } = useContext(ConversationsContext)
  const [sortedConvos, setSortedConvos] = useState<any[]>(conversations)

  useEffect(() => {
    const sortedArr = conversations.sort((a, b) => {
      return a.dateCreated < b.dateCreated ? 1 : -1
    })
    setSortedConvos(sortedArr)
  }, [setSortedConvos, conversations])

  const handleOnClick = async (sid: string) => {
    setMessages([])
    setIsLoading(true)

    try {
      const convo = await client.getConversationBySid(sid)
      const convoParticipant = await convo.getParticipants()

      const isAlreadyParticipant = convoParticipant.find(
        p => p.identity === identity
      )

      if (!isAlreadyParticipant) await convo.add(identity)

      setConversationContent(<Conversation conversation={convo} />)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <StyledList
      bordered={true}
      loading={isLoading}
      dataSource={sortedConvos}
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
