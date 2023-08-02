// import { checkbox } from '../../Sharing/checkbox/checkbox'
import { useState } from 'react'
import Checkbox from '../../Sharing/Checkbox/Checkbox'
import styles from './SearchForm.module.css'

export default function SearchForm({
  search,
  setSearch,
  onSearch,
  formDisable,
}) {
  const [lastSearch, setLastSearch] = useState(null)
  const [searchInputValue, setSearchInputValue] = useState(() => search.query)

  const handleSearch = (evt) => {
    evt.preventDefault()

    if (searchInputValue === lastSearch) return
    setLastSearch(searchInputValue)

    const newSearch = {
      ...search,
      query: searchInputValue,
    }

    setSearch(newSearch)
    onSearch(newSearch)
  }

  const handleShortsFilterChanged = (newState) => {
    const newSearch = {
      ...search,
      isShortsOnly: newState,
    }

    setSearch(newSearch)
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
          // minLength={3}
          maxLength={30}
          // required
          value={searchInputValue}
          onChange={(e) => setSearchInputValue(e.target.value)}
          disabled={formDisable}
        />
        <button
          id='searchbtn'
          type='button'
          className={styles.searchForm__find}
          onClick={handleSearch}
          disabled={formDisable}
        >
          Найти
        </button>
      </form>
      <div className={styles.searchForm__checkbox_container}>
        <Checkbox
          labelText='Короткометражки'
          checkedInitial={search.isShortsOnly}
          onChange={handleShortsFilterChanged}
          disabled={formDisable}
        />
      </div>
    </>
  )
}
