import { useEffect, useState } from 'react'
import {
  WhatsAppOutlined,
  MessageOutlined,
  MobileOutlined
} from '@ant-design/icons'
import { ParticipantType, Message } from '@twilio/conversations'

import {
  BodyAuthorSpan,
  BubbleHeader,
  BubbleIconWrapper,
  DateSpan,
  MediaWrapper,
  StyledDiv,
  StyledLi
} from './MessageBubble.styles'
import { Media } from './Media'

const handleBubbleIcon = (type: ParticipantType) => {
  if (type) {
    switch (type) {
      case 'chat':
        return <MessageOutlined style={{ fontSize: '16px' }} />
      case 'whatsapp':
        return <WhatsAppOutlined style={{ fontSize: '16px' }} />
      case 'sms':
        return <MobileOutlined />
      default:
        break
    }
  }
}

export type MessageDirection = 'outgoing' | 'incoming'

interface MessageBubbleProps {
  messageDirection: MessageDirection
  message: Message
}

export const MessageBubble = ({
  messageDirection,
  message
}: MessageBubbleProps): JSX.Element => {
  const [participantType, setParticipantType] =
    useState<ParticipantType>('chat')
  const [hasMedia, setHasMedia] = useState<boolean>(false)
  const [mediaDownloadFailed, setMediaDownloadFailed] = useState<boolean>(false)
  const [mediaUrl, setMediaUrl] = useState<string | null>(null)

  const messageDateCreated = message.dateCreated?.toLocaleString()

  useEffect(() => {
    const fetchType = async () => {
      try {
        const participant = await message.getParticipant()
        setParticipantType(participant.type)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchMedia = async () => {
      try {
        const mediaArr = message.attachedMedia
        if (mediaArr && mediaArr[0]) {
          setHasMedia(true)
          const url = await mediaArr[0].getContentTemporaryUrl()
          setMediaUrl(url)
        }
      } catch (error) {
        console.log(error)
        setMediaDownloadFailed(true)
      }
    }

    fetchType()
    fetchMedia()

    document.getElementById(message.sid)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // render = () => {
  //   const { itemStyle, divStyle } =
  //     this.props.direction === 'incoming'
  //       ? {
  //           itemStyle: styles.received_msg,
  //           divStyle: styles.received_withd_msg
  //         }
  //       : { itemStyle: styles.outgoing_msg, divStyle: styles.sent_msg }
  //   const m = this.props.message
  //   const type = this.state.type
  //   if (this.state.hasMedia) {
  //     console.log('Message is media message')
  //     // log media properties
  //     console.log('Media properties', m.media)
  //   }

  return (
    <StyledLi id={message.sid}>
      <StyledDiv messageDirection={messageDirection}>
        <BubbleHeader>
          <BubbleIconWrapper>
            {participantType && handleBubbleIcon(participantType)}
          </BubbleIconWrapper>
          <BodyAuthorSpan>{` ${message.author}`}</BodyAuthorSpan>
        </BubbleHeader>
        <BodyAuthorSpan>{message.body}</BodyAuthorSpan>
        <MediaWrapper>
          {hasMedia && <Media hasFailed={mediaDownloadFailed} url={mediaUrl} />}
        </MediaWrapper>
        <DateSpan>{messageDateCreated}</DateSpan>
      </StyledDiv>
    </StyledLi>
  )
}
