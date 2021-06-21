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
  Badge
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withStyles } from '@material-ui/core/styles';
import { v4 as uuid } from 'uuid';
import Logo from 'src/components/Logo';
import StoreContext from 'src/context/index';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

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
    marginRight: 20
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { store } = React.useContext(StoreContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [alertNum, setAlertNum] = React.useState(0);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  React.useEffect(() => {
    setAlertNum(store?.alertNum ? store.alertNum : 0);
  }, []);
  React.useEffect(() => {
    console.log(store);
    setAlertNum(store?.alertNum ? store.alertNum : 0);
  }, [store]);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    localStorage.removeItem('brainaly_user');
    navigate('/admin/signin', { replace: true });
  };
  return (
    <AppBar
      className={clsx(classes.topBar, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/teacher/home">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton aria-label="cart" onClick={() => { navigate('/admin/contact', { replace: true }); }}>
            <StyledBadge badgeContent={alertNum} color="secondary">
              <NotificationsIcon />
            </StyledBadge>
          </IconButton>
          <IconButton
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
            <MenuItem key={uuid} onClick={logOut}>
              <ExitToAppIcon className={classes.menuIcon} />
              {' '}
              Logout
            </MenuItem>
          </Menu>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
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
            <MenuItem key={uuid} onClick={logOut}>
              <ExitToAppIcon className={classes.menuIcon} />
              {' '}
              Logout
            </MenuItem>
          </Menu>
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
