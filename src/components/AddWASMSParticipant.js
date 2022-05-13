import React from 'react'
import { message, Modal, Button, Input } from 'antd'

import { addWASMSParticipant } from '../services/functions'
import { WA_BINDING } from '../helpers/constants'

class AddWASMSParticipant extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      binding: props.binding,
      loading: false,
      visible: false,
      number: '',
      buttonText: '',
      modalTitle: ''
    }
  }

  componentDidMount = () => {
    this.setState({
      buttonText:
        this.state.binding === WA_BINDING
          ? '+ Add WhatsApp Participant'
          : '+ Add SMS Participant',
      modalTitle:
        this.state.binding === WA_BINDING
          ? 'Add WhatsApp Participant'
          : 'Add SMS Participant'
    })
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({ visible: false })
  }

  handleChange = ({ target }) => {
    this.setState({ number: target.value })
  }

  handleAddWASMSParticipant = async number => {
    try {
      this.setState({ loading: true })

      const response = await addWASMSParticipant(number, this.state.binding)

      this.setState({ loading: false })
      this.setState({ visible: false })
      this.setState({ participantSid: response.participantSid })
      message.success('Participant added!')
    } catch (error) {
      console.log(error)
      this.setState({ loading: false })
      this.setState({ visible: false })
      message.error('Participant was already added')
    }
  }

  render() {
    const { visible, loading, number, buttonText, modalTitle, binding } =
      this.state
    return (
      <>
        <Button
          type='primary'
          onClick={this.showModal}
          style={{ width: '100%', marginTop: '10px' }}
        >
          {buttonText}
        </Button>
        <Modal
          visible={visible}
          title={modalTitle}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Return
            </Button>
          ]}
        >
          <Input.Group compact>
            <Input
              style={{ width: 'calc(100% - 200px)' }}
              placeholder='E.164 Number Format'
              value={number}
              onChange={this.handleChange}
            />
            <Button
              type='primary'
              loading={loading}
              onClick={() => this.handleAddWASMSParticipant(number)}
            >
              Submit
            </Button>
          </Input.Group>
          {binding === WA_BINDING && (
            <p style={{ marginTop: '1em' }}>
              <strong>IMPORTANT:</strong> After you submit your number, you need
              to send a WhatsApp message to +5511952130034 in order to
              participate in the conversation.
            </p>
          )}
        </Modal>
      </>
    )
  }
}

export default AddWASMSParticipant
