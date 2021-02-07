import React from 'react';
import Sunny from '../../../assets/images/sunny.png';
import classes from './Spinner.module.scss';

const spinner = (props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.Spinner}>
        <img src={Sunny} alt='spinner'/>
      </div>
      <h1>Loading...</h1>
    </div>
  )
}

export default spinner