import styles from './ProfileButton.module.css'
import profile from '../../../images/icon__COLOR_icon-main.svg'

function ProfileButton() {
  return (
    <button className={styles.profilebutton__accaunt}>
      <img
        src={profile}
        className={styles.profilebutton__logo_profile}
        alt='logo'
      ></img>
      Аккаунт
    </button>
  )
}

export default ProfileButton
