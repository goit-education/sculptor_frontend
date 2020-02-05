/* eslint-disable */
import API from '../../services/api';
import loaderAction from '../../redux/actions/loaderAction';

const fetchGoals = data => ({
  type: 'SET_GOALS',
  payload: data,
});

export const asyncGoalAction = user => dispatch => {
  dispatch(loaderAction.loaderOn());
  API.getGoals(user)
    .then(data => {
      dispatch(fetchGoals(data.goals));
      dispatch(loaderAction.loaderOff());
    })
    .catch(error => {
      console.log(error);
      dispatch(loaderAction.loaderOff());
    });
};

export const updateGoalTaskActiveDates = ({
  goalId,
  taskId,
  selectedData,
  isComplete,
}) => ({
  type: 'GOALS_CHANGE_ACTIVE_DATES_IN_TASK',
  goalId,
  taskId,
  selectedData,
  isComplete,
});

export default {
  asyncGoalAction,
  updateGoalTaskActiveDates,
};
