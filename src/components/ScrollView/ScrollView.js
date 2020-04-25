import React from 'react';
import classes from './ScrollView.module.css';

const ScrollView = ({children,height})=>(
    <div className={classes.scrollview}
        style={{height}}
    >
        {children}
    </div>
)

export default ScrollView;