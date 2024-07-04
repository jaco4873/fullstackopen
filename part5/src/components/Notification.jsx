import React from 'react'
import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (notification === null) {
    return null
  }

  const isError = notification.startsWith('Failed') || notification === 'wrong username or password'

  return (
    <div className={isError ? 'error' : 'success'}>
      {notification}
    </div>
  )
}

export default Notification
