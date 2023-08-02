import { createContext, useContext, useEffect, useMemo, useState } from "react"

export const CurrentUserContext = createContext()
export const UseCurrentUserContext = () => useContext(CurrentUserContext)

export function AppContextProvider({ children }) {
  const [token, setToken] = useState(() => {
    const fromLS = localStorage.getItem("token")
    return fromLS || ""
  })

  const [email, setEmail] = useState(() => {
    const fromLS = localStorage.getItem("email")
    return fromLS || ""
  })

  const [search, setSearch] = useState(() => {
    const fromLS = JSON.parse(localStorage.getItem("search"))
    return fromLS || { query: null, isShortsOnly: false }
  })

  const resetSearch = () => setSearch({ query: '', isShortsOnly: false })

  const [foundMovies, setFoundMovies] = useState(() => {
    const fromLS = JSON.parse(localStorage.getItem("foundMovies"))
    return fromLS || null
  })

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])

  useEffect(() => {
    localStorage.setItem("email", email)
  }, [email])

  useEffect(() => {
    localStorage.setItem("foundMovies", JSON.stringify(foundMovies))
  }, [foundMovies])

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(search))
  }, [search])

  const isLoggedIn = useMemo(() => !!token, [token])

  const onLogout = () => {
    setToken('')
    setCurrentUser({})
    setFoundMovies(null)
    resetSearch()

    localStorage.clear()
  }

  return (
    <CurrentUserContext.Provider
      value={{
        token, setToken,
        isLoggedIn, onLogout,
        email, setEmail,
        currentUser, setCurrentUser,
        loading, setLoading,
        search, setSearch, resetSearch,
        foundMovies, setFoundMovies
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  )
}
