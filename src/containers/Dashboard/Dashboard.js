import React from 'react';
import DateDisplay from '../../components/DateDisplay/DateDisplay';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/UI/Card/Card';
import Wave from '../../components/Wave/Wave';
import classes from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={classes.Container}>
      <header className={classes.Header}>
        <Sidebar />
        <DateDisplay />
      </header>
      <main className={classes.Main}>
        <Card />
      </main>
      <footer className={classes.Footer}>
        <Wave />
      </footer>
    </div>
  )
}

export default Dashboard