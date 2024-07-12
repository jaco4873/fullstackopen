import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = ({ show, userFavoriteGenre }) => {
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre: userFavoriteGenre },
    fetchPolicy: 'no-cache',
  })

  if (!show) {
    return null
  }

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <br></br>
      <p>books in your favorite genre <strong>{userFavoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations