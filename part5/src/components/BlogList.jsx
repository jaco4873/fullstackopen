import BlogListing from "./BlogListing"
import blogService from "../services/blogs"
import { useQuery } from "@tanstack/react-query"

const BlogList = () => {
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  })

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>Error loading blogs</div>
  }

  const blogs = result.data
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <br />
      {sortedBlogs.map((blog) => (
        <BlogListing key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
