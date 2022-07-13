import { useEffect, useState } from 'react'
import { Spin, Modal } from 'antd'
import {
  WhatsAppOutlined,
  MessageOutlined,
  MobileOutlined,
  WarningOutlined,
  EyeOutlined
} from '@ant-design/icons'
import styled, { css } from 'styled-components'

import { ParticipantType, Message } from '@twilio/conversations'
import { COLOR_TWILIO_RED, COLOR_NAVY_BLUE, COLOR_WHITE } from '../../helpers'

type MessageDirection = 'outgoing' | 'incoming'

export const BubbleIconWrapper = styled.div`
  margin-right: 0.5rem;
`

export const BubbleHeader = styled.div`
  display: flex;
`

export const StyledLi = styled.li`
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
  margin: 1rem 0 1rem;
`

export const StyledDiv = styled.div<{
  messageDirection: MessageDirection
}>`
  ${({ messageDirection }) =>
    messageDirection === 'incoming'
      ? css`
          background: ${COLOR_NAVY_BLUE} none repeat scroll 0 0;
          float: right;
        `
      : css`
          background: ${COLOR_TWILIO_RED} none repeat scroll 0 0;
        `};
  border-radius: 3px;
  color: ${COLOR_WHITE};
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 100%;
  width: 40%;
`

export const BodyAuthorSpan = styled.span`
  display: block;
  color: ${COLOR_WHITE};
  font-size: 14px;
`

export const DateSpan = styled.span`
  color: ${COLOR_WHITE};
  display: block;
  font-size: 10px;
  margin: 8px 0 0;
`

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
    fetchType()
  }, [])

  // componentDidMount = async () => {
  //   if (this.state.hasMedia) {
  //     this.props.message.media
  //       .getContentTemporaryUrl()
  //       .then(url => {
  //         this.setState({ mediaUrl: url })
  //       })
  //       .catch(e => this.setState({ mediaDownloadFailed: true }))
  //   }
  //   document.getElementById(this.props.message.sid)
  // }

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
    <StyledLi>
      <StyledDiv messageDirection={messageDirection}>
        <BubbleHeader>
          <BubbleIconWrapper>
            {participantType && handleBubbleIcon(participantType)}
          </BubbleIconWrapper>
          <BodyAuthorSpan>{` ${message.author}`}</BodyAuthorSpan>
        </BubbleHeader>
        <BodyAuthorSpan>{message.body}</BodyAuthorSpan>
        {/* <div className={styles.medias}>
          {this.state.hasMedia && (
            <Media
              hasFailed={this.state.mediaDownloadFailed}
              url={this.state.mediaUrl}
            />
          )}
        </div> */}
        <DateSpan>{messageDateCreated}</DateSpan>
      </StyledDiv>
    </StyledLi>
  )
}
// class Media extends PureComponent {
//   render = () => {
//     const { hasFailed, url } = this.props
//     return (
//       <div
//         className={`${styles.media}${!url ? ' ' + styles.placeholder : ''}`}
//         onClick={() => {
//           Modal.info({
//             centered: true,
//             icon: null,
//             okText: 'Close',
//             width: '60%',
//             content: (
//               <div className={styles.picture_container}>
//                 <img
//                   style={{ width: '100%', height: '100%' }}
//                   src={url}
//                   alt={'an alternative'}
//                 />
//               </div>
//             )
//           })
//         }}
//       >
//         {!url && !hasFailed && <Spin />}
//         {hasFailed && (
//           <div style={{ display: 'flex', flexDirection: 'column' }}>
//             <WarningOutlined style={{ fontSize: '5em' }} />
//             <p>Failed to load media</p>
//           </div>
//         )}
//         {!hasFailed && url && (
//           <div className={styles.media_icon}>
//             <div style={{ zIndex: 123, position: 'absolute' }}>
//               <EyeOutlined style={{ fontSize: '5em', opacity: 0.3 }} />
//             </div>
//             <div
//               className={styles.picture_preview}
//               style={{ backgroundImage: `url(${url})`, zIndex: 122 }}
//             ></div>
//           </div>
//         )}
//       </div>
//     )
//   }
// }
