import { useEffect, useState } from 'react'
import apiMovies from '../../utils/Api/ApiMovies'
import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import SearchForm from './SearchForm/SearchForm'
import Preloader from '../Sharing/Preloader/Preloader'
import { UseCurrentUserContext } from '../../context/CurrentUserContext'
import styles from './Movies.module.css'
import { filterFilm } from '../../utils/movieFilter'
import apiMain from '../../utils/Api/ApiMain'
import { useMoviesResizer } from '../../utils/hooks/useMoviesResizer'

export const Movies = () => {
  const { search } = UseCurrentUserContext()
  const [isSearchHappened, setIsSearchHappened] = useState(false)
  const [isMoviesFetched, setIsMoviesFetched] = useState(false)
  const [isMoviesFetchError, setIsMoviesFetchError] = useState(false)
  const [allMovies, setAllMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])

  const [moviesShowLimit, setMoviesShowLimit] = useState(0)
  const [moviesShowIncrease, setMoviesShowIncrease] = useState(0)

  useMoviesResizer(setMoviesShowLimit, setMoviesShowIncrease)

  const isSearchFormEmpty = search.query.length === 0

  const handleSearch = () => {
    setIsSearchHappened(true)
  }

  useEffect(() => {
    if (isSearchHappened) {
      Promise.all([apiMovies.getMovies(), apiMain.getMovies()])
        .then(([movies, likedMovies]) => {
          movies.forEach((movie) => {
            const likedMovie = likedMovies.find((lm) => movie.id === lm.id)

            if (likedMovie) {
              movie.like = true
              movie._id = likedMovie._id
            }
          })
          setAllMovies(movies)
          setIsMoviesFetched(true)
        })
        .catch((err) => {
          setIsMoviesFetchError(true)
          console.log(err)
        })
    }
  }, [isSearchHappened])

  useEffect(() => {
    setFilteredMovies(
      allMovies
        .filter(
          (movie) =>
            !isSearchFormEmpty &&
            filterFilm(movie, search.query, search.isShortsOnly)
        )
        .slice(0, moviesShowLimit)
    )
  }, [
    allMovies,
    search.query,
    search.isShortsOnly,
    isSearchFormEmpty,
    moviesShowLimit,
  ])

  return (
    <>
      <Header />
      <main>
        <SearchForm useContext={true} onSearch={handleSearch} />
        <div className={styles.movies_message}>
          {!isSearchHappened && 'Поищите что-нибудь'}
          {isSearchHappened &&
            isMoviesFetched &&
            filteredMovies.length < 1 &&
            !isSearchFormEmpty &&
            'Ничего не найдено'}
          {isSearchHappened &&
            search.query.length === 0 &&
            'Нужно ввести ключевое слово'}
          {isMoviesFetchError && 'Ошибка загрузки данных'}
        </div>
        {isMoviesFetched && !isSearchFormEmpty && (
          <MoviesCardList
            movies={filteredMovies}
            isNoMoreMovies={allMovies.length === filteredMovies.length}
            isSavedList={false}
            onShowMoar={() =>
              setMoviesShowLimit(moviesShowLimit + moviesShowIncrease)
            }
          />
        )}
        {isSearchHappened && !isMoviesFetched && !isMoviesFetchError && (
          <Preloader />
        )}
        <Footer />
      </main>
    </>
  )
}
