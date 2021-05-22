/* eslint-disable no-unused-vars */
import React from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles(() => ({
  container: {
    width: '80%',
    height: 10,
    border: '1px solid grey',
    marginLeft: '10%',
    textAlign: 'center',
    borderRadius: 10
  },
  icon: {
    fontSize: 20,
    float: 'right',
    marginTop: -6
  }
}));
export default function Selected() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CheckCircleIcon className={classes.icon} color="primary" />
    </div>
  );
}
