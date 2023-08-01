import { useEffect, useState } from 'react'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import SearchForm from './SearchForm/SearchForm'
import { filterFilm } from '../../utils/movieFilter'
import apiMain from '../../utils/Api/ApiMain'
import Preloader from '../Sharing/Preloader/Preloader'
import { useMoviesResizer } from '../../utils/hooks/useMoviesResizer'

export const SavedMovies = () => {
  const [search, setSearch] = useState({ query: '', isShortsOnly: false })

  const [isSearchHappened, setIsSearchHappened] = useState(false)
  const [isMoviesFetched, setIsMoviesFetched] = useState(false)
  const [isMoviesFetchError, setIsMoviesFetchError] = useState(false)
  const [allMovies, setAllMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])

  const [moviesShowLimit, setMoviesShowLimit] = useState(0)
  const [moviesShowIncrease, setMoviesShowIncrease] = useState(0)

  useMoviesResizer(setMoviesShowLimit, setMoviesShowIncrease)

  const isSearchFormEmpty = search.query.length === 0

  const handleSearch = (newSearch) => {
    setSearch(newSearch)
  }

  useEffect(() => {
    apiMain
      .getMovies()
      .then((likedMovies) => {
        setAllMovies(likedMovies)
        setIsMoviesFetched(true)
      })
      .catch(() => {
        setIsMoviesFetchError(true)
      })
  }, [])

  useEffect(() => {
    setFilteredMovies(
      allMovies.filter((movie) =>
        filterFilm(movie, search.query, search.isShortsOnly)
      )
    )
  }, [allMovies, search.query, search.isShortsOnly, isSearchFormEmpty])

  const handleSavedCardDelete = (movie) => {
    setAllMovies(allMovies.filter((m) => m.id !== movie.id))
  }

  return (
    <>
      <Header />
      <main>
        <SearchForm useContext={false} onSearch={handleSearch} />
        <MoviesCardList
          movies={filteredMovies}
          isNoMoreMovies={true}
          isSavedList={true}
          onShowMoar={() =>
            setMoviesShowLimit(moviesShowLimit + moviesShowIncrease)
          }
          onDelete={handleSavedCardDelete}
        />
        {isSearchHappened && !isMoviesFetched && !isMoviesFetchError && (
          <Preloader />
        )}
      </main>
      <Footer />
    </>
  )
}
