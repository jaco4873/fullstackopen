import React, { useState } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import blogsService from "../services/blogs"
import { useNotificationDispatch } from "../contexts/NotificationContext"

import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

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
      }, 5000),
        setCreateFormVisible(false)
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
      <Box sx={{ my: 2 }}>
        <Box sx={hideWhenVisible}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCreateFormVisible(true)}
          >
            New Blog
          </Button>
        </Box>
        <Box sx={showWhenVisible}>
          <Typography variant="h5" component="h2" gutterBottom>
            Create New
          </Typography>
          <Box
            component="form"
            onSubmit={addBlog}
            sx={{ "& > *": { mb: 2 }, maxWidth: "400px", mx: 0 }}
          >
            <TextField
              fullWidth
              label="Title"
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
              placeholder="Write title here"
            />
            <TextField
              fullWidth
              label="Author"
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="Write author here"
            />
            <TextField
              fullWidth
              label="URL"
              type="url"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
              placeholder="Paste URL here"
            />
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Button variant="contained" color="primary" type="submit">
                Create
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ ml: 1 }}
                onClick={() => setCreateFormVisible(false)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default CreateForm
