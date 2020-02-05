/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import CardTitle from '../CardTitle/CardTitle';
import TaskList from '../TaskList/TaskList';

const CardItem = styled.div`
  background-color: #fff;
  box-shadow: 0 0 6px 1px #b9b9b9;
  border-radius: 2px;
  :not(:last-child) {
    margin-bottom: 3rem;
  }
  flex: 0 0 22rem;
  width: 29.5rem;
  height: 210px;
  overflow: hidden;

  @media screen and (min-width: 767px) {
    flex: 0 0 29.5rem;
    margin-left: 3rem;
  }

  @media screen and (min-width: 1240px) {
    margin-left: 0;
  }

  @media (min-width: 1900px) {
    margin-left: 8rem;
    margin-right: 8rem;
  }
`;

const Card = ({ day }) => {
  const title = String(day.data).substr(0, 10);

  return (
    <CardItem>
      <CardTitle title={title} />
      <TaskList items={day.tasks} />
    </CardItem>
  );
};

export default Card;
