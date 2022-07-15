import { useContext, useEffect, useState } from 'react'

import { ConversationsContext } from '../../contexts'
import { Conversation } from '../Conversation/Conversation'
import {
  StyledList,
  ConversationsListItem,
  StyledText
} from './ConversationsList.styles'

export const ConversationsList = (): JSX.Element => {
  const {
    isLoading,
    setMessages,
    conversations,
    setConversationContent,
    identity,
    setIsLoading,
    localSid,
    setLocalSid,
    client,
    setBadgeStatus,
    setBadgeText
  } = useContext(ConversationsContext)
  const [sortedConvos, setSortedConvos] = useState<any[]>(conversations)

  useEffect(() => {
    const sortedArr = conversations.sort((a, b) => {
      return a.dateCreated < b.dateCreated ? 1 : -1
    })
    setSortedConvos(sortedArr)
  }, [setSortedConvos, conversations])

  const handleOnClick = async (sid: string) => {
    setIsLoading(true)

    try {
      setBadgeStatus('warning')
      setBadgeText('Entering conversation')

      if (client) {
        const convo = await client.getConversationBySid(sid)
        const convoParticipant = await convo.getParticipants()
        const convoMessages = await convo.getMessages()
        setMessages(convoMessages.items)
        setLocalSid(sid)

        const isAlreadyParticipant = convoParticipant.find(
          p => p.identity === identity
        )
        if (!isAlreadyParticipant) await convo.add(identity)

        setConversationContent(<Conversation conversation={convo} />)

        convo.on('messageAdded', message => {
          setIsLoading(true)
          setMessages(oldMessages => [...oldMessages, message])
          setIsLoading(false)
        })

        setBadgeStatus('success')
        setBadgeText('Connected')
        setIsLoading(false)
      }
    } catch (error) {
      setConversationContent(null)
      setIsLoading(false)
      console.log(error)
      setBadgeStatus('error')
      setBadgeText('You are not allowed to enter this conversation')
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
