import { Footer } from '../Footer/Footer'
import { Header } from '../Header/Header'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import SearchForm from './SearchForm/SearchForm'

export const Movies = ({
  onCloseBurgerPopup,
  isLoggedIn,
  isOpenBurger,
  changeBurgerView,
}) => {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isOpenBurger={isOpenBurger}
        changeBurgerView={changeBurgerView}
        onCloseBurgerPopup={onCloseBurgerPopup}
      />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </>
  )
}
