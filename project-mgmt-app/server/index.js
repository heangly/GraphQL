const express = require('express')
const dotenv = require('dotenv')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
require('colors')

const schema = require('./graphql/schema')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

const app = express()
app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
  })
)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`==> Server is running on PORT ${PORT} <==`.cyan.bold)
)
