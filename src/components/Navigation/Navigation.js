import React from 'react';
import classes from './Navigation.module.scss';
import NaviItem from './NaviItems/NaviItem';


const navigation = (props) => (
    <ul className={classes.Navigation}>
        <NaviItem link="/dashboard" exact>Dashboard</NaviItem>
        <NaviItem link="/weather" exact>Weather</NaviItem>
        <NaviItem link="/setting" exact>Setting</NaviItem>
        {/* {props.isAuthenticated 
            ? <NaviItem link="/orders">Orders</NaviItem> : null}
        {!props.isAuthenticated 
            ? <NaviItem link="/auth">Authenticate</NaviItem>
            : <NaviItem link="/logout">Logout</NaviItem>} */}
    </ul>
);

export default navigation;
