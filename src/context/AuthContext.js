import React from 'react'
import jwtDecode from 'jwt-decode'
import { createContext, useReducer } from 'react'

const initialState = {
  user: null,
}

if (localStorage.getItem('token')) {
  const decodedToken = jwtDecode(localStorage.getItem('token'))

  if (decodedToken.exp < 10000 * Date.now()) {
    localStorage.removeItem('token')
  } else {
    initialState.user = decodedToken
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
})

function AuthReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const login = (userData) => {
    state.user = userData
    localStorage.setItem('token', userData.token)
    dispatch({
      type: 'LOGIN',
      payload: userData,
    })
  }

  function logout() {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
  }
  return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
}

export { AuthContext, AuthProvider }
