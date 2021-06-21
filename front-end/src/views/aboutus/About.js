/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  makeStyles,
  Card,
  FormControl,
  InputLabel,
  Select,
  Grid,
  CardMedia,
  CircularProgress,
  MenuItem
} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';
import { signUp } from 'src/utils/Api';
import cogoToast from 'cogo-toast';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
    overflow: 'hidden'
  },
  cardMedia: {
    height: 600
  },
  boxContainer: {
    marginLeft: '5vw',
    marginRight: '5vw',
    marginBottom: 100
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

const About = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [accountType, setAcctType] = React.useState('teacher');
  const [isLoading, setIsLoading] = React.useState(false);
  const handChangeAccType = (value) => {
    console.log(value.target.value);
    setAcctType(value.target.value);
  };
  const handleClickShowPassword = () => {
    console.log('asdasdasdsd');
  };
  const handleMouseDownPassword = () => {
    console.log('asdasdasd');
  };

  return (
    <Page
      className={classes.root}
      title="Home"
    >
        <Box
          component="div"
          mt={15}
          className={classes.boxContainer}
        >
      <Grid
        container
        spacing={7}
        justify="center"
      >
        <Grid
          xl={6}
          lg={6}
          md={6}
          xs={12}
          item
        >
          <Fade left>
            <Grid item xs={12} container direction="column" spacing={2} justify="center">
              <Grid item className={classes.contentContainer}>
                <div style={{ color: '#5E2B66', fontSize: 36 }}>
                    <img src="/static/logo.png" alt="logo" width="100%" />
                </div>
                <div style={{ color: '#5E2B66', fontSize: 36 }}>
                Brainaly is a leading educational application that uses gamification to make learning fun as well as enhance retention. Our platform is easy to use so teachers can quickly create quizzes for their classes, communicate with students in real time using a chat function and make data-driven decisions on where to focus based on the rich analytics the application provides.
                </div>
              </Grid>
            </Grid>
          </Fade>
        </Grid>
      </Grid>
        </Box>
    <Box
      component="div"
      mt={15}
      className={classes.boxContainer}
    >
      <Grid
        container
        spacing={7}
      >
        <Grid
          xl={6}
          lg={6}
          md={6}
          xs={12}
          item
        >
          <Fade left>
            <Grid item xs={12} container direction="column" spacing={2} justifyContent="center">
              <Grid item xs className={classes.titleContainer}>
                <div style={{ color: '#01025C', fontSize: 46, fontWeight: 'bold' }}>About Us</div>
              </Grid>
              <Grid item className={classes.contentContainer}>
                <div style={{ color: '#5E2B66', fontSize: 36 }}>
                Brainaly is a leading educational application that uses gamification to make learning fun as well as enhance retention. Our platform is easy to use so teachers can quickly create quizzes for their classes, communicate with students in real time using a chat function and make data-driven decisions on where to focus based on the rich analytics the application provides.
                </div>
              </Grid>
            </Grid>
          </Fade>
        </Grid>
        <Grid
          xl={6}
          lg={6}
          md={6}
          xs={12}
          item
        >
          <Flip left>
            <Card>
              <CardMedia
                style={{ height: 600 }}
                image="/static/images/classmates-working-together.png"
              />
            </Card>
          </Flip>
        </Grid>
      </Grid>
    </Box>
    <Box
      component="div"
      mt={15}
      className={classes.boxContainer}
    >
      <Grid
        container
        spacing={7}
        justify="center"
      >
        <Grid
          xl={6}
          lg={6}
          md={6}
          xs={12}
          item
        >
          <Fade right>
            <Grid item xs={12} container direction="column" spacing={2} justify="center">
              <Grid item xs className={classes.titleContainer}>
                <div style={{ color: '#01025C', fontSize: 46, fontWeight: 'bold' }}>Mission</div>
              </Grid>
              <Grid item className={classes.contentContainer}>
                <div style={{ color: '#5E2B66', fontSize: 36 }}>
                We believe the best learning occurs when it is most enjoyed and our mission is to create easy to use platforms that facilitate the process of embedding lots of fun into learning activities.
                </div>
              </Grid>
            </Grid>
          </Fade>
        </Grid>
      </Grid>
    </Box>
    </Page>
  );
};

export default About;
