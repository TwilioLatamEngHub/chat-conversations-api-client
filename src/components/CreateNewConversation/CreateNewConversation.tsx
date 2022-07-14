import { useContext } from 'react'
import { MessageOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Client } from '@twilio/conversations'

import { ConversationsContext } from '../../contexts'
import { CreateNewConversationModal } from './CreateNewConversationModal'

export interface CreateNewConversationProps {
  client: Client
}

export const CreateNewConversation = ({
  client
}: CreateNewConversationProps): JSX.Element => {
  const { setShowModal, setConversationContent } =
    useContext(ConversationsContext)

  const handleOnClick = () => {
    setShowModal(true)
    setConversationContent(null)
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
      <CreateNewConversationModal client={client} />
    </>
  )
}
