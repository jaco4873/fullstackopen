import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useUserState, useUserDispatch } from "./contexts/UserContext"

import BlogPage from "./components/BlogPage"
import LoginForm from "./components/LoginForm"
import NavMenu from "./components/NavMenu"
import Notification from "./components/Notification"
import Users from "./components/Users"
import UserDetail from "./components/UserDetails"
import BlogDetail from "./components/BlogDetails"

import blogService from "./services/blogs"


const App = () => {
  const user = useUserState()
  const dispatchUser = useUserDispatch()



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatchUser({ type: "LOGIN", payload: user })
      blogService.setToken(user.token)
    }
  }, [dispatchUser])

  if (!user) {
    return (
      <div>
        <LoginForm />
        <Notification />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <NavMenu />
        <Notification />
        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/" element={<BlogPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
