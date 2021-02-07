import React from 'react';
import classes from './WeatherIcons.module.scss';

// This component is modified from:
//https://codepen.io/joshbader/pen/EjXgqr

const weatherIcons = (props) => {
  let icon = null;
  switch(props.type || props.id){
    case "Clear": 
      return icon = (
        <div className={classes.Icon}>
          <div className={classes.Sun}>
            <div className={classes.Rays}></div>
          </div>
        </div>
      );
    case "Clouds": 
      return icon = (
        <div className={classes.Icon}>
          <div className={classes.Cloud}></div>
          <div className={classes.Cloud}></div>
        </div>
      );
    case "Snow": 
      return icon =(
        <div className={classes.Icon }>
          <div className={classes.Cloud}></div>
          <div className={classes.Snow}>
            <div className={classes.Flake}></div>
            <div className={classes.Flake}></div>
          </div>
        </div>
      );
    case "Rain": 
      return icon = (
        <div className={classes.Icon}>
          <div className={classes.Cloud}></div>
          <div className={classes.Rain}></div>
        </div>
      );
    case "Thunderstorm": 
      return icon = (
        <div className={classes.Icon}>
          <div className={classes.Cloud}></div>
          <div className={classes.Lightning}>
            <div className={classes.Bolt}></div>
            <div className={classes.Bolt}></div>
          </div>
        </div>
      );
    case "Drizzle": 
      return icon = (
        <div className={classes.Icon}>
          <div className={classes.Cloud}></div>
          <div className={classes.Sun}>
            <div className={classes.Rays}></div>
          </div>
          <div className="rain"></div>
        </div>
      );
    default:
      return icon = (
          <div className={classes.Icon}>
          <div className={classes.Extreme}>
            <div className={classes.HarshWind}></div>
            <div className={classes.HarshWind}></div>
            <div className={classes.HarshWind}></div>
            <div className={classes.HarshWind}></div>
            <div className={classes.HarshWind}></div>
            <div className={classes.HarshWind}></div>
            <div className={classes.HarshWind}></div>
          </div>
          </div>
      )
  }
  return icon
}

export default weatherIcons;