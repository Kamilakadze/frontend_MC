import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');

    // Загружаем задачи из localStorage при первом рендере
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    // Сохраняем задачи в localStorage при каждом изменении списка задач
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Добавление новой задачи
    const addTask = () => {
        if (!taskInput.trim()) return; // Проверяем, чтобы поле ввода не было пустым
        const newTask = { id: Date.now(), title: taskInput };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTaskInput(''); // Очищаем поле ввода после добавления
    };

    // Удаление задачи
    const removeTask = (id) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    return (
        <div className="task-list">
            <div className="task-input-container">
                <input
                    type="text"
                    placeholder="Enter a new task"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)} // Обновляем значение ввода
                    className="task-input"
                />
                <button className="add-task-btn" onClick={addTask}>
                    Add Task
                </button>
            </div>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} removeTask={removeTask} />
            ))}
        </div>
    );
};

export default TaskList;
