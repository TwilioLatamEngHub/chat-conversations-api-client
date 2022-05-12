const handleFetches = async (url, queries) => {
  return await fetch(`${url}${queries}`)
    .then(res => res.json())
    .then(data => data)
}

export const getToken = async name => {
  const url = 'https://chat-conversations-api-3104-dev.twil.io/get-token'
  const queries = `?identity=${name}`

  return await handleFetches(url, queries)
}

export const addChatParticipant = async name => {
  const url = 'https://chat-conversations-api-3104-dev.twil.io/add-participant'
  const queries = `?identity=${name}`

  return await handleFetches(url, queries)
}

export const addWASMSParticipant = async (number, binding) => {
  const url =
    binding === 'wa'
      ? 'https://chat-conversations-api-3104-dev.twil.io/add-wa-participant'
      : 'https://chat-conversations-api-3104-dev.twil.io/add-sms-participant'
  const queries = `?number=${number}`

  return await handleFetches(url, queries)
}

export const deleteParticipants = async () => {
  const participantsURL =
    'https://chat-conversations-api-3104-dev.twil.io/remove-participants'
  const messagesURL =
    'https://chat-conversations-api-3104-dev.twil.io/remove-messages'

  const participants = await handleFetches(participantsURL, '')
  const messages = await handleFetches(messagesURL, '')

  Promise.all([participants, messages]).then(results => console.log(results))
}
