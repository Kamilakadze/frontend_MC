import React, { useState, useEffect } from "react"; 
import ReactDOM from "react-dom/client";
import PomodoroTimer from "./components/PomodoroTimer";
import TaskList from "./components/TaskList";
import ThemeSwitcher from "./components/ThemeSwitcher";
import styles from "./styles/App.module.css";

const App = () => {
    const [activeSection, setActiveSection] = useState("pomodoro");
    const [timerDuration, setTimerDuration] = useState(25 * 60);

    // 🌙 Тема: загружаем из localStorage
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    const handleSectionChange = (section) => {
        let newDuration;
        if (section === "pomodoro") newDuration = 25 * 60;
        else if (section === "shortBreak") newDuration = 5 * 60;
        else if (section === "longBreak") newDuration = 15 * 60;

        setActiveSection(section);
        setTimerDuration(newDuration);
    };

    return (
        <div className={`${styles.appContainer} ${theme === "dark" ? styles.dark : ""}`}>
            <div className={styles.headerContainer}>
                <ThemeSwitcher toggleTheme={toggleTheme} theme={theme} />
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>PomodoList</h1>
                </div>
            </div>

            <div className={styles.layoutContainer}>
                <div className={styles.timerSection}>
                    <div className={styles.navButtons}>
                        <button className={styles.navButton} onClick={() => handleSectionChange("pomodoro")}>Pomodoro</button>
                        <button className={styles.navButton} onClick={() => handleSectionChange("shortBreak")}>Short Break</button>
                        <button className={styles.navButton} onClick={() => handleSectionChange("longBreak")}>Long Break</button>
                    </div>
                    <PomodoroTimer initialTime={timerDuration} />
                </div>

                <div className={styles.taskSection}>
                    <TaskList />
                </div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

export default App;
