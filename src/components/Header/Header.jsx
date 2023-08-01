import styles from './HeaderStyles.module.css'
import logoMain from '../../images/logo.svg'
// import logoBurger from '../../images/iconBurger.png';
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import { UseCurrentUserContext } from '../../context/CurrentUserContext'
import { useEffect, useState } from 'react'

export function Header() {
  const { isLoggedIn } = UseCurrentUserContext()

  const [isBurgerPopupOpen, setIsBurgerPopupOpen] = useState(false)

  //открываем бургер попап
  function burgerClick() {
    setIsBurgerPopupOpen(!isBurgerPopupOpen)
  }

  //закрываем бургер попап
  const closeBurgerPopup = () => {
    setIsBurgerPopupOpen(false)
  }

  //закрываем на esc
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeBurgerPopup()
      }
    }
    if (isBurgerPopupOpen) {
      // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape)
      return () => {
        document.removeEventListener('keydown', closeByEscape)
      }
    }
  }, [isBurgerPopupOpen])

  if (!isLoggedIn) {
    return (
      <header className={styles.header__background_dark}>
        <Link to='/'>
          <img src={logoMain} className={styles.header__logo} alt='logo'></img>
        </Link>
        <Navigation
          isLoggedIn={isLoggedIn}
          isOpenBurger={isBurgerPopupOpen}
          changeBurgerView={burgerClick}
          onCloseBurgerPopup={closeBurgerPopup}
        />
      </header>
    )
  }

  return (
    <header className={styles.header__background}>
      <Link to='/'>
        <img src={logoMain} className={styles.header__logo} alt='logo'></img>
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
        isOpenBurger={isBurgerPopupOpen}
        changeBurgerView={burgerClick}
        onCloseBurgerPopup={closeBurgerPopup}
      />
    </header>
  )
}
