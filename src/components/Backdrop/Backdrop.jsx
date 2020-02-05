/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import s from './Backdrop.module.css';

import toggleSetEditGoalModal from '../../redux/actions/toggleSetEditGoalModalActions';
import goalMotivationActions from '../../redux/actions/goalMotivationActions';
import goalTitleActions from '../../redux/actions/goalTitleActions';
import goalAddTaskActions from '../../redux/actions/goalAddTaskActions';
import { radioActionClearColor } from '../../redux/actions/radioAction';
import { deleteFrozenGoalTasksInEditAction } from '../../redux/actions/frozenGoalTasksInEditAction';
import errorAction from '../../redux/actions/errorAction';

const Backdrop = ({
  children,
  closeModal,
  inputMotivationClear,
  inputGoalTitleClear,
  inputTaskTitleClear,
  clearColor,
  deleteFrozenGoalTasksInEditActionFunc,
  deleteError,
}) => {
  return (
    <div
      className={s.Backdrop}
      data-id="Backdrop"
      onClick={e => {
        closeModal(e);
        inputMotivationClear();
        inputGoalTitleClear();
        inputTaskTitleClear();
        clearColor();
        deleteFrozenGoalTasksInEditActionFunc();
        deleteError();
      }}
    >
      {children}
    </div>
  );
};

Backdrop.propTypes = {
  children: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  inputMotivationClear: PropTypes.func.isRequired,
  inputGoalTitleClear: PropTypes.func.isRequired,
  inputTaskTitleClear: PropTypes.func.isRequired,
  clearColor: PropTypes.func.isRequired,
  deleteFrozenGoalTasksInEditActionFunc: PropTypes.func.isRequired,
  deleteError: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    goalMotivation: state.goalData.goalMotivation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeModal: e => dispatch(toggleSetEditGoalModal.closeSetEditGoalModal(e)),
    inputMotivationClear: () =>
      dispatch(goalMotivationActions.inputMotivationClear()),
    inputGoalTitleClear: () => dispatch(goalTitleActions.inputGoalTitleClear()),
    inputTaskTitleClear: () =>
      dispatch(goalAddTaskActions.inputTaskTitleClear()),
    clearColor: () => dispatch(radioActionClearColor()),
    deleteFrozenGoalTasksInEditActionFunc: () =>
      dispatch(deleteFrozenGoalTasksInEditAction()),
    deleteError: () => dispatch(errorAction.deleteErrorFromStore()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);
