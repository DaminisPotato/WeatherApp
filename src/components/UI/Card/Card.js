import React from 'react';
import SunMoon from '../../Animation/SunMoon/SunMoon';
import WeatherIcons from '../../Animation/WeatherIcons/WeatherIcons';
import classes from './Card.module.scss';

const card = (props) => {
  const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentTime = new Date().getTime()/1000
  const dayTime = currentTime > props.current.sunrise && currentTime < props.current.sunset
  const futureWeather = props.daily.slice(1,6).map(day => {
    const weekday = new Date(day.dt * 1000).getDay()
    return <li key={day.dt}>
            <div>
              <h2>{week[weekday]}</h2>
              <WeatherIcons type={day.weather[0].main} />
              <div>
                <h2>{(day.temp.max - 273).toFixed(0)}<sup>o</sup>&nbsp;&nbsp;</h2>
                <h3>{(day.temp.min - 273).toFixed(0)}<sup>o</sup></h3>
              </div>
            </div>
          </li>
  })
  let weatherInfoStyle = [classes.WeatherInfo]
  if(dayTime) {
    weatherInfoStyle = [classes.WeatherInfo, classes.Daytime].join(' ')
  };
  return(
    <section className={classes.Card}>
      <section className={classes.UpperWrapper}>
        <SunMoon day={dayTime} clear={props.current.weather[0].main} />
        <div className={weatherInfoStyle}>
          <h2>{props.location.city}</h2>
          <p>{props.current.weather[0].main}</p>
          <h1>{(props.current.temp - 273).toFixed(0)}<sup>o</sup></h1>
          <div>
            <p>Wind&nbsp;{props.current.wind_speed}&nbsp;m/s</p>
            <p>Humidity&nbsp;{props.current.humidity}%</p>
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