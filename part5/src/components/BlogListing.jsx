import blogsService from "../services/blogs"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useNotificationDispatch } from "../contexts/NotificationContext"
import { useUserState } from "../contexts/UserContext"
import { Link } from 'react-router-dom'

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
    <>
      <div style={blogStyle} className="blog" data-testid="blogPost">
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        
        
          {loggedInUser.username === blog.user.username && (
            <button
              style={{
                backgroundColor: "rgba(255, 0, 0, 0.4)",
                borderRadius: "3px",
                margin: 2,
                marginLeft: 20,
              }}
              onClick={handleDelete}
            >
              remove
            </button>
          )}
        </div>
    </>
  )
}

export default BlogListing
