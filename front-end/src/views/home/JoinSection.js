/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import {
  Grid,
  makeStyles,
  Box,
  Card,
  CardMedia,
  Button
} from '@material-ui/core';
import {
  Users as UsersIcon,
} from 'react-feather';
import Fade from 'react-reveal/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  cardMedia: {
    height: 600
  },
  boxContainer: {
    marginLeft: '5vw',
    marginRight: '5vw'
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

const JoinSection = () => {
  const classes = useStyles();

  return (
    <Box
      component="div"
      mt={15}
      className={classes.boxContainer}
      id="joinsection"
    >
      <Grid
        container
        spacing={7}
      >
        <Grid item xs={12} container direction="column" spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs className={classes.titleContainer}>
            <Fade top>
              <div style={{ color: '#01025C', fontSize: 46, fontWeight: 'bold' }}>Change is the result of all true learning.</div>
            </Fade>
          </Grid>
        </Grid>
        <Grid
          xl={6}
          lg={6}
          md={6}
          xs={12}
          item
        >
          <Fade left>
            <Card>
              <CardMedia
                className={classes.cardMedia}
                image="/static/images/love-learn.png"
              />
            </Card>
          </Fade>
        </Grid>
        <Grid
          xl={6}
          lg={6}
          md={6}
          xs={12}
          item
        >
          <Fade right>
            <Grid item xs={12} container direction="column" spacing={2} justifyContent="center">
              <Grid item xs className={classes.titleContainer}>
                <div style={{ color: '#01025C', fontSize: 46, fontWeight: 'bold' }}>Make learning Fun!</div>
              </Grid>
              <Grid item className={classes.contentContainer}>
                <div style={{ color: '#5E2B66', fontSize: 36 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros,
                  pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus.
                  Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex,
                  in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent
                  per conubia nostra, per inceptos himenaeos.
                </div>
              </Grid>
              <Grid container item className={classes.buttonContainer}>
                <Grid
                  xl={4}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <Button variant="contained" color="primary" endIcon={<UsersIcon />} onClick={() => { window.location = '/signup'; }}>Join Us</Button>
                </Grid>
              </Grid>
            </Grid>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JoinSection;
