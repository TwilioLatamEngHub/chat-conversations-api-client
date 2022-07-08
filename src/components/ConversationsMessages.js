import MessageBubble from './MessageBubble'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class ConversationsMessages extends PureComponent {
  render = () => {
    return (
      <div id='messages'>
        <ul style={{ padding: '0 40px' }}>
          {this.props.messages.map(m => {
            if (m.author === this.props.identity)
              return (
                <MessageBubble key={m.index} direction='outgoing' message={m} />
              )
            else
              return (
                <MessageBubble key={m.index} direction='incoming' message={m} />
              )
          })}
        </ul>
      </div>
    )
  }
}

ConversationsMessages.propTypes = {
  identity: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ConversationsMessages
