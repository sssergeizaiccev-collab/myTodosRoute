export const SET_SEARCH = 'SET_SEARCH';
export const TOGGLE_SORT = 'TOGGLE_SORT';

const initialState = {
  search: '',
  isSorted: false,
};

export const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH: {
      return {
        ...state,
        search: action.payload,
      };
    }
    case TOGGLE_SORT: {
      return {
        ...state,
        isSorted: !state.isSorted,
      };
    }
    default:
      return state;
  }
};
