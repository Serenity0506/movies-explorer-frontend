import styles from './HeaderStyles.module.css'
import logoMain from '../../images/logo.svg'
// import logoBurger from '../../images/iconBurger.png';
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
// import profile from '../../images/icon__COLOR_icon-main.svg'

export function Header({
  onCloseBurgerPopup,
  isLoggedIn,
  isOpenBurger,
  changeBurgerView,
}) {
  if (!isLoggedIn) {
    return (
      <div className={styles.header__background_dark}>
        <Link to='/'>
          <img src={logoMain} className={styles.header__logo} alt='logo'></img>
        </Link>
        <Navigation
          isLoggedIn={isLoggedIn}
          isOpenBurger={isOpenBurger}
          changeBurgerView={changeBurgerView}
          onCloseBurgerPopup={onCloseBurgerPopup}
        />
      </div>
    )
  }

  return (
    <div className={styles.header__background}>
      <Link to='/'>
        <img src={logoMain} className={styles.header__logo} alt='logo'></img>
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
        isOpenBurger={isOpenBurger}
        changeBurgerView={changeBurgerView}
        onCloseBurgerPopup={onCloseBurgerPopup}
      />
    </div>
  )
}

// export function Header({ isLoggedIn }) {
//   const nav = useNavigate()

//   if (!isLoggedIn) {
//     return (
//       <div className={styles.header__background_dark}>
//         <Link to='/'>
//           <img src={logoMain} className={styles.header__logo} alt='logo'></img>
//         </Link>
//         <div className={styles.header__links}>
//           <Link to='/signup' className={styles.header__signup}>
//             <span>Регистрация</span>
//           </Link>
//           <Link to='/signin'>
//             <button
//               className={styles.header__button}
//               onClick={() => nav('/profile')}
//             >
//               Войти
//             </button>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className={styles.header__background}>
//       <Link to='/'>
//         <img src={logoMain} className={styles.header__logo} alt='logo'></img>
//       </Link>

//       <div className={styles.header__container}>
//         <Link to='/movies' className={styles.header__container_left}>
//           Фильмы
//         </Link>

//         <Link to='/saved-movies' className={styles.header__container_right}>
//           Сохрaненные фильмы
//         </Link>
//       </div>
//       <Link to='/profile' className={styles.header__nodecor}>
//         <button className={styles.header__accaunt}>
//           <img
//             src={profile}
//             className={styles.header__logo_profile}
//             alt='logo'
//           ></img>
//           Аккаунт
//         </button>
//       </Link>
//     </div>
//   )
// }
