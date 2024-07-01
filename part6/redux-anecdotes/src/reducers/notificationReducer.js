import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    resetNotification() {
      return ''
    }
  },
})

export const setNotification = (message, duration) => {
  return async dispatch => {
    
    dispatch(showNotification(message))
    
    const durationMilliseconds = duration * 1000
    setTimeout(() => {
      dispatch(resetNotification())
    }, durationMilliseconds)
  }
}

export const { resetNotification, showNotification } = notificationSlice.actions

export default notificationSlice.reducer
