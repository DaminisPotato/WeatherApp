import React from 'react';
import Clouds from '../Clouds/Clouds';
import classes from './SunMoon.module.scss';

// This component is modified from:
//https://codepen.io/claudiosc8/pen/QqpoOm

const SunMoon = (props) => {
  // const [day, setDay] = useState(true)
  // const dayNightHandler = () => {
  //   setDay(!day)
  // }
  let containerClass = [classes.Container]
  if(props.day) {
    containerClass = [classes.Container, classes.Day]
  }
  return (
    <div className={containerClass.join(' ')}>
      <div className={classes.Wrapper}>
        <div className={classes.NightBg}></div>
        <div className={classes.zzz1}></div>
        <div className={classes.zzz2}></div>
        <div className={classes.zzz3}></div>

        {/* <a href="#" id={classes.button} onClick={dayNightHandler}>Click me</a> */}

          <div className={classes.Planet}> 
          <div className={classes.Face}>
              <div className={classes.Eye}>
              <div className={classes.EyeIn}></div>
            </div>
            <div className={classes.Mouth}></div>
            <div className={classes.Eye}>
              <div className={classes.EyeIn}></div>
            </div>
          </div>
        </div>
        <div className={[classes.Star, classes.PosStar1].join(' ')}></div>
        <div className={[classes.Star, classes.PosStar2].join(' ')}></div>
        <div className={[classes.Star, classes.PosStar3].join(' ')}></div>
      </div>
      {props.clear === 'Clear' ? null : <Clouds/>}
    </div>
  )
}

export default SunMoon