const addSaveGoalErrorInStore = error => ({
  type: 'ADD_SAVE_GOAL_ERROR_IN_STORE',
  error,
});

const addDeleteGoalErrorInStore = error => ({
  type: 'ADD_DELETE_GOAL_ERROR_IN_STORE',
  error,
});

const deleteErrorFromStore = () => ({
  type: 'DELETE_ERROR_FROM_STORE',
});

export default {
  addSaveGoalErrorInStore,
  addDeleteGoalErrorInStore,
  deleteErrorFromStore,
};
