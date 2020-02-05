import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import Lens from '@material-ui/icons/Lens';
import CheckCircle from '@material-ui/icons/CheckCircle';
import styled from 'styled-components';
import { radioAction } from '../../redux/actions/radioAction';
import s from './ModalGoalIconSelect.module.css';

// eslint-disable-next-line react/prop-types
const ModalGoalIconSelect = ({ onCheck, goalColor, editGoal }) => {
  const labelColors = [
    '#dee5e8',
    '#ffe7d4',
    '#f9c1ce',
    '#cbe3f7',
    '#9df1e4',
    '#fff2b5',
    '#f8d9f3',
    '#dbc9f8',
    '#c4f6cd',
    '#b9f7fe',
  ];

  const styles = {
    small: {
      width: 32,
      height: 32,
    },
    medium: {
      width: 48,
      height: 48,
    },
    large: {
      width: 60,
      height: 60,
    },
  };

  return (
    <div className={s.colorContainer}>
      <p className={s.captionSmall}>Choose color:</p>
      <div className={s.colors}>
        {labelColors.map(el => {
          const StyledRadio = styled(Radio)`
            color: ${el} !important;
          `;
          return (
            <StyledRadio
              checked={
                el === goalColor ||
                (!goalColor && el === editGoal.data.goalColor)
              }
              onChange={e => onCheck(e)}
              value={el}
              key={el}
              name="radio-button"
              icon={<Lens style={styles.small} />}
              checkedIcon={<CheckCircle style={styles.small} />}
              // fontSize="large"
              style={styles.small}
              color="default"
            />
          );
        })}
      </div>
    </div>
  );
};

function MSTP(state) {
  return {
    goalColor: state.goalData.goalColor,
    editGoal: state.editGoal,
  };
}

function MDTP(dispatch) {
  return {
    onCheck(e) {
      dispatch(radioAction(e));
    },
  };
}

ModalGoalIconSelect.propTypes = {
  onCheck: PropTypes.func.isRequired,
  goalColor: PropTypes.string.isRequired,
  editGoal: PropTypes.shape.isRequired,
};

export default connect(MSTP, MDTP)(ModalGoalIconSelect);
