import { useCallback, useContext, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { MessageOutlined } from '@ant-design/icons'

import { ConversationsContext } from '../../contexts'
import { Conversation } from '../Conversation'

export const CreateNewConversationModal = (): JSX.Element => {
  const {
    showModal,
    setShowModal,
    setConversationContent,
    identity,
    setIsLoading,
    setConversations,
    setLocalSid,
    setBadgeStatus,
    setBadgeText,
    client
  } = useContext(ConversationsContext)
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false)

  const initConversation = useCallback(async (friendlyName: string) => {
    setBadgeStatus('warning')
    setBadgeText('Creating new conversation')

    try {
      if (client) {
        const newConversation = await client.createConversation({
          attributes: { createdBy: identity },
          friendlyName: friendlyName
        })
        await newConversation.add(identity)

        setConversations(oldConversations => [
          ...oldConversations,
          newConversation
        ])

        setConversationContent(<Conversation conversation={newConversation} />)
        setLocalSid(newConversation.sid)

        setBadgeStatus('success')
        setBadgeText('Connected')
      }
    } catch (error) {
      console.log(error)
      setBadgeStatus('error')
      setBadgeText('Unable to create a new conversation')
      setShowModal(false)
      setIsLoading(false)
      setIsModalLoading(false)
    }
  }, [])

  const handleCancel = () => {
    setShowModal(false)
    setIsLoading(false)
    setIsModalLoading(false)
  }

  const onFinish = async (values: any) => {
    const { friendlyName } = values

    try {
      setIsLoading(true)
      setIsModalLoading(true)

      await initConversation(friendlyName)

      setShowModal(false)
      setIsLoading(false)
      setIsModalLoading(false)
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
        <Form.Item>
          <Button
            block
            type='primary'
            htmlType='submit'
            loading={isModalLoading}
          >
            Enter
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
