import React, { useEffect, useState } from 'react';
import classes from './DateDisplay.module.scss';

const DateDisplay = () => {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [date])
  return (
    <div className={classes.DateDisplay}>
      <h3>{date.toLocaleDateString() +' '+ date.toLocaleTimeString()}</h3>
    </div>
  )
}

export default DateDisplay;