
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

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
    dispatch(voteForAnecdote(id))
    const message = `You voted for '${anecdotes.find(a => a.id === id).content}'`
    dispatch(setNotification(message, 10))
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