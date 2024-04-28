import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, onBlogAdded }) => {

  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} onBlogAdded= {onBlogAdded} />
      )}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  onBlogAdded: PropTypes.func.isRequired
}
export default BlogList