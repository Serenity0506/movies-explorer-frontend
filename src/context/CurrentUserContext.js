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
    // return searchFromLS || "" && { isShortsOnly: false }

  })

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [movieId, setMovieId] = useState(() => {
    const movieFromLS = localStorage.getItem("movie")
    return movieFromLS || ""
  })

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])

  useEffect(() => {
    localStorage.setItem("email", email)
  }, [email])

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify(search))
  }, [search])

  useEffect(() => {
    localStorage.setItem("movie", JSON.stringify(Object))
  })

  const isLoggedIn = useMemo(() => !!token, [token])

  return (
    <CurrentUserContext.Provider
      value={{ token, setToken, isLoggedIn, email, setEmail, currentUser, setCurrentUser, loading, setLoading, search, setSearch, movieId, setMovieId }}
    >
      {children}
    </CurrentUserContext.Provider>
  )
}
