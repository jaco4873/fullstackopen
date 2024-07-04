import { useState, useEffect } from "react"
import { useQuery, useQueryClient } from '@tanstack/react-query'

import BlogList from "./components/BlogList"
import LoginForm from "./components/LoginForm"
import Header from "./components/Header"
import CreateForm from "./components/CreateForm"
import Notification from "./components/Notification"
import blogService from "./services/blogs"

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const queryClient = useQueryClient()

  const handleBlogAdded = () => {
    queryClient.invalidateQueries(['blogs']) 
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>Error loading blogs</div>
  }

  const blogs = result.data

  return (
    <div>
      {!user ? (
        <>
          <LoginForm setUser={setUser} />
          <br />
          <Notification />
        </>
      ) : (
        <>
          <Header name={user.name} />
          <CreateForm onBlogAdded={handleBlogAdded} />
          <br />
          <Notification />
          <BlogList blogs={blogs} loggedInUser={user} onBlogAdded={handleBlogAdded} />
        </>
      )}
    </div>
  )
}

export default App
