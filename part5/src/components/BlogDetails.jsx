import blogsService from "../services/blogs"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { useNotificationDispatch } from "../contexts/NotificationContext"
import { useUserState } from "../contexts/UserContext"
import { useParams } from 'react-router-dom'

const BlogDetails = () => {
  const { id } = useParams()

  const result = useQuery({
    queryKey: ["blogDetails", id],
    queryFn: () => blogsService.getById(id)
  })

  // Server communication
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

  const blog = result.data

  // Like button functionality
  const handleLike = (event) => {
    event.preventDefault()

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    newLikeMutation.mutate(updatedBlog)
  }

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>Error loading blog details</div>
  }

  return (
    <>
      <div className="blog" data-testid="blogPost">
        <div className="details">
          <h2>{blog.title}</h2>
          <p style={{ margin: 0 }}>URL: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
          <p style={{ margin: 0 }} data-testid="likeButton">
            Likes: {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p style={{ margin: 0 }}>Added by: {loggedInUser.username}</p>
        </div>
      </div>
    </>
  )
}

export default BlogDetails
