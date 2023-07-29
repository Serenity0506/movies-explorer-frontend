import { useNavigate } from 'react-router-dom'
import styles from './PageNotFound.module.css'

export const PageNotFound = () => {
  const nav = useNavigate()
  return (
    <main className={styles.pageNotFound}>
      <h1 className={styles.pageNotFound_title}>404</h1>
      <p className={styles.pageNotFound_subtitle}>Страница не найдена</p>
      <button className={styles.pageNotFound__back} onClick={() => nav(-1)}>
        Назад
      </button>
    </main>
  )
}
