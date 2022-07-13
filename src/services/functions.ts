import {
  AddParticipantParams,
  AddParticipantReturn,
  CreateConversationReturn,
  CreateMessageParams,
  CreateMessageReturn,
  GetConversationsReturn,
  GetMessagesReturn,
  GetTokenReturn
} from './functions.types'

const handleFetches = async (url: string, queries?: string) => {
  const fetchUrl = queries ? `${url}${queries}` : url
  return await fetch(fetchUrl)
    .then(res => res.json())
    .then(data => data)
    .catch(err => err)
}

export const addParticipant = async ({
  participantType,
  conversationSid,
  identity,
  number
}: AddParticipantParams): Promise<AddParticipantReturn> => {
  const url = 'https://chat-conversations-api-1918-dev.twil.io/add-participant'
  let queries = `?participantType=${participantType}&conversationSid=${conversationSid}`

  if (number) {
    queries += `&number=${number}`
  }

  if (identity) {
    queries += `&identity=${identity}`
  }

  return await handleFetches(url, queries)
}

export const createConversation = async (
  friendlyName: string
): Promise<CreateConversationReturn> => {
  const url =
    'https://chat-conversations-api-1918-dev.twil.io/create-conversation'
  const queries = `?friendlyName=${friendlyName}`

  return await handleFetches(url, queries)
}

export const createMessage = async ({
  conversationSid,
  author,
  body
}: CreateMessageParams): Promise<CreateMessageReturn> => {
  const url = 'https://chat-conversations-api-1918-dev.twil.io/create-message'
  const queries = `?conversationSid=${conversationSid}&author=${author}&body=${body}`

  return await handleFetches(url, queries)
}

export const getConversations = async (): Promise<GetConversationsReturn> => {
  const url =
    'https://chat-conversations-api-1918-dev.twil.io/get-conversations'

  return await handleFetches(url)
}

export const getMessages = async (
  conversationSid: string
): Promise<GetMessagesReturn> => {
  const url = 'https://chat-conversations-api-1918-dev.twil.io/get-messages'
  const queries = `?conversationSid=${conversationSid}`

  return await handleFetches(url, queries)
}

export const getToken = async (name: string): Promise<GetTokenReturn> => {
  const url = 'https://chat-conversations-api-1918-dev.twil.io/get-token'
  const queries = `?identity=${name}`

  return await handleFetches(url, queries)
}
