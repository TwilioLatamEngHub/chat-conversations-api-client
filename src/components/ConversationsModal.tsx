import { useCallback, useContext } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { UserOutlined, MessageOutlined } from '@ant-design/icons'

import { ConversationsContext } from '../contexts'
import { addParticipant, createConversation } from '../services/functions'
import { Conversation } from './Conversation'

export const ConversationsModal = (): JSX.Element => {
  const {
    showModal,
    setShowModal,
    setConversationContent,
    identity,
    setIdentity,
    isLoading,
    setIsLoading
  } = useContext(ConversationsContext)

  const initConversation = useCallback(async (friendlyName: string) => {
    try {
      const { conversation } = await createConversation(friendlyName)

      await addParticipant({
        participantType: 'chat',
        conversationSid: conversation.sid,
        identity
      })

      setConversationContent(<Conversation conversation={conversation} />)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleCancel = () => {
    setShowModal(false)
  }

  const onFinish = async (values: any) => {
    const { identity, friendlyName } = values

    try {
      setIsLoading(true)
      setIdentity(identity)
      await initConversation(friendlyName)
      setShowModal(false)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setShowModal(false)
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title='New conversation'
      visible={showModal}
      onCancel={handleCancel}
      footer={null}
    >
      <Form layout='vertical' onFinish={onFinish}>
        <Form.Item
          label='Create a conversastion name:'
          name='friendlyName'
          rules={[{ required: true }]}
        >
          <Input
            prefix={<MessageOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='Conversation name'
          />
        </Form.Item>
        <Form.Item
          label='Please input your identity below:'
          name='identity'
          rules={[{ required: true }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder='Chat identity'
          />
        </Form.Item>
        <Form.Item>
          <Button block type='primary' htmlType='submit' loading={isLoading}>
            Enter
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
