import { useState, useEffect } from 'react'

import BlogList from './components/BlogList' 
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import CreateForm from './components/CreateForm'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [triggerFetch, setTriggerFetch] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
        const blogs = await blogService.getAll()
        setBlogs(blogs)
    }
    fetchBlogs()
}, [triggerFetch])

  const handleBlogAdded = () => {
    setTriggerFetch(prev => !prev) 
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {!user ? (
          <>
            <LoginForm
              setUser={setUser}
              setErrorMessage={setErrorMessage}
            />
            <br></br>
            <ErrorNotification message={errorMessage}/>
          </>
      ) : (
          <>
            <Header name={user.name}/>
            <CreateForm 
              setSuccessMessage = {setSuccessMessage} 
              setErrorMessage = {setErrorMessage} 
              onBlogAdded = {handleBlogAdded}/>
            <br></br>
            <SuccessNotification message = {successMessage}/>
            <ErrorNotification message = {errorMessage} />
            <BlogList 
              blogs={blogs}
              onBlogAdded={handleBlogAdded} 
            />  
          </>
      )}
    </div>
  )
}

export default App