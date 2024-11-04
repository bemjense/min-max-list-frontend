import React from 'react';
import './TaskInput.css'

const TaskInput = ({ newTask, setNewTask, onAddTask, alarmTime, setAlarmTime, newAlarmVisible, setNewAlarmVisible  }) => (

    <div class="fixed bottom-0 rounded bg-[#50d71e] grow-[1]"> 
        <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === 'Enter') onAddTask();
            }}
            placeholder="Enter a Task . . ."
        />
        
        {newAlarmVisible && (
            <input
                type="datetime-local"
                value={alarmTime}
                onChange={(e) => setAlarmTime(e.target.value)}
                placeholder="Set an alarm time"
                />
            )}
        <button onClick={() => setNewAlarmVisible(!newAlarmVisible)}>
            {newAlarmVisible ? "Hide Alarm" : "Set Alarm"}
        </button>

    </div>
);

export default TaskInput;