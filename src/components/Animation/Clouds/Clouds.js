import React from 'react';
import Cloud1 from '../../../assets/images/cloud1.png';
import Cloud2 from '../../../assets/images/cloud2.png';
import Cloud3 from '../../../assets/images/cloud3.png';
import Cloud4 from '../../../assets/images/cloud4.png';
import Cloud5 from '../../../assets/images/cloud5.png';
import classes from './Clouds.module.scss';

const clouds = () => {
  return(
    <div className={classes.Container}>
      {/* <div className={classes.Sun}></div> */}
      <div className={classes.Clouds}>
        <img src={Cloud1} />
        <img src={Cloud2} />
        <img src={Cloud3} />
        <img src={Cloud4} />
        <img src={Cloud5} />
      </div>
    </div>
  )
}

export default clouds