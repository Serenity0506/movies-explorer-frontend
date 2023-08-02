import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer__capture}>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className={styles.footer__container}>
        <div className={styles.footer__links}>
          <a
            href='https://practicum.yandex.ru/'
            target='blanc'
            className={styles.footer__link}
          >
            Яндекс.Практикум
          </a>
          <a
            href='https://github.com/Serenity0506/movies-explorer-frontend'
            target='blanc'
            className={styles.footer__link}
          >
            Github
          </a>
        </div>
        <span className={styles.footer__date}>
          @ {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  )
}
