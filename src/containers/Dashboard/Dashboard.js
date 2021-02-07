import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Wave from '../../components/Animation/Wave/Wave';
import DateDisplay from '../../components/DateDisplay/DateDisplay';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/UI/Card/Card';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreator from '../../store/actions/index';
import classes from './Dashboard.module.scss';

const Dashboard = () => {
  const dispatch = useDispatch()
  const onFetchWeather = useCallback((url, location) => dispatch(actionCreator.fetchWeather(url, location)),[dispatch])
  const onLocateUser = useCallback(() => dispatch(actionCreator.locateUser()), [dispatch])
  const [location, loading, current, daily] = useSelector(state => {
    return [
      state.weather.location, 
      state.weather.loading,
      state.weather.weather.current,
      state.weather.weather.daily
    ]
  })
  const weatherURL = 'onecall'
  useEffect(() => {
    onLocateUser()  
  }, [])
  useEffect(() => {
    if(location){
      onFetchWeather(weatherURL, location)
    }
  }, [onFetchWeather, location])
  let weatherInfo = <Spinner/>
  if (current && daily) {
    weatherInfo = <Card loading
        location={location}
        current={current}
        daily={daily}
       />
  }
  return (
    <div className={classes.Container}>
      <header className={classes.Header}>
        <Sidebar />
        <DateDisplay />
      </header>
      <main className={classes.Main}>
        {weatherInfo}
      </main>
      <footer className={classes.Footer}>
        <Wave />
      </footer>
    </div>
  )
}

export default Dashboard