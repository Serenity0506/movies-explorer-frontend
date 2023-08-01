import { useState } from 'react'
import styles from './Checkbox.module.css'

function Checkbox({ labelText, checkedInitial, onChange }) {
  const [checked, setChecked] = useState(checkedInitial)

  const handleChange = () => {
    setChecked(!checked)
    onChange(!checked)
  }

  // console.log(checked)

  return (
    <label className={styles.checkbox__container}>
      <input
        checked={checked}
        className={styles.checkbox__checkbox}
        type='checkbox'
        name='name'
        // hidden
        onChange={handleChange}
      ></input>
      <span className={styles.checkbox__icon}></span>
      {labelText}
    </label>
  )
}

export default Checkbox
