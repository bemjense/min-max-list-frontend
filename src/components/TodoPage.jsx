import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskGrouping from './TaskGrouping';
import ContextMenu from './ContextMenu';
import { readTaskAtId, readCompletedTasks, readUncompletedTasks, readTasks, createTask, deleteTask, updateTask , updateUID} from '../services/api';
import Calendar from './TaskCalendar'
import ListInterface from './ListInterface'
import './TodoPage.css';

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();


const TodoPage = () => {
    // multipleToDoLists State
    const [currentList, setCurrentList] = useState('count');

    //Authetnication statesj
    const [userUid, setUserUid] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    //tasks display
    const [tasks, setTasks] = useState([]);
    //task input
    const [newTask, setNewTask] = useState('');
    //task edit store input value temporarily
    const [editText, setEditText] = useState('');
    const [editID, setEditID] = useState(null);
    //task edit alarm store input value temporarily
    const [editAlarmID, setEditAlarmID] = useState('');
    const [alarmTime, setAlarmTime] = useState('');
    const [newAlarmVisible, setNewAlarmVisible] = useState(false);
    //context menu functionality
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, task_id: null, task_is_completed: false});


    // change logic later to take arugment for null
    const handleReadTasks = async (uid) => {
        if (currentList == "main_list") {
            var loadedTasks = await readTasks(uid);
        } else {
            var loadedTasks = await readTasks(uid, currentList);
        }

        setTasks(loadedTasks);
    };


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
        // mostly for dev work offlien
        const isOnline = navigator.onLine;
        if (!isOnline) {
            setUserUid("dummy_uid")
            setUserEmail("MatrixHunter101@ucsc.edu")
        }
        handleReadTasks(userUid);
    }, [userUid]);



    // used by graph fucntion. Modify this if you want to hcange how coloring works
    const getCompletedCountsByDate = () => {
        const taskCounts = {};

        tasks.forEach((task) => {
            if (task.task_is_completed) {
                const timeStamp = task.task_created_time_stamp;
                const date = new Date(timeStamp.replace(' ', 'T'));
                date.setHours(0, 0, 0, 0);

                if (!taskCounts[date]) {
                    taskCounts[date] = 0;
                }
                taskCounts[date]++;
            }
        });

        return Object.entries(taskCounts).map(([date, count]) => ({
            date,
            count,
        }));
    };



    const handleCreateTask = async () => {
        if (newTask.trim()) {
            await createTask(userUid, currentList,newTask, alarmTime);
            handleReadTasks(userUid)
            setNewTask('');
        }
    };

    const handleDelete = async (task_id) => {
        await deleteTask(task_id);
        handleReadTasks(userUid)
    };

    const handleToggleStatus = async (task_id) => {
        const task = await readTaskAtId(task_id)
        await updateTask(task_id, task.task_uid, { ...task, task_is_completed: !task.task_is_completed});
        handleReadTasks(userUid);
    };


    const handleUpdateInContextMenu = async (task_id) => {
        const task = await readTaskAtId(task_id)
        setEditID(task.task_id)
        setEditText(task.task_desc)

    };

    const handleUpdateAlarmInContextMenu = async (task_id) => {
        const task = await readTaskAtId(task_id)
        console.log(task.task_alarm_time)
        setEditAlarmID(task.task_id)
    };

    const handleUpdateDesc = async (task_id, task_desc) => {
        const task = await readTaskAtId(task_id)
        await updateTask(task.task_id, task.task_uid, { ...task, task_desc: task_desc});
        handleReadTasks(userUid);
    };

    const handleUpdateAlarm = async (task_id, alarm) => {
        const task = await readTaskAtId(task_id)
        await updateTask(task.task_id, task.task_uid,{ ...task, task_alarm_time: alarm});
        handleReadTasks(userUid);
    };


    const handleContextMenu = (action) => {
        const task_id = contextMenu.task_id;

        if (action === 'edit') handleUpdateInContextMenu(task_id);
        else if (action === 'delete') handleDelete(task_id);
        else if (action === 'toggle') handleToggleStatus(task_id);
        else if (action === 'alarm') handleUpdateAlarmInContextMenu(task_id);
    };


    const hideContextMenu = () => setContextMenu({ visible: false, x: 0, y: 0, task_id: null });

    return (

        <div className="app-container" onClick={hideContextMenu}>

            <div class="flex flex-1 flex-col bg-[#161616] m-0 justify-between items-center">
                <div class="text-3xl text-white mb-6 mt-6">{userEmail}</div>
                <ListInterface 
                    currentList={currentList}
                >
                </ListInterface>
            </div>



            <div className="flex-col bg-[#] flex-[3_2_0%] relative">
                <div className="flex gap-2">
                    <img src="/assets/star.svg" width="30" height="30" />
                    <h1 class="text-white text-2xl text-left mb-6 mt-6">{currentList}</h1>
                </div>
                {/*Component where user enters information */}
                {/*3 Arguments/ props */}

                {/*Component Tasklist*/}
                <TaskGrouping className="task-list"
                    tasks={tasks}
                    handleUpdateAlarm={handleUpdateAlarm}
                    setContextMenu={setContextMenu}
                    editID={editID}
                    setEditID={setEditID}
                    editText={editText}
                    setEditText={setEditText}
                    setEditAlarmID={setEditAlarmID}
                    editAlarmID={editAlarmID}
                    handleUpdateDesc={handleUpdateDesc}

                />


            <div className="absolute bottom-0 left-0 right-0">
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

            </div>

            {contextMenu.visible && (
                <ContextMenu
                    top={contextMenu.y}
                    left={contextMenu.x}
                    onAction={(action) => {
                        handleContextMenu(action);

                    }}
                    isCompleted={contextMenu.task_is_completed}
                />
            )}


            <div class="flex flex-col items-center bg-[#161616] flex-1 m-0">
                <div className="text-white mt-6 text-3xl ">Graph View</div>
                <div className="text-white mt-6 text-3xl ">Tasks Complete</div>
                <div className="text-white mt-6 text-3xl ">Graph View</div>
                <div class="task-calendar mb-0">
                    <Calendar taskCounts={getCompletedCountsByDate()} />
                </div>
            </div>


        </div>
    );
};

export default TodoPage;