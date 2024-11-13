import axios from 'axios';




const baseurl = "http://localhost:8000"


// make it so can now filter read tasks
export const readTasks = async (uid, task_list = null, task_created_time_stamp = null, task_is_completed = null, ) => {
    try {
        // Create an object for query parameters
        const task_params = { task_uid: uid };

        // Add task_list to params if provided
        if (task_list !== null) {
            task_params.task_list = task_list;

        }
        if (task_is_completed !== null) {
            task_params.task_is_completed = task_is_completed;
        }
        if (task_created_time_stamp !== null) {
            task_params.task_created_time_stamp = task_created_time_stamp;
        }

        // Send the GET request with the query parameters
        const response = await axios.get(baseurl + `/tasks/`, { params: task_params });

        // Sort the tasks by task_id
        return response.data.sort((a, b) => a.task_id - b.task_id);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};
export const readTaskAtId = async (task_id) => {
    try {
        const response = await axios.get(baseurl + `/tasks/${task_id}`);
        return response.data
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

export const readLists = async (uid) => {
    const task_params = { task_uid: uid };
    try {
        const response = await axios.get(baseurl + `/lists/`, {params: task_params});
        return response.data
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

export const readUncompletedTasks = async (uid, taskList = null) => {
    try {
        // Create an object for query parameters
        const task_params = { task_uid: uid, task_is_completed: false };

        // Add task_list to params if provided
        if (taskList !== null) {
            task_params.task_list = taskList;
        }

        // Send the GET request with the query parameters
        const response = await axios.get(baseurl + '/tasks/', { params: task_params });

        // Sort the tasks by task_id
        return response.data.sort((a, b) => a.task_id - b.task_id);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};

export const readCompletedTasks = async (uid, taskList = null) => {
    try {
        // Create an object for query parameters
        const task_params = { task_uid: uid, task_is_completed: true };

        // Add task_list to params if provided
        if (taskList !== null) {
            task_params.task_list = taskList;
        }

        // Send the GET request with the query parameters
        const response = await axios.get(baseurl + '/tasks/', { params: task_params });

        // Sort the tasks by task_id
        return response.data.sort((a, b) => a.task_id - b.task_id);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
};


export const createTask = async (task_uid, task_list, task_desc,task_alarm_time,task_due_date) => {
    try {
        const response = await axios.post(baseurl + '/tasks/', {
            task_uid: task_uid,
            task_list: task_list,
            task_desc: task_desc,
            task_is_completed: false,
            task_alarm_time: task_alarm_time ? new Date(task_alarm_time).toISOString() : null,
            task_due_date: task_due_date ? new Date(task_due_date).toISOString() : null
        });
        return response.data;
    } catch (error) {
        console.error('Error adding task:', error);
    }
};

export const deleteTask = async (task_id) => {
    try {
        await axios.delete(baseurl + `/tasks/${task_id}`);
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};

export const updateTask = async (task_id, task_uid, task_data) => {
    try {
        await axios.put(baseurl + `/tasks/${task_id}`, task_data, task_uid);
    } catch (error) {
        console.error('Error updating task:', error);
    }
};