import { useContext, useEffect, useState } from 'react'
import { Modal, Button, Input } from 'antd'

import {
  AddParticipantButtonProps,
  CHAT_BINDING,
  SMS_BINDING,
  WA_BINDING
} from './AddParticipantButton.types'
import { ConversationsContext } from '../../contexts'

export const AddParticipantButton = ({
  binding
}: AddParticipantButtonProps): JSX.Element => {
  const { isLoading } = useContext(ConversationsContext)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [number, setNumber] = useState<string>('')
  const [buttonText, setButtonText] = useState<string>('')
  const [modalTitle, setModalTitle] = useState<string>('')

  useEffect(() => {
    switch (binding) {
      case WA_BINDING:
        setButtonText('+ Add WhatsApp Participant')
        setModalTitle('Add WhatsApp Participant')
        break
      case SMS_BINDING:
        setButtonText('+ Add SMS Participant')
        setModalTitle('Add SMS Participant')
        break
      case CHAT_BINDING:
        setButtonText('+ Add Chat Participant')
        setModalTitle('Add Chat Participant')
        break
      default:
        break
    }
  }, [])

  const showModal = () => {
    setIsVisible(true)
  }

  const handleCancel = () => {
    setIsVisible(false)
  }

  const handleChange = (event: any) => {
    setNumber(event.target.value)
  }

  const handleAddParticipant = () => {}

  return (
    <>
      <Button
        type='primary'
        ghost
        htmlType='submit'
        style={{ minWidth: '5rem', background: '#fff' }}
        onClick={showModal}
      >
        {buttonText}
      </Button>
      <Modal
        visible={isVisible}
        title={modalTitle}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Return
          </Button>
        ]}
      >
        <Input.Group compact>
          <Input
            style={{ width: 'calc(100% - 200px)' }}
            placeholder={
              binding === CHAT_BINDING ? 'Chat identity' : 'E.164 Number Format'
            }
            value={number}
            onChange={handleChange}
          />
          <Button
            type='primary'
            loading={isLoading}
            onClick={handleAddParticipant}
          >
            Submit
          </Button>
        </Input.Group>
        {binding === WA_BINDING && (
          <p style={{ marginTop: '1em' }}>
            <strong>IMPORTANT:</strong> After you submit your number, you need
            to send a WhatsApp message to +5511952130034 in order to participate
            in the conversation.
          </p>
        )}
      </Modal>
    </>
  )
}
