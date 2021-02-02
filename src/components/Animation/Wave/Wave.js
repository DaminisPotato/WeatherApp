import React from 'react';
import classes from './Wave.module.scss';

// This component is modified from: 
//  https://www.youtube.com/watch?v=MMNEEdGa5eE

const wave = () => {
  return (
    <div className={classes.Container}>
      <div className={classes.Wave1}></div>
      <div className={classes.Wave2}></div>
      <div className={classes.Wave3}></div>
      <div className={classes.Wave4}></div>
    </div>
  )
}

export default wave