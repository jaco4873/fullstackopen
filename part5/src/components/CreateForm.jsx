import React, { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import blogsService from "../services/blogs"
import PropTypes from "prop-types"
import { useNotificationDispatch } from "../contexts/NotificationContext"

const CreateForm = () => {
  const [createFormVisible, setCreateFormVisible] = useState(false)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  // View/Hide Create Form functionality
  const hideWhenVisible = { display: createFormVisible ? "none" : "" }
  const showWhenVisible = { display: createFormVisible ? "" : "none" }

  // Setup server communication
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const newBlogMutation = useMutation({
    mutationFn: blogsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      setTitle("")
      setAuthor("")
      setUrl("")
      dispatchNotification({ type: "SUCCESS", title, author })

      setTimeout(() => {
        dispatchNotification({ type: "RESET" })
      }, 5000)
    },
    onError: (error) => {
      dispatchNotification({
        type: "ERROR",
        error: error.message || "Unknown error",
      })
      setTimeout(() => {
        dispatchNotification({ type: "RESET" })
      }, 5000)
    },
  })

  const addBlog = (event) => {
    event.preventDefault()
    const blogData = {
      title: title,
      author: author,
      url: url,
    }
    newBlogMutation.mutate(blogData)
  }

  return (
    <>
      <br />
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateFormVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            <label>
              title:
              <input
                type="text"
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}
                placeholder="write title here"
              />
            </label>
          </div>
          <div>
            <label>
              author:
              <input
                type="text"
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}
                placeholder="write author here"
              />
            </label>
          </div>
          <div>
            <label>
              url:
              <input
                type="url"
                value={url}
                name="url"
                onChange={({ target }) => setUrl(target.value)}
                placeholder="write url here"
              />
            </label>
          </div>
          <br />
          <button type="submit">create</button>
        </form>
        <button onClick={() => setCreateFormVisible(false)}>cancel</button>
      </div>
    </>
  )
}

CreateForm.proptypes = {
  onBlogAdded: PropTypes.func.isRequired,
}

export default CreateForm
