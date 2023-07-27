import { Link, useNavigate } from 'react-router-dom'
import styles from './Navigation.module.css'
import ProfileButton from '../Sharing/ProfileButton/ProfileButton'
import classNames from 'classnames'
// import { Link } from 'react-router-dom'

function Navigation({
  onCloseBurgerPopup,
  isLoggedIn,
  isOpenBurger,
  changeBurgerView,
}) {
  const nav = useNavigate()

  return (
    <>
      {!isLoggedIn ? (
        <nav className={styles.navigation__links}>
          <Link to='/signup' className={styles.navigation__signup}>
            <span>Регистрация</span>
          </Link>
          {/* <Link to='/signin'> */}
          <button
            className={styles.navigation__button}
            onClick={() => nav('/signin')}
          >
            Войти
          </button>
          {/* </Link> */}
        </nav>
      ) : (
        <>
          <nav className={classNames(styles.navigation__container)}>
            <div className={styles.navigation__container_hide}>
              <Link to='/movies' className={styles.navigation__container_left}>
                Фильмы
              </Link>

              <Link
                to='/saved-movies'
                className={styles.navigation__container_right}
              >
                Сохрaненные фильмы
              </Link>
            </div>
          </nav>
          <div className={styles.navigation__nodecor}>
            <ProfileButton
              className={styles.navigation__nodecor}
              onClick={() => nav('/profile')}
            />
          </div>
          <button
            className={styles.navigation__burger_button}
            onClick={changeBurgerView}
            type='button'
          ></button>
        </>
      )}

      <nav
        className={classNames(styles.navigation__burger, {
          [styles.navigation__burger_opened]: isOpenBurger,
        })}
      >
        <div className={styles.navigation__burger_container}>
          <button
            type='button'
            onClick={onCloseBurgerPopup}
            className={styles.navigation__burger_close}
          ></button>
          <Link to='/' className={styles.navigation__burger_link}>
            Главная
          </Link>
          <Link to='/movies' className={styles.navigation__burger_link}>
            Фильмы
          </Link>
          <Link to='/saved-movies' className={styles.navigation__burger_link}>
            Сохранённые фильмы
          </Link>
          <div to='/profile' className={styles.navigation__margin}>
            <ProfileButton onClick={() => nav('/profile')} />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation
