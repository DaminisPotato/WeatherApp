import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Drawer.module.scss';

const drawer = (props) => {
  let attachedClasses = [classes.Drawer, classes.Close];
  if(props.open) {
    attachedClasses = [classes.Drawer, classes.Open];
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.clicked} />
      <div className={attachedClasses.join(' ')} onClick={props.clicked}>
        {props.children}
      </div>
    </React.Fragment>
  )
}

export default drawer