import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from '../styles/TaskItem.module.css';

const TaskItem = ({ task, removeTask, editTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const handleEdit = () => {
        if (isEditing) {
            editTask(task.id, editedTitle);
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className={styles.taskItem}>
            {isEditing ? (
                <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className={styles.taskInput}
                />
            ) : (
                <span className={styles.taskText}>{task.title}</span>
            )}
            <div className={styles.taskActions}>
                <button onClick={handleEdit}>
                    <FaEdit />
                </button>
                <button onClick={() => removeTask(task.id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
