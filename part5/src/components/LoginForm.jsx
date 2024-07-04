import { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { useNotificationDispatch } from "../contexts/NotificationContext"
import { useUserDispatch } from "../contexts/UserContext"

import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

const LoginForm = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatchNotification = useNotificationDispatch()
  const dispatchUser = useUserDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      dispatchUser({ type: "LOGIN", payload: user })
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatchNotification({ type: "LOGIN_ERROR" })
      setTimeout(() => {
        dispatchNotification({ type: "RESET" })
      }, 5000)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Login to Blog App
      </Typography>
      <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 6, height: 50 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  )
}

export default LoginForm
