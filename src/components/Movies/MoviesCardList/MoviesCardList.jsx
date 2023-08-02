import MoviesCard from '../MoviesCard/MoviesCard'
import styles from './MoviesCardList.module.css'

export default function MoviesCardList({
  movies, //: moviesInitial,
  isNoMoreMovies,
  isSavedList,
  onShowMoar,
  onDelete,
}) {
  return (
    <section className={styles.moviesCardList__container}>
      <div className={styles.moviesCardList__list}>
        {movies.map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            isSaved={isSavedList}
            onDelete={onDelete}
          />
        ))}
      </div>
      {!isNoMoreMovies && (
        <button
          type='button'
          className={styles.moviesCardList__button}
          onClick={onShowMoar}
        >
          Eщё
        </button>
      )}
    </section>
  )
}
