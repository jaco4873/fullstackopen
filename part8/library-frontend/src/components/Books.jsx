import { useState } from "react"
import { useQuery, useSubscription } from "@apollo/client"
import { ALL_BOOKS, ALL_GENRES, BOOK_ADDED } from "../queries"
import { updateBookCache } from "../utils/updateBookCache"

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const booksQuery = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  })
  const genresQuery = useQuery(ALL_GENRES)

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log("Subscription data:", data)
      console.log("The cache contains the following:",client.cache.extract())
      const addedBook = data.data.bookAdded
      alert(`${addedBook.title} added`)
      updateBookCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })



  if (booksQuery.loading || genresQuery.loading) {
    return <div>loading...</div>
  }

  if (booksQuery.error || genresQuery.error) {
    return <div>Error loading data</div>
  }

  if (!props.show) {
    return null
  }

  const allGenres = genresQuery.data?.allGenres || []

  const filteredBooks =
    selectedGenre === null
      ? booksQuery.data?.allBooks || []
      : booksQuery.data?.allBooks?.filter((book) =>
          book.genres.includes(selectedGenre)
        ) || []

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre)
    console.log("set genre is", genre)
    booksQuery.refetch({ genre })
    genresQuery.refetch()
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.map((genre) => (
          <button key={genre} onClick={() => handleGenreChange(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => handleGenreChange(null)}>show all genres</button>
      </div>
    </div>
  )
}

export default Books
