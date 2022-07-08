import { useContext } from 'react'
import { Layout, Button, Input, Form, Row, Col, Card } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { ReactComponent as Logo } from '../assets/twilio-mark-red.svg'
import { ConversationsContext } from '../contexts'
import { useInitConversations } from '../hooks'

const { Content } = Layout

export const LoginPage = (): JSX.Element => {
  const { setLoggedIn, setName } = useContext(ConversationsContext)
  const { handleInitConversations } = useInitConversations()

  const logIn = async (username: string): Promise<any> => {
    if (username !== '') {
      localStorage.setItem('name', username)
      setName(username)
      setLoggedIn(true)
    }

    try {
      await handleInitConversations(username)
    } catch (error) {
      console.error(error)
    }
  }

  const onFinish = (values: any) => {
    console.log('values')
    console.log(values)
    const { username } = values
    logIn(username)
  }

  return (
    <Layout>
      <Content style={{ height: '100vh' }}>
        <Row justify='space-around' align='middle' style={{ height: '100%' }}>
          <Col span={12} offset={6}>
            <Card style={{ maxWidth: '404px' }}>
              <Row
                justify='center'
                align='middle'
                style={{ marginBottom: '30px' }}
              >
                <Logo />
              </Row>

              <Form layout='vertical' onFinish={onFinish}>
                <Form.Item
                  label='Please input your username below:'
                  name='username'
                  rules={[{ required: true }]}
                >
                  <Input
                    prefix={
                      <UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder='Username'
                  />
                </Form.Item>
                <Form.Item>
                  <Button block type='primary' htmlType='submit'>
                    Enter
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
