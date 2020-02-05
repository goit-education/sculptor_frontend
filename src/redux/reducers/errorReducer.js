/* eslint-disable no-underscore-dangle */
const initialState = {
  errorOnSave: '',
  errorOnDelete: '',
};

function errorReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_SAVE_GOAL_ERROR_IN_STORE': {
      const updState = {
        ...state,
        errorOnSave: action.error,
      };
      return updState;
    }
    case 'ADD_DELETE_GOAL_ERROR_IN_STORE': {
      const updState = {
        ...state,
        errorOnDelete: action.error,
      };
      return updState;
    }
    case 'DELETE_ERROR_FROM_STORE':
      return initialState;
    default:
      return state;
  }
}

export default errorReducer;
