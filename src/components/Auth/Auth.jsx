import { Link, useNavigate } from 'react-router-dom'
import logoMain from '../../images/logo.svg'
import styles from './Auth.module.css'
import classNames from 'classnames'
import { useState } from 'react'
import ApiMain from '../../utils/Api/ApiMain'
import Preloader from '../Sharing/Preloader/Preloader'
import { useFormWithValidation } from '../../utils/hooks/useFormWithValidation'
import { UseCurrentUserContext } from '../../context/CurrentUserContext'

export default function Auth({ showLoginView, onRegister }) {
  const navigate = useNavigate()
  const { setToken } = UseCurrentUserContext()

  const { values, errors, handleChange } = useFormWithValidation({
    name: '',
    email: '',
    password: '',
  })

  const [formError, setFormError] = useState('')

  const handleLogin = () => {}

  const handleRegister = (evt) => {
    evt.preventDefault()
    setFormError('')

    ApiMain.signUp(values)
      .then((data) => {
        console.log(data)
        setToken(data.token)
        navigate('/movies')
      })
      .catch((error) => {
        setFormError(error)
      })
  }

  const formSettings = showLoginView
    ? {
        // Войти
        headerText: 'Рады видеть!',
        showNameInput: false,
        formFields: {},
        primaryButtonText: 'Войти',
        subtitleText: 'Ещё не зарегистрированы?',
        subtitleLinkText: 'Регистрация',
        subtitleLinkPath: '/signup',
        submit: handleLogin,
      }
    : {
        // Регистрация
        headerText: 'Добро пожаловать!',
        showNameInput: true,
        primaryButtonText: 'Зарегистрироваться',
        subtitleText: 'Уже зарегистрированы?',
        subtitleLinkText: 'Войти',
        subtitleLinkPath: '/signin',
        submit: handleRegister,
      }

  // const { mutateAsync, isLoading, isError, error } = useMutation({
  //   mutationFn: (data) => apiMain.signUp(data),
  // })

  // const handleSubmit = async (values) => {
  //   await mutateAsync({
  //     email: values.email,
  //     group: values.group,
  //     password: values.password,
  //   })
  //   navigate('/signin')
  // }
  // if (isLoading) return <Preloader />
  // if (isError) return <p>{`${error} `}</p>

  return (
    <div className={styles.auth__container}>
      <Link to='/'>
        <img src={logoMain} className={styles.auth__logo} alt='logo'></img>
      </Link>
      <h1 className={styles.auth__title}>{formSettings.headerText}</h1>
      <Preloader />
      <form
        name='auth'
        className={styles.auth__form}
        onSubmit={formSettings.submit}
      >
        {!!formSettings.showNameInput && (
          <>
            <label className={styles.auth__label}>Имя</label>
            <input
              name='name'
              type='text'
              className={classNames(styles.auth__input)}
              value={values.name}
              onChange={handleChange}
              required
            />
          </>
        )}
        <label className={styles.auth__label}>E-mail</label>
        <input
          name='email'
          type='email'
          className={styles.auth__input}
          value={values.email}
          onChange={handleChange}
          required
        />
        <label className={styles.auth__label}>Пароль</label>
        <input
          name='password'
          type='password'
          className={classNames(
            styles.auth__input,
            errors.password && styles.auth__error
          )}
          value={values.password}
          onChange={handleChange}
          minLength='6'
          required
        />
        {errors.password && (
          <span className={styles.auth__error_text}>{errors.password}</span>
        )}
        <button type='submit' className={styles.auth__primary_button}>
          {formSettings.primaryButtonText}
        </button>
      </form>
      <span>{formError.message}</span>
      <div className={styles.auth_subtitle}>
        <span className={styles.auth__subtitle_text}>
          {formSettings.subtitleText}{' '}
        </span>
        <Link
          className={styles.auth__subtitle_link}
          to={formSettings.subtitleLinkPath}
        >
          {formSettings.subtitleLinkText}
        </Link>
      </div>
    </div>
  )
}
