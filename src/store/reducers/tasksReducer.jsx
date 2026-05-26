export const TASKS_LOADING = 'TASKS_LOADING';
export const TASKS_LOADED = 'TASKS_LOADED';
export const TASKS_ERROR = 'TASKS_ERROR';
export const TASK_LOADED_BY_ID = 'TASK_LOADED_BY_ID';
export const TASK_DELETED = 'TASK_DELETED';
export const TASK_UPDATED = 'TASK_UPDATED';

const initialState = {
  list: [],
  currentTask: null,
  isLoading: false,
  error: null,
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_LOADED: {
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: null,
      };
    }
    case TASKS_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case TASKS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    case TASK_LOADED_BY_ID: {
      return {
        ...state,
        currentTask: action.payload,
        isLoading: false,
        error: null,
      };
    }
    case TASK_DELETED: {
      return {
        ...state,
        currentTask: null,
        isLoading: false,
        error: null,
        list: state.list.filter(
          (task) => String(task.id) !== String(action.payload),
        ),
      };
    }
    case TASK_UPDATED: {
      return {
        ...state,
        isLoading: false,
        error: null,
        currentTask: action.payload,
        list: state.list.map((task) =>
          String(task.id) === String(action.payload.id) ? action.payload : task,
        ),
      };
    }
    default:
      return state;
  }
};
