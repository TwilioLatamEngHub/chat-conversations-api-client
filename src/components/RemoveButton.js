import React from 'react'
import { message, Button } from 'antd'
import { PARTICIPANTS } from '../helpers/constants'
import { deleteMessages, deleteParticipants } from '../services/functions'

class RemoveButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      target: props.target,
      buttonText: '',
      alertMessage: '',
      loading: false
    }
  }

  componentDidMount = () => {
    this.setState({
      buttonText:
        this.state.target === PARTICIPANTS
          ? '- Remove Participants'
          : '- Remove Messages',
      alertMessage:
        this.state.target === PARTICIPANTS
          ? 'Participants removed!'
          : 'Messages Removed'
    })
  }

  removeButtonResponse = response => {
    this.setState({ loading: false })
    this.setState({ response: response })
    message.success(this.state.alertMessage)
    window.location.reload(false)
  }

  handleRemoveButton = async () => {
    try {
      this.setState({ loading: true })

      const response =
        this.state.target === PARTICIPANTS
          ? await deleteParticipants()
          : await deleteMessages()

      setTimeout(this.removeButtonResponse(response), 100000)
    } catch (error) {
      console.log(error)
      this.setState({ loading: false })
      message.error('An error has occured')
    }
  }

  render() {
    const { loading, buttonText } = this.state
    return (
      <Button
        loading={loading}
        onClick={() => this.handleRemoveButton()}
        style={{ width: '100%', marginTop: '10px' }}
      >
        {buttonText}
      </Button>
    )
  }
}

export default RemoveButton
