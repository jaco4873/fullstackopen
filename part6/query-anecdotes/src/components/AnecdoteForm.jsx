import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../context/NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const dispatchNotification = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: ( variables ) => {
      console.log('Anecdote added')
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
  
      // Dispatch success notification
      dispatchNotification({ type: 'SET_NOTIFICATION', payload: `You created '${variables.content}'` })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    },
    onError: (error) => {
      const errorMessage = error.response.data.error || 'An unexpected error occurred';

       // Dispatch error notification
      dispatchNotification({ type: 'SET_NOTIFICATION', payload: `Error: ${errorMessage}` })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  })

  


  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content })

  }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
