import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { FaSearch, FaArrowLeft } from 'react-icons/fa'; // 🔍⬅ Иконки поиска и возврата
import styles from '../styles/TaskList.module.css';

const TaskList = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [taskInput, setTaskInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchMode, setIsSearchMode] = useState(false); // 🔄 Переключатель режима

    // Сохраняем задачи в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const toggleSearchMode = () => {
        setIsSearchMode(!isSearchMode);
        setSearchQuery('');
    };

    const addTask = () => {
        if (!taskInput.trim()) return;
        const newTask = { id: Date.now(), title: taskInput };
        setTasks([...tasks, newTask]);
        setTaskInput('');
    };

    const removeTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const editTask = (id, newTitle) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, title: newTitle } : task
        ));
    };

    // 🔍 Фильтруем задачи по названию
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.taskListContainer}>
            <div className={styles.inputContainer}>
                {/* 🔄 Переключаем поля в зависимости от режима */}
                {isSearchMode ? (
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={styles.taskInput}
                    />
                ) : (
                    <input
                        type="text"
                        placeholder="Enter a new task"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        className={styles.taskInput}
                    />
                )}

                {/* 🔄 Кнопка переключения режима */}
                <button onClick={toggleSearchMode} className={styles.toggleButton}>
                    {isSearchMode ? <FaArrowLeft /> : <FaSearch />}
                </button>

                {/* Кнопка добавления задачи (не показывается в режиме поиска) */}
                {!isSearchMode && (
                    <button onClick={addTask} className={styles.addButton}>Add Task</button>
                )}
            </div>

            <div className={styles.taskList}>
                {(isSearchMode ? filteredTasks : tasks).map((task) => (
                    <TaskItem key={task.id} task={task} removeTask={removeTask} editTask={editTask} />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
