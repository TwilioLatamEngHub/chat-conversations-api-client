import { useCallback, useContext, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { UserOutlined, MessageOutlined } from '@ant-design/icons'
import { Client, Conversation as ConversationType } from '@twilio/conversations'

import { ConversationsContext } from '../contexts'
import { getToken } from '../services/functions'
import { Conversation } from './Conversation'

export const ConversationModal = (): JSX.Element => {
  const {
    showModal,
    setShowModal,
    isNewConversation,
    selectedConversationSid,
    setConversationContent,
    setIdentity
  } = useContext(ConversationsContext)
  const [isLoading, setIsLoading] = useState(false)

  const initConversation = useCallback(
    async (identity: string, friendlyName: string) => {
      const { accessToken } = await getToken(identity)

      if (accessToken) {
        const client = new Client(accessToken)
        let conversation: ConversationType

        if (isNewConversation && friendlyName) {
          conversation = await client.createConversation({
            friendlyName: friendlyName
          })
        } else {
          conversation = await client.getConversationBySid(
            selectedConversationSid
          )
        }
        setConversationContent(<Conversation conversation={conversation} />)
      }
    },
    [isNewConversation, setConversationContent, selectedConversationSid]
  )

  const handleCancel = () => {
    setShowModal(false)
  }

  const onFinish = async (values: any) => {
    const { identity, friendlyName } = values

    try {
      setIsLoading(true)
      setIdentity(identity)
      await initConversation(identity, friendlyName)
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
        {isNewConversation && (
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
        )}
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
