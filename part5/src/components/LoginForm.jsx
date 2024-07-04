import React, { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { useNotificationDispatch } from "../contexts/NotificationContext"
import { useUserDispatch } from "../contexts/UserContext"

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
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Username:
            <input
              data-testid="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              data-testid="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <br />
        <button type="submit" data-testid="loginbutton">
          Login
        </button>
      </form>
    </>
  )
}

export default LoginForm
