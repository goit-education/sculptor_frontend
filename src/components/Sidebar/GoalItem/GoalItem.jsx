/*eslint-disable*/
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TaskList from '../TaskList/TaskList';
import EditBtn from '../../BtnEditGoal/BtnEditGoal';
import Lens from '@material-ui/icons/Lens';

import SetEditGoalModal from '../../../redux/actions/toggleSetEditGoalModalActions';
import { addGoalColor } from '../../../redux/actions/radioAction';
import goalAddTaskActions from '../../../redux/actions/goalAddTaskActions';
import { frozenGoalTasksInEditAction } from '../../../redux/actions/frozenGoalTasksInEditAction';
import goalTitleActions from '../../../redux/actions/goalTitleActions';
import goalMotivationActions from '../../../redux/actions/goalMotivationActions';
import { sidebarBackdropAction } from '../../../redux/actions/sidebarBackdropAction';

import s from './GoalItem.module.css';

const GoalItem = ({
  data,
  goals,
  openModal,
  addGoalColorFunc,
  addTasksWhenEditMode,
  frozenGoalTasksInEditActionFunc,
  inputGoalTitleInEditFunc,
  inputMotivationInEditFunc,
  hideSidebarBackdrop,
}) => {
  return (
    <li className={s.List}>
      <div className={s.Title}>
        <div
          style={{
            color: `${data.goalColor}`,
            filter: `drop-shadow(0px 5px 7px ${data.goalColor}40)`,
          }}
        >
          <Lens fontSize="large" color="inherit" />
        </div>
        <h2 className={s.SubTitle}>{data.goalTitle}</h2>
        <EditBtn
          onClick={e => {
            openModal(e, data, 'UPDATE');
            addGoalColorFunc(data.goalColor);
            addTasksWhenEditMode(data.goalTasks);
            frozenGoalTasksInEditActionFunc(data.goalTasks);
            inputGoalTitleInEditFunc(data.goalTitle);
            inputMotivationInEditFunc(data.goalMotivation);
            hideSidebarBackdrop();
          }}
          btnID={data._id}
        />
      </div>

      <p className={s.Description}>{data.goalMotivation}</p>
      <TaskList data={data.goalTasks} color={data.goalColor} />
    </li>
  );
};

GoalItem.propTypes = {
  openModal: PropTypes.func.isRequired,
  goals: PropTypes.arrayOf(PropTypes.object).isRequired,
  addGoalColorFunc: PropTypes.func.isRequired,
  addTasksWhenEditMode: PropTypes.func.isRequired,
  frozenGoalTasksInEditActionFunc: PropTypes.func.isRequired,
  inputGoalTitleInEditFunc: PropTypes.func.isRequired,
  inputMotivationInEditFunc: PropTypes.func.isRequired,
};

const MSTP = state => {
  return {
    goals: state.goals,
  };
};

function MDTP(dispatch) {
  return {
    openModal: (e, goals, type) =>
      dispatch(SetEditGoalModal.openSetEditGoalModal(e, goals, type)),
    addGoalColorFunc: color => dispatch(addGoalColor(color)),
    addTasksWhenEditMode: arrTasks =>
      dispatch(goalAddTaskActions.addTasksWhenEditMode(arrTasks)),
    frozenGoalTasksInEditActionFunc: arrTasks =>
      dispatch(frozenGoalTasksInEditAction(arrTasks)),
    inputGoalTitleInEditFunc: title =>
      dispatch(goalTitleActions.inputGoalTitleInEdit(title)),
    inputMotivationInEditFunc: motivation =>
      dispatch(goalMotivationActions.inputMotivationInEdit(motivation)),
    hideSidebarBackdrop: () => dispatch(sidebarBackdropAction()),
  };
}

export default connect(
  MSTP,
  MDTP,
)(GoalItem);
