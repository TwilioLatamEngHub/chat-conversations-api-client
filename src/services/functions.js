const handleFetches = async (url, queries) => {
  return await fetch(`${url}${queries}`)
    .then(res => res.json())
    .then(data => data)
    .catch(err => err)
}

export const getToken = async name => {
  const url = 'https://token-service-1210-dev.twil.io/token'
  const queries = `?identity=${name}`

  return await handleFetches(url, queries)
}

export const addChatParticipant = async name => {
  const url = 'https://add-participant-6619-dev.twil.io/add-participant'
  const queries = `?identity=${name}`

  return await handleFetches(url, queries)
}

export const addWASMSParticipant = async (number, binding) => {
  const url = 'https://add-participant-6619-dev.twil.io/add-wa-sms-participant'
  const queries = `?number=${number}&binding=${binding}`

  return await handleFetches(url, queries)
}
