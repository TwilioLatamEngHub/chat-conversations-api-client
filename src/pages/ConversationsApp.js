import React from 'react'
import { Client as ConversationsClient } from '@twilio/conversations'

import { Badge, Collapse, Icon, Layout, message, Typography } from 'antd'

import '../assets/Conversation.css'
import '../assets/ConversationSection.css'
import { ReactComponent as Logo } from '../assets/twilio-mark-red.svg'

import Conversation from '../components/Conversation'
import RemoveButton from '../components/RemoveButton'
import LoginPage from '../pages/LoginPage'
import AddWASMSParticipant from '../components/AddWASMSParticipant'
import { ConversationsList } from '../components/ConversationsList'
import { HeaderItem } from '../components/HeaderItem'
import { PARTICIPANTS, WA_BINDING } from '../helpers/constants'
import { addChatParticipant, getToken } from '../services/functions'
const { Panel } = Collapse

const { Content, Sider, Header } = Layout
const { Text } = Typography

class ConversationsApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      loggedIn: false,
      token: '',
      participantSid: '',
      statusString: '',
      conversationsReady: false,
      conversations: [],
      selectedConversationSid: '',
      newMessage: '',
      tokenErr: false,
      messages: [],
      removed: false
    }
  }

  componentDidMount = () => {
    this.setState({ statusString: 'Fetching credentials…' })
  }

  logIn = async name => {
    if (name !== '') {
      localStorage.setItem('name', name)
      this.setState({ name, loggedIn: true })

      try {
        const response = await getToken(name)
        this.setState({ token: response.accessToken }, this.initConversations)
      } catch (error) {
        console.log(error)
      }
    }
  }

  logOut = event => {
    if (event) {
      event.preventDefault()
    }

    this.setState({
      name: '',
      loggedIn: false,
      token: '',
      conversationsReady: false,
      messages: [],
      newMessage: '',
      conversations: []
    })

    localStorage.removeItem('name')
    this.conversationsClient.shutdown()
  }

  handleAddChatParticipant = async name => {
    const response = await addChatParticipant(name)
    console.log('response')
    console.log(response)

    if (response.participantSid !== undefined) {
      this.setState({ participantSid: response.participantSid })
      message.success('Username added as a chat participant')
    } else {
      message.success('Username already exists as a chat participant')
    }
  }

  initConversations = async () => {
    try {
      window.conversationsClient = ConversationsClient
      this.conversationsClient = await ConversationsClient.create(
        this.state.token
      )
      this.setState({ statusString: 'Connecting to Twilio…' })

      this.conversationsClient.on('connectionStateChanged', state => {
        if (state === 'connecting')
          this.setState({
            statusString: 'Connecting to Twilio…',
            status: 'default'
          })
        if (state === 'connected') {
          this.setState({
            statusString: 'You are connected.',
            status: 'success'
          })

          this.handleAddChatParticipant(this.state.name)
        }
        if (state === 'disconnecting')
          this.setState({
            statusString: 'Disconnecting from Twilio…',
            conversationsReady: false,
            status: 'default'
          })
        if (state === 'disconnected')
          this.setState({
            statusString: 'Disconnected.',
            conversationsReady: false,
            status: 'warning'
          })
        if (state === 'denied')
          this.setState({
            statusString: 'Failed to connect.',
            conversationsReady: false,
            status: 'error'
          })
      })
      this.conversationsClient.on('conversationJoined', conversation => {
        this.setState({
          conversations: [...this.state.conversations, conversation]
        })
      })
      this.conversationsClient.on('conversationLeft', thisConversation => {
        this.setState({
          conversations: [
            ...this.state.conversations.filter(it => it !== thisConversation)
          ]
        })
      })
    } catch (err) {
      this.setState({ tokenErr: true })
      console.error(err)
    }
  }

  render() {
    const { conversations, selectedConversationSid, status } = this.state
    const selectedConversation = conversations.find(
      it => it.sid === selectedConversationSid
    )

    let conversationContent
    if (selectedConversation) {
      conversationContent = (
        <Conversation
          conversationProxy={selectedConversation}
          myIdentity={this.state.name}
        />
      )
    } else if (status !== 'success') {
      conversationContent = 'Loading your conversation!'
    } else {
      conversationContent = ''
    }

    if (this.state.loggedIn) {
      return (
        <div className='conversations-window-wrapper'>
          <Layout className='conversations-window-container'>
            <Header
              style={{ display: 'flex', alignItems: 'center', padding: 0 }}
            >
              <div
                style={{
                  maxWidth: '250px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <HeaderItem style={{ paddingRight: '0', display: 'flex' }}>
                  <Logo />
                </HeaderItem>
                <HeaderItem>
                  <Text strong style={{ color: 'white' }}>
                    Conversations
                  </Text>
                </HeaderItem>
              </div>
              <div style={{ display: 'flex', width: '100%' }}>
                <HeaderItem>
                  <Text strong style={{ color: 'white' }}>
                    {selectedConversation &&
                      (selectedConversation.friendlyName ||
                        selectedConversation.sid)}
                  </Text>
                </HeaderItem>
                <HeaderItem style={{ float: 'right', marginLeft: 'auto' }}>
                  <span
                    style={{ color: 'white' }}
                  >{` ${this.state.statusString}`}</span>
                  <Badge
                    dot={true}
                    status={this.state.status}
                    style={{ marginLeft: '1em' }}
                  />
                </HeaderItem>
                <HeaderItem>
                  <Icon
                    type='poweroff'
                    onClick={this.logOut}
                    style={{
                      color: 'white',
                      fontSize: '20px',
                      marginLeft: 'auto'
                    }}
                  />
                </HeaderItem>
              </div>
            </Header>
            <Layout>
              <Sider theme={'light'} width={250}>
                <ConversationsList
                  conversations={conversations}
                  selectedConversationSid={selectedConversationSid}
                  onConversationClick={item => {
                    this.setState({ selectedConversationSid: item.sid })
                  }}
                />
                <Collapse>
                  <Panel header='Menu'>
                    <AddWASMSParticipant binding={WA_BINDING} />
                    <AddWASMSParticipant binding={''} />
                    <RemoveButton target={PARTICIPANTS} />
                    <RemoveButton target={''} />
                  </Panel>
                </Collapse>
              </Sider>
              <Content className='conversation-section'>
                <div id='SelectedConversation'>{conversationContent}</div>
              </Content>
            </Layout>
          </Layout>
        </div>
      )
    }

    return <LoginPage onSubmit={this.logIn} />
  }
}

export default ConversationsApp
