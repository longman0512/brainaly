/* eslint-disable no-unused-vars */
import React from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';

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
    float: 'left',
    marginTop: -6
  }
}));
export default function Unelected() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {/* <FiberManualRecordSharpIcon className={classes.icon} color="secondary" /> */}
      { ' ' }
    </div>
  );
}
