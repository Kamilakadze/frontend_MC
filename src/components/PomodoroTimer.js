import React, { Component } from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";
import styles from "../styles/PomodoroTimer.module.css";

class PomodoroTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: props.initialTime,
            isRunning: false
        };
        this.timer = null;
    }

    // Обновляем таймер при изменении initialTime (например, переключение "Work"/"Break")
    componentDidUpdate(prevProps) {
        if (prevProps.initialTime !== this.props.initialTime) {
            this.setState({ time: this.props.initialTime, isRunning: false });
            clearInterval(this.timer);
        }
    }

    // Очистка интервала при размонтировании компонента
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    // Запуск таймера
    startTimer = () => {
        if (!this.state.isRunning) {
            this.setState({ isRunning: true });
            this.timer = setInterval(() => {
                this.setState((prevState) => ({
                    time: prevState.time > 0 ? prevState.time - 1 : 0
                }));
            }, 1000);
        }
    };

    // Остановка таймера
    stopTimer = () => {
        this.setState({ isRunning: false });
        clearInterval(this.timer);
    };

    // Сброс таймера
    resetTimer = () => {
        this.setState({ time: this.props.initialTime, isRunning: false });
        clearInterval(this.timer);
    };

    // Форматирование времени (MM:SS)
    formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    render() {
        const { time, isRunning } = this.state;
        const { initialTime } = this.props;

        return (
            <div className={styles.timerContainer}>
                <h2 className={styles.timerTitle}>
                    {initialTime === 25 * 60 ? "Work Time" : initialTime === 5 * 60 ? "Short Break" : "Long Break"}
                </h2>
                <div className={styles.timerDisplay}>{this.formatTime(time)}</div>
                <div className={styles.timerControls}>
                    <button onClick={this.startTimer} disabled={isRunning}>
                        <FaPlay />
                    </button>
                    <button onClick={this.stopTimer} disabled={!isRunning}>
                        <FaPause />
                    </button>
                    <button onClick={this.resetTimer}>
                        <FaRedo />
                    </button>
                </div>
            </div>
        );
    }
}

export default PomodoroTimer;
