import { SET_SEARCH, TOGGLE_SORT } from '../reducers/filtersReducer';

export const searchTasks = (search) => ({
  type: SET_SEARCH,
  payload: search,
});

export const toggleSorttasks = () => ({
  type: TOGGLE_SORT,
});
