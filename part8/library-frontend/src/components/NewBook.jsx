import { useState } from 'react'
import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS, ALL_GENRES } from '../queries'
import { useMutation } from '@apollo/client'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }, { query: ALL_GENRES}],
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    addBook({ variables: { title, author, published: parseInt(published), genres }})

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          genre
          <input
            value={genres.join(', ')}
            onChange={({ target }) => setGenres(target.value.split(',').map(genre => genre.trim()))}
          />
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook