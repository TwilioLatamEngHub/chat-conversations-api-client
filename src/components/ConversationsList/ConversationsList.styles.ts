import { List, Typography } from 'antd'
import styled from 'styled-components'

import { COLOR_TWILIO_RED } from '../../helpers'

const { Text } = Typography

export const StyledList = styled<any>(List)`
  cursor: pointer;
  background-color: ${COLOR_TWILIO_RED};
`

export const ConversationsListItem = styled(List.Item)`
  &:hover {
    cursor: pointer;
    margin-right: -2px;
    margin-left: -1px;
  }
`

export const StyledText = styled(Text)`
  color: #fff;
`
