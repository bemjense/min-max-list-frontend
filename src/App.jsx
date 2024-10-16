import React, { useState } from 'react';
import './App.css'; // Assuming you want some custom styling

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editTaskText, setEditTaskText] = useState('');

    // Function to add a task either by button click or Enter key
    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { text: newTask, isCompleted: false }]);
            setNewTask(''); // Reset input field after adding task
        }
    };

    // Handle Enter key press to add task
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, isCompleted: !task.isCompleted } : task
        );
        setTasks(updatedTasks);
    };

    const startEditingTask = (index) => {
        setEditingIndex(index);
        setEditTaskText(tasks[index].text);
    };

    const saveEditedTask = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: editTaskText } : task
        );
        setTasks(updatedTasks);
        setEditingIndex(null);
        setEditTaskText('');
    };

    return (
        <div className="app-container">
            <h1>To-Do List</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={handleKeyPress} // Listen for Enter key
                    placeholder="Add a new task"
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className={`task ${task.isCompleted ? 'completed' : ''}`}>
                        {editingIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editTaskText}
                                    onChange={(e) => setEditTaskText(e.target.value)}
                                />
                                <button onClick={() => saveEditedTask(index)} className="save-btn">Save</button>
                                <button onClick={() => setEditingIndex(null)} className="cancel-btn">Cancel</button>
                            </>
                        ) : (
                            <>
                                <span onClick={() => toggleTaskCompletion(index)} className="task-text">{task.text}</span>
                                <div className="button-group">
                                    <button onClick={() => startEditingTask(index)} className="edit-btn">Edit</button>
                                    <button onClick={() => deleteTask(index)} className="delete-btn">Delete</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
