import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import ContextMenu from './ContextMenu';
import { readTasks, createTask, deleteTask, updateTask } from '../services/api';
import Calendar from '../components/TaskCalendar'
import './TodoPage.css';

const TodoPage = () => {
    const [tasks, setTasks] = useState([]);
    // Store userinput for creating a new task
    const [newTask, setNewTask] = useState('');
    // Index of task being editted
    const [editingIndex, setEditingIndex] = useState(null);
    //Holds the text of the task being edited.
    const [editTaskText, setEditTaskText] = useState('');
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, taskIndex: null });

    useEffect(() => {
        const loadTasks = async () => {
            const loadedTasks = await readTasks();
            setTasks(loadedTasks);
        };
        loadTasks();
    }, []);

    const getTaskCountsByDate = () => {
        const taskCounts = {};

        tasks.forEach((task) => {
            const timeStamp = task.task_created_time_stamp;
            const date = new Date(timeStamp.replace(' ', 'T')); 

            if (!taskCounts[date]) {
                taskCounts[date] = 0;
            }
            taskCounts[date]++;
        });

        return Object.entries(taskCounts).map(([date, count]) => ({
            date,
            count,
        }));
    };



    const handleCreateTask = async () => {
        if (newTask.trim()) {
            const createdTask = await createTask(newTask);
            setTasks((prev) => [...prev, createdTask].sort((a, b) => a.task_id - b.task_id));
            setNewTask('');
        }
    };

    const handleDeleteTask = async (index) => {
        const task = tasks[index];
        await deleteTask(task.task_id);
        setTasks((prev) => prev.filter((_, i) => i !== index));
    };

    const handleToggleTaskCompletion = async (index) => {
        const task = tasks[index];
        await updateTask(task.task_id, { ...task, task_is_completed: !task.task_is_completed });
        setTasks((prev) =>
            prev.map((t, i) => (i === index ? { ...t, task_is_completed: !t.task_is_completed } : t))
        );
    };

    const handleUpdateTask = async (index) => {
        const task = tasks[index];
        await updateTask(task.task_id, { ...task, task_desc: editTaskText });
        setTasks((prev) =>
            prev.map((t, i) => (i === index ? { ...t, task_desc: editTaskText } : t))
        );
        setEditingIndex(null);
        setEditTaskText('');
    };

    const handleContextMenuAction = (action) => {
        const index = contextMenu.taskIndex;
        if (action === 'edit') setEditingIndex(index);
        else if (action === 'delete') handleDeleteTask(index);
        else if (action === 'toggle') handleToggleTaskCompletion(index);
    };

    const hideContextMenu = () => setContextMenu({ visible: false, x: 0, y: 0, taskIndex: null });

    return (
        <div className="app-container" onClick={hideContextMenu}>
            <div class ="filler"></div>

            <div class = "canvas-container">
                <h1 class = "header-title">To-Do List</h1>
                {/*Component where user enters information */}
                {/*3 Arguments/ props */}

                {/*Component Tasklist*/}
                <TaskList className = "task-list"
                    tasks={tasks}
                    editingIndex={editingIndex}
                    editTaskText={editTaskText}
                    setEditTaskText={setEditTaskText}
                    setEditingIndex={setEditingIndex}
                    onEditTask={handleUpdateTask}
                    onRightClick={(e, index) => {
                        e.preventDefault();
                        setContextMenu({ visible: true, x: e.pageX, y: e.pageY, taskIndex: index });
                    }}
                />

                {/*Context Menu*/}
                {contextMenu.visible && (
                    <ContextMenu
                        top={contextMenu.y}
                        left={contextMenu.x}
                        onAction={handleContextMenuAction}
                        isCompleted={tasks[contextMenu.taskIndex]?.task_is_completed}
                    />
                )}
                <TaskInput newTask={newTask} setNewTask={setNewTask} onAddTask={handleCreateTask} />
            </div>

            <div class = "task-calendar">
                <Calendar taskCounts={getTaskCountsByDate()} />
            </div>
            

        </div>
    );
};

export default TodoPage;