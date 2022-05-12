const handleFetches = async (url, queries) => {
  return await fetch(`${url}${queries}`)
    .then(res => res.json())
    .then(data => data)
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
  const url =
    binding === 'wa'
      ? 'https://add-participant-6619-dev.twil.io/add-wa-participant'
      : 'https://add-participant-6619-dev.twil.io/add-sms-participant'
  const queries = `?number=${number}`

  return await handleFetches(url, queries)
}
