import styles from './AboutProject.module.css'

export const AboutProject = () => {

    return(
        <section id='aboutProject' className={styles.about__container}>
            <h4 className={styles.about__title}>О проекте</h4>
            <div className={styles.about__info}>
                <h5 className={styles.about__info_title}>Дипломный проект включал 5 этапов</h5>
                <p className={styles.about__info_text}>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <h5 className={styles.about__info_title}>На выполнение диплома ушло 5 недель</h5>
                <p className={styles.about__info_text}>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p> 
            </div>
            <div className={styles.about__info_graph}>
                    <div className={styles.about__info_graph_green}>1 неделя</div>
                    <div className={styles.about__info_graph_gray}>4 недели</div>
                    <div className={styles.about__info_graph_tech}>Back-end</div>
                    <div className={styles.about__info_graph_tech}>Front-end</div>

                </div>
        </section>
    )
}