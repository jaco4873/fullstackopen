import { useState } from "react"
import blogsService from "../services/blogs"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { useNotificationDispatch } from "../contexts/NotificationContext"
import { useUserState } from "../contexts/UserContext"
import { useParams } from "react-router-dom"
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  TextField,
  Link as MuiLink,
} from "@mui/material"

const BlogDetails = () => {
  const { id } = useParams()
  const [comment, setComment] = useState("")

  // Query for blog details
  const result = useQuery({
    queryKey: ["blogDetails", id],
    queryFn: () => blogsService.getById(id),
  })

  const blog = result.data

  // Other server communication
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()
  const loggedInUser = useUserState()

  const newLikeMutation = useMutation({
    mutationFn: blogsService.like,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogDetails"] })
    },
    onError: () => {
      dispatchNotification({
        type: "ERROR",
        error: "Failed to register like",
      })
      setTimeout(() => {
        dispatchNotification({ type: "RESET" })
      }, 5000)
    },
  })

  const newCommentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogsService.addComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogDetails"] })
      setComment("")
    },
    onError: () => {
      dispatchNotification({
        type: "ERROR",
        error: "Failed to add comment",
      })
      setTimeout(() => {
        dispatchNotification({ type: "RESET" })
      }, 5000)
    },
  })

  // Like button functionality
  const handleLike = (event) => {
    event.preventDefault()

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    newLikeMutation.mutate(updatedBlog)
  }

  // Comment functionality
  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    if (!comment) {
      dispatchNotification({
        type: "COMMENT_ERROR",
        error: "Comment cannot be empty",
      })
      setTimeout(() => {
        dispatchNotification({ type: "RESET" })
      }, 5000)
    } else {
      newCommentMutation.mutate({ id, comment })
    }
  }

  // conditional rendering while loading or if error
  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>Error loading blog details</div>
  }

  return (
    <Box sx={{ maxWidth: 600, margin: "20px auto" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h3" gutterBottom>
            {blog.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            URL:{" "}
            <MuiLink href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </MuiLink>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Likes: {blog.likes}{" "}
            <Button
              variant="contained"
              sx={{ padding: 0, marginLeft: 2 }}
              onClick={handleLike}
            >
              Like
            </Button>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Added by: {loggedInUser.username}
          </Typography>
        </CardContent>
      </Card>
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h4">
              Comments
            </Typography>
            {blog.comments.length > 0 ? (
              <ul>
                {blog.comments.map((comment, index) => (
                  <li key={index}>
                    <Typography variant="body2">{comment}</Typography>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body1">No comments yet.</Typography>
            )}
          </CardContent>
        </Card>
        <br></br>
        <Box
          component="form"
          onSubmit={handleComment}
          sx={{ display: "flex", mb: 2 }}
        >
          <TextField
            fullWidth
            name="comment"
            label="Add a comment"
            variant="outlined"
          />
          <Button type="submit" variant="contained" sx={{ ml: 2 }}>
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default BlogDetails
