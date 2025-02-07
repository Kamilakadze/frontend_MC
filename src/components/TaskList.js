import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import styles from '../styles/TaskList.module.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (!taskInput.trim()) return;
        const newTask = { id: Date.now(), title: taskInput };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTaskInput('');
    };

    const removeTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const editTask = (id, newTitle) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, title: newTitle } : task
            )
        );
    };

    return (
        <div className={styles.taskListContainer}>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Enter a new task"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    className={styles.taskInput}
                />
                <button onClick={addTask} className={styles.addButton}>Add Task</button>
            </div>
            <div className={styles.taskList}>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} removeTask={removeTask} editTask={editTask} />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
