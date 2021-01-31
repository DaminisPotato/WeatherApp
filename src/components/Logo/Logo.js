import React from 'react'
import Sunny from '../../assets/images/sunny.png'
import classes from './Logo.module.scss'

const logo = (props) => {
  return (
    <div className={classes.Wrapper} onClick={props.clicked}>
      <div className={classes.Logo}>
        <img src={Sunny} alt='Weather App' />
      </div>
      <h1>Weather</h1>
    </div>
  )
}

export default logo;