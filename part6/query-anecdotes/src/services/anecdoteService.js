const serverUrl = 'http://localhost:3001/anecdotes/'

const getAll = async () => {
  const response = await fetch(serverUrl);

  if (!response.ok) {
    throw new Error('failed getting the anecdotes from server');
  }

  return response.json();
}

const postNew = async (content) => {
  const response = await fetch(
    serverUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content, votes: 0 })
    }
  );

  if (!response.ok) {
    if (response.status === 400)
      throw new Error((await response.json())?.error)
    else
      throw new Error('failed to post anecdote')
  }
  return response.json();
}

const likePost = async (anecdote) => {
  const response = await fetch(
    serverUrl + anecdote.id.toString(),
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        votes: anecdote.votes + 1
      })
    }
  );

  if (!response.ok) {
    throw new Error('failed to update the likes');
  }

  return response.json();

}

export default { getAll, postNew, likePost };
