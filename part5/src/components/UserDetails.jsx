import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

const UserDetail = () => {
  const { id } = useParams()

  const result = useQuery({
    queryKey: ["userDetails", id],
    queryFn: () => userService.getById(id)
  })

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>Error loading user details</div>
  }

  const { name, blogs } = result.data

  return (
    <div>
      <h2>{name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetail
