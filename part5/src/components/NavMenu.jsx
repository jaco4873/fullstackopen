import { useUserState, useUserDispatch } from "../contexts/UserContext"
import { Link } from "react-router-dom"

const NavMenu = () => {
  const user = useUserState()
  const dispatchUser = useUserDispatch()

  const padding = {
    padding: 5
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    dispatchUser({ type: "LOGOUT" })
    window.location.reload()
  }

  return (
    <>
      <h1>Blogs</h1>
      <Link style={padding} to="/">Blogs</Link> 
      <Link style={padding} to="/users">Users</Link>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>logout</button>
      <br />
      <br />
    </>
  )
}

export default NavMenu
