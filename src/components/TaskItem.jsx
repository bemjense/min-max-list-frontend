import React, { useState, useRef, useEffect, useCallback} from 'react';
import './TaskItem.css'; 
import { FaBell, FaEdit} from 'react-icons/fa';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeEn from 'air-datepicker/locale/en';
import { GiConsoleController } from 'react-icons/gi';

const TaskItem = ({
    task,
    index,
    onAlarmUpdate,
    setContextMenu,
    editID,
    setEditID,
    editText,
    setEditText,
    handleUpdateDesc
}) => {
    const [isEditingAlarm, setIsEditingAlarm] = useState(false); // Track alarm editing state
    const dateTimePickerRef = useRef(null);
    const [isEditing, setIsEditing] =useState(false);

    const handleRightClick = (e) => {
        e.preventDefault();
        // Use the task object to set the context menu
        setContextMenu({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            task_id: task.task_id, // Pass the task_id
            task_is_completed: task.task_is_completed, // Also pass other properties if needed
        });
    };


    useEffect(() => {
        if (editID === task.task_id) {
            setIsEditing(true);
        } else {
            setIsEditing(false); // Ensure editing state is reset when not matching
        }
    }, [editID, task]);





    useEffect(() => {


        let dp;
        // Initialize AirDatepicker only when editing the alarm
        if (isEditingAlarm && dateTimePickerRef.current) {
            const buttonRect = dateTimePickerRef.current.getBoundingClientRect();
            const hasSpaceAbove = buttonRect.top > 300; // Adjust based on how much space you need above

            dp = new AirDatepicker(dateTimePickerRef.current, {
                timepicker: true,
                dateFormat: 'Y-m-d H:i',
                locale: localeEn,
                buttons: [
                    'clear',
                    {
                        content: 'Set Alarm',
                        onClick: (datepickerInstance) => {
                            const selectedDate = datepickerInstance.selectedDates[0];
                            if (selectedDate) {
                                onAlarmUpdate(task.task_id, selectedDate); // Call function to update alarm
                                setIsEditingAlarm(false); // Exit alarm editing mode
                            }
                        },
                    },
                ],
                position: hasSpaceAbove ? 'top right' : 'bottom right',
            });

            dp.show(); // Show the datepicker when initialized
        }

        return () => {
            if (dp) dp.destroy(); // Clean up
        };
    }, [isEditingAlarm, index]);

    //const handleDoubleClick = () => {
    //    setEditingIndex(index);
    //    setEditTaskText(task.task_desc); // Set the current task description for editing
    //};


    const helperGetTaskDate = (task) => {
        const timeStamp = task.task_created_time_stamp;
        const date = new Date(timeStamp.replace(' ', 'T')); 
        // gets only day month year
        const dateString = date.toLocaleDateString().slice(0,10)

        return dateString
    };

    const handleUserInput = (e) => {
        const newDesc = e.target.value;
        setEditText(newDesc);  // Update local state first
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleUpdateDesc(task.task_id, editText);  // Update task when "Enter" is pressed
            setEditID(null)
            setEditText('')
        }
    };


    const handleEditButton = useCallback(() => {
        setEditID(task.task_id)
        const newDesc = task.task_desc;
        setEditText(newDesc);  // Update local state first
        setIsEditing(true)
    }, [editID, task]);

    return (
        <div className="flex-1 text-[0.8rem] font-semibold">

            <div onContextMenu={handleRightClick}
                className={`text-left task ${task.task_is_completed ? 'completed hover:rounded-xl hover:bg-[#AFDD66]  transition-all duration-300'
                    : 'uncompleted hover:rounded-xl hover:bg-[#0592E8] transition-all duration-300'}`}
            >







                {/*if state of task is currently editing then return userinput prompt else return normal render */}
                {isEditing ? (
                    <div class={`${task.task_is_completed ? 'text-black '
                        : 'text-white'}`}>
                        <input
                            className="task-input bg-transparent p-2 outline-none focus:outline-none w-full ml-5"
                            type="text"
                            value={editText}
                            onChange={handleUserInput}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    </div>
                ) : (
                    <div>

                        {/*Normal Render description and text*/}
                        <div className = "flex">
                        <div className="task-text ml-4">{task.task_desc} </div>

                        <button onClick={handleEditButton} className='ml-2'>
                            <FaEdit style={{ color: task.task_is_completed ? 'black' : 'white' }} />
                        </button>
                        </div>
                        <div className="absolute bottom-2 right-2 text-xs mr-6"> {helperGetTaskDate(task)}</div>
                    </div>
                )}



                <div className="flex">

                    <button
                        className="alarm-edit-button ml-4"
                        onClick={() =>
                            setIsEditingAlarm(!isEditingAlarm)
                        }
                        title="Set an alarm"
                    >
                        <FaBell style={{ color: task.task_is_completed ? 'black' : 'white' }} />
                    </button>

                    {isEditingAlarm && (
                        <input
                            ref={dateTimePickerRef}
                            className="hidden-datepicker"
                        />
                    )}
                    {task.task_alarm_time && (
                        <span className="alarm-time ml-1"> {new Date(task.task_alarm_time).toLocaleString()}</span>
                    )}
                </div>

            </div>
        </div>

    );
};
export default TaskItem;