/* eslint-disable max-len */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  // Badge,
  Button,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import Logo from 'src/components/Logo';
import global from 'src/utils/global';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  },
  topBar: {
    paddingLeft: 30,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    // background: 'linear-gradient(180deg, rgba(246,242,242,1) 10%, rgba(255,255,255,1) 51%, rgba(235,231,231,1) 100%)',
    backgroundColor: 'white',
    boxShadow: '0px 2px 2px -1px rgba(0,0,0,0.75)'
  },
  linkStyel: {
    color: '#01025C',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 20
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const gotoPlay = () => {
    localStorage.removeItem('brainaly_game');
    window.open(global.gamePageUrl, '_black');
  };
  // const [notifications] = useState([]);

  return (
    <AppBar
      className={clsx(classes.topBar, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <Button
            color="primary"
            onClick={gotoPlay}
            size="large"
            variant="contained"
          >
            Play
          </Button>
          <RouterLink
            to="/home"
            className={clsx(classes.linkStyel, className)}
          >
            Home
          </RouterLink>
          <RouterLink
            className={clsx(classes.linkStyel, className)}
            to="/home"
          >
            How it works
          </RouterLink>
          <RouterLink
            className={clsx(classes.linkStyel, className)}
            to="/contact"
          >
            Contact Us
          </RouterLink>
          <RouterLink
            className={clsx(classes.linkStyel, className)}
            to="/about"
          >
            About us
          </RouterLink>
          <RouterLink
            className={clsx(classes.linkStyel, className)}
            to="/signup"
          >
            Join us
          </RouterLink>
          {/* <RouterLink
            className={clsx(classes.linkStyel, className)}
            to="/signin"
          >
            Sign In
          </RouterLink> */}
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="primary"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
