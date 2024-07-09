import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query AllAuthors {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query AllBooks {
  allBooks {
    title
    author
    published
  }
}
`

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation EditAuthor($author: String!,  $setBornTo: Int!) {
    editAuthor(
      name: $author,
      setBornTo: $setBornTo
    ) {
      name
      born
    }
  }
`