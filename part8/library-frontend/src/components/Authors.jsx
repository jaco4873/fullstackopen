import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import Select from 'react-select'

const Authors = (props) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [born, setBorn] = useState('')

  const authors = useQuery(ALL_AUTHORS)

  const [editBirthyear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (authors.loading) {
    return <div>loading...</div>
  }

  if (authors.error) {
    return <div>Error: {authors.error.message}</div>
  }
  
  if (!props.show) {
    return null
  }

  const options = authors.data.allAuthors.map(author => ({
    value: author.name,
    label: author.name
  }))

  const handleSubmit = (event) => {
    event.preventDefault()
    if (selectedAuthor && born) {
      editBirthyear({
        variables: {
          author: selectedAuthor.value,
          setBornTo: parseInt(born),
        },
      })
      setSelectedAuthor(null)
      setBorn('')
    }
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birth Year</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Author
          <Select
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            options={options}
          />
        </div>
        <div>
          Born
          <input
            type="text"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
