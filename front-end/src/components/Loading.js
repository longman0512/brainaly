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

const Loading = ({ visible }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    visible
      ? (
<div className="loading-container">
      <div className="cell">
        <div className="loader circle reg">
          <div className="block">
              <div className="box" />
          </div>
        </div>
      </div>
</div>
      ) : null
  );
};

Loading.propTypes = {
  visible: PropTypes.bool,
};

export default Loading;
