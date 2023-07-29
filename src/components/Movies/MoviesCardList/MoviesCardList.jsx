import MoviesCard from '../MoviesCard/MoviesCard'
import styles from './MoviesCardList.module.css'

export default function MoviesCardList() {
  const movies = [
    {
      id: 1,
      url: 'http://localhost:3000/images/mov_1.png',
      name: '33 слова о дизайне',
      duration: '1ч 47м',
      like: true,
    },
    {
      id: 2,
      url: 'http://localhost:3000/images/mov_1.png',
      name: '33 слова о дизайне 33 слова о дизайне 33 слова о дизайне',
      duration: '1ч 47м',
      like: false,
    },
    {
      id: 3,
      url: 'http://localhost:3000/images/mov_1.png',
      name: '33 слова о дизайне 33 слова о дизайне 33 слова о дизайне',
      duration: '1ч 47м',
      like: false,
    },
    {
      id: 4,
      url: 'http://localhost:3000/images/mov_1.png',
      name: '33 слова о дизайне',
      duration: '1ч 47м',
      like: true,
    },
    {
      id: 5,
      url: 'http://localhost:3000/images/mov_1.png',
      name: '33 слова о дизайне 33 слова о дизайне 33 слова о дизайне',
      duration: '1ч 47м',
      like: false,
    },
    {
      id: 6,
      url: 'http://localhost:3000/images/mov_1.png',
      name: '33 слова о дизайне 33 слова о дизайне 33 слова о дизайне',
      duration: '1ч 47м',
      like: false,
    },
  ]

  return (
    <section className={styles.moviesCardList__container}>
      <div className={styles.moviesCardList__list}>
        {movies.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} />
        ))}
      </div>
      <button type='button' className={styles.moviesCardList__button}>
        Eщё
      </button>
    </section>
  )
}
