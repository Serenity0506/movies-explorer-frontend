import styles from './Techs.module.css'

export const Techs = () => {

    return (
        <section id='techs' className={styles.techs__container}>
            <h4 className={styles.tech__title}>Технологии</h4>
            <div className={styles.tech__info}>
                <h6 className={styles.tech__info_title}>7 технологий</h6>
                <p className={styles.tech__info_text}>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
        <div className={styles.tech__info_graph}>
            <div className={styles.tech__info_graph_technologies}>HTML</div>
            <div className={styles.tech__info_graph_technologies}>CSS</div>
            <div className={styles.tech__info_graph_technologies}>JS</div>
            <div className={styles.tech__info_graph_technologies}>React</div>
            <div className={styles.tech__info_graph_technologies}>Git</div>
            <div className={styles.tech__info_graph_technologies}>Express.js</div>
            <div className={styles.tech__info_graph_technologies}>mongoDB</div>
        </div>
        </section>
    )
}