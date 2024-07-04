import React from "react"
import { useUserState, useUserDispatch } from "../contexts/UserContext"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material"

const NavMenu = () => {
  const user = useUserState()
  const dispatchUser = useUserDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser")
    dispatchUser({ type: "LOGOUT" })
    window.location.reload()
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          BLOG APP
        </Typography>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "left" }}>
          <Button color="inherit" component={Link} to="/">
            Blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
        </Box>
        {user ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: 2 }}>
              {user.name} logged in
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              LOGOUT
            </Button>
          </Box>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavMenu
