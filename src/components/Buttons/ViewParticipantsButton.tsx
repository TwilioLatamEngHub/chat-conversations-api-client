import { useContext, useState } from 'react'
import { Button, Modal, Typography } from 'antd'
import { TeamOutlined, UserOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import { ConversationsContext } from '../../contexts'
import { COLOR_NAVY_BLUE, COLOR_TWILIO_RED } from '../../helpers'

const { Text } = Typography

export const ConvoHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 7rem;
  background-color: ${COLOR_TWILIO_RED};
`

export const FriendlyName = styled(Text)`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-left: 1rem;
`

export const ParticipantsButton = styled(Button)`
  color: ${COLOR_NAVY_BLUE} !important;
  border-color: ${COLOR_NAVY_BLUE} !important;
  width: 100%;
  margin-top: 0.8rem;
`

export const ParticipantsModalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.5rem 0;
`

export const ParticipantsModalUsers = styled.p`
  margin: 0 0.5rem;
`

interface ParticipantProps {
  participants: any[]
}

export const ViewParticipantsButton = ({
  participants
}: ParticipantProps): JSX.Element => {
  const { conversation } = useContext(ConversationsContext)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return conversation ? (
    <ConvoHeaderContainer>
      <FriendlyName>{conversation.friendlyName}</FriendlyName>
      <ParticipantsButton onClick={showModal}>
        <TeamOutlined />
        View Participants
      </ParticipantsButton>
      <Modal
        title='Participants'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {participants &&
          participants.map((p, i) => (
            <ParticipantsModalContainer>
              <UserOutlined />
              <ParticipantsModalUsers key={i}>
                {p.identity || p.bindings.whatsapp.address}
              </ParticipantsModalUsers>
            </ParticipantsModalContainer>
          ))}
      </Modal>
    </ConvoHeaderContainer>
  ) : (
    <div />
  )
}
