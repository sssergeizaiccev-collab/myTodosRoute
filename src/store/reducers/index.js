import { combineReducers } from 'redux';
import { tasksReducer } from './tasksReducer';
import { filtersReducer } from './filtersReducer';

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
});
