import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

function Countdown() {
    const [time, setTime] = useState(0.1*60);
    const [isActive, setisActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    const { startNewChallenge } = useContext(ChallengesContext);

    useEffect(() => {
        if (isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0){
            setHasFinished(true);
            setisActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    function startCountdown(){
        setisActive(true);
    }

    function resetCountdown(){
        clearTimeout(countdownTimeout);
        setisActive(false);
        setTime(25*60)
    }

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            
            {hasFinished ? (
                <button 
                    disabled
                    className={`${styles.countdownButton}`} 
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    { isActive ? 
                        (
                            <button 
                                type="button" 
                                className={`${styles.countdownButton} ${styles.countdownButtonActive}`} 
                                onClick={resetCountdown}
                            >
                                Abandonar ciclo
                            </button>
                        ) : 
                        (
                            <button 
                                type="button" 
                                className={styles.countdownButton} 
                                onClick={startCountdown}
                            >
                                Iniciar um ciclo
                            </button>
                        )
                    }
                </>
            )}
        </div>
    )
}

export default Countdown;
