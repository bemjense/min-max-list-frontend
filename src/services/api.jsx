import axios from 'axios';




const baseurl = "http://localhost:8000"


export const readTasks = async (uid, taskList = null) => {
    try {
        // Create an object for query parameters
        const task_params = { task_uid: uid };

        // Add task_list to params if provided
        if (taskList !== null) {
            task_params.task_list = taskList;
        }

        // Send the GET request with the query parameters
        const response = await axios.get(baseurl + `/tasks/`, { params: task_params });

        // Mark tasks as overdue if the due date is in the past
        const currentDate = new Date();
        const tasksWithOverdueStatus = response.data.map(task => {
            if (task.task_due_date && new Date(task.task_due_date) < currentDate && !task.task_is_completed) {
                task.is_overdue = true; // Add overdue status
            } else {
                task.is_overdue = false;
            }
            return task;
        });

        return tasksWithOverdueStatus.sort((a, b) => a.task_id - b.task_id);

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