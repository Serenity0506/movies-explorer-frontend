import { Link } from 'react-router-dom'
import styles from './NavTab.module.css'

export const NavTab = () => {

    return(
        <div className={styles.navtab__container}>
            <Link reloadDocument to='#aboutproject' className={styles.navtab__links}>О проекте</Link>
            <Link reloadDocument to='#techs' className={styles.navtab__links}>Технологии</Link>
            <Link reloadDocument to='#portfolio' className={styles.navtab__links}>Студент</Link>
            
        </div>
    )
}