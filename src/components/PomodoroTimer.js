import React, { useState, useEffect } from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";
import styles from "../styles/PomodoroTimer.module.css";

const PomodoroTimer = ({ initialTime }) => {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        setTime(initialTime);
        setIsRunning(false);
    }, [initialTime]);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className={styles.timerContainer}>
            <h2 className={styles.timerTitle}>
                {initialTime === 25 * 60 ? "Work Time" : initialTime === 5 * 60 ? "Short Break" : "Long Break"}
            </h2>
            <div className={styles.timerDisplay}>{formatTime(time)}</div>
            <div className={styles.timerControls}>
                <button onClick={() => setIsRunning(true)} disabled={isRunning}>
                    <FaPlay />
                </button>
                <button onClick={() => setIsRunning(false)} disabled={!isRunning}>
                    <FaPause />
                </button>
                <button onClick={() => setTime(initialTime)}>
                    <FaRedo />
                </button>
            </div>
        </div>
    );
};

export default PomodoroTimer;
