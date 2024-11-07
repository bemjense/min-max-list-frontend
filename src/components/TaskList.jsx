import React, { useState } from 'react';  // Add useState here
import TaskItem from './TaskItem';
import './TaskList.css';



const TaskList = ({
    tasks,
    editTaskText,
    onAlarmUpdate,
    setContextMenu,
    editID,
    setEditID,
    editText,
    setEditText,
    handleUpdateDesc
}) => {
    const [showCompleted, setShowCompleted] = useState(false);

    const completedTasks = tasks.filter(task => task.task_is_completed);
    const uncompletedTasks = tasks.filter(task => !task.task_is_completed);

    return (



        <div className = "text-white">
        <div className="task-list">
            {uncompletedTasks.map((task, index) => (
                <TaskItem
                    key={task.task_id}
                    task={task}
                    index={index}
                    onAlarmUpdate={onAlarmUpdate}
                    setContextMenu= {setContextMenu}
                    editID = {editID}
                    setEditID = {setEditID}
                    editText = {editText}
                    setEditText = {setEditText}
                    handleUpdateDesc = {handleUpdateDesc}
                />
            ))}
        </div>




        <hr className="h-2 bg-[#3AA7FA] border-0 rounded md:my-5" />

            <div class="mt-5 mb-5 flex">
                <div class="rounded-full bg-[#8CC63F] flex  hover:bg-[#AFDD66]  transition-all duration-300 ">
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



        <div className = "line-through text-[#333333]">
        <div className="task-list">

            {showCompleted && completedTasks.map((task, index) => (
                <TaskItem
                    key={task.task_id}
                    task={task}
                    index={index}
                    onAlarmUpdate={onAlarmUpdate}
                    setContextMenu= {setContextMenu}
                    editID = {editID}
                    setEditID = {setEditID}
                    editText = {editText}
                    setEditText = {setEditText}
                    handleUpdateDesc = {handleUpdateDesc}
                />
            ))}
        </div>
        </div>
        </div>
    );
}

export default TaskList;