import React from 'react';
import SunMoon from '../../Animation/SunMoon/SunMoon';
import WeatherIcons from '../../Animation/WeatherIcons/WeatherIcons';
import classes from './Card.module.scss';

const card = (props) => {
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const current = new Date().getTime()/1000
  const dayTime = current > props.current.sunrise && current < props.current.sunset
  const futureWeather = props.daily.slice(1,6).map(day => {
    const weekday = new Date(day.dt * 1000).getDay()
    return <li key={day.dt}>
      <h2>{week[weekday]}</h2>
      <WeatherIcons type={day.weather[0].main} />
      <h2>{(day.temp.max - 273).toFixed(0)}<sup>o</sup>&nbsp;&nbsp;</h2>
      <h3>{(day.temp.min - 273).toFixed(0)}<sup>o</sup></h3>
    </li>
  })
  return(
    <section className={classes.Card}>
      <section className={classes.UpperWrapper}>
        <SunMoon day={dayTime}/>
        <div className={classes.WeatherInfo}>
          <h2>{props.location.city}</h2>
          <p>{props.current.weather[0].main}</p>
          <h1>{(props.current.temp - 273).toFixed(0)}<sup>o</sup></h1>
          <div>
            <div>humidity</div>
            <div>wind</div>
          </div>
        </div>
      </section>
      <section className={classes.BottomWrapper}>
        <div className={classes.FutureWeather}>
          <ul>
            {futureWeather}
          </ul>
        </div>
      </section>
    </section>
  )
}

export default card;