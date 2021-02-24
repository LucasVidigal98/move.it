import styles from '../styles/components/ExperienceBar.module.css';

function ExperienceBar() {
    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: '50%' }}/>

                <span className={styles.currentExperience} style={{ left: '50%' }} >
                    300 xp
                </span>
            </div>
            <span>680 xp</span>
        </header>
    )
}

export default ExperienceBar;
