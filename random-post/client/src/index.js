import React from 'react'
import ReactDOM from 'react-dom/client'
import ApolloProvider from './Apollo/ApolloProvider'
import { Provider } from 'react-redux'

import { store } from './redux/store'
import './styles/bootstrap.min.css'
import './styles/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>{ApolloProvider}</Provider>
  </React.StrictMode>
)
