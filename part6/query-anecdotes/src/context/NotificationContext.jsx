import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  console.log('received: ', action)
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload

    case 'CLEAR_NOTIFICATION':
      return null
      
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotification = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext