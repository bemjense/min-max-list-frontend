import React, {useState,useRef,useEffect} from 'react';
import './TaskInput.css'
import { FaBell } from 'react-icons/fa'; // Importing a bell icon from react-icons
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const TaskInput = ({ newTask, setNewTask, onAddTask, alarmTime, setAlarmTime, newAlarmVisible, setNewAlarmVisible  }) => {
    const dateTimePickerRef = useRef(null);

    useEffect(() => {
        let fp; // To store the flatpickr instance
        
        // Only initialize Flatpickr if newAlarmVisible is true and dateTimePickerRef is available
        if (newAlarmVisible && dateTimePickerRef.current) {
            fp = flatpickr(dateTimePickerRef.current, {
                enableTime: true,
                dateFormat: "Y-m-d H:i",
                onChange: ([date]) => {
                    setAlarmTime(date);
                    setNewAlarmVisible(false); // Hide the alarm field after setting the time
                },
                
            });
            fp.open();
        }

        // Clean up Flatpickr instance on component unmount
        return () => {
            if (fp) {
                fp.destroy();
            }
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
                    style={{ display: 'none' }}
                    placeholder="Set an alarm time"
                />
            )}
        </div>
    );
};
export default TaskInput;