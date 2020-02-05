/* eslint-disable react/prop-types */

import React from 'react';
import styles from './BasicButton.module.css';

const BasicButton = ({ onClickFunc, isDisabled, btnColor, btnText }) => (
  <button
    className={
      btnColor === 'white'
        ? `${styles.btn} ${styles.white}`
        : `${styles.btn} ${styles.orange}`
    }
    type="button"
    onClick={onClickFunc}
    disabled={isDisabled}
  >
    {btnText}
  </button>
);

export default BasicButton;
