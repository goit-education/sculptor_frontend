function toggleDeleteGoalModal(state = false, action) {
  switch (action.type) {
    case 'TOGGLE_DELETE_GOAL_MODAL':
      return !state;
    default:
      return state;
  }
}

export default toggleDeleteGoalModal;
