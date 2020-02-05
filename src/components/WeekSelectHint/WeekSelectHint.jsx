import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHint = styled.div`
  /* position: absolute;
  left: -10px;
  top: -20px; */
  min-width: 50px;
  max-width: 100px;
  top: -10px;
  left: 50%;
  transform: translate(-50%, -100%);
  padding: 10px 20px;
  color: #ffffff;
  background-color: #666666;
  font-weight: normal;
  font-size: 13px;
  text-align: center;
  border-radius: 8px;
  position: absolute;
  z-index: 99999999;
  box-sizing: border-box;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);

  & i {
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -12px;
    width: 24px;
    height: 12px;
    overflow: hidden;
  }

  & i::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background-color: #666666;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  }
`;

const WeekSelectHint = props => {
  const { style, taskCreated = null, week } = props;
  const getData = () => {
    const date = taskCreated ? new Date(taskCreated) : new Date(Date.now());

    if (week >= 2) {
      date.setDate(date.getDate() + (week - 1) * 7);
    }
    const datePlusWeek = new Date(date);
    datePlusWeek.setDate(date.getDate() + 6);
    const parseDate = `${date.toLocaleDateString('uk-UK', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    })} - ${datePlusWeek.toLocaleDateString('uk-UK', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    })}`;
    return parseDate;
  };
  return (
    <StyledHint className={style}>
      {getData()}
      <i />
    </StyledHint>
  );
};

WeekSelectHint.propTypes = {
  style: PropTypes.objectOf.isRequired,
  taskCreated: PropTypes.string,
  week: PropTypes.number.isRequired,
};

WeekSelectHint.defaultProps = {
  taskCreated: null,
};

export default WeekSelectHint;
