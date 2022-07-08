import { FC } from 'react'

import './assets/App.css'
import 'antd/dist/antd.css'
import { ConversationsApp } from './ConversationsApp'
import { ConversationsContentProvider } from './contexts'

export const App: FC = () => (
  <ConversationsContentProvider>
    <ConversationsApp />
  </ConversationsContentProvider>
)
