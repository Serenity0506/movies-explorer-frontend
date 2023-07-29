import styles from './Profile.module.css'
import { Header } from '../Header/Header'
import { useState } from 'react'

export const Profile = ({
  logOut,
  onCloseBurgerPopup,
  isLoggedIn,
  isOpenBurger,
  changeBurgerView,
}) => {
  const [isEditInput, setIsEditInput] = useState(true)

  const saveInfo = (e) => {
    e.preventDefault()
    setIsEditInput(!isEditInput)
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isOpenBurger={isOpenBurger}
        changeBurgerView={changeBurgerView}
        onCloseBurgerPopup={onCloseBurgerPopup}
      />
      <main className={styles.profile__container}>
        <h1 className={styles.profile__title}>Привет, Виталий!</h1>
        <form className={styles.profile__labels}>
          <label className={styles.profile__label}>
            <span className={styles.profile__span}>Имя</span>
            <input
              className={styles.profile__input}
              name='name'
              type='text'
              minLength='2'
              maxLength='30'
              placeholder='Имя'
              disabled={isEditInput}
              required
            ></input>
          </label>
          <label className={styles.profile__label}>
            <span className={styles.profile__span}>E-mail</span>
            <input
              className={styles.profile__input}
              name='email'
              type='email'
              placeholder='E-mail'
              disabled={isEditInput}
              required
            ></input>
          </label>
        </form>

        {!isEditInput && (
          <div className={styles.profile__labels}>
            <span className={styles.profile__error}>
              Ошибочка вышла, попробуйте позднее.
            </span>
            <button
              type='button'
              className={styles.profile__savebutton}
              onClick={saveInfo}
            >
              Сохранить
            </button>
          </div>
        )}

        {isEditInput && (
          <div className={styles.profile__buttons}>
            <button
              type='button'
              className={styles.profile__edit}
              onClick={saveInfo}
            >
              Редактировать
            </button>
            <button
              type='button'
              onClick={logOut}
              className={styles.profile__logout}
            >
              Выйти из аккаунта
            </button>
          </div>
        )}
      </main>
    </>
  )
}
