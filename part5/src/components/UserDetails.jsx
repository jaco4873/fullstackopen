import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import userService from "../services/users"
import { Link } from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material"

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
    <>
      <br />
      <Typography variant="h4" component="h2" gutterBottom>
        {name}
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom>
        Added Blogs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.title}</TableCell>
                <TableCell>
                  <Link to={blog.url} target="_blank" rel="noopener noreferrer">
                    {blog.url}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UserDetail
