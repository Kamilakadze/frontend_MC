import React, { Component } from 'react';
import styles from '../styles/PomodoroTimer.module.css';

class PomodoroTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 25 * 60,
            isWorking: true,
            isRunning: false,
        };
        this.timer = null;
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    startTimer = () => {
        if (!this.state.isRunning) {
            this.timer = setInterval(() => {
                this.setState((prevState) => {
                    if (prevState.time === 0) {
                        this.switchMode();
                        return { time: prevState.isWorking ? 5 * 60 : 25 * 60 };
                    }
                    return { time: prevState.time - 1 };
                });
            }, 1000);
            this.setState({ isRunning: true });
        }
    };

    stopTimer = () => {
        clearInterval(this.timer);
        this.setState({ isRunning: false });
    };

    switchMode = () => {
        this.setState((prevState) => ({
            isWorking: !prevState.isWorking,
            time: prevState.isWorking ? 5 * 60 : 25 * 60,
        }));
    };

    resetTimer = () => {
        this.stopTimer();
        this.setState({
            time: 25 * 60,
            isWorking: true,
            isRunning: false,
        });
    };

    formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    render() {
        return (
            <div className={styles.pomodoroTimer}>
                <h2>{this.state.isWorking ? 'Work Time' : 'Break Time'}</h2>
                <div className={styles.timer}>{this.formatTime(this.state.time)}</div>
                <button onClick={this.startTimer} disabled={this.state.isRunning}>Start</button>
                <button onClick={this.stopTimer} disabled={!this.state.isRunning}>Stop</button>
                <button onClick={this.resetTimer}>Reset</button>
            </div>
        );
    }
}

export default PomodoroTimer;
