import React, { useState } from 'react';
import './App.css'; // Assuming you want some custom styling

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editTaskText, setEditTaskText] = useState('');
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, taskIndex: null });

    // Function to add a task either by Enter key
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
        hideContextMenu();
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, isCompleted: !task.isCompleted } : task
        );
        setTasks(updatedTasks);
        hideContextMenu();
    };

    const startEditingTask = (index) => {
        setEditingIndex(index);
        setEditTaskText(tasks[index].text);
        hideContextMenu();
    };

    const saveEditedTask = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: editTaskText } : task
        );
        setTasks(updatedTasks);
        setEditingIndex(null);
        setEditTaskText('');
    };

    // Function to handle Enter key during editing
    const handleEditKeyPress = (e, index) => {
        if (e.key === 'Enter') {
            saveEditedTask(index);
        }
    };

    const handleRightClick = (e, index) => {
        e.preventDefault();
        setContextMenu({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            taskIndex: index,
        });
    };

    const hideContextMenu = () => {
        setContextMenu({ visible: false, x: 0, y: 0, taskIndex: null });
    };

    const handleContextMenuAction = (action) => {
        const index = contextMenu.taskIndex;
        if (action === 'edit') startEditingTask(index);
        else if (action === 'delete') deleteTask(index);
        else if (action === 'toggle') toggleTaskCompletion(index);
    };

    return (
        <div className="app-container" onClick={hideContextMenu}>
            <h1>To-Do List</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyPress={handleKeyPress} // Listen for Enter key
                    placeholder="Add a new task"
                />
            </div>
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className={`task ${task.isCompleted ? 'completed' : ''}`} // Add the 'completed' class
                        onContextMenu={(e) => handleRightClick(e, index)}
                    >
                        {editingIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editTaskText}
                                    onChange={(e) => setEditTaskText(e.target.value)}
                                    onKeyPress={(e) => handleEditKeyPress(e, index)} // Listen for Enter key during editing
                                />
                                <button onClick={() => saveEditedTask(index)}>Save</button>
                            </>
                        ) : (
                            <span className="task-text">{task.text}</span>
                        )}
                    </li>
                ))}
            </ul>
            {contextMenu.visible && (
                <div
                    className="context-menu fade-in"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <ul>
                        <li className="edit" onClick={() => handleContextMenuAction('edit')}>
                            ✏️ Edit
                        </li>
                        <li className="complete" onClick={() => handleContextMenuAction('toggle')}>
                            ✅ {tasks[contextMenu.taskIndex].isCompleted ? 'Undo Complete' : 'Mark as Complete'}
                        </li>
                        <li className="delete" onClick={() => handleContextMenuAction('delete')}>
                            🗑️ Delete
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default App;
