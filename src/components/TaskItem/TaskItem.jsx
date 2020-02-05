/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Icon from '@material-ui/core/Icon';

import { changeTaskToDone, deleteTaskFromThisDay } from './cardTaskItemAction';

import deleteSign from '../../assets/images/cursorIcon/removing-sign-50.png';
import completeIcon from '../../assets/images/cursorIcon/calendar-with-ok-sign-50.png';

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  cursor: url(${completeIcon}), auto;

  &:hover {
    border: 0.5px solid #00000020;
  }
`;

// text
const ItemDescription = styled.p`
  padding-left: 1.5rem;
  color: ${props => (props.isDone ? '#45454550' : '#454545')};
  font-size: 1.4rem;
  font-family: 'Roboto Light';
  flex: 1;
  text-decoration: ${props => (props.isDone ? 'line-through' : 'none')};
  user-select: none;

  &:hover {
    color: #454545;
  }
`;

const MoveToTrash = styled.div`
  opacity: 0.3;
  transition: 0.5s;
  cursor: url(${deleteSign}), auto;

  ${Item}:hover & {
    opacity: 1;
    transition: 0.5s;
    cursor: url(${deleteSign}), auto;
  }
`;

const StyledIconButton = styled(IconButton)`
  && {
    cursor: url(${deleteSign}), auto;
  }
`;

const StyledIcon = styled(Icon)`
  && {
    color: ${prop => prop.colorPrime};
  }
`;

const StyledCheckCircle = styled(CheckCircle)`
  color: ${prop => prop.htmlcolor};
`;

const StyledRadioButtonUnchecked = styled(RadioButtonUnchecked)`
  color: ${prop => prop.htmlcolor};
`;

const TaskItem = ({ data, changeTaskToDone, deleteTaskFromThisDay }) => {
  return (
    <Item
      isDone={data.isDone}
      onClick={() =>
        changeTaskToDone({
          taskId: data.taskId,
          taskActiveDayId: data.taskActiveDateId,
          isDone: !data.isDone,
          goalId: data.goalId,
        })
      }
    >
      {data.isDone ? (
        <StyledIcon>
          <StyledCheckCircle htmlcolor={data.color} fontSize="small" />
        </StyledIcon>
      ) : (
        <StyledIcon>
          <StyledRadioButtonUnchecked htmlcolor={data.color} fontSize="small" />
        </StyledIcon>
      )}

      <ItemDescription isDone={data.isDone}>{data.title}</ItemDescription>
      <MoveToTrash>
        <StyledIconButton
          aria-label="Delete"
          size="small"
          tabIndex={0}
          onClick={e => {
            e.stopPropagation();
            deleteTaskFromThisDay({
              taskId: data.taskId,
              taskActiveDayId: data.taskActiveDateId,
              goalId: data.goalId,
            });
          }}
        >
          <DeleteIcon fontSize="small" size="small" />
        </StyledIconButton>
      </MoveToTrash>
    </Item>
  );
};

const mdtp = dispatch => ({
  changeTaskToDone: ({ taskId, taskActiveDayId, isDone, goalId }) =>
    dispatch(changeTaskToDone({ taskId, taskActiveDayId, isDone, goalId })),
  deleteTaskFromThisDay: ({ taskId, taskActiveDayId, goalId }) =>
    dispatch(deleteTaskFromThisDay({ taskId, taskActiveDayId, goalId })),
});

export default connect(null, mdtp)(TaskItem);
