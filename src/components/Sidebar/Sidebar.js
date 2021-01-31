import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import Drawer from '../UI/Drawer/Drawer';

const Sidebar = () => {
  const [show, setShow] = useState(false)
  const toggleSidebarHandler = () => {
    setShow(!show)
  }
  const closeSidebarHandler = () => {
    setShow(false)
  }
  return(
    <React.Fragment>
      <Logo clicked={toggleSidebarHandler} />
      <Drawer open={show} clicked={closeSidebarHandler}>
        <Navigation />
      </Drawer>
    </React.Fragment>
  )
}

export default Sidebar