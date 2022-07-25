import { Conversation, ParticipantType } from '@twilio/conversations'

const URL_ADD_PARTICIPANT = process.env.REACT_APP_ADD_PARTICIPANT_URL
const URL_GET_CONVERSATIONS = process.env.REACT_APP_GET_CONVERSATIONS_URL
const URL_GET_TOKEN = process.env.REACT_APP_GET_TOKEN

const handleFetches = async (url: string, queries?: string) => {
  const fetchUrl = queries ? `${url}${queries}` : url
  return await fetch(fetchUrl)
    .then(res => res.json())
    .then(data => data)
    .catch(err => err)
}

interface AddParticipantParams {
  participantType: ParticipantType
  conversationSid: string
  identity?: string
  number?: string
}

interface AddParticipantReturn {
  participantSid: string
}

interface GetConversationsReturn {
  conversations: Conversation[]
}

interface GetTokenReturn {
  accessToken: string
}

export const addParticipant = async ({
  participantType,
  conversationSid,
  identity,
  number
}: AddParticipantParams): Promise<AddParticipantReturn> => {
  let queries = `?participantType=${participantType}&conversationSid=${conversationSid}`

  if (number) {
    queries += `&number=${number}`
  }

  if (identity) {
    queries += `&identity=${identity}`
  }

  return (
    URL_ADD_PARTICIPANT && (await handleFetches(URL_ADD_PARTICIPANT, queries))
  )
}

export const getConversations = async (): Promise<GetConversationsReturn> =>
  URL_GET_CONVERSATIONS && (await handleFetches(URL_GET_CONVERSATIONS))

export const getToken = async (identity: string): Promise<GetTokenReturn> => {
  const queries = `?identity=${identity}`

  return URL_GET_TOKEN && (await handleFetches(URL_GET_TOKEN, queries))
}
