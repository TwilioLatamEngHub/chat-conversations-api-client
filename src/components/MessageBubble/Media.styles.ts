import { EyeOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { COLOR_TWILIO_RED } from '../../helpers'

export const MediaWrapper = styled.div<{ hasUrl: string | null }>`
  border-radius: 4px;
  cursor: pointer;
  margin: 4px;
  display: flex;
  width: 220px;
  height: 220px;
  justify-content: center;
  align-items: center;
  background: ${({ hasUrl }) => (hasUrl ? '' : 'rgba(22, 46, 52, 0.58)')};
  align-self: center;
`

export const PictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`

export const WarningWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledEyeOutlined = styled(EyeOutlined)`
  color: ${COLOR_TWILIO_RED};
  font-size: 5rem;
`

export const PicturePreviewContainer = styled.div`
  margin: 4px;
  position: relative;
  border-radius: 4px;
  top: 0;
  overflow: hidden;
  height: 220px;
  width: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  flex-basis: 220px;

  &:hover {
    filter: blur(0px);
  }
`
