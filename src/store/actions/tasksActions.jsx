import {
  TASKS_LOADED,
  TASKS_LOADING,
  TASKS_ERROR,
  TASK_LOADED_BY_ID,
  TASK_DELETED,
  TASK_UPDATED,
} from '../reducers/tasksReducer';

import {
  getTask,
  createTask,
  getTaskById,
  deleteTask,
  updateTask,
} from '../../api/api/taskApi';

export const setTasks = (tasks) => ({
  type: TASKS_LOADED,
  payload: tasks,
});

export const setTasksLoading = () => ({
  type: TASKS_LOADING,
});

export const setTasksError = (error) => ({
  type: TASKS_ERROR,
  payload: error,
});

export const setCurrentTask = (task) => ({
  type: TASK_LOADED_BY_ID,
  payload: task,
});

export const deletedTask = (id) => ({
  type: TASK_DELETED,
  payload: id,
});

export const taskUpdate = (task) => ({
  type: TASK_UPDATED,
  payload: task,
});

export const loadTasks = () => {
  return async (dispatch) => {
    try {
      dispatch(setTasksLoading());

      const data = await getTask();
      dispatch(setTasks(data));
    } catch (err) {
      dispatch(setTasksError(err.message));
    }
  };
};
export const addTask = (title) => {
  return async (dispatch) => {
    try {
      dispatch(setTasksLoading());

      await createTask(title);

      dispatch(loadTasks());
    } catch (err) {
      dispatch(setTasksError(err.message));
    }
  };
};

export const loadTaskById = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setTasksLoading());

      const task = await getTaskById(id);

      dispatch(setCurrentTask(task));
    } catch (err) {
      dispatch(setTasksError(err.message));
    }
  };
};

export const deleteTaskThunk = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setTasksLoading());

      await deleteTask(id);

      dispatch(deletedTask(id));
    } catch (err) {
      dispatch(setTasksError(err.message));
    }
  };
};

export const updateTaskThunk = (id, title) => {
  return async (dispatch) => {
    try {
      dispatch(setTasksLoading());

      const task = await updateTask(id, title);

      dispatch(taskUpdate(task));
    } catch (err) {
      dispatch(setTasksError(err.message));
    }
  };
};
