import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

// create a slice for the anecdotes

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1
      }
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
  }
})


console.log("Anecdotes:", anecdoteSlice)

export const { setAnecdotes, addVote, appendAnecdote } = anecdoteSlice.actions

// helper functions

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// Redux Thunks (async action creators that return a function to allow async server communication)
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = asObject(content)
    await anecdoteService.createNew(newAnecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.saveVote(id) // from services: saves to server
    dispatch(addVote(id))
  }
}

export default anecdoteSlice.reducer