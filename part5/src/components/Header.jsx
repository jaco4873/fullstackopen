const Header = ( { name }) => {

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <span>{name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}
export default Header
