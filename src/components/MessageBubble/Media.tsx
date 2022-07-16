import { Spin, Modal } from 'antd'
import { WarningOutlined } from '@ant-design/icons'
import { Message } from '@twilio/conversations'

import { useEffect } from 'react'
import {
  MediaWrapper,
  PictureContainer,
  PicturePreviewContainer,
  StyledEyeOutlined,
  StyledImage,
  WarningWrapper
} from './Media.styles'

interface MediaProps {
  hasFailed: boolean
  url: string | null
  message: Message
}

export const Media = ({ hasFailed, url, message }: MediaProps): JSX.Element => {
  useEffect(() => {
    document.getElementById(message.sid)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <MediaWrapper
      hasUrl={url}
      onClick={() => {
        Modal.info({
          centered: true,
          icon: null,
          okText: 'Close',
          width: '60%',
          content: (
            <PictureContainer>
              {url && <StyledImage src={url} alt={'an alternative'} />}
            </PictureContainer>
          )
        })
      }}
    >
      {!url && !hasFailed && <Spin />}
      {hasFailed && (
        <WarningWrapper>
          <WarningOutlined style={{ fontSize: '5em' }} />
          <p>Failed to load media</p>
        </WarningWrapper>
      )}
      {!hasFailed && url && (
        <PicturePreviewContainer>
          <StyledEyeOutlined />
          <p>Click here to see the media</p>
          {/* <StyledImage src={url} alt={'an alternative'} /> */}
        </PicturePreviewContainer>
      )}
    </MediaWrapper>
  )
}
