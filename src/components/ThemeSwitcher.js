import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import styles from "../styles/ThemeSwitcher.module.css";

const ThemeSwitcher = ({ toggleTheme, theme }) => {
    return (
        <button className={styles.themeSwitcher} onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
    );
};

export default ThemeSwitcher;
