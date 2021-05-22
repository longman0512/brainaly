/* eslint-disable */
import React from 'react';
import { v4 as uuid } from 'uuid';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import confetti  from 'canvas-confetti';
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
    overflowY: 'scroll',
    position: 'fixed',
    bottom: 0,
    height: '70vh',
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
  },
  endGameContainer: {
    height: '70vh',
    overflowY: 'scroll'
  }
}));

const EndGameSection = ({ game, playersInfo, userInfo }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const checkPlace = (data) => {
    playersInfo.sort(function (a, b) {
      if (a.userScore < b.userScore) return 1;
      if (a.userScore > b.userScore) return -1;
      if (a.userScore == b.userScore) return 0;
    });
    let criterion = 0
    var tempPlayers = playersInfo.filter((a)=>{
      return a.userId != game.ownerId
    })
    tempPlayers.map((p, index) => {
      if (p.userId == data.userId) {
        criterion = index + 1;
      }
    });
    return criterion;
  };
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  var count = 200;
    var defaults = {
      origin: { y: 0.7 }
    };

  function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
      origin: { x: randomInRange(0.1, 1), y: Math.random()}
    }));
  }
  React.useEffect(()=>{
    
    for(var i = 0; i< 5; i++){
      setTimeout(()=>{
        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        });
        fire(0.2, {
          spread: 60,
        });
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        });
      }, 500 * i)
    }
  }, [])

  return (
    <Page
      className={classes.root}
    >
      <Grid
        container
        spacing={3}
        justify="space-around"
        className={classes.endGameContainer}
      >

        {
          playersInfo?.map((player, index) => {
            return (
              (game?.ownerId == player?.userId)
                ? null : (
                <Grid
                  key={uuid()}
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  xs={12}
                >
                  <Card className="">
                    <CardContent className="">
                      <Grid
                        container
                        spacing={3}
                        justify="space-around"
                      >
                        <Grid
                          item
                          key={uuid()}
                          xl={4}
                          lg={4}
                          md={4}
                          xs={4}
                        >
                          {
                            checkPlace(player) <= 3 && checkPlace(player) > 0
                              ? <img src={"/"+checkPlace(player)+"-place.png"} style={{width: 50}} />
                              : checkPlace(player)
                          }
                        </Grid>
                        <Grid
                          item
                          key={uuid()}
                          xl={4}
                          lg={4}
                          md={4}
                          xs={4}
                          justify="center"
                          alignItems="center"
                        >
                          <div className="end-game-typh">{player.userNickName}</div>
                        </Grid>
                        <Grid
                          item
                          key={uuid()}
                          xl={4}
                          lg={4}
                          md={4}
                          xs={4}
                          justify="center"
                          alignItems="center"
                        >
                          <div className="end-game-typh">{player?.userScore}</div>
                        </Grid>
                      </Grid>
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

EndGameSection.propTypes = {
  game: PropTypes.object,
  playersInfo: PropTypes.array,
  userInfo: PropTypes.object
};

export default EndGameSection;
