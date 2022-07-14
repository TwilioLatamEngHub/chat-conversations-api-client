import styled from 'styled-components'
import { Layout, Typography } from 'antd'
import { COLOR_WHITE } from '../../helpers'
import { PoweroffOutlined } from '@ant-design/icons'

const { Header } = Layout
const { Text } = Typography

export const ConversationsWindowWrapper = styled.div`
  height: inherit;
  background-color: #f0f2f5;
`

export const ConversationsWindowContainer = styled(Layout)`
  height: 100%;
`

export const SyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  padding: 0;
`

export const HeaderItemLeftContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
`

export const BadgeContainer = styled.div``

export const BadgeSpan = styled.span`
  margin: 0 2rem 0 1rem;
  color: #fff;
`

export const SyledText = styled(Text)`
  color: #fff;
  font-weight: bold;
  margin-left: 1rem;
`

export const PowerOffContainer = styled.div`
  margin-right: 2rem;
`

export const StyledPoweroffOutlined = styled(PoweroffOutlined)`
  color: ${COLOR_WHITE};
  font-size: 1.25rem;
  cursor: pointer;
`

export const SelectedConversation = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
