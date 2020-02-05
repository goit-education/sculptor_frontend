import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Motivation from '../../redux/actions/goalMotivationActions';

import s from './ModalGoalMotivation.module.css';

const ModalGoalMotivation = ({ inputMotivation, goalMotivation, editGoal }) => {
  return (
    <div className={s.ModalGoalMotivation}>
      <h5 className={s.label}>Motivation:</h5>
      <input
        className={s.input}
        type="text"
        name="inputMotivation"
        id="inputMotivation"
        onChange={inputMotivation}
        placeholder="Write here motivation"
        defaultValue={editGoal.data.goalMotivation || goalMotivation}
      />
    </div>
  );
};

ModalGoalMotivation.propTypes = {
  inputMotivation: PropTypes.func.isRequired,
  goalMotivation: PropTypes.string,
  editGoal: PropTypes.shape.isRequired,
};

ModalGoalMotivation.defaultProps = {
  goalMotivation: '',
};

function mapStateToProps(state) {
  return {
    goalMotivation: state.goalData.goalMotivation,
    editGoal: state.editGoal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    inputMotivation: e => dispatch(Motivation.inputMotivation(e)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalGoalMotivation);
