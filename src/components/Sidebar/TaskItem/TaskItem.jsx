/*eslint-disable*/
import React from 'react';
import { connect } from 'react-redux';
import Picker from '../../Picker/Picker';
import { startOfWeek } from 'date-fns';
import { th } from 'date-fns/esm/locale';
import Backdrop from '../../Backdrop/Backdrop';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Icon from '@material-ui/core/Icon';

import { showPickerModal } from '../../../redux/actions/showPickerAction';

import s from './TaskItem.module.css';

const StyledParagraph = styled.p`
  color: ${prop => (prop.isComplete ? 'rgb(238, 216, 242)' : '#fff')};
  text-decoration: ${prop => (prop.isComplete ? 'line-through' : 'none')};
`;

const StyledCheckBox = styled(Checkbox)`
  && {
    padding: 0;
    margin-right: 5px;
    color: ${prop => prop.color};
  }
`;

const StyledItem = styled.li`
  display: flex;
  background-color: #284060;
  margin-bottom: 5px;
  list-style: none;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledIcon = styled(Icon)`
  && {
    color: ${prop => prop.colorPrime};
    margin-right: 15px;
    filter: drop-shadow(0px 5px 7px ${prop => prop.htmlcolor}60);
  }
`;

const StyledCheckCircle = styled(CheckCircle)`
  color: ${prop => prop.htmlcolor};
`;

const StyledRadioButtonUnchecked = styled(RadioButtonUnchecked)`
  color: ${prop => prop.htmlcolor};
`;

const TaskItem = ({ task, showPiker, showPickerModal, goalId, color }) => {
  const handleShowPicker = event => {
    showPickerModal(task, goalId);
  };

  return (
    <StyledItem className={s.Item} onClick={handleShowPicker}>
      <StyledParagraph
        isComplete={task.isComplete}
        className={s.TaskText}
        data-date={task._id}
      >
        <div className={s.itemWrap}>
          {task.isComplete ? (
            <StyledIcon htmlcolor={color}>
              <StyledCheckCircle htmlcolor={color} fontSize="small" />
            </StyledIcon>
          ) : (
            <StyledIcon htmlcolor={color}>
              <StyledRadioButtonUnchecked htmlcolor={color} fontSize="small" />
            </StyledIcon>
          )}
          {task.taskTitle}
        </div>
      </StyledParagraph>
    </StyledItem>
  );
};

function mstp(state) {
  return {
    showPiker: state.showPicker,
  };
}

function mdtp(dispatch) {
  return {
    showPickerModal: (task, goalId) => dispatch(showPickerModal(task, goalId)),
  };
}

export default connect(
  mstp,
  mdtp,
)(TaskItem);
