import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import SearchForm from './SearchForm/SearchForm'

export const SavedMovies = ({
  onCloseBurgerPopup,
  isLoggedIn,
  isOpenBurger,
  changeBurgerView,
}) => {
  return (
    <>
      <Header
        // isLoggedIn={true}
        isLoggedIn={isLoggedIn}
        isOpenBurger={isOpenBurger}
        changeBurgerView={changeBurgerView}
        onCloseBurgerPopup={onCloseBurgerPopup}
      />
      <main>
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  )
}
