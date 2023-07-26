import styles from './Portfolio.module.css';
import photo from '../../../images/Vitaliy.png';


export const Portfolio = () => {

    return(
        <section id='portfolio' className={styles.portfolio__container}>
            <h4 className={styles.portfolio__title}>Студент</h4>
            <div className={styles.portfolio__container_grid}>
            <div className={styles.portfolio__img}>
                 <img alt='LGayduk' src={photo} className={styles.portfolio__img_pic}></img>
                </div>
                <div className={styles.portfolio__info}>
                    <h5 className={styles.portfolio__info_title}>Виталий</h5>
                    <h5 className={styles.portfolio__info_subtitle}>Фронтенд-разработчик, 30 лет</h5>
                    <p className={styles.portfolio__info_text}>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
                    <a href='https://github.com/Serenity0506' className={styles.portfolio__github}>GitHub</a>
                </div>
    
            </div>
  
            <h6 className={styles.portfolio__link}>Портфолио</h6>
            <div className={styles.portfolio__container_link}>
                 <a href='https://github.com/Serenity0506/russian-travel' className={styles.portfolio__link_big}>Статичный сайт
                     <span className={styles.portfolio__link_arrow}>&#8599;</span>
                 
                 </a>
            </div>


            <div className={styles.portfolio__container_link}>
                 <a href='https://github.com/Serenity0506/react-mesto-auth' className={styles.portfolio__link_big}>Адаптивный сайт
                    <span className={styles.portfolio__link_arrow}>&#8599;</span>
                 
                 </a>
            </div>


            <div className={styles.portfolio__container_link}>
                   <a href='https://github.com/Serenity0506/e-shop' className={styles.portfolio__link_big}>Одностраничное приложение
                       <span className={styles.portfolio__link_arrow}>&#8599;</span>
                   </a>
               
            </div>

        </section>
    )
}