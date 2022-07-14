import { useContext } from 'react'
import { MessageOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import { ConversationsContext } from '../../contexts'
import { CreateNewConversationModal } from './CreateNewConversationModal'

export const CreateNewConversation = (): JSX.Element => {
  const { setShowModal, setIsLoading } = useContext(ConversationsContext)

  const handleOnClick = () => {
    setShowModal(true)
    setIsLoading(true)
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
        Create a new conversation
      </Button>
      <CreateNewConversationModal />
    </>
  )
}
