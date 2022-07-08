import { useContext } from 'react'

import './assets/Conversation.css'
import './assets/ConversationSection.css'

import { LoginPage } from './pages/LoginPage'
import { ConversationsContext } from './contexts'
import { ConversationsPage } from './pages/ConversationsPage'

export const ConversationsApp = (): JSX.Element => {
  const { loggedIn } = useContext(ConversationsContext)

  return loggedIn ? <ConversationsPage /> : <LoginPage />
}
