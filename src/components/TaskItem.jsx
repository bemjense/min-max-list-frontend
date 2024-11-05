import React, { useState, useRef, useEffect } from 'react';
import './TaskItem.css'; 
import { FaBell } from 'react-icons/fa';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeEn from 'air-datepicker/locale/en';

const TaskItem = ({
    task,
    index,
    isEditing,
    editTaskText,
    setEditTaskText,
    setEditingIndex,
    onEditTask,
    onRightClick,
    onAlarmUpdate,
}) => {
    const [isEditingAlarm, setIsEditingAlarm] = useState(false); // Track alarm editing state
    const dateTimePickerRef = useRef(null);
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
                                onAlarmUpdate(index, selectedDate); // Call function to update alarm
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

    return ( 
            <div className = "flex-1">

            <div
                className={`text-left task ${task.task_is_completed ? 'completed hover:rounded-xl hover:bg-[#AFDD66]  transition-all duration-300' 
                    : 'uncompleted hover:rounded-xl hover:bg-[#3AA7FA] transition-all duration-300'}`}
                onContextMenu={(e) => onRightClick(e, index)}
            >
                {isEditing ? (
                    <div class = "text-black">
                    <input
                        type="text"
                        value={editTaskText}
                        onChange={(e) => setEditTaskText(e.target.value)}
                        onBlur={() => onEditTask(index)}
                        onKeyPress={(e) => e.key === 'Enter' && onEditTask(index)}
                    />
                    </div>
                ) : (
                            <div>
                            <div className="task-text">{task.task_desc} </div>
                            <div className="absolute bottom-2 right-2 text-xs"> {task.task_created_time_stamp}</div>     
                            </div>
                )}
                
                {task.task_alarm_time && (
                    <span className="alarm-time"> ALARM: {new Date(task.task_alarm_time).toLocaleString()}</span>
                )}

                <button 
                    className="alarm-edit-button" 
                    onClick={() => 
                        setIsEditingAlarm(!isEditingAlarm)
                    }
                    title="Set an alarm"
                >
                <FaBell style={{ color: isEditingAlarm ? 'blue' : 'white' }} />
                </button>
                {isEditingAlarm && (
                    <input
                        ref={dateTimePickerRef}
                        className="hidden-datepicker"
                    />
                )}

            </div>
            </div>

    );
};
export default TaskItem;