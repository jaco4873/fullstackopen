
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const filteredAnecdotes = filter === ''
    ? anecdotes
    : anecdotes.filter(anecdote => anecdote.content
      .toLowerCase()
      .includes(filter
      .toLowerCase()))

  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

  const handleVote = (id) => {
    dispatch(addVote(id))
    dispatch(setNotification(`You voted for '${anecdotes.find(a => a.id === id).content}'`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }
  
  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() =>handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList