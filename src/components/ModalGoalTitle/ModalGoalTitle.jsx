import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Lens from '@material-ui/icons/Lens';

import GoalTitle from '../../redux/actions/goalTitleActions';

import s from './ModalGoalTitle.module.css';

const ModalGoalTitle = ({
  inputGoalTitle,
  goalTitle,
  goalColor,
  goalNumber,
  editGoal,
}) => {
  const styles = {
    small: {
      width: 32,
      height: 32,
      color: goalColor || '#dee5e8',
    },
    medium: {
      width: 48,
      height: 48,
      color: goalColor || '#dee5e8',
    },
    large: {
      width: 60,
      height: 60,
      color: goalColor || '#dee5e8',
    },
  };
  return (
    <div className={s.ModalGoalTitle}>
      <div className={s.circle} style={{ color: `${goalColor}` }}>
        <Lens fontSize="large" color="inherit" style={styles.small} />
      </div>
      <h5 className={s.label}>Goal #{goalNumber}:</h5>
      <input
        className={s.input}
        type="text"
        name="ModalGoalTitle"
        id="ModalGoalTitle"
        placeholder="Write here your goal"
        defaultValue={editGoal.data.goalTitle || goalTitle}
        onChange={inputGoalTitle}
      />
    </div>
  );
};

ModalGoalTitle.propTypes = {
  inputGoalTitle: PropTypes.func.isRequired,
  goalTitle: PropTypes.string.isRequired,
  goalColor: PropTypes.string.isRequired,
  goalNumber: PropTypes.number.isRequired,
  editGoal: PropTypes.shape.isRequired,
};

function mapStateToProps(state) {
  return {
    goalTitle: state.goalData.goalTitle,
    goalColor: state.goalData.goalColor,
    goalNumber: state.goalData.goalNumber,
    editGoal: state.editGoal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    inputGoalTitle: e => dispatch(GoalTitle.inputGoalTitle(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalGoalTitle);
