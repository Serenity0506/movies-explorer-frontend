import styles from './Profile.module.css'
import { Header } from '../Header/Header'
import { useEffect, useState } from 'react'
import { UseCurrentUserContext } from '../../context/CurrentUserContext'
import { useNavigate } from 'react-router-dom'
import apiMain from '../../utils/Api/ApiMain'
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation'
import classNames from 'classnames'

export const Profile = () => {
  const navigate = useNavigate()
  const { isLoggedIn, setToken, setCurrentUser } = UseCurrentUserContext()

  const [isProfileFetched, setIsProfileFetched] = useState(false)
  const [isFormReadOnly, setIsFormReadOnly] = useState(true)
  const [message, setMessage] = useState('')

  const { values, setValues, errors, handleChange, isValid } =
    useFormWithValidation({
      name: '',
      email: '',
    })

  const editProfileInfo = () => {
    setIsFormReadOnly(!isFormReadOnly)
  }

  const saveProfileInfo = (e) => {
    e.preventDefault()
    setIsFormReadOnly(!isFormReadOnly)

    apiMain
      .updateCurrentUser(values)
      .then(() => {
        setMessage('Профиль успешно обновлен!')
      })
      .catch((error) => {
        setMessage('Не удалось обновить профиль :(')
      })
      .finally(() => setTimeout(() => setMessage(''), 3000))
  }

  const onLogOut = () => {
    localStorage.clear()
    setToken('')
    setCurrentUser({})
    navigate('/')
  }

  useEffect(() => {
    if (!isLoggedIn) return

    apiMain
      .getCurrentUser()
      .then((user) => {
        setValues(user)
        setIsProfileFetched(true)
      })
      .catch(() => {})
  }, [isLoggedIn, setValues])

  return (
    <>
      <Header />

      <main className={styles.profile__container}>
        <h1 className={styles.profile__title}>Привет, {values.name}</h1>
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
              disabled={isFormReadOnly}
              value={values.name}
              onChange={handleChange}
              required
            ></input>
          </label>
          {errors.name && (
            <span className={styles.profile__error}>{errors.name}</span>
          )}
          <label className={styles.profile__label}>
            <span className={styles.profile__span}>E-mail</span>
            <input
              className={styles.profile__input}
              name='email'
              type='email'
              placeholder='E-mail'
              disabled={isFormReadOnly}
              value={values.email}
              onChange={handleChange}
              required
            ></input>
          </label>
          {errors.email && (
            <span className={styles.profile__error}>{errors.email}</span>
          )}
        </form>

        <span className={styles.profile__error}>{message}</span>

        {!isFormReadOnly && (
          <div className={styles.profile__labels}>
            <button
              type='button'
              className={styles.profile__savebutton}
              onClick={saveProfileInfo}
              disabled={!isValid}
            >
              Сохранить
            </button>
          </div>
        )}

        {isFormReadOnly && (
          <div className={styles.profile__buttons}>
            <button
              type='button'
              className={classNames(styles.profile__edit, {
                [styles.profile__edit_button_disabled]: isProfileFetched,
              })}
              onClick={editProfileInfo}
            >
              Редактировать
            </button>
            <button
              type='button'
              onClick={onLogOut}
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
