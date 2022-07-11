import { useContext } from 'react'
import { MessageOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import { ConversationsContext } from '../contexts'

export const CreateNewConversation = (): JSX.Element => {
  const { setShowModal, setIsNewConversation, setConversationContent } =
    useContext(ConversationsContext)

  const handleOnClick = () => {
    setShowModal(true)
    setConversationContent(null)
    setIsNewConversation(true)
  }

  return (
    <>
      <Button
        size='large'
        block
        onClick={handleOnClick}
        style={{ height: '4rem' }}
      >
        <MessageOutlined />
        Enter the conversation
      </Button>
    </>
  )
}
