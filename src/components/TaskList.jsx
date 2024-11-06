import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({
    tasks,
    editingIndex,
    editTaskText,
    setEditTaskText,
    setEditingIndex,
    onEditTask,
    onRightClick,
    onAlarmUpdate,
}) => (



    <div className="task-list">
        {/*map functions to each task for organizaiton in tasks*/}
        {tasks.map((task, index) => (
            <TaskItem
                key={task.task_id}
                task={task}
                index={index}
                isEditing={editingIndex === index}
                editTaskText={editTaskText}
                setEditTaskText={setEditTaskText}
                setEditingIndex={setEditingIndex}
                onEditTask={onEditTask}
                onRightClick={onRightClick}
                onAlarmUpdate={onAlarmUpdate}
            />
        ))}
    </div>
);

export default TaskList;