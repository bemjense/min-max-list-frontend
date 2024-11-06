import axios from 'axios';
export const readTasks = async (uid) => {
    try {
        const response = await axios.get(`http://localhost:8000/tasks/`, {
            params: { uid: uid } // Pass the uid as a query parameter
        });
        return response.data.sort((a, b) => a.task_id - b.task_id);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

export const readUncompletedTasks = async (uid) => {
    try {
        const response = await axios.get('http://localhost:8000/tasks/?task_is_completed=false', {
            params: { uid: uid } 

        });
        return response.data.sort((a, b) => a.task_id - b.task_id);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};
export const readCompletedTasks = async (uid) => {
    try {
        const response = await axios.get('http://localhost:8000/tasks/?task_is_completed=True', {
            params: { uid: uid } 
        });
        return response.data.sort((a, b) => a.task_id - b.task_id);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

export const createTask = async (taskDesc,alarmTime, uid) => {
    try {
        const response = await axios.post('http://localhost:8000/tasks/', {
            task_desc: taskDesc,
            task_is_completed: false,
            task_alarm_time: alarmTime ? new Date(alarmTime).toISOString() : null,
            uid: uid
        });
        return response.data;
    } catch (error) {
        console.error('Error adding task:', error);
    }
};

export const deleteTask = async (taskId) => {
    try {
        await axios.delete(`http://localhost:8000/tasks/${taskId}`);
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};

export const updateTask = async (taskId, taskData, uid) => {
    try {
        await axios.put(`http://localhost:8000/tasks/${taskId}`, taskData, uid);
    } catch (error) {
        console.error('Error updating task:', error);
    }
};