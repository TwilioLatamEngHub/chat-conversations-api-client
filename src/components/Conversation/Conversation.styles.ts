import styled from 'styled-components'
import { Form, Input } from 'antd'

import { COLOR_TWILIO_RED } from '../../helpers'

export const ConversationContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  overflow-y: scroll;
`

export const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  background-color: #001528;
`

export const StyledInput = styled(Input)`
  width: 40rem;
  font-size: 14px;
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 5rem;
  background-color: ${COLOR_TWILIO_RED};
`