import React from 'react';
import './TaskItem.css'; 

const TaskItem = ({
    task,
    index,
    isEditing,
    editTaskText,
    setEditTaskText,
    setEditingIndex,
    onEditTask,
    onRightClick,
}) => (
    <div class="task-completed-overlay">

        <div
            className={`text-left task ${task.task_is_completed ? 'completed hover:rounded-xl hover:text-lg transition-all duration-300' : 'uncompleted hover:rounded-xl hover:text-lg transition-all duration-300'}`}
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
        </div>

    </div>
);

export default TaskItem;