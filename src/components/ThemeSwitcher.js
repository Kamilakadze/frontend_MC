import React, { useState } from 'react';
import styles from '../styles/ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        document.body.className = theme;
    };

    return (
        <button className={styles.themeSwitcher} onClick={toggleTheme}>
            Toggle Theme
        </button>
    );
};

export default ThemeSwitcher;
