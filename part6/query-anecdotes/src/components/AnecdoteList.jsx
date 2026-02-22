import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import anecdoteService from "../services/anecdoteService"
import { useContext } from "react"
import NotificationContext from "../reducers/notificationContext"

const AnecdoteList = () => {
  const queryClient = useQueryClient()
  const { dispatchNotification } = useContext(NotificationContext)

  const mutation = useMutation({
    mutationFn: anecdoteService.likePost,
    onSuccess: () => queryClient.invalidateQueries(['anecdotes'])
  })

  const handleVote = (anecdote) => {
    mutation.mutate(anecdote)
    dispatchNotification({
      type: 'SHOW',
      payload: `you just voted for ${anecdote.content.slice(0,50)}`
    });
    setTimeout(
      () => dispatchNotification({
        type: 'DELETE'
      }),
      3000);
  }

  const anecdoteQuery = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll
  })

  if (anecdoteQuery.isLoading) return <div>Loading anecdotes...</div>

  if (anecdoteQuery.isError) return <div>God fucking dammit the goddamn fucking server is not doing its fucking god-fucking-forsaken fucking job</div>

  return(
    <>
      {!anecdoteQuery.isLoading && anecdoteQuery.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}


export default AnecdoteList;
