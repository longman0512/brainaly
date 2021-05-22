/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-vars */
import React from 'react';
import { v4 as uuid } from 'uuid';
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
  CardContent,
  Card,
  Typography,
  DialogTitle,
  Grid,
  TextField,
  DialogContentText
} from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
  Flip
} from 'react-awesome-reveal';
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
    position: 'fixed',
    bottom: 0,
    height: 250,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center'
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

const Players = ({ playersData, gameContent, userInfo }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page
      className={classes.root}
    >

      <Grid
        container
        spacing={3}
        justify="space-around"
      >
        {
          playersData?.map((player, index) => {
            return (
              (player?.userId == gameContent?.ownerId)
                ? null : (
                <Grid
                  key={uuid()}
                  item
                  xl={2}
                  lg={2}
                  md={2}
                  xs={2}
                  className="player-card"
                >
                  <Card className="player-card">
                    <CardContent className="player-card">
                      <Typography variant="h2" component="h2">
                        {player.userNickName}
                      </Typography>
                      <Typography variant="h3" component="h3">
                      {' '}
                      {player?.userScore}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                )
            );
          })
        }
      </Grid>

    </Page>
  );
};

Players.propTypes = {
  gameContent: PropTypes.object,
  playersData: PropTypes.array,
  userInfo: PropTypes.object
};

export default Players;
