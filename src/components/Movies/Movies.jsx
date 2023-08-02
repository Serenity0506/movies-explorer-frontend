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
import { useMoviesResizer } from '../../utils/hooks/useMoviesResizer'
import { useApiMain } from '../../utils/withApiMain'

const ErrorBlock = ({ message }) => {
  return <div className={styles.movies_message}>{message}</div>
}

const PagedMovies = ({ movies }) => {
  const [pagedMovies, setPagedMovies] = useState([])

  const [moviesShowLimit, setMoviesShowLimit] = useState(0)
  const [moviesShowIncrease, setMoviesShowIncrease] = useState(0)

  useMoviesResizer(setMoviesShowLimit, setMoviesShowIncrease)

  useEffect(() => {
    setPagedMovies(movies.slice(0, moviesShowLimit))
  }, [movies, moviesShowLimit])

  return (
    <>
      <MoviesCardList
        movies={pagedMovies}
        isNoMoreMovies={pagedMovies.length === movies.length}
        isSavedList={false}
        onShowMoar={() =>
          setMoviesShowLimit(moviesShowLimit + moviesShowIncrease)
        }
      />
    </>
  )
}

export const Movies = () => {
  const { search, setSearch, foundMovies, setFoundMovies } =
    UseCurrentUserContext()

  const [allMovies, setAllMovies] = useState(null)
  const [allMoviesFetching, setAllMoviesFetching] = useState(false)
  const [likedMovies, setLikedMovies] = useState(null)
  const [likedMoviesFetching, setLikedMoviesFetching] = useState(false)
  const [filteredMoviesWithLikes, setFilteredMoviesWithLikes] = useState()
  const [initialLoadingDone, setInitialLoadingDone] = useState(false)
  const [unpredictableError, setUnpredictableError] = useState(null)

  const apiMain = useApiMain()

  const filterMovies = (movies, query, isShortsOnly) =>
    movies.filter((movie) => filterFilm(movie, query, isShortsOnly))

  const getMovies = () => {
    if (allMovies !== null) {
      return Promise.resolve(allMovies)
    }
    setAllMoviesFetching(true)

    return apiMovies
      .getMovies()
      .then((movies) => {
        setAllMovies(movies)
        return movies
      })
      .finally(() => setAllMoviesFetching(false))
  }

  useEffect(() => {
    if (!likedMovies) return

    const foundMoviesWithLikes = foundMovies?.map((movie) => {
      const likedMovie = likedMovies.find((lm) => movie.id === lm.id)

      movie.like = !!likedMovie
      movie._id = likedMovie?._id

      return movie
    })

    setFilteredMoviesWithLikes(foundMoviesWithLikes)
  }, [foundMovies, likedMovies])

  const handleSearch = (newSearch) => {
    setUnpredictableError(null)

    getMovies()
      .then((movies) => {
        setFoundMovies(
          filterMovies(movies, newSearch.query, newSearch.isShortsOnly)
        )
      })
      .catch((error) => setUnpredictableError(error))
  }

  useEffect(() => {
    setLikedMoviesFetching(true)

    apiMain
      .getMovies()
      .then((movies) => {
        setLikedMovies(movies)
      })
      .catch((err) => setUnpredictableError(err))
      .finally(() => {
        setLikedMoviesFetching(false)
        setInitialLoadingDone(true)
      })
  }, [apiMain])

  return (
    <>
      <Header />
      <main>
        <SearchForm
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
          formDisable={
            likedMoviesFetching || allMoviesFetching || !initialLoadingDone
          }
        />
        {likedMoviesFetching || allMoviesFetching || !initialLoadingDone ? (
          <Preloader />
        ) : !!unpredictableError ? (
          <ErrorBlock
            message={`Ошибка загрузки данных: ${unpredictableError}`}
          />
        ) : !filteredMoviesWithLikes ? (
          <ErrorBlock message='Попробуйте что-то поискать!' />
        ) : filteredMoviesWithLikes.length < 1 ? (
          <ErrorBlock message='Ничего не найдено' />
        ) : (
          <PagedMovies movies={filteredMoviesWithLikes} />
        )}
        <Footer />
      </main>
    </>
  )
}
