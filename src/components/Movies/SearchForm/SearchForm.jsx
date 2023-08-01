// import { checkbox } from '../../Sharing/checkbox/checkbox'
import { useState } from 'react'
import Checkbox from '../../Sharing/Checkbox/Checkbox'
import styles from './SearchForm.module.css'
import { UseCurrentUserContext } from '../../../context/CurrentUserContext'

export default function SearchForm({ useContext, onSearch }) {
  const { search, setSearch } = UseCurrentUserContext()
  const [searchInputValue, setSearchInputValue] = useState(
    useContext ? search.query : ''
  )

  const handleSearch = (evt) => {
    evt.preventDefault()

    const newSearch = {
      ...search,
      query: searchInputValue,
    }

    useContext && setSearch(newSearch)
    onSearch(newSearch)
  }

  const handleShortsFilterChanged = (newState) => {
    const newSearch = {
      ...search,
      isShortsOnly: newState,
    }

    useContext && setSearch(newSearch)
    onSearch(newSearch)
  }

  return (
    <>
      <form
        className={styles.searchForm__container}
        name='movieSearch'
        onSubmit={handleSearch}
      >
        <input
          className={styles.searchForm__name}
          type='text'
          placeholder='Фильм'
          name='search'
          minLength={3}
          maxLength={30}
          required
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
        />
        <button
          type='button'
          className={styles.searchForm__find}
          onClick={handleSearch}
        >
          Найти
        </button>
      </form>
      <div className={styles.searchForm__checkbox_container}>
        <Checkbox
          labelText='Короткометражки'
          checkedInitial={search.isShortsOnly}
          onChange={handleShortsFilterChanged}
        />
      </div>
    </>
  )
}
