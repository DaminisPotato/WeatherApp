import React from 'react';
import classes from './Wave.module.scss';

// This component is from: 
//  https://www.youtube.com/channel/UCbzuhNm5RWDRnS1Yyx-ybzg

const wave = () => {
  return (
    <div className={classes.Container}>
      <div className={[classes.Wave, classes.Wave1].join(" ")}></div>
      <div className={[classes.Wave, classes.Wave2].join(" ")}></div>
      <div className={[classes.Wave, classes.Wave3].join(" ")}></div>
      <div className={[classes.Wave, classes.Wave4].join(" ")}></div>
    </div>
  )
}

export default wave