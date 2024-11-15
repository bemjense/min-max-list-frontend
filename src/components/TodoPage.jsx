import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskGrouping from './TaskGrouping';
import ContextMenu from './ContextMenu';
import { readTaskAtId, readLists,readCompletedTasks, readUncompletedTasks, readTasks, createTask, deleteTask, updateTask , updateUID, deleteAlarm,deleteDueDate} from '../services/api';
import Calendar from './TaskCalendar'
import ListInterface from './ListInterface'
import TaskFilter from './TaskFilter';
import './TodoPage.css';

import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();


const TodoPage = () => {
    // multipleToDoLists State

    //Authetnication statesj
    const [userUid, setUserUid] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    //tasks display has filters effect it through handle read
    const [tasks, setTasks] = useState([]);
    // contains all tasks in current state used for graph wihtout any filters effecting it
    const [globalTasks, setGlobalTasks] = useState([]);
    //task input
    const [newTask, setNewTask] = useState('');
    //task edit store input value temporarily
    const [editText, setEditText] = useState('');
    const [editID, setEditID] = useState(null);
    //task edit alarm store input value temporarily
    const [editAlarmID, setEditAlarmID] = useState('');
    const [alarmTime, setAlarmTime] = useState('');
    const [newAlarmVisible, setNewAlarmVisible] = useState(false);
    //task edit Due Date store input value temporarily
    const [editDueDateID, setEditDueDateID] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [newDueDateVisible, setNewDueDateVisible] = useState(false);
    //context menu functionality
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, task_id: null, task_is_completed: false});
    //states and filters for reading tasks
    const [currentList, setCurrentList] = useState('Tasks');
    const [lists, setLists] = useState(['Tasks']);
    const [filterTaskCreatedTimeStamp, setFilterTaskCreatedTimeStamp] = useState(null)
    const handleReadTasks = async (uid) => {
        if (currentList == "Tasks") {
            var loadedTasks = await readTasks(uid, null, filterTaskCreatedTimeStamp);
        } else {
            var loadedTasks = await readTasks(uid, currentList,  filterTaskCreatedTimeStamp);
        }
        console.log(new Date().toLocaleString())
        setTasks(loadedTasks);
        setGlobalTasks(await readTasks(uid))
    };
    //filter fucntion that modifies how hamdle Readtasks works 
    const handleSetFilterTaskTimeStamp = async(timeStampFilter) => {
        setFilterTaskCreatedTimeStamp(timeStampFilter)
    };
    //update if list changes for multiple to dolists
    useEffect(() => {
        if (userUid) {
            handleReadTasks(userUid);
        }
    }, [currentList, userUid, filterTaskCreatedTimeStamp]);

    useEffect(() => {
        handleReadLists(userUid)
    }, [tasks, userUid]);

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

    const handleReadLists = async (uid) => {
        const fetchedLists = await readLists(uid);
        if (!fetchedLists.includes("Tasks")) {
            fetchedLists.push("Tasks");
        }
        setLists(fetchedLists);
    }

    // used by graph fucntion. Modify this if you want to hcange how coloring works
    const getCompletedCountsByDate = () => {
        const taskCounts = {};

        globalTasks.forEach((task) => {
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
            await createTask(userUid, currentList, newTask, alarmTime, dueDate);
            handleReadTasks(userUid)
            setNewTask('');
        }
    };

    const handleDelete = async (task_id) => {
        await deleteTask(task_id);
        handleReadTasks(userUid)
    };

    const [isUpdating, setIsUpdating] = useState(false);

    const handleToggleStatus = async (task_id) => {
        if (isUpdating) return; // Prevent simultaneous updates
        setIsUpdating(true);
    
        const task = await readTaskAtId(task_id);
        await updateTask(task_id, task.task_uid, { ...task, task_is_completed: !task.task_is_completed });
        await handleReadTasks(userUid);
    
        setIsUpdating(false);
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
        await updateTask(task.task_id, task.task_uid, { ...task, task_desc: task_desc });
        handleReadTasks(userUid);
    };

    const handleUpdateAlarm = async (task_id, alarm) => {
        const task = await readTaskAtId(task_id)
        await updateTask(task.task_id, task.task_uid, { ...task, task_alarm_time: alarm });
        handleReadTasks(userUid);
    };

    const handleUpdateDueDate = async (task_id, dueDate) => {
        const task = await readTaskAtId(task_id)
        await updateTask(task.task_id, task.task_uid, { ...task, task_due_date: dueDate });
        handleReadTasks(userUid);
        console.log(task.task_due_date)
    };

    const handleUpdateDueDateInContextMenu = async (task_id) => {
        const task = await readTaskAtId(task_id)
        setEditDueDateID(task.task_id)
    };
    
    const handleDeleteAlarm = async (task_id) => {
        const task = await readTaskAtId(task_id)
        await deleteAlarm(task.task_id, task.task_uid,{ ...task, task_id: task_id});
        handleReadTasks(userUid);
    };

    const handleDeleteDueDate = async (task_id) => {
        const task = await readTaskAtId(task_id)
        await deleteDueDate(task.task_id, task.task_uid,{ ...task, task_id: task_id});
        handleReadTasks(userUid);
    };

    const handleContextMenu = (action) => {
        const task_id = contextMenu.task_id;

        if (action === 'edit') handleUpdateInContextMenu(task_id);
        else if (action === 'delete') handleDelete(task_id);
        else if (action === 'toggle') handleToggleStatus(task_id);
        else if (action === 'alarm') handleUpdateAlarmInContextMenu(task_id);
        else if (action === 'due_date') handleUpdateDueDateInContextMenu(task_id);
    };

    const hideContextMenu = () => setContextMenu({ visible: false, x: 0, y: 0, task_id: null });

    return (

        <div className="app-container" onClick={hideContextMenu}>

            <div class="flex flex-1 flex-col bg-[#161616] m-0 p-0 justify-between ">
                <div class="text-2xl text-white mb-6 mt-6">{userEmail}</div>
                <ListInterface
                    currentList={currentList}
                    setCurrentList={setCurrentList}
                    setLists={setLists}
                    lists={lists}
                >
                </ListInterface>
            </div>

            <div className="flex-col bg-[#] flex-[3_2_0%] relative">
                <div className="flex gap-3 items-center">
                    <img src="/assets/star.svg" width="30" height="30" />
                    <h1 class="text-white text-2xl text-left mb-6 mt-6">{currentList}</h1>
                    <TaskFilter 
                    filterTaskCreatedTimeStamp={filterTaskCreatedTimeStamp}
                    setFilterTaskCreatedTimeStamp={setFilterTaskCreatedTimeStamp}
                    ></TaskFilter>

                </div>
                {/*Component where user enters information */}
                {/*3 Arguments/ props */}

                {/*Component Tasklist*/}
                <div className="task-list-container">
                <TaskGrouping
                    tasks={tasks}
                    handleToggleStatus={handleToggleStatus}
                    handleUpdateAlarm={handleUpdateAlarm}
                    setContextMenu={setContextMenu}
                    editID={editID}
                    setEditID={setEditID}
                    editText={editText}
                    setEditText={setEditText}
                    setEditAlarmID={setEditAlarmID}
                    editAlarmID={editAlarmID}
                    handleUpdateDesc={handleUpdateDesc}
                    handleUpdateDueDate={handleUpdateDueDate}
                    editDueDateID={editDueDateID}
                    setEditDueDateID={setEditDueDateID}
                    handleDeleteAlarm={handleDeleteAlarm}
                    handleDeleteDueDate={handleDeleteDueDate}
                />
                </div>

                {/* Ensure this is not inside the scrolling container */}
                <div className="task-input-container">
                <TaskInput
                    newTask={newTask}
                    setNewTask={setNewTask}
                    onAddTask={handleCreateTask}
                    alarmTime={alarmTime}
                    setAlarmTime={setAlarmTime}
                    newAlarmVisible={newAlarmVisible}
                    setNewAlarmVisible={setNewAlarmVisible}
                    dueDate={dueDate}
                    setDueDate={setDueDate}
                    newDueDateVisible={newDueDateVisible}
                    setNewDueDateVisible={setNewDueDateVisible}
                    handleDeleteAlarm={handleDeleteAlarm}
                    handleDeleteDueDate={handleDeleteDueDate}
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
                <div className="text-white mt-6 text-2xl ">Graph View</div>
                <div className="text-white mt-6 text-2xl ">Tasks Complete</div>
                <div className="text-white mt-6 text-2xl ">Graph View</div>
                <hr className="w-[50%] h-1 bg-[#ffffff] border-0 rounded md:my-5" />
                <div class="task-calendar mb-0">
                    <Calendar handleSetFilterTaskTimeStamp={handleSetFilterTaskTimeStamp} taskCounts={getCompletedCountsByDate()} />
                </div>
            </div>
        </div>
    );
};

export default TodoPage;