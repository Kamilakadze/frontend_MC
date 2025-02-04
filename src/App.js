import React, { useState } from 'react';
import TaskList from './components/TaskList';
import PomodoroTimer from './components/PomodoroTimer';
import ThemeSwitcher from './components/ThemeSwitcher';
import styles from './styles/App.module.css';

const App = () => {
    const [activeSection, setActiveSection] = useState('todo');

    return (
        <div className={styles.appContainer}>
            <header className={styles.header}>
                <h1 className={styles.monsterTitle}>Monsters Inc. Productivity Hub</h1>
                <p className={styles.monsterTagline}>Scaring up productivity, one task at a time!</p>
            </header>
            <div className={styles.navButtons}>
                <button className={styles.navButton} onClick={() => setActiveSection('todo')}>To-Do List</button>
                <button className={styles.navButton} onClick={() => setActiveSection('pomodoro')}>Pomodoro Timer</button>
                <button className={styles.navButton} onClick={() => setActiveSection('custom')}>Custom Timer</button>
                <button className={styles.navButton} onClick={() => setActiveSection('loop')}>Loop</button>
            </div>
            <ThemeSwitcher />
            {activeSection === 'todo' && <TaskList />}
            {activeSection === 'pomodoro' && <PomodoroTimer />}
            {activeSection === 'custom' && <p className={styles.placeholder}>Custom Timer Section Coming Soon!</p>}
            {activeSection === 'loop' && <p className={styles.placeholder}>Loop Section Coming Soon!</p>}
        </div>
    );
};

export default App;
