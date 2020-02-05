/* eslint-disable */

import React from 'react';
import styled from 'styled-components';

// list item
import TaskItem from '../TaskItem/TaskItem';

const List = styled.ul`
  height: 170px;
  list-style: none;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 0.5rem;
`;

const Text = styled.div`
  height: 180px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-family: 'Roboto';
  color: #b9c3c8;
  text-transform: uppercase;
  font-weight: bold;
  user-select: none;
`;

const TaskList = ({ items }) => {
  return (
    <>
      {items.length === 0 ? (
        <Text>no tasks</Text>
      ) : (
        <List>
          {items.map((task, idx) => (
            <TaskItem data={task} key={idx} />
          ))}
        </List>
      )}
    </>
  );
};

export default TaskList;
