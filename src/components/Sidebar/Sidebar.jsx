/*eslint-disable*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import CreateBtn from '../BtnCreateGoal/BtnCreateGoal';
import GoalList from './GoalList/GoalList';
import SetEditGoalModal from '../../redux/actions/toggleSetEditGoalModalActions';
import { addDefaultColor } from '../../redux/actions/radioAction';

import { showSidebarAction } from '../../redux/actions/sidebarAction';

import { ReactComponent as More } from '../../assets/images/icons/more/baseline-more_vert-24px.svg';
import { ReactComponent as InfoSvg } from '../../assets/images/information.svg';

import Logo from '../../assets/images/icons/logo png/logo-white.png';
import s from './Sidebar.module.css';

const Sidebar = ({
  showSidebar,
  openModal,
  goals,
  showSidebarAction,
  isSetGoalActive,
  addDefaultColorFunc,
}) => {
  return (
    <div
      className={`${s.Sidebar} ${
        showSidebar && !isSetGoalActive ? s.Sidebar_show : ''
      }`}
    >
      {showSidebar && (
        <More onClick={showSidebarAction} className={s.closeSidebar} />
      )}

      <h2 className={s.Title}>
        <a className={s.Link} href="https://sculptor.goit.co.ua">
          <img className={s.logo} src={Logo} alt="logo sculptor" />
        </a>
        <NavLink to="/information">
          <InfoSvg className={s.icon} />
        </NavLink>
      </h2>
      <CreateBtn
        isDisabled={goals.length >= 3}
        onClick={e => {
          openModal(e, goals, 'SET');
          addDefaultColorFunc();
        }}
      />
      <GoalList />
    </div>
  );
};

Sidebar.propTypes = {
  openModal: PropTypes.func.isRequired,
  goals: PropTypes.arrayOf(PropTypes.object).isRequired,
  addDefaultColorFunc: PropTypes.func.isRequired,
};

const MSTP = state => {
  return {
    showSidebar: state.app.showSidebar,
    goals: state.goals,
    isSetGoalActive: state.editGoal.editing,
  };
};

function MDTP(dispatch) {
  return {
    openModal: (e, goals, type) =>
      dispatch(SetEditGoalModal.openSetEditGoalModal(e, goals, type)),
    showSidebarAction: () => dispatch(showSidebarAction()),
    addDefaultColorFunc: () => dispatch(addDefaultColor()),
  };
}

export default connect(
  MSTP,
  MDTP,
)(Sidebar);
