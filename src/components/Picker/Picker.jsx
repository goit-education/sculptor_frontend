/*eslint-disable*/
import React, { Component, Fragment } from 'react';
import InfiniteCalendar, {
  Calendar,
  withMultipleDates,
  defaultMultipleDateInterpolation,
} from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import './Picker.css';
import { connect } from 'react-redux';
import {
  changeSelectedData,
  setSelectedDates,
  clearSelectedData,
} from '../../redux/actions/selectedDataAction';
import Close from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
import userTaskDate from '../../redux/actions/userTaskDateAction';
import AsyncEditWeekDays from '../../redux/actions/editAktivDaysFetch';
import { changeActiveDatesInTask } from './changeActiveDatesInTaskAction';
import { closePickerModal } from '../../redux/actions/showPickerAction';

class Picker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.showPicker.task,
      goalId: this.props.showPicker.goalId,
      selectedData: this.props.selectedData,
      userDates: this.taskDatesFilter(),
      initData: this.props.showPicker.task.taskActiveDates,
      widthScreen: null,
    };
  }

  componentDidMount() {
    const { task } = this.state;
    const { getSelectedDates } = this.props;
    getSelectedDates(
      task.taskActiveDates.map(day => new Date(day.date).toString()),
    );
    this.setState({ widthScreen: window.innerWidth < 400 ? true : false });
  }

  compareDate = ({ prevDate, newDate }) => {
    if (new Date(prevDate) > new Date(newDate)) return false;
    else if (new Date(prevDate) < new Date(newDate)) return false;
    else return true;
  };

  handlerClose = e => {
    const {
      selectedData,
      closePickerModal,
      changeActiveDatesInTask,
      clearSelectedData,
    } = this.props;
    const { task, goalId } = this.state;
    const taskId = task._id;
    const fixedSelectedData = selectedData.map(el => {
      const getReallyIsDone = task.taskActiveDates.find(date => {
        return this.compareDate({ prevDate: date.date, newDate: el });
      });

      const getStatus = getReallyIsDone ? getReallyIsDone.isDone : false;
      return {
        date: Date.parse(el),
        isDone: getStatus,
      };
    });

    changeActiveDatesInTask({
      taskId,
      selectedData: fixedSelectedData,
      goalId,
    });

    clearSelectedData();
    closePickerModal();
  };

  actionData = e => {
    this.props.dataHandler(e, this.props.selectedData);
  };

  taskDatesFilter = () => {
    const userWeeks = this.props.showPicker.task.taskWeekRange.filter(
      el => el.status,
    );
    const numUserWeeks = userWeeks.map(el => el.week);
    const taskCreationDate = this.props.showPicker.task.taskCreateDate;

    const allWeeks = [
      {
        date: Date.parse(taskCreationDate),
        week: 1,
      },
    ];

    let date = Date.parse(taskCreationDate);
    let weekCounter = 1;
    let dayCounter = 1;

    while (dayCounter !== 63) {
      date += 86401000;

      const dateObj = {
        date: date,
        week: weekCounter,
      };

      allWeeks.push(dateObj);

      dayCounter += 1;

      if (dayCounter % 7 === 0) {
        weekCounter += 1;
      }
    }

    const userDisabledWeeks = allWeeks.filter(
      el => !numUserWeeks.includes(el.week),
    );

    const datesObject = {
      allWeeks,
      userDisabledWeeks,
    };

    return datesObject;
  };

  render() {
    const { open } = this.props;
    const { userDates, task, goalId, widthScreen } = this.state;

    return (
      <Dialog
        open={open}
        onClose={this.handlerClose}
        transitionDuration={1000}
        fullScreen={widthScreen}
      >
        <Fade in={open}>
          <div className="calendar">
            <IconButton
              onClick={this.handlerClose}
              type="button"
              size="small"
              color="primary"
              aria-label="Close"
              style={{ marginLeft: '85%', paddingTop: '10px' }}
            >
              <Icon>
                <Close style={{ fill: '#fff' }} />
              </Icon>
            </IconButton>
            <InfiniteCalendar
              min={new Date(userDates.allWeeks[0].date)}
              max={new Date(userDates.allWeeks[62].date)}
              minDate={new Date(userDates.allWeeks[0].date)}
              maxDate={new Date(userDates.allWeeks[62].date)}
              Component={withMultipleDates(Calendar)}
              selected={this.props.selectedData}
              disabledDates={userDates.userDisabledWeeks.map(
                el => new Date(el.date),
              )}
              interpolateSelection={defaultMultipleDateInterpolation}
              onSelect={this.actionData}
              keyboardSupport={true}
              width={window.innerWidth <= 400 ? window.innerWidth : 380}
              height={280}
              rowHeight={56}
              theme={{
                selectionColor: '#223653',
                textColor: {
                  default: '#333',
                  active: '#FFF',
                },
                weekdayColor: '#223653',
                headerColor: '#223653',
                floatingNav: {
                  background: '#223653',
                  color: '#FFF',
                  chevron: '#FFA726',
                },
              }}
              displayOptions={{ hideYearsOnSelect: false }}
              locale={{
                weekStartsOn: 1,
              }}
            />
          </div>
        </Fade>
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedData: state.selectedData,
    userTaskDate: state.userTaskDate,
    showPicker: state.showPicker,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSelectedDates: taskDates => dispatch(setSelectedDates(taskDates)),
    changeActiveDatesInTask: ({ taskId, selectedData, goalId }) =>
      dispatch(
        changeActiveDatesInTask({
          taskId,
          selectedData,
          goalId,
        }),
      ),
    dataHandler: (event, selected) =>
      dispatch(changeSelectedData(event, selected)),
    userTaskDateFunc: taskCreationDate =>
      dispatch(userTaskDate(taskCreationDate)),
    closePickerModal: () => dispatch(closePickerModal()),
    clearSelectedData: () => dispatch(clearSelectedData()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Picker);
