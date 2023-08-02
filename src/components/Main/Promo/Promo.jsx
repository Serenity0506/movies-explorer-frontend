import styles from './Promo.module.css';
import logoPromo from '../../../images/promo.png'

export const Promo = () => {
    return(
        <section className={styles.promo__background}>
            <img 
                src={logoPromo} 
                alt='logo'
                className={styles.promo__logo}
            ></img>
        <h1 className={styles.promo__capture}>Учебный проект студента факультета Веб-разработки.</h1>
        </section>
    )
}