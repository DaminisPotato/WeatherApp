import React from 'react';
import Wave from '../../components/Animation/Wave/Wave';
import DateDisplay from '../../components/DateDisplay/DateDisplay';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/UI/Card/Card';
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