/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { showSidebarAction } from '../../redux/actions/sidebarAction';
import s from './SidebarBackdrop.module.css';

const SidebarBackdrop = ({ children, closeSidebar }) => {
  return (
    <div
      className={s.Backdrop}
      data-id="Backdrop"
      onClick={() => {
        closeSidebar();
      }}
    >
      {children}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    goalMotivation: state.goalData.goalMotivation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeSidebar: () => dispatch(showSidebarAction()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarBackdrop);
