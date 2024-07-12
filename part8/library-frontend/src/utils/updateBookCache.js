export const updateBookCache = (cache, query, addedBook) => {
  const uniqueByTitle = (books) => {
    let seen = new Set()
    return books.filter((book) => {
      let k = book.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  const queryWithVars = {
    query: query.query,
    variables: { genre: null },
  }

  cache.updateQuery(queryWithVars, (data) => {
    if (!data || !data.allBooks) {
      console.log("No data in cache, initializing with new book")
      return { allBooks: [addedBook] }
    }

    const updatedBooks = uniqueByTitle([...data.allBooks, addedBook])

    return { allBooks: updatedBooks }
  })
}
