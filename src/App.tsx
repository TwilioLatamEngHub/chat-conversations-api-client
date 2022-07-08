import { FC } from 'react'

import './assets/App.css'
import 'antd/dist/antd.css'
import { ConversationsPage } from './pages/ConversationsPage'
import { ConversationsContentProvider } from './contexts'

export const App: FC = () => (
  <ConversationsContentProvider>
    <ConversationsPage />
  </ConversationsContentProvider>
)
