import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import ContextMenu from './ContextMenu';
import { readCompletedTasks, readUncompletedTasks, readTasks, createTask, deleteTask, updateTask , updateUID} from '../services/api';
import Calendar from './TaskCalendar'
import './TodoPage.css';

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();


const TodoPage = () => {
    const [userUid, setUserUid] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [uncompletedTasks, setUncompletedTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    // Store userinput for creating a new task
    const [newTask, setNewTask] = useState('');


    const [editingIndexUncompleted, setEditingIndexUncompleted] = useState(null);
    const [editingIndexCompleted, setEditingIndexCompleted] = useState(null);
    const [editTextUncompleted, setEditTextUncompleted] = useState('');
    const [editTextCompleted, setEditTextCompleted] = useState('');


    const [showCompleted, setShowCompleted] = useState(false);

    const [alarmTime, setAlarmTime] = useState('');
    const [newAlarmVisible, setNewAlarmVisible] = useState(false);

    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, taskIndex: null, taskCompleted: false });


    const handleReadUncompletedTasks = async (uid) => {
        const loadedTasks = await readUncompletedTasks(uid);
        setUncompletedTasks(loadedTasks);
    };
    const handleReadCompletedTasks = async (uid) => {
        const loadedTasks = await readCompletedTasks(uid);
        setCompletedTasks(loadedTasks);
    };

    const handleReadTasks = async(uid) => {
        handleReadCompletedTasks(uid)
        handleReadUncompletedTasks(uid)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userId = user.uid;
                setUserUid(userId); // Set UID when user is authenticated
                const userEmail = user.email;
                setUserEmail(userEmail);

            } else {
                setUserUid(null); // Clear UID when the user is signed out
                setUserEmail(null); 
            }
        });

        return () => {
            unsubscribe();  // Clean up the listener when component unmounts
        };
    }, []);

    useEffect(() => {
        // mostly for dev work
        const isOnline = navigator.onLine;
        if (!isOnline) {
            setUserUid("dummy_uid")
            setUserEmail("MatrixHunter101@ucsc.edu")
        }
        handleReadTasks(userUid);
    }, [userUid]);



    const getCompletedCountsByDate = () => {
        const taskCounts = {};

        completedTasks.forEach((task) => {
            const timeStamp = task.task_created_time_stamp;
            const date = new Date(timeStamp.replace(' ', 'T'));
            date.setHours(0, 0, 0, 0);

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
            const createdTask = await createTask(userUid, newTask, alarmTime);
            //setUncompletedTasks((prev) => [...prev, createdTask].sort((a, b) => a.task_id - b.task_id));
            handleReadTasks(userUid)
            setNewTask('');
        }
    };

    const handleDeleteUncompleted = async (index) => {
        const task = uncompletedTasks[index];
        await deleteTask(task.task_id);
        handleReadTasks(userUid)
    };
    const handleDeleteCompleted = async (index) => {
        const task = completedTasks[index];
        await deleteTask(task.task_id);
        handleReadTasks(userUid)
    };

    const handleToggleUncompleted = async (index) => {
        console.log(uncompletedTasks)

        const task = uncompletedTasks[index];
        await updateTask(task.task_id, task.task_uid, { ...task, task_is_completed: !task.task_is_completed});
        handleReadTasks(userUid);
    };

    const handleToggleCompleted = async (index) => {
        console.log(index)
        const task = completedTasks[index];
        await updateTask(task.task_id, task.task_uid, { ...task, task_is_completed: !task.task_is_completed});
        handleReadTasks(userUid);
    };

    const handleUpdateUncompleted = async (index) => {
        const task = uncompletedTasks[index];
        await updateTask(task.task_id, task.task_uid, { ...task, task_desc: editTextUncompleted});
        handleReadUncompletedTasks(userUid);
        setEditingIndexUncompleted(null);
        setEditTextUncompleted('');
    };
    const handleUpdateCompleted = async (index) => {
        const task = completedTasks[index];
        await updateTask(task.task_id, task.task_uid, { ...task, task_desc: editTextCompleted});
        handleReadCompletedTasks(userUid);
        setEditingIndexCompleted(null);
        setEditTextCompleted('');
    };

    const handleUpdateAlarmCompleted = async (index, alarm) => {
        const task = completedTasks[index];
        await updateTask(task.task_id, task.task_uid, { ...task, task_alarm_time: alarm});
        handleReadCompletedTasks(userUid);
    };

    const handleUpdateAlarmUncompleted = async (index, alarm) => {
        const task = uncompletedTasks[index];
        await updateTask(task.task_id, task.task_uid,{ ...task, task_alarm_time: alarm});
        handleReadUncompletedTasks(userUid);
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

            <div class="flex flex-grow-[0.2] flex-col">
                <div class="text-3xl text-white mb-6 mt-6">{userEmail}</div>
                <div class= "text-3xl text-white">List [1] go here</div>
                <div class= "text-3xl text-white">List [2] go here</div>
                <div class= "text-3xl text-white">List [3] go here</div>
            </div>



            <div className="flex-col bg-[#] grow-[3]">
                <div className= "flex gap-2">
                    <img src="/assets/star.svg" width="30" height="30" />
                    <h1 class="text-white text-2xl text-left mb-6 mt-6">Min-Max List</h1>
                </div>
                {/*Component where user enters information */}
                {/*3 Arguments/ props */}

                {/*Component Tasklist*/}
                <div className='text-[#ffffff] semi-bold'>
                    <TaskList className="task-list"
                        tasks={uncompletedTasks}
                        editingIndex={editingIndexUncompleted}
                        editTaskText={editTextUncompleted}
                        setEditTaskText={setEditTextUncompleted}
                        setEditingIndex={setEditingIndexUncompleted}
                        onEditTask={handleUpdateUncompleted}
                        onAlarmUpdate={handleUpdateAlarmUncompleted}
                        onRightClick={(e, index) => {
                            e.preventDefault();
                            setContextMenu({ visible: true, x: e.pageX, y: e.pageY, taskIndex: index, taskCompleted: false });
                        }}
                    />
                </div>

                <hr className="h-2 bg-[#3AA7FA] border-0 rounded md:my-5" />



                {/*Toggle button*/}
                <div class="mt-5 mb-5 flex">
                    <div class="rounded-full bg-[#8CC63F] flex ">
                        <label class="inline-flex items-center cursor-pointer m-1">
                            <input type="checkbox" value="" class="sr-only peer"
                                checked={showCompleted}
                                onChange={() => setShowCompleted(!showCompleted)}>
                            </input>
                            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-border-600"></div>

                            <span class="ms-3 text-[#333333] mr-5 select-none">Completed</span>
                        </label>
                    </div>
                </div>






                {showCompleted && (
                    <div className="line-through text-[#333333]">
                        <TaskList className="task-list"
                            tasks={completedTasks}
                            editingIndex={editingIndexCompleted}
                            editTaskText={editTextCompleted}
                            setEditTaskText={setEditTextCompleted}
                            setEditingIndex={setEditingIndexCompleted}
                            onEditTask={handleUpdateCompleted}
                            onAlarmUpdate={handleUpdateAlarmCompleted}
                            onRightClick={(e, index) => {
                                e.preventDefault();
                                setContextMenu({ visible: true, x: e.pageX, y: e.pageY, taskIndex: index, taskCompleted: true });
                            }}
                        />
                    </div>
                )}


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


            <div class="grow-[0.2] flex flex-col items-center">
                <div className = "text-white">Graph View</div>
                <div class="task-calendar">
                    <Calendar taskCounts={getCompletedCountsByDate()} />
                </div>
            </div>


        </div>
    );
};

export default TodoPage;