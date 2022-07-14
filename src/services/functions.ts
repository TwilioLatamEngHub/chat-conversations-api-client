const handleFetches = async (url: string, queries?: string) => {
  const fetchUrl = queries ? `${url}${queries}` : url
  return await fetch(fetchUrl)
    .then(res => res.json())
    .then(data => data)
    .catch(err => err)
}

interface GetConversationsReturn {
  conversations: any[]
}

interface GetTokenReturn {
  accessToken: string
}

export const getConversations = async (): Promise<GetConversationsReturn> => {
  const url =
    'https://chat-conversations-api-2099-dev.twil.io/get-conversations'

  return await handleFetches(url)
}

export const getToken = async (identity: string): Promise<GetTokenReturn> => {
  const url = 'https://chat-conversations-api-2099-dev.twil.io/get-token'
  const queries = `?identity=${identity}`

  return await handleFetches(url, queries)
}
