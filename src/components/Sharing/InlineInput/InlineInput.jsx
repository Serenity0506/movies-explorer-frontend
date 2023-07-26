import classNames from 'classnames'
import styles from './InlineInput.module.css'

function InlineInput({ labelText, value, errorText }) {
  return (
    <>
      <label className={styles.input__label}>
        {labelText}
        <input
          className={classNames(
            styles.input__input,
            errorText && styles.input__error
          )}
          value={value}
        ></input>
      </label>
      <span
        className={classNames(styles.error, errorText && styles.error_active)}
      >
        {errorText}
      </span>
    </>
  )
}

export default InlineInput
