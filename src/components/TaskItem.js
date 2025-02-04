import React from 'react';

const TaskItem = ({ task, removeTask }) => {
    return (
        <div className="task-item">
            {task.title}
            <button className="delete-btn" onClick={() => removeTask(task.id)}>
                ✖
            </button>
        </div>
    );
};

export default TaskItem;
