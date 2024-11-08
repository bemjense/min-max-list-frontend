import axios from 'axios';


export const readTasks = async (uid, taskList = null) => {
    try {
        // Create an object for query parameters
        const task_params = { task_uid: uid };

        // Add task_list to params if provided
        if (taskList !== null) {
            task_params.task_list = taskList;
        }

        // Send the GET request with the query parameters
        const response = await axios.get(`http://localhost:8000/tasks/`, { params: task_params });

        // Sort the tasks by task_id
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

export const createTask = async (task_uid, task_list, task_desc,task_alarm_time) => {
    try {
        const response = await axios.post('http://localhost:8000/tasks/', {
            task_uid: task_uid,
            task_list: task_list,
            task_desc: task_desc,
            task_is_completed: false,
            task_alarm_time: task_alarm_time ? new Date(task_alarm_time).toISOString() : null
        });
        return response.data;
    } catch (error) {
        console.error('Error adding task:', error);
    }
};

export const deleteTask = async (task_id) => {
    try {
        await axios.delete(`http://localhost:8000/tasks/${task_id}`);
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};

export const updateTask = async (task_id, task_uid, task_data) => {
    try {
        await axios.put(`http://localhost:8000/tasks/${task_id}`, task_data, task_uid);
    } catch (error) {
        console.error('Error updating task:', error);
    }
};