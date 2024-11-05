import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import ContextMenu from './ContextMenu';
import { readCompletedTasks, readUncompletedTasks, readTasks, createTask, deleteTask, updateTask } from '../services/api';
import Calendar from './TaskCalendar'
import './TodoPage.css';

const TodoPage = () => {
    const [uncompletedTasks, setUncompletedTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    // Store userinput for creating a new task
    const [newTask, setNewTask] = useState('');


    const [editingIndexUncompleted, setEditingIndexUncompleted] = useState(null);
    const [editingIndexCompleted, setEditingIndexCompleted] = useState(null);
    const [editTextUncompleted, setEditTextUncompleted] = useState('');
    const [editTextCompleted, setEditTextCompleted] = useState('');

    const [alarmTime, setAlarmTime] = useState('');
    const [newAlarmVisible, setNewAlarmVisible] = useState(false);

    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, taskIndex: null, taskCompleted: false });


    const handleReadUncompletedTasks = async () => {
        const loadedTasks = await readUncompletedTasks();
        setUncompletedTasks(loadedTasks);
    };
    const handleReadCompletedTasks = async () => {
        const loadedTasks = await readCompletedTasks();
        setCompletedTasks(loadedTasks);
    };

    const handleReadTasks = async() => {
        handleReadCompletedTasks()
        handleReadUncompletedTasks()
    }

    useEffect(() => {
        handleReadTasks()
    }, []);

    const getCompletedCountsByDate = () => {
        const taskCounts = {};

        completedTasks.forEach((task) => {
            const timeStamp = task.task_created_time_stamp;
            const date = new Date(timeStamp.replace(' ', 'T')); 
            date.setHours(0, 0, 0, 0);
            console.log(date)

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
            const createdTask = await createTask(newTask,alarmTime);
            //setUncompletedTasks((prev) => [...prev, createdTask].sort((a, b) => a.task_id - b.task_id));
            handleReadTasks()
            setNewTask('');
        }
    };

    const handleDeleteUncompleted = async (index) => {
        const task = uncompletedTasks[index];
        await deleteTask(task.task_id);
        handleReadTasks()
    };
    const handleDeleteCompleted = async (index) => {
        const task = completedTasks[index];
        await deleteTask(task.task_id);
        handleReadTasks()
    };

    const handleToggleUncompleted = async (index) => {
        console.log(uncompletedTasks)
        
        const task = uncompletedTasks[index];
        await updateTask(task.task_id, { ...task, task_is_completed: !task.task_is_completed });
        handleReadTasks();
    };

    const handleToggleCompleted = async (index) => {
        console.log(index)
        const task = completedTasks[index];
        await updateTask(task.task_id, { ...task, task_is_completed: !task.task_is_completed });
        handleReadTasks();
    };

    const handleUpdateUncompleted = async (index) => {
        const task = uncompletedTasks[index];
        await updateTask(task.task_id, { ...task, task_desc: editTextUncompleted });
        handleReadUncompletedTasks();
        setEditingIndexUncompleted(null);
        setEditTextUncompleted('');
    };
    const handleUpdateCompleted = async (index) => {
        const task = completedTasks[index];
        await updateTask(task.task_id, { ...task, task_desc: editTextCompleted });
        handleReadCompletedTasks();
        setEditingIndexCompleted(null);
        setEditTextCompleted('');
    };

    const handleContextMenuUncompleted = (action) => {
        const index = contextMenu.taskIndex;
        if (action === 'edit') setEditingIndexUncompleted(index);
        else if (action === 'delete') handleDeleteUncompleted(index);
        else if (action === 'toggle') handleToggleUncompleted(index);
    };
    const handleContextMenuCompleted = (action) => {
        const index = contextMenu.taskIndex;
        if (action === 'edit') setEditingIndexCompleted(index);
        else if (action === 'delete') handleDeleteCompleted(index);
        else if (action === 'toggle') handleToggleCompleted(index);
    };

    const hideContextMenu = () => setContextMenu({ visible: false, x: 0, y: 0, taskIndex: null });

    return (

        <div className="app-container" onClick={hideContextMenu}>
            <div class ="grow-[1]"></div>

            <div className ="flex-col bg-[#] grow-[3]">

                <h1 class = "header-title">To-Do List</h1>
                {/*Component where user enters information */}
                {/*3 Arguments/ props */}

                {/*Component Tasklist*/}
                <div className='text-[#ffffff] semi-bold'>
                <TaskList className = "task-list"
                    tasks={uncompletedTasks}
                    editingIndex={editingIndexUncompleted}
                    editTaskText={editTextUncompleted}
                    setEditTaskText={setEditTextUncompleted}
                    setEditingIndex={setEditingIndexUncompleted}
                    onEditTask={handleUpdateUncompleted}
                    onRightClick={(e, index) => {
                        e.preventDefault();
                        setContextMenu({ visible: true, x: e.pageX, y: e.pageY, taskIndex: index, taskCompleted: false });
                    }}
                />
                </div>



                <div className = "tast-list-spacer">test</div>

                <div className = "line-through text-[#333333]">
                <TaskList className = "task-list"
                    tasks={completedTasks}
                    editingIndex={editingIndexCompleted}
                    editTaskText={editTextCompleted}
                    setEditTaskText={setEditTextCompleted}
                    setEditingIndex={setEditingIndexCompleted}
                    onEditTask={handleUpdateCompleted}
                    onRightClick={(e, index) => {
                        e.preventDefault();
                        setContextMenu({ visible: true, x: e.pageX, y: e.pageY, taskIndex: index, taskCompleted: true });
                    }}
                />
                </div>




                {contextMenu.visible && (
                    <ContextMenu
                        top={contextMenu.y}
                        left={contextMenu.x}
                        onAction={(action) => {
                            if (contextMenu.taskCompleted) {
                                handleContextMenuCompleted(action);
                            } else {
                                handleContextMenuUncompleted(action);
                            }
                        }}
                        isCompleted={contextMenu.taskCompleted}
                    />
                )}

                <TaskInput 
                    newTask={newTask} 
                    setNewTask={setNewTask} 
                    onAddTask={handleCreateTask} 
                    alarmTime={alarmTime} 
                    setAlarmTime={setAlarmTime} 
                    newAlarmVisible={newAlarmVisible}
                    setNewAlarmVisible={setNewAlarmVisible}
                />            
                
            </div>

            
            <div class ="grow-[1] flex">
                <div class = "task-calendar">
                    <Calendar taskCounts={getCompletedCountsByDate()} />
                </div>
            </div>












            

        </div>
    );
};

export default TodoPage;