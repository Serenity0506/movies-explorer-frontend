import { useState } from 'react'
import styles from './Checkbox.module.css'

function Checkbox({ labelText }) {
  const [checked, setChecked] = useState(true)

  return (
    <label className={styles.checkbox__container}>
      <input
        checked={checked}
        className={styles.checkbox__checkbox}
        type='checkbox'
        name='name'
        // hidden
        onChange={() => setChecked(!checked)}
      ></input>
      <span className={styles.checkbox__icon}></span>
      {labelText}
    </label>
  )
}

export default Checkbox

// // { value, children, onChange, name }
