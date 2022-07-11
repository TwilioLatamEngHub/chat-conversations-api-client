import styled from 'styled-components'
import { Layout, List, Typography } from 'antd'

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
  padding: 0;
`

export const HeaderItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 1.5rem;
`

export const SyledText = styled(Text)`
  color: #fff;
  font-weight: bold;
  margin-left: 1rem;
`

export const SelectedConversation = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const ParicipantsMessagesContainer = styled.div`
  margin: 0.5rem;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ConversationsListItem = styled(List.Item)`
  &:hover {
    cursor: pointer;
    margin-right: -2px;
    margin-left: -1px;
  }
`
