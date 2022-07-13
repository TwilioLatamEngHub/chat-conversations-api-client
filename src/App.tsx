import { FC, useContext } from 'react'

import './assets/App.css'
import 'antd/dist/antd.css'
import { ConversationsPage, LoginPage } from './pages'
import { ConversationsContext } from './contexts'

export const App: FC = () => {
  const { loggedIn } = useContext(ConversationsContext)

  return loggedIn ? <ConversationsPage /> : <LoginPage />
}
