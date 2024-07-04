import blogsService from "../services/blogs"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useNotificationDispatch } from "../contexts/NotificationContext"
import { useUserState } from "../contexts/UserContext"
import { Link } from "react-router-dom"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"

const BlogListing = ({ blog }) => {
  // inline styles
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  // Server communication
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()
  const loggedInUser = useUserState()

  const newDeleteMutation = useMutation({
    mutationFn: blogsService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
    },
    onError: (error) => {
      dispatchNotification({
        type: "ERROR",
        error: "Failed to delete blog",
      })
      setTimeout(() => {
        dispatchNotification({ type: "RESET" })
      }, 5000)
    },
  })

  // Delete button functionality
  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      newDeleteMutation.mutate(blog)
    }
  }

  return (
    <TableRow className="blog" data-testid="blogPost">
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </TableCell>
      <TableCell>{blog.author}</TableCell>
      <TableCell>
        {loggedInUser.username === blog.user.username && (
          <IconButton aria-label="delete" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  )
}

export default BlogListing
