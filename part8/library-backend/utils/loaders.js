const DataLoader = require("dataloader")
const Book = require("../models/book")

// Batch function to load book counts
const batchBookCounts = async (authorIds) => {
  const books = await Book.find({ author: { $in: authorIds } })
  const bookCountMap = {}
  books.forEach((book) => {
    const authorId = book.author.toString()
    bookCountMap[authorId] = (bookCountMap[authorId] || 0) + 1
  })
  return authorIds.map((id) => bookCountMap[id] || 0)
}

const bookCountLoader = new DataLoader(batchBookCounts)

module.exports = {
  bookCountLoader,
}
