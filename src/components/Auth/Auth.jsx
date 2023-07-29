import { Link } from 'react-router-dom'
import logoMain from '../../images/logo.svg'
import styles from './Auth.module.css'
import classNames from 'classnames'
import { useState } from 'react'

export default function Auth({ showLoginView, onClick }) {
  const [password, setPassword] = useState('123')

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
        click: onClick,
      }
    : {
        // Регистрация
        headerText: 'Добро пожаловать!',
        showNameInput: true,
        primaryButtonText: 'Зарегистрироваться',
        subtitleText: 'Уже зарегистрированы?',
        subtitleLinkText: 'Войти',
        subtitleLinkPath: '/signin',
        click: onClick,
      }

  return (
    <main className={styles.auth__container}>
      <Link to='/'>
        <img src={logoMain} className={styles.auth__logo} alt='logo'></img>
      </Link>
      <h1 className={styles.auth__title}>{formSettings.headerText}</h1>
      <form name='auth' className={styles.auth__form}>
        {!!formSettings.showNameInput && (
          <>
            <label className={styles.auth__label}>Имя</label>
            <input
              name='name'
              type='text'
              className={classNames(styles.auth__input)}
              placeholder='Виталий'
              required
            />
          </>
        )}
        <label className={styles.auth__label}>E-mail</label>
        <input
          name='email'
          type='email'
          className={styles.auth__input}
          placeholder='pochta@yandex.ru'
          required
        />
        <label className={styles.auth__label}>Пароль</label>
        <input
          name='password'
          type='password'
          className={classNames(styles.auth__input, true && styles.auth__error)}
          value={password}
          minLength='6'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <span className={styles.auth__error_text}>Что-то пошло не так...</span>
        <button
          type='submit'
          className={styles.auth__primary_button}
          onClick={formSettings.click}
        >
          {formSettings.primaryButtonText}
        </button>
      </form>
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
    </main>
  )
}
