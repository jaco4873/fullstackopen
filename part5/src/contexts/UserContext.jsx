import React, { createContext, useReducer, useContext } from "react"

const UserContext = createContext()

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload
    case "LOGOUT":
      return null
    default:
      return state
  }
}

export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserState = () => {
  const context = useContext(UserContext)
  return context.user
}

export const useUserDispatch = () => {
  const context = useContext(UserContext)
  return context.dispatch
}
