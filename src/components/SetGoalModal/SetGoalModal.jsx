/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import s from './SetGoalModal.module.css';
import ModalGoalTitle from '../ModalGoalTitle/ModalGoalTitle';
// import ModalGoalIconSelect from '../ModalGoalIconSelect/ModalGoalIconSelect';
import ModalGoalTasks from '../ModalGoalTasks/ModalGoalTasks';
import ModalGoalMotivation from '../ModalGoalMotivation/ModalGoalMotivation';
import BasicButton from '../Button/BasicButton/BasicButton.jsx';
import ModalDeleteGoal from '../ModalDeleteGoal/ModalDeleteGoal';

import saveGoalActions from '../../redux/actions/saveGoalActions';
import GoalActions from '../../redux/actions/saveGoalActions';
import errorAction from '../../redux/actions/errorAction';
import ModalGoalIconSelect from '../ModalGoalIconSelect/ModalGoalIconSelect';
import ModalDeleteGoalActions from '../../redux/actions/ModalDeleteGoalActions';
import { asyncTasksAction } from '../Dashboard/taskAction';

import toggleSetEditGoalModal from '../../redux/actions/toggleSetEditGoalModalActions';
import goalMotivationActions from '../../redux/actions/goalMotivationActions';
import goalTitleActions from '../../redux/actions/goalTitleActions';
import goalAddTaskActions from '../../redux/actions/goalAddTaskActions';
import { radioActionClearColor } from '../../redux/actions/radioAction';
import { deleteFrozenGoalTasksInEditAction } from '../../redux/actions/frozenGoalTasksInEditAction';

import api from '../../services/api';

class SetGoalModal extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleAddGoal = ({
    goalTitle,
    goalColor,
    goalTasks,
    goalMotivation,
    user,
  }) => {
    const {
      addGoal,
      goals,
      addError,
      deleteError,
      asyncTasksActionFunc,
    } = this.props;

    const newData = {
      goalTitle,
      goalColor,
      goalNumber: goals.length + 1,
      goalTasks: goalTasks.map(task => ({
        taskTitle: task.taskTitle,
        taskWeekRange: task.taskWeekRange,
      })),
      goalMotivation,
      userId: user.userId,
    };

    api
      .newGoal({ data: newData, token: user.token })
      .then(async data => {
        if (data.success) {
          await addGoal(
            data.goals.goalTitle,
            data.goals.goalColor,
            data.goals.goalTasks,
            data.goals.goalMotivation,
            data.goals._id,
          );
          await deleteError();
          await asyncTasksActionFunc(user);
        } else {
          addError(
            'Goal not created, some problem with server, please try again later',
          );
        }
      })
      .catch(error => {
        addError(
          'Goal not created, some problem with server, please try again later',
        );
        console.log(error);
      });
  };

  handleOnClickInEdit = () => {
    const {
      editGoal,
      goalData,
      frozenGoalTasksInEdit,
      asyncSaveEditGoalFunc,
      user,
    } = this.props;
    asyncSaveEditGoalFunc(editGoal, goalData, frozenGoalTasksInEdit, user);
  };

  saveGoalFunc = () => {
    const {
      goalTitle,
      goalColor = 'a',
      goalMotivation,
      goalTasks,
      activeGoalID,
      user,
      modalType,
      addError,
    } = this.props;
    modalType !== 'SET'
      ? this.handleOnClickInEdit()
      : goalTasks.length === 0 || goalTasks[0].taskTitle.length > 1
      ? this.handleAddGoal({
          goalTitle,
          goalColor,
          goalTasks,
          goalMotivation,
          activeGoalID,
          user,
        })
      : addError('Delete the task or enter the title');
  };

  onCloseModal = () => {
    const {
      closeModal,
      inputMotivationClear,
      inputGoalTitleClear,
      inputTaskTitleClear,
      clearColor,
      deleteFrozenGoalTasksInEditActionFunc,
      deleteError,
    } = this.props;
    closeModal();
    inputMotivationClear();
    inputGoalTitleClear();
    inputTaskTitleClear();
    clearColor();
    deleteFrozenGoalTasksInEditActionFunc();
    deleteError();
  };

  render() {
    const {
      goalTitle,
      goalColor = 'a',
      modalType,
      toggleDeleteGoalModal,
      goalMotivation,
      error,
    } = this.props;
    return (
      <div className={s.SetGoalModal} onClick={e => e.stopPropagation()}>
        <button onClick={this.onCloseModal} className={s.close_btn} />
        <h3 className={s.title}>
          {modalType === 'SET' ? 'Set' : 'Update'} a Goal
        </h3>
        <ModalGoalTitle />
        <ModalGoalIconSelect />
        <ModalGoalTasks />
        <ModalGoalMotivation />
        <div className={s.buttonsContainer}>
          <BasicButton
            onClickFunc={this.saveGoalFunc}
            isDisabled={
              modalType === 'SET'
                ? !(goalMotivation.length >= 1) || !(goalTitle.length >= 1)
                : false
            }
            btnColor={'orange'}
            btnText={modalType === 'SET' ? 'Create' : 'Save'}
          />
          {(modalType === 'SET' && !goalTitle.length) ||
          (modalType === 'SET' && !goalMotivation.length) ? (
            <p className={s.hint}>
              * enter goal and motivation title and then button be active
            </p>
          ) : null}
          {modalType === 'SET' ? null : (
            <BasicButton
              onClickFunc={toggleDeleteGoalModal}
              isDisabled={
                modalType === 'SET'
                  ? !goalTitle.length || !goalColor.length
                  : false
              }
              btnColor={'white'}
              btnText={'Delete'}
            />
          )}
        </div>
        {error.errorOnSave && <p className={s.error}>{error.errorOnSave}</p>}
        <ModalDeleteGoal />
      </div>
    );
  }
}

SetGoalModal.propTypes = {
  goalTitle: PropTypes.string.isRequired,
  modalType: PropTypes.string.isRequired,
  saveGoal: PropTypes.func.isRequired,
  addGoal: PropTypes.func.isRequired,
  deleteGoal: PropTypes.func.isRequired,
  goals: PropTypes.arrayOf(PropTypes.object).isRequired,
  goalColor: PropTypes.string.isRequired,
  goalMotivation: PropTypes.string,
  goalTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeGoalID: PropTypes.string.isRequired,
  user: PropTypes.shape.isRequired,
  editGoal: PropTypes.object.isRequired,
  goalData: PropTypes.object.isRequired,
  frozenGoalTasksInEdit: PropTypes.array.isRequired,
  asyncSaveEditGoalFunc: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  addError: PropTypes.func.isRequired,
  deleteError: PropTypes.func.isRequired,
  inputMotivationClear: PropTypes.func.isRequired,
  inputGoalTitleClear: PropTypes.func.isRequired,
  inputTaskTitleClear: PropTypes.func.isRequired,
  clearColor: PropTypes.func.isRequired,
  deleteFrozenGoalTasksInEditActionFunc: PropTypes.func.isRequired,
  deleteError: PropTypes.func.isRequired,
};

SetGoalModal.defaultProps = {
  goalMotivation: '',
};

function mapStateToProps(state) {
  return {
    goals: state.goals,
    goalTitle: state.goalData.goalTitle,
    goalColor: state.goalData.goalColor,
    goalMotivation: state.goalData.goalMotivation,
    goalTasks: state.goalData.goalTasks,
    activeGoalID: state.goalData.activeGoalID,
    user: state.user,
    editGoal: state.editGoal,
    goalData: state.goalData,
    frozenGoalTasksInEdit: state.frozenGoalTasksInEdit,
    error: state.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveGoal: (
      goalTitle,
      goalColor,
      goalTasks,
      goalMotivation,
      goals,
      activeGoalID,
    ) =>
      dispatch(
        GoalActions.saveGoal(
          goalTitle,
          goalColor,
          goalTasks,
          goalMotivation,
          goals,
          activeGoalID,
        ),
      ),
    addGoal: (goalTitle, goalColor, goalTasks, goalMotivation, activeGoalID) =>
      dispatch(
        GoalActions.addGoal(
          goalTitle,
          goalColor,
          goalTasks,
          goalMotivation,
          activeGoalID,
        ),
      ),
    asyncSaveEditGoalFunc: (editGoal, goalData, frozenGoalTasksInEdit, user) =>
      dispatch(
        saveGoalActions.asyncSaveEditGoal(
          editGoal,
          goalData,
          frozenGoalTasksInEdit,
          user,
        ),
      ),
    closeModal: () => dispatch(toggleSetEditGoalModal.closeEditGoalModal()),
    toggleDeleteGoalModal: () =>
      dispatch(ModalDeleteGoalActions.toggleDeleteGoalModal()),
    addError: error => dispatch(errorAction.addSaveGoalErrorInStore(error)),
    deleteError: () => dispatch(errorAction.deleteErrorFromStore()),
    asyncTasksActionFunc: user => dispatch(asyncTasksAction(user)),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetGoalModal);
