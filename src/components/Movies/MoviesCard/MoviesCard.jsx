// import { useState } from 'react'
import { useState } from 'react'
import styles from './MoviesCard.module.css'
import { NavLink } from 'react-router-dom'
import { useApiMain } from '../../../utils/withApiMain'

export default function MoviesCard({ movie, isSaved, onDelete = () => {} }) {
  const [isLiked, setIsLiked] = useState(movie.like)
  const [movieId, setMovieId] = useState(movie._id)

  const apiMain = useApiMain()

  const saveMovie = () => {
    apiMain
      .createMovieWhenLike({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.thumbnail,
        movieId: movie.id,
      })
      .then((likedMovie) => {
        setIsLiked(true)
        setMovieId(likedMovie._id)
      })
      .catch((err) => {
        console.log(err)
      })
    //присвоить класс styles.moviesCard__likebtn_active
  }

  const deleteMovie = () => {
    apiMain
      .deleteMovieWhenDislike(movieId)
      .then(() => {
        setIsLiked(false)
        onDelete(movie)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleLikeCard = () => {
    isLiked ? deleteMovie() : saveMovie()
  }

  return (
    <div className={styles.moviesCard__container}>
      <a href={movie.trailerLink} target='_blank' rel='noreferrer'>
        <img
          className={styles.moviesCard__img}
          src={movie.image}
          alt={movie.nameRU}
        />
      </a>
      <span className={styles.moviesCard__name}>
        {movie.nameRU || movie.nameEN}
        {isSaved ? (
          <button
            type='button'
            className={styles.moviesCard__delete}
            onClick={deleteMovie}
          ></button>
        ) : (
          <button
            type='button'
            className={
              isLiked
                ? styles.moviesCard__likebtn_active
                : styles.moviesCard__likebtn
            }
            onClick={handleLikeCard}
          ></button>
        )}
      </span>

      <span className={styles.moviesCard__duration}>
        {movie.duration >= 60 && Math.floor(movie.duration / 60) + 'ч '}
        {(movie.duration % 60) + 'м'}
      </span>
    </div>
  )
}
