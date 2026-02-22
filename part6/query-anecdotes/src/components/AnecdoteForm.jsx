import { useMutation, useQueryClient } from "@tanstack/react-query"
import anecdoteService from "../services/anecdoteService";
import { useContext } from "react";
import NotificationContext from "../reducers/notificationContext";

const AnecdoteForm = () => {
  const { dispatchNotification } = useContext(NotificationContext)
  const mutation = useMutation({
    mutationFn: anecdoteService.postNew,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['anecdotes'] }),
    onError: (error) => { dispatchNotification({
      type: 'SHOW',
      payload: error.message,
    }) }
  })

  const queryClient = useQueryClient();

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    mutation.mutate(content)
    event.target.anecdote.value = ''
    dispatchNotification({
      type: 'SHOW',
      payload: `you just created anecdote ${content.slice(0,50)}`
    });
    setTimeout(
      () => dispatchNotification({
        type: 'DELETE'
      }),
      3000);
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
