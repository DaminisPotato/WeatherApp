import React from 'react';
import SunMoon from '../../Animation/SunMoon/SunMoon';
import classes from './Card.module.scss';

const card = (props) => {
  return(
    <section className={classes.Card}>
      <section className={classes.UpperWrapper}>
        <SunMoon />
        <div>
          <div>Temp</div>
          <div>
            <div>humidity</div>
            <div>wind</div>
          </div>
        </div>
        <div>location</div>
      </section>
      <section className={classes.BottomWrapper}>
        <div>Future weather</div>
      </section>
    </section>
  )
}

export default card;