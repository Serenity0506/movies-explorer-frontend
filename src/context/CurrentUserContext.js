import { createContext, useContext, useEffect, useMemo, useState } from "react"

export const CurrentUserContext = createContext()
export const UseCurrentUserContext = () => useContext(CurrentUserContext)

export function AppContextProvider({ children }) {
  const [token, setToken] = useState(() => {
    const tokenFromLS = localStorage.getItem("token")
    return tokenFromLS || ""
  })

  const [email, setEmail] = useState(() => {
    const emailFromLS = localStorage.getItem("email")
    return emailFromLS || ""
  })

  const [search, setSearch] = useState(() => {
    const searchFromLS = JSON.parse(localStorage.getItem("search"))
    return searchFromLS || { query: '', isShortsOnly: false }
  })

  const resetSearch = () => setSearch({ query: '', isShortsOnly: false })

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])

  useEffect(() => {
    localStorage.setItem("email", email)
  }, [email])

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(search))
  }, [search])

  const isLoggedIn = useMemo(() => !!token, [token])

  const onLogout = () => {
    setToken('')
    setCurrentUser({})
    resetSearch()

    localStorage.clear()
  }

  return (
    <CurrentUserContext.Provider
      value={{ token, setToken, isLoggedIn, onLogout, email, setEmail, currentUser, setCurrentUser, loading, setLoading, search, setSearch, resetSearch }}
    >
      {children}
    </CurrentUserContext.Provider>
  )
}
