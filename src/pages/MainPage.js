/* eslint-disable */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// import Container from '../Container/Container';
import Sidebar from '../components/Sidebar/Sidebar';

// Dashboard
import Dashboard from '../components/Dashboard/Dashboard';
import Header from '../components/Header/Header';
import Backdrop from '../components/Backdrop/Backdrop';
import SetGoalModal from '../components/SetGoalModal/SetGoalModal';
import Picker from '../components/Picker/Picker';

import SetEditGoalModal from '../redux/actions/toggleSetEditGoalModalActions';
import { asyncGoalAction } from '../components/Dashboard/goalAction';
import { asyncTasksAction } from '../components/Dashboard/taskAction';

import Statistics from '../components/Statistics/Statistics';
import SidebarBackdrop from '../components/SidebarBackdrop/SidebarBackdrop';
import Information from '../components/Information/Information';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { editGoal, showPicker, isSidebarShown } = this.props;

    return (
      <>
        <div className="main">
          <Sidebar className="main__left" />
          <div className="main__right">
            {isSidebarShown && <SidebarBackdrop />}
            <Header />
            <div className="main__container">
              <Route exact strict path="/dashboard" component={Dashboard} />
              <Route exact path="/results" component={Statistics} />
              <Route path="/information" component={Information} />
            </div>
          </div>
        </div>
        {editGoal.editing && (
          <Backdrop>
            <SetGoalModal modalType={editGoal.modalType} />
          </Backdrop>
        )}
        {showPicker.openPickerModal && (
          <Picker open={showPicker.openPickerModal} />
        )}
      </>
    );
  }
}

App.propTypes = {
  editGoal: PropTypes.shape().isRequired,
  showPicker: PropTypes.shape({
    openPickerModal: PropTypes.bool,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    editGoal: state.editGoal,
    isSidebarShown: state.app.showSidebar,
    showPicker: state.showPicker,
    tasks: state.tasks,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openModal: (e, goals, type) =>
      dispatch(SetEditGoalModal.openSetEditGoalModal(e, goals, type)),
    getGoals: user => dispatch(asyncGoalAction(user)),
    getTasks: user => dispatch(asyncTasksAction(user)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
