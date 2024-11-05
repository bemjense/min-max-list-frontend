import React, {useState,useRef,useEffect} from 'react';
import './TaskInput.css'
import { FaBell } from 'react-icons/fa';
import AirDatepicker from 'air-datepicker';

import 'air-datepicker/air-datepicker.css';
import 'air-datepicker/locale/en.js'

const TaskInput = ({ newTask, setNewTask, onAddTask, alarmTime, setAlarmTime, newAlarmVisible, setNewAlarmVisible  }) => {
    const dateTimePickerRef = useRef(null);

    useEffect(() => {
        let dp;

        if (newAlarmVisible && dateTimePickerRef.current) {
            // Initialize AirDatepicker with a built-in position setting
            dp = new AirDatepicker(dateTimePickerRef.current, {
                timepicker: true,
                dateFormat: 'Y-m-d H:i',
                language: 'en',
                buttons: [
                    'clear',
                    {
                        content: 'Set Alarm',
                        onClick: (datepickerInstance) => {
                            const selectedDate = datepickerInstance.selectedDates[0];
                            if (selectedDate) {
                                setAlarmTime(selectedDate);
                                setNewAlarmVisible(false);
                            }
                        },
                    },
                ],
                position:"top right"
            });

            dp.show();
        }

        return () => {
            if (dp) dp.destroy();
        };
    }, [newAlarmVisible, setAlarmTime]);

    return (<div className="input-container">
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') onAddTask();
                }}
                placeholder="Enter a Task . . ."
            />
            <button 
                className="alarm-toggle-button" 
                onClick={() => setNewAlarmVisible(!newAlarmVisible)}
                title="Set an alarm"
            >
            <FaBell style={{ color: newAlarmVisible ? 'blue' : 'gray' }} />
            </button>
            {newAlarmVisible && (
                <input
                    ref={dateTimePickerRef}
                    className="hidden-datepicker"
                    placeholder="Set an alarm time"
                />
            )}
            {alarmTime && 
            <div className="alarm-time-display">
                Alarm set for: {alarmTime.toLocaleString()}
            </div>} 
        </div>
    );
};
export default TaskInput;