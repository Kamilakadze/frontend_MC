import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';
import styles from '../styles/TaskItem.module.css';

const TaskItem = ({ task, removeTask, editTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [isCompleted, setIsCompleted] = useState(task.completed || false); // ✅ Состояние выполнения

    // Функция для редактирования
    const handleEdit = () => {
        if (isEditing) {
            editTask(task.id, editedTitle);
        }
        setIsEditing(!isEditing);
    };

    // Функция для переключения статуса задачи
    const toggleStatus = () => {
        setIsCompleted(!isCompleted);
    };

    return (
        <div className={`${styles.taskItem} ${isCompleted ? styles.completed : styles.inProgress}`}>
            {/* 🔹 Кнопка статуса (слева) */}
            <button onClick={toggleStatus} className={styles.statusButton}>
                {isCompleted ? <FaCheckCircle /> : <FaHourglassHalf />}
            </button>

            {/* 🔹 Поле задачи */}
            {isEditing ? (
                <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEdit()}
                    className={styles.taskEditInput}
                />
            ) : (
                <span className={`${styles.taskText} ${isCompleted ? styles.strikethrough : ''}`}>
                    {task.title}
                </span>
            )}

            {/* 🔹 Кнопки "Редактировать" и "Удалить" */}
            <div className={styles.taskActions}>
                {!isEditing ? (
                    <>
                        <button onClick={() => setIsEditing(true)} className={styles.editButton}>
                            <FaEdit />
                        </button>
                        <button onClick={() => removeTask(task.id)} className={styles.deleteButton}>
                            <FaTrash />
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={handleEdit} className={styles.saveButton}>
                            ✔️
                        </button>
                        <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>
                            ❌
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskItem;
