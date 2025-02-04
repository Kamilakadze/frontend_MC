import React, { useState } from 'react';

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
        <div className="task-item">
            {isEditing ? (
                <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
            ) : (
                <span>{task.title}</span>
            )}
            <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
            <button onClick={() => removeTask(task.id)}>Delete</button>
        </div>
    );
};

export default TaskItem;
