import { useNotificationValue } from "../contexts/NotificationContext"
import Alert from "@mui/material/Alert"

const Notification = () => {
  const notification = useNotificationValue()

  if (notification === null) {
    return null
  }

  const isError =
    notification.startsWith("Failed") ||
    notification === "wrong username or password"

  return (
    <div>
      {notification && (
        <Alert severity={isError ? "error" : "success"}>{notification}</Alert>
      )}
    </div>
  )
}

export default Notification
