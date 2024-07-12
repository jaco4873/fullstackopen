const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()
const { GraphQLError } = require("graphql")
const jwt = require("jsonwebtoken")
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")
const { bookCountLoader } = require('./utils/loaders')

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books
      if (args.genre) {
        books = await Book.find()
          .where("genres")
          .in([args.genre])
          .populate("author")
      } else {
        books = await Book.find({}).populate("author")
      }
      return books
    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async () => {
      return await Book.distinct("genres")
    },
  },
  Author: {
    bookCount: (root) => {
      return bookCountLoader.load(root._id.toString())
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }
        const book = new Book({ ...args, author: author._id })
        await book.save()

        const newBook = await Book.findById(book._id).populate("author")
        pubsub.publish("BOOK_ADDED", { bookAdded: newBook })
        return newBook
      } catch (error) {
        throw new GraphQLError("Adding book failed", {
          extensions: { code: "BAD_USER_INPUT" },
          invalidArgs: args,
          error,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        })
      }

      try {
        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo
        return author.save()
      } catch (error) {
        throw new GraphQLError("Failed. Author does not exist.", {
          extensions: { code: "BAD_USER_INPUT" },
          invalidArgs: args,
          error,
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      return user.save().catch((error) => {
        throw new GraphQLError(error.message, {
          extensions: { code: "BAD_USER_INPUT" },
          invalidArgs: args.username,
          error,
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== "test") {
        throw new GraphQLError("Invalid credentials", {
          extensions: { code: "UNAUTHENTICATED" },
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
}

module.exports = resolvers