import { useState } from "react"
import { useQuery } from "@apollo/client"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Recommendations from "./components/Recommendations"
import { ME } from "./queries"


const App = () => {
  const { loading, error, data } = useQuery(ME)
  const [page, setPage] = useState("authors")
  const [token, setToken] = useState(null)


  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
  }

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
  
  if (!token) {
    return (
      <div>
        <LoginForm setToken={setToken}></LoginForm>
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommendations")}>recommendations</button>
        <button onClick={() => handleLogout()}>logout</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendations show={page === "recommendations"} userFavoriteGenre={data.me.favoriteGenre}></Recommendations>
    </div>
  )
}

export default App
