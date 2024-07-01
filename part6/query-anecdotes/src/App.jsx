import { getAnecdotes, updateAnecdote } from './requests'
import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

import { useNotificationDispatch } from './context/NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const voteForAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: ( anecdote ) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatchNotification({ type: 'SET_NOTIFICATION', payload: `You voted for '${anecdote.content}'` })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  })

  const handleVote = (anecdote) => {  
    voteForAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  // Get data from server
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  // render app
  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
