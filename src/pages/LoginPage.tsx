import React from 'react'
import { Layout, Button, Input, Icon, Form, Row, Col, Card } from 'antd'
import { WrappedFormUtils } from 'antd/lib/form/Form'

import { ReactComponent as Logo } from '../assets/twilio-mark-red.svg'

const { Content } = Layout

interface LoginPageProps {
  form: WrappedFormUtils
  logIn: (username: string) => void
}

const IconComponent = Icon as unknown as React.ElementType

const LoginPage = ({ form, logIn }: LoginPageProps): JSX.Element => {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    form.validateFields((err, values) => {
      if (!err) {
        const { username } = values
        logIn(username)
      }
    })
  }

  const { getFieldDecorator } = form

  const usernameFieldDecorator = getFieldDecorator('username', {
    rules: [{ required: true, message: 'Please input your username!' }]
  })

  return (
    <Layout>
      <Content style={{ height: '100vh' }}>
        <Row
          type='flex'
          justify='space-around'
          align='middle'
          style={{ height: '100%' }}
        >
          <Col span={12} offset={6}>
            <Card style={{ maxWidth: '404px' }}>
              <Row
                type='flex'
                justify='center'
                align='middle'
                style={{ marginBottom: '30px' }}
              >
                <Logo />
              </Row>

              <Form onSubmit={handleSubmit}>
                <Form.Item label={'Identify yourself below'} required>
                  {usernameFieldDecorator(
                    <Input
                      prefix={
                        <IconComponent
                          type='user'
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder='Name'
                    />
                  )}
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

export default Form.create({ name: 'login' })(LoginPage)
