import React from 'react';
import Wave from '../../components/Wave/Wave';
import classes from './Dashboard.module.scss';

const Layout = () => {
  return (
    <div className={classes.Container}>
      <header className={classes.Header}>
        <p>
          A weather app.
        </p>
      </header>
      <main className={classes.Main}>
        <p>Main Area</p>
        {/* <Wave /> */}
      </main>
      <footer className={classes.Footer}>
        <Wave />
      </footer>
    </div>
  )
}

export default Layout