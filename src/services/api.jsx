import axios from 'axios';
export const readTasks = async (uid) => {
    try {
        const response = await axios.get(`http://localhost:8000/tasks/`, {
            params: { task_uid: uid } // Pass the uid as a query parameter
        });
        return response.data.sort((a, b) => a.task_id - b.task_id);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};
export const readTaskAtId = async (task_id) => {
    try {
        const response = await axios.get(`http://localhost:8000/tasks/${task_id}`);
        return response.data
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

export const readUncompletedTasks = async (uid) => {
    try {
        const response = await axios.get('http://localhost:8000/tasks/?task_is_completed=false', {
            params: { task_uid: uid } 

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
            params: { task_uid: uid } 
        });
        return response.data.sort((a, b) => a.task_id - b.task_id);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

export const createTask = async (uid, taskDesc,alarmTime) => {
    try {
        const response = await axios.post('http://localhost:8000/tasks/', {
            task_uid: uid,
            task_desc: taskDesc,
            task_is_completed: false,
            task_alarm_time: alarmTime ? new Date(alarmTime).toISOString() : null
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

export const updateTask = async (taskId, taskUid, taskData) => {
    try {
        await axios.put(`http://localhost:8000/tasks/${taskId}`, taskData, taskUid);
    } catch (error) {
        console.error('Error updating task:', error);
    }
};