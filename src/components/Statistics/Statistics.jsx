/*eslint-disable*/
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import moment from 'moment';
import styles from './Statistics.module.css';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doneTasksArr: this.props.weekTasks.arrDays.map(
        el => el.tasks.filter(item => item.isDone).length,
      ),
      plannedTasksArr: this.props.weekTasks.arrDays.map(el => el.tasks.length),
      weekDate: this.props.weekTasks.arrDays.map(el =>
        moment(el.data).format('DD-MM'),
      ),
      dateNow: new Date(this.props.weekTasks.date).toISOString(),
    };
  }

  componentDidMount() {
    this.setState({
      doneTasksArr: this.props.weekTasks.arrDays.map(
        el => el.tasks.filter(item => item.isDone).length,
      ),
      plannedTasksArr: this.props.weekTasks.arrDays.map(el => el.tasks.length),
      weekDate: this.props.weekTasks.arrDays.map(el =>
        moment(el.data).format('DD-MM'),
      ),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.weekTasks.date !== this.props.weekTasks.date) {
      this.setState({
        dateNow: new Date(this.props.weekTasks.date).toISOString(),
      });
    }
    if (prevProps.weekTasks.arrDays !== this.props.weekTasks.arrDays) {
      this.setState({
        doneTasksArr: this.props.weekTasks.arrDays.map(
          el => el.tasks.filter(item => item.isDone).length,
        ),
        plannedTasksArr: this.props.weekTasks.arrDays.map(
          el => el.tasks.length,
        ),
        weekDate: this.props.weekTasks.arrDays.map(el =>
          moment(el.data).format('DD.MM.YY'),
        ),
      });
    }
  }

  render() {
    const {
      weekRange,
      dateArr,
      isDone,
      incomplete,
      dateNow,
      doneTasksArr,
      plannedTasksArr,
      weekDate,
    } = this.state;

    const options = {
      ticks: {
        suggestedMin: 1,
        suggestedMax: 30,
      },
      legend: {
        display: false,
        position: 'top',
        labels: {
          usePointStyle: true,
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              stacked: true,
              gridLines: {
                display: true,
                color: 'rgba(255,99,132,0.2)',
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    };
    const data = {
      dateNow,
      weekRange,
      dateArr,
      isDone,
      incomplete,
      labels: weekDate || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Planned',
          data: plannedTasksArr,
          backgroundColor: ['rgba(40,64,96)'],
          fill: 'none',
          borderColor: ['rgba(40,64,96,1)'],
          pointRadius: '3',
          pointHitRadius: '5',
          pointBackgroundColor: 'rgba(40,64,96,1)',
          pointBorderColor: 'rgba(40,64,96,1)',
        },
        {
          label: 'Done',
          data: doneTasksArr,
          backgroundColor: ['rgba(252,132,44)'],
          borderColor: ['rgba(252,132,44,1)'],
          pointRadius: '3',
          fill: 'none',
          pointHitRadius: '5',
          pointBackgroundColor: 'rgba(252,132,44,1)',
          pointBorderColor: 'rgba(252,132,44,1)',
        },
      ],

      title: {
        display: true,
        text: 'Custom Chart Title',
      },
    };

    return (
      <div className={styles.Statistics}>
        <div className={styles.Statick_text_wrapper}>
          <span
            className={`${styles.Statick_circle} ${styles.circle_planned}`}
          />
          <p className={`${styles.Statistics_label} ${styles.planned}`}>
            Planned
          </p>
          <span className={`${styles.Statick_circle} ${styles.circle_done}`} />
          <p className={`${styles.Statistics_label} ${styles.done}`}>Done</p>
        </div>
        <Line data={data} options={options} className={styles.line_chart} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    weekTasks: state.weekTasks,
    goals: state.goals,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Statistics);
