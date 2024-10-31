import React from 'react';
import './TaskInput.css'

const TaskInput = ({ newTask, setNewTask, onAddTask }) => (
    <div className="input-container">
        <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === 'Enter') onAddTask();
            }}
            placeholder="Enter a Task . . ."
        />
    </div>
);

export default TaskInput;