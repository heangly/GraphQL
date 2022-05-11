import App from '../App'
import {
  InMemoryCache,
  ApolloClient,
  createHttpLink,
  ApolloProvider
} from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
