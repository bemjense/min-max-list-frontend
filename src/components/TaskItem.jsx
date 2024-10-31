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
            className={`task ${task.task_is_completed ? 'completed' : ''}`}
            onContextMenu={(e) => onRightClick(e, index)}
        >
            {isEditing ? (
                <input
                    type="text"
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                    onBlur={() => onEditTask(index)}
                    onKeyPress={(e) => e.key === 'Enter' && onEditTask(index)}
                />
            ) : (
                        <span className="task-text">{task.task_desc} {task.task_created_time_stamp}</span>
            )}
        </div>

    </div>
);

export default TaskItem;