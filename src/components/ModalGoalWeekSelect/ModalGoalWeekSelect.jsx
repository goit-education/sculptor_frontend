/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import Lens from '@material-ui/icons/Lens';
import WeekSelectHint from '../WeekSelectHint/WeekSelectHint';

import {
  checkboxAction,
  checkboxEditAction,
} from '../../redux/actions/checkboxAction';

import s from './ModalGoalWeekSelect.module.css';

// eslint-disable-next-line react/prop-types
const ModalGoalWeekSelect = ({
  onChange,
  goalColor,
  id,
  task,
  onEditChange,
  mode,
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
    <div className={s.checkboxContainer}>
      {task.taskWeekRange.map(el => {
        return (
          <div className={s.checkbox} key={el.week}>
            <WeekSelectHint
              style={s.hint}
              taskCreated={task.createdAt}
              week={el.week}
            />
            <FormControlLabel
              control={
                <Checkbox
                  icon={
                    el.status ? (
                      <Lens color="inherit" style={styles.small} />
                    ) : (
                      <RadioButtonUnchecked
                        color="inherit"
                        style={styles.small}
                      />
                    )
                  }
                  checkedIcon={
                    el.status ? (
                      <RadioButtonUnchecked
                        color="inherit"
                        style={styles.small}
                      />
                    ) : (
                      <Lens color="inherit" style={styles.small} />
                    )
                  }
                  onChange={mode === 'UPDATE' ? onEditChange : onChange}
                  name={el.week - 1}
                  style={styles.small}
                  value={id}
                />
              }
              label={el.week}
            />
          </div>
        );
      })}
    </div>
  );
};

function MSTP(state) {
  return {
    goalColor: state.goalData.goalColor,
    mode: state.editGoal.modalType,
  };
}

function MDTP(dispatch) {
  return {
    onChange(e) {
      dispatch(checkboxAction(e));
    },
    onEditChange(e) {
      dispatch(checkboxEditAction(e));
    },
  };
}

ModalGoalWeekSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  goalColor: PropTypes.string.isRequired,
  onEditChange: PropTypes.func.isRequired,
  mode: PropTypes.bool.isRequired,
};

export default connect(
  MSTP,
  MDTP,
)(ModalGoalWeekSelect);
