// import { useState } from 'react'
import styles from './MoviesCard.module.css'

export default function MoviesCard({ movie, user }) {
  return (
    <div className={styles.moviesCard__container}>
      <img
        className={styles.moviesCard__img}
        src={movie.url}
        alt={movie.name}
      />
      <span className={styles.moviesCard__name}>
        {movie.name}
        <button
          type='button'
          className={
            movie.like
              ? styles.moviesCard__likebtn_active
              : styles.moviesCard__likebtn
          }
          // onClick={() => moviesCardLikeButtonClassName()}
        ></button>
      </span>

      <span className={styles.moviesCard__duration}>{movie.duration}</span>
    </div>
  )
}
