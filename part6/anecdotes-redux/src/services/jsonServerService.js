const jsonServerUrl = 'http://localhost:3001/anecdotes/'

const getAll = async () => {
  console.log('getAll called bbb');
  const response = await fetch(jsonServerUrl);
  if (!response.ok) {
    throw new Error('Could not get anecdotes from json-server');
  }
  const data = await response.json();
  console.log('fetched server data: ', data);
  return data
}

const postNew = async (content) => {
  const response = await fetch(
    jsonServerUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content, likes: 0 })
    }
  );

  if (!response.ok) {
    throw new Error('failed to post anecdote to json server')
  }

  return response.json();
}

const likePost = async (id, likes) => {
  const response = await fetch(
    jsonServerUrl + id.toString(),
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes
      })
    }
  );

  if (!response.ok) {
    throw new Error('failed to update the likes');
  }

  return response.json();

}

export default { getAll, postNew, likePost }
