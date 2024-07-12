const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { ApolloServer  } = require("@apollo/server")
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')

const jwt = require('jsonwebtoken')

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
mongoose.set('debug', true)

const User = require("./models/user")

const config = require("./utils/config")
require("dotenv").config()

const typeDefs = require("./schema")
const resolvers = require("./resolvers")

const MONGODB_URI = process.env.MONGODB_URI

console.log("connecting to", MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })
  
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const serverCleanup = useServer({
    schema,
    onConnect: (ctx) => {
      console.log('Client connected', ctx)
      return ctx 
    },
    onSubscribe: (ctx, msg) => {
      console.log('Subscription started', { ctx, msg })
    },
    onOperation: (ctx, msg) => {
      console.log('Operation received', { ctx, operation: msg.payload })
    },
    onError: (ctx, msg, errors) => {
      console.error('Error occurred', errors)
    },
    onDisconnect: (ctx, code, reason) => {
      console.log('Client disconnected', { ctx, code, reason })
    }
  }, wsServer)
  

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id).populate(
            'username'
          )
          return { currentUser }
        }
      },
    }),
  )

  const PORT = config.PORT

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}
  
start()