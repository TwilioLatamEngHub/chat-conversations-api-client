import { useContext, useState } from 'react'
import { Layout, Button, Input, Form, Row, Col, Card } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { ReactComponent as Logo } from '../assets/twilio-mark-red.svg'
import { ConversationsContext } from '../contexts'

const { Content } = Layout

export const LoginPage = (): JSX.Element => {
  const { setIdentity, setLoggedIn } = useContext(ConversationsContext)
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values: any): void => {
    setIsLoading(true)

    const { identity } = values
    setIdentity(identity)
    setLoggedIn(true)
    setIsLoading(false)
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
                  label='Please input your identity below:'
                  name='identity'
                  rules={[{ required: true }]}
                >
                  <Input
                    prefix={
                      <UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder='Chat identity'
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    block
                    type='primary'
                    htmlType='submit'
                    loading={isLoading}
                  >
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
