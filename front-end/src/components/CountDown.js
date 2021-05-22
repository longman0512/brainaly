/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  makeStyles,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  DialogContentText
} from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Flip from 'react-reveal/Flip';
import {
  setSocket,
  emitEvent,
  onMessageReceived,
  offEvent
} from 'src/utils/socket';
import { signUp } from 'src/utils/Api';
import cogoToast from 'cogo-toast';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    height: '100vh'
  },
  modal: {
    width: '100vw',
    padding: 20
  },
  cardMedia: {
    height: 600
  },
  boxContainer: {
    marginLeft: '5vw',
    marginRight: '5vw',
    marginBottom: 100
  },
  titleInput: {
    marginTop: 30
  },
  titleContainer: {
    marginTop: 40
  },
  contentContainer: {
    marginTop: 40
  },
  buttonContainer: {
    marginTop: 40
  },
  avatar: {
    width: 150,
    height: 150
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const CountDown = ({ visible }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    visible
      ? (
<div className="demo">
  <div className="demo__colored-blocks">
    <div className="demo__colored-blocks-rotater">
      <div className="demo__colored-block" />
      <div className="demo__colored-block" />
      <div className="demo__colored-block" />
    </div>
    <div className="demo__colored-blocks-inner" />
    <div className="demo__text">Ready</div>
  </div>
  <div className="demo__inner">
    <svg className="demo__numbers" viewBox="0 0 100 100">
      <defs>
        <path className="demo__num-path-1" d="M40,28 55,22 55,78" />
        <path className="demo__num-join-1-2" d="M55,78 55,83 a17,17 0 1,0 34,0 a20,10 0 0,0 -20,-10" />
        <path className="demo__num-path-2" d="M69,73 l-35,0 l30,-30 a16,16 0 0,0 -22.6,-22.6 l-7,7" />
        <path className="demo__num-join-2-3" d="M28,69 Q25,44 34.4,27.4" />
        <path className="demo__num-path-3" d="M30,20 60,20 40,50 a18,15 0 1,1 -12,19" />
      </defs>
      <path
        className="demo__numbers-path"
        d="M-10,20 60,20 40,50 a18,15 0 1,1 -12,19
               Q25,44 34.4,27.4
               l7,-7 a16,16 0 0,1 22.6,22.6 l-30,30 l35,0 L69,73
               a20,10 0 0,1 20,10 a17,17 0 0,1 -34,0 L55,83
               l0,-61 L40,28"
      />
    </svg>
  </div>
  <div className="demo-background" />
</div>
      ) : null
  );
};

CountDown.propTypes = {
  visible: PropTypes.bool,
};

export default CountDown;
