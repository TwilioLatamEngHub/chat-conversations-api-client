import { useContext, useState } from 'react'
import { UserOutlined, MessageOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'

import { useInitConversations } from '../hooks'
import { ConversationsContext } from '../contexts'

export const CreateNewConversation = (): JSX.Element => {
  const { setName } = useContext(ConversationsContext)
  const { handleInitConversations } = useInitConversations()
  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const logIn = async (username: string): Promise<any> => {
    try {
      setIsLoading(true)
      await handleInitConversations(username)
      setName(username)
      setVisible(false)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setVisible(false)
      setIsLoading(false)
    }
  }

  const onFinish = (values: any) => {
    const { username } = values
    logIn(username)
  }

  return (
    <>
      <Button size='large' block onClick={showModal} style={{ height: '4rem' }}>
        <MessageOutlined />
        Enter the conversation
      </Button>
      <Modal
        title='New conversation'
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item
            label='Please input your username below:'
            name='username'
            rules={[{ required: true }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Username'
            />
          </Form.Item>
          <Form.Item>
            <Button block type='primary' htmlType='submit' loading={isLoading}>
              Enter
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
