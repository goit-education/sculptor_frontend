/*eslint-disable*/
import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import GoalItem from '../GoalItem/GoalItem';
import s from './GoalList.module.css';

const GoalList = ({ goalsArray, loaderState }) => {
  return (
    <div className={s.container}>
      {loaderState ? (
        <div className={s.loader}>
          <Loader type="Watch" color="#eee" height="80" width="80" />
        </div>
      ) : (
        <ul className={s.List}>
          {goalsArray.map(el => (
            <GoalItem key={el._id} data={el} />
          ))}
        </ul>
      )}
    </div>
  );
};

function MSTP(state) {
  return {
    goalsArray: state.goals,
    tasksArray: state.tasks,
    loaderState: state.loader,
  };
}

export default connect(
  MSTP,
  null,
)(GoalList);
