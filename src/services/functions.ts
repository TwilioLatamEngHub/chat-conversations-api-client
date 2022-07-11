const handleFetches = async (url: string, queries?: string) => {
  const fetchUrl = queries ? `${url}${queries}` : url
  return await fetch(fetchUrl)
    .then(res => res.json())
    .then(data => data)
    .catch(err => err)
}

interface GetToken {
  accessToken: string
}

interface GetConversations {
  conversations: any[]
}

export const getToken = async (name: string): Promise<GetToken> => {
  const url = 'https://chat-conversations-api-3104-dev.twil.io/get-token'
  const queries = `?identity=${name}`

  return await handleFetches(url, queries)
}

export const getConversations = async (): Promise<GetConversations> => {
  const url =
    'https://chat-conversations-api-3104-dev.twil.io/get-conversations'
  return await handleFetches(url)
}

export const addWASMSParticipant = async (
  number: string,
  binding: string
): Promise<any> => {
  const url =
    binding === 'wa'
      ? 'https://chat-conversations-api-3104-dev.twil.io/add-wa-participant'
      : 'https://chat-conversations-api-3104-dev.twil.io/add-sms-participant'
  const queries = `?number=${number}`

  return await handleFetches(url, queries)
}
