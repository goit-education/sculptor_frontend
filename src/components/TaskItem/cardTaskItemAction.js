// import {
//   updateTaskActiveDayStatus,
//   deleteTaskActiveDates,
// } from '../Dashboard/taskAction';
// import {
//   updateGoalTaskActiveDayStatus,
//   deleteGoalTaskActiveDay,
// } from '../Dashboard/goalAction';
import api from '../../services/api';

// TODO:
//* ? Action for checking task done
export const changeTaskToDone = ({
  taskId,
  taskActiveDayId,
  isDone,
  goalId,
}) => (dispatch, getState) => {
  api
    .changeStatusOneTaskActiveDate({ taskActiveDayId, isDone, taskId })
    .then(res => res.data)
    .then(data => {
      if (data) {
        dispatch({
          type: 'UPDATE_STATUS_TASK_ACTIVE_DAY',
          taskId,
          taskActiveDayId,
          isDone,
        });
        dispatch({
          type: 'UPDATE_STATUS_GOAL_TASK_ACTIVE_DAY',
          taskId,
          taskActiveDayId,
          goalId,
          isDone,
          isComplete: data.updatedTask.isComplete,
        });

        const state = getState();

        dispatch({
          type: 'UPDATE_WEEK_TASKS',
          payload: { selectedTime: state.weekTasks.date, tasks: state.tasks },
        });
      }
    });
};

//* ! Action for delete this task from this day!!!
export const deleteTaskFromThisDay = ({ taskId, taskActiveDayId, goalId }) => (
  dispatch,
  getState,
) => {
  // console.log(taskActiveDayId);
  api.deleteOneTaskActiveDate({ taskActiveDayId, taskId }).then(res => {
    if (res) {
      const { data } = res;

      dispatch({
        type: 'DELETE_TASK_ACTIVE_DAY',
        taskId,
        taskActiveDayId,
      });
      dispatch({
        type: 'DELETE_GOAL_TASK_ACTIVE_DAY',
        taskId,
        taskActiveDayId,
        goalId,
        isComplete: data.updatedTask.isComplete,
      });

      const state = getState();

      dispatch({
        type: 'UPDATE_WEEK_TASKS',
        payload: { selectedTime: state.weekTasks.date, tasks: state.tasks },
      });
    }
  });
};

export default { changeTaskToDone, deleteTaskFromThisDay };
