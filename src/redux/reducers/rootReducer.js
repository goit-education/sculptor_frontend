/*eslint-disable*/
import { combineReducers } from 'redux';
import selectedData from '../reducers/selectedDataReducer';
import userTaskDate from '../reducers/userTaskDateReducer';
import calendarButton from '../reducers/calendarButtonReducer';
import userReducer from './userReducer';
import app from './appReducer';
import {
  goalsReducer,
  taskReducer,
  weekTasksReducer,
} from '../../components/Dashboard/reducerDashboard';
import logout from './ModalLogoutReducer';
import isLogoutModalOpen from './ToggleLogoutModalReducer';
import isDeleteGoalModalOpen from './ToggleDeleteGoalModalReducer';
import editGoal from './goalEditModeReducer';
import goalData from './goalReducer';
import showPicker from './showPickerReducer';
import frozenGoalTasksInEdit from './frozenGoalTasksInEditReducer';
import error from './errorReducer';
import loader from './loaderReducer';

// import goals from './initData';
import dateReducer from './dateReducer';

const rootReducer = combineReducers({
  user: userReducer,
  goals: goalsReducer,
  tasks: taskReducer,
  weekTasks: weekTasksReducer,
  app,
  goalData,
  editGoal,
  taskArray: dateReducer,
  selectedData,
  userTaskDate,
  calendarButton,
  logout,
  isLogoutModalOpen,
  isDeleteGoalModalOpen,
  showPicker,
  frozenGoalTasksInEdit,
  error,
  loader,
});

export default rootReducer;
