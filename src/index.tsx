import { FC } from 'react'
import ReactDOM from 'react-dom'

import './assets/style.css'
import { App } from './App'
import { ConversationsContentProvider } from './contexts'

const MainComponent: FC = () => (
  <ConversationsContentProvider>
    <App />
  </ConversationsContentProvider>
)

ReactDOM.render(<MainComponent />, document.getElementById('root'))
