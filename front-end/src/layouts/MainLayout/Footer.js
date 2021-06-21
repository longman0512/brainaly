/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import {
  Grid,
  makeStyles,
  Box,
  List,
  ListItem
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    backgroundColor: '#5E2B66'
  },
  cardMedia: {
    height: 600
  },
  boxContainer: {
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
  linkeTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  linkStyel: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 30
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Box
      component="div"
      className={classes.boxContainer}
    >
      <Grid
        container
        spacing={7}
        style={{ background: '#5E2B66' }}
      >
        <Grid
          xl={3}
          lg={3}
          md={6}
          xs={12}
          item
          style={{ background: '#5E2B66' }}
        >
          <img src="/static/foot-logo.png" alt="footer-logo" style={{ margin: 30, width: '90%' }} />
        </Grid>
        <Grid
          xl={2}
          lg={2}
          md={6}
          xs={12}
          item
        >
          <List component="nav" className={classes.root} aria-label="contacts">
            <ListItem button className={classes.linkeTitle}>
              <RouterLink
                className={classes.linkStyel}
                to="/"
              >
                Home
              </RouterLink>
            </ListItem>
            <ListItem button className={classes.linkeTitle}>
              <RouterLink
                className={classes.linkStyel}
                to="/"
              >
                How It Works
              </RouterLink>
            </ListItem>
          </List>
        </Grid>
        <Grid
          xl={2}
          lg={2}
          md={6}
          xs={12}
          item
        >
          <List component="nav" className={classes.root} aria-label="contacts">
            <ListItem button className={classes.linkeTitle}>
              <RouterLink
                className={classes.linkStyel}
                to="/signup"
              >
                Sign Up
              </RouterLink>
            </ListItem>
            <ListItem button className={classes.linkeTitle}>
              <RouterLink
                className={classes.linkStyel}
                to="/signin"
              >
                Sign In
              </RouterLink>
            </ListItem>
          </List>
        </Grid>
        <Grid
          xl={2}
          lg={2}
          md={6}
          xs={12}
          item
        >
          <List component="nav" className={classes.root} aria-label="contacts">
            <ListItem button className={classes.linkeTitle}>
              Find Us Here
            </ListItem>
          </List>
        </Grid>
        <Grid
          xl={3}
          lg={3}
          md={6}
          xs={12}
          item
        >
          <img
            src="/static/images/elephant.png"
            alt="element-logo"
            style={{
              margin: 30, maxHeight: 150, resize: 'contain'
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
