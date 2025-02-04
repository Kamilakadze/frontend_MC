import React from 'react';
import TaskList from './components/TaskList';

const App = () => {
    return (
        <div className="app-container">
            <h1 className="header">To-Do List</h1>
            <TaskList />
        </div>
    );
};

export default App;
