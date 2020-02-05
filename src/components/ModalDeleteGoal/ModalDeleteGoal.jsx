/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Draggable from 'react-draggable';
import BasicButton from '../Button/BasicButton/BasicButton.jsx';

import ModalDeleteGoalActions from '../../redux/actions/ModalDeleteGoalActions';
import deleteGoalAction from '../../redux/actions/deleteGoalAction';
import errorAction from '../../redux/actions/errorAction';

import s from './ModalDeleteGoal.module.css';

function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

const ModalDeleteGoal = ({
  isDeleteGoalModalOpen,
  toggleDeleteGoalModal,
  deleteGoal,
  activeGoalID,
  error,
  deleteError,
  user,
}) => {
  return (
    <Grid container>
      <Grid item>
        <Dialog
          open={isDeleteGoalModalOpen}
          onClose={() => {
            toggleDeleteGoalModal();
            deleteError();
          }}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle
            id="draggable-dialog-title"
            disableTypography
            className={s.DialogTitle}
          >
            Are you sure you want to delete this goal?
          </DialogTitle>
          <DialogActions className={s.DialogActions}>
            <Grid container justify="center">
              <Grid item>
                <button
                  className={s.btn1}
                  onClick={() => {
                    toggleDeleteGoalModal();
                    deleteError();
                  }}
                >
                  Cancel
                </button>
              </Grid>

              <Grid item>
                <button
                  className={s.btn2}
                  onClick={() => deleteGoal(activeGoalID, user)}
                >
                  Delete
                </button>
              </Grid>
            </Grid>
          </DialogActions>
          {error.errorOnDelete && (
            <p className={s.error}>{error.errorOnDelete}</p>
          )}
        </Dialog>
      </Grid>
    </Grid>
  );
};

function mapStateToProps(state) {
  return {
    isDeleteGoalModalOpen: state.isDeleteGoalModalOpen,
    activeGoalID: state.goalData.activeGoalID,
    error: state.error,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteGoal: (id, user) =>
      dispatch(deleteGoalAction.asyncDeleteGoal(id, user)),
    toggleDeleteGoalModal: () =>
      dispatch(ModalDeleteGoalActions.toggleDeleteGoalModal()),
    deleteError: () => dispatch(errorAction.deleteErrorFromStore()),
  };
}

ModalDeleteGoal.propTypes = {
  isDeleteGoalModalOpen: PropTypes.bool,
  toggleDeleteGoalModal: PropTypes.func.isRequired,
  deleteError: PropTypes.func.isRequired,
};

ModalDeleteGoal.defaultProps = {
  isDeleteGoalModalOpen: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalDeleteGoal);
