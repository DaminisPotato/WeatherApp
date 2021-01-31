import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NaviItem.module.scss';


const naviItem = ( props ) => (
    <li className={classes.NaviItem}>
        <NavLink
            activeClassName={classes.active} 
            to={props.link} exact={props.exact} 
            >{props.children}</NavLink>
    </li>
);

export default naviItem;