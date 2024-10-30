import React from 'react';

const TaskInput = ({ newTask, setNewTask, onAddTask }) => (
    <div className="input-container">
        <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === 'Enter') onAddTask();
            }}
            placeholder="Add a cool task"
        />
    </div>
);

export default TaskInput;