import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store'
import client from './ApolloClient'
import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </AuthProvider>,
)

reportWebVitals()
