import Blog from './Blog';

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
export default BlogList
