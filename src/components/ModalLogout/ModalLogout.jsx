/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import BasicButton from '../Button/BasicButton/BasicButton.jsx';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Draggable from 'react-draggable';

import ModalLogoutActions from '../../redux/actions/ModalLogoutActions';

// import './ModalLogout.css';
import s from './ModalLogout.module.css';

function PaperComponent(props) {
  return (
    <Draggable>
      <Paper {...props} />
    </Draggable>
  );
}

const ModalLogout = ({
  cancelLogout,
  okLogout,
  isLogoutModalOpen,
  toggleLogoutModal,
}) => {
  return (
    <>
      <Button
        onClick={toggleLogoutModal}
        color="inherit"
        className={s.LogoutButton}
        tabIndex="2"
      >
        Logout
      </Button>
      <Dialog
        open={isLogoutModalOpen}
        onClose={toggleLogoutModal}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle id="draggable-dialog-title" className={s.DialogTitle}>
          Are you sure you want to leave?
        </DialogTitle>
        <DialogActions className={s.DialogActions}>
          <Grid container justify="center">
            <Grid item>
              <button
                className={s.btn1}
                onClick={() => {
                  cancelLogout();
                  toggleLogoutModal();
                }}
              >
                Cancel
              </button>
            </Grid>
            <Grid item>
              <a href="/login">
                <button className={s.btn2} onClick={okLogout}>
                  Logout
                </button>
              </a>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

function mapStateToProps(state) {
  return {
    isLogoutModalOpen: state.isLogoutModalOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cancelLogout: () => dispatch(ModalLogoutActions.cancelLogout()),
    okLogout: () => dispatch(ModalLogoutActions.okLogout()),
    toggleLogoutModal: () => dispatch(ModalLogoutActions.toggleLogoutModal()),
  };
}

ModalLogout.propTypes = {
  cancelLogout: PropTypes.func.isRequired,
  okLogout: PropTypes.func.isRequired,
  isLogoutModalOpen: PropTypes.bool,
  toggleLogoutModal: PropTypes.func.isRequired,
};

ModalLogout.defaultProps = {
  isLogoutModalOpen: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalLogout);
