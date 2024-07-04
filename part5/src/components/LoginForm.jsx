import React, { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { useNotificationDispatch } from '../contexts/NotificationContext'


const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useNotificationDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatch({ type: "LOGIN_ERROR" })
      setTimeout(() => {
        dispatch({ type: "RESET" })
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
        <button type="submit" data-testid="loginbutton">
          Login
        </button>
      </form>
    </>
  )
}

export default LoginForm
