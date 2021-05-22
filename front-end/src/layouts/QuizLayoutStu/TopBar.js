/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  // Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Menu,
  MenuItem,
  Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { v4 as uuid } from 'uuid';
import Logo from 'src/components/Logo';
import StoreContext from 'src/context/index';
import { updateQuizData } from 'src/utils/Api';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
  },
  menuIcon: {
    color: '#01025C',
    marginRight: 20
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handle = window.location.search;
  const id = new URLSearchParams(handle).get('id');
  const navigate = useNavigate();
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { store, setStore } = React.useContext(StoreContext);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const viewProfile = () => {
    console.log('edit');
    navigate('/student/account', { replace: true });
    handleMenuClose();
  };

  const viewMembership = () => {
    navigate('/student/membership', { replace: true });
    handleMenuClose();
  };

  async function handleSave() {
    const user = JSON.parse(localStorage.getItem('brainaly_user'));
    const data = {
      id,
      data: JSON.stringify(store.items),
      userid: user.userId
    };
    await updateQuizData(data).then((res) => {
      console.log(res);
    });
  }
  const logOut = () => {
    localStorage.removeItem('brainaly_user');
    navigate('/signin', { replace: true });
  };
  return (
    <AppBar
      className={clsx(classes.topBar, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/student/home">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        {/* <Hidden smDown> */}
        <Button variant="contained" color="secondary" onClick={handleSave}>Save</Button>
        <IconButton
          color="#01025C"
        >

          <NotificationsIcon color="#01025C" />
        </IconButton>
        <IconButton
          color="#01025C"
          onClick={handleMenuClick}
        >
          <SettingsIcon />
        </IconButton>
        <Menu
          id="long-menu1"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem key={uuid} onClick={viewProfile}>
            <PersonIcon className={classes.menuIcon} />
            {' '}
            Profile
          </MenuItem>
          <MenuItem key={uuid} onClick={viewMembership}>
            <CardMembershipIcon className={classes.menuIcon} />
            Manage Membership
          </MenuItem>
          <MenuItem key={uuid} onClick={logOut}>
            <ExitToAppIcon className={classes.menuIcon} />
            {' '}
            Logout
          </MenuItem>
        </Menu>
        {/* </Hidden> */}
        {/* <Hidden mdUp>
          <IconButton
            color="#01025C"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="#01025C"
            onClick={handleMenuClick}
          >
            <SettingsIcon />
          </IconButton>
          <Menu
            id="long-menu2"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem key={uuid} onClick={viewProfile}>
              <PersonIcon className={classes.menuIcon} />
              {' '}
              Profile
            </MenuItem>
            <MenuItem key={uuid} onClick={viewMembership}>
              <CardMembershipIcon className={classes.menuIcon} />
              Manage Membership
            </MenuItem>
          </Menu>
        </Hidden> */}
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
