import { Conversation } from '@twilio/conversations'

const URL_GET_CONVERSATIONS = process.env.REACT_APP_GET_CONVERSATIONS_URL
const URL_GET_TOKEN = process.env.REACT_APP_GET_TOKEN

const handleFetches = async (url: string, queries?: string) => {
  const fetchUrl = queries ? `${url}${queries}` : url
  return await fetch(fetchUrl)
    .then(res => res.json())
    .then(data => data)
    .catch(err => err)
}

interface GetConversationsReturn {
  conversations: Conversation[]
}

interface GetTokenReturn {
  accessToken: string
}

export const getConversations = async (): Promise<GetConversationsReturn> =>
  URL_GET_CONVERSATIONS && (await handleFetches(URL_GET_CONVERSATIONS))

export const getToken = async (identity: string): Promise<GetTokenReturn> => {
  const queries = `?identity=${identity}`

  return URL_GET_TOKEN && (await handleFetches(URL_GET_TOKEN, queries))
}
