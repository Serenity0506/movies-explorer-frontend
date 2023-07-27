// import { checkbox } from '../../Sharing/checkbox/checkbox'
import Checkbox from '../../Sharing/Checkbox/Checkbox'
import styles from './SearchForm.module.css'

export default function SearchForm() {
  return (
    <>
      <form className={styles.searchForm__container} name='search'>
        <input
          className={styles.searchForm__name}
          type='text'
          placeholder='Фильм'
          name='search'
          minLength={3}
          maxLength={30}
        />
        <button type='button' className={styles.searchForm__find}>
          Найти
        </button>
      </form>
      <div className={styles.searchForm__checkbox_container}>
        <Checkbox labelText='Короткометражки' />
      </div>
    </>
  )
}
