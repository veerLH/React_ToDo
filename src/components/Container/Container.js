import React from 'react';
import classes from './Container.module.css';

const Container = ({children,color}) => (
    <div className={classes.container} style={{backgroundColor: color}}>
        {children}
    </div>
);

export default Container;