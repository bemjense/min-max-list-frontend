import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editTaskText, setEditTaskText] = useState('');
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, taskIndex: null });

    {/*On startup attempt to connect to fastapi and get a list of tasks if not output an error*/}
    useEffect(() => {
        {/* Function to retreive tasks and insert them into tasks list*/}
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/tasks/');
                {/*Sorts by ascending ID number*/}
                const sortedTasks = response.data.sort((a, b) => a.task_id - b.task_id);
                {/*updates tasks list with retreived tasks*/}
                setTasks(sortedTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        {/*is called once*/}
        fetchTasks();
    }, []);

    {/* Function to add a task then add values for task list and reset new_task string*/}
    const addTask = async () => {
        {/* if newTask is not an empty string*/}
        if (newTask.trim() !== '') {
            {/* attempt to post new_task data to fastapi*/}
            try {
                const response = await axios.post('http://localhost:8000/tasks/', {
                    task_desc: newTask,
                    task_is_completed: false
                });
                
                const newTaskData = response.data; // Assuming response contains the created task with ID
                // Insert the new task in the correct order by ID
                setTasks((prevTasks) => {
                    // Create a new array including the new task
                    const updatedTasks = [...prevTasks, newTaskData];
                    
                    // Sort the tasks by ID
                    return updatedTasks.sort((a, b) => a.task_id - b.task_id);
                });
                setNewTask('');
                {/* if sucessfull create a new array with the previous tasks and append the created task
                setTasks([...tasks, { task_desc: newTask, task_is_completed: false }]);
                setNewTask('');
                */}
                {/* also reset new_task to an empty string at end
                setTasks([...tasks, response.data]);
                
                setNewTask('');
                */}
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    };

    {/* Function to delete a task*/}
    const deleteTask = async (index) => {
        const task = tasks[index];
        {/* attempts to delete task using axios to a fastapi*/}
        try {
            await axios.delete(`http://localhost:8000/tasks/${task.task_id}`);
            {/* creates a new taskArray by getting rid of any tasks by filtering any with the same index*/}
            const updatedTasks = tasks.filter((_, i) => i !== index);
            {/*Updates the tasks array with the updated tasks then closes the context menu from right click*/}
            setTasks(updatedTasks);
            hideContextMenu();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const toggleTaskCompletion = async (index) => {
        {/* retrieves  and puts taskIndex into task*/}
        const task = tasks[index];
        {/* attempts to edit a task from fast api*/}
        try {
            {/* attempts to replace id, text, and reverses is completed using the task's index*/}
            {/* retrieves id, desc, and reverses the tasks completion status*/}
            await axios.put(`http://localhost:8000/tasks/${task.task_id}`, {
                task_desc: task.task_desc,
                task_is_completed: !task.task_is_completed
            });
            {/* creates a new task array using the original array by mapping and each ones task index and if equals it reverses that tasks is_completed data*/}
            const updatedTasks = tasks.map((t, i) =>
                i === index ? { ...t, task_is_completed: !t.task_is_completed } : t
            );
            setTasks(updatedTasks);
            hideContextMenu();
        } catch (error) {
            console.error("Error toggling task completion:", error);
        }
    };

    const startEditingTask = (index) => {
        setEditingIndex(index);
        setEditTaskText(tasks[index].task_desc);
        hideContextMenu();
    };

    const saveEditedTask = async (index) => {
        try {
            await axios.put(`http://localhost:8000/tasks/${tasks[index].task_id}`, {
                task_desc: editTaskText,
                task_is_completed: tasks[index].task_is_completed
            });
            const updatedTasks = tasks.map((task, i) =>
                i === index ? { ...task, task_desc: editTaskText } : task
            );
            setTasks(updatedTasks);
            setEditingIndex(null);
            setEditTaskText('');
        } catch (error) {
            console.error("Error updating task:", error);
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
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            addTask();
                        }
                    }}
                    placeholder="Add a new task"
                />
            </div>
            <ul className="task-list">
                {tasks.sort((a, b) => a.task_id - b.task_id).map((task, index) => (
                    <li
                        key={task.task_id}
                        className={`task ${task.task_is_completed ? 'completed' : ''}`}
                        onContextMenu={(e) => handleRightClick(e, index)}
                    >
                        {editingIndex === index ? (
                            <input
                                type="text"
                                value={editTaskText}
                                onChange={(e) => setEditTaskText(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        
                                        saveEditedTask(index);
                                    }
                                }}
                                onBlur={() => {
                                    saveEditedTask(index);
                                }}
                            />
                        ) : (
                            <span className="task-text">{task.task_desc}</span>
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
                            ✅ {tasks[contextMenu.taskIndex].task_is_completed ? 'Undo Complete' : 'Mark as Complete'}
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