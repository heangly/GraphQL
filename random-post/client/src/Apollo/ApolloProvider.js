import App from '../App'
import {
  InMemoryCache,
  ApolloClient,
  createHttpLink,
  ApolloProvider
} from '@apollo/client'

import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

// const authLink = setContext((request, previousContext) => {
//   const token = JSON.parse(localStorage.getItem('user')).token

//   return { headers: { authorization: token ? `Bearer ${token}` : '' } }
// })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
