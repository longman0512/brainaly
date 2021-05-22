import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  ShoppingBag as ShoppingBagIcon,
  Users as UsersIcon
} from 'react-feather';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ChatIcon from '@material-ui/icons/Chat';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import global from 'src/utils/global';
import NavItem from './NavItem';

const items = [
  {
    href: '/teacher/home',
    icon: ShoppingBagIcon,
    title: 'Questions'
  },
  {
    href: '/teacher/collections',
    icon: LibraryBooksIcon,
    title: 'Collections'
  },
  {
    href: '/teacher/classe',
    icon: UsersIcon,
    title: 'Classes'
  },
  {
    href: '/app/chat?id=',
    icon: ChatIcon,
    title: 'Chat Room'
  },
  {
    href: '/teacher/contact',
    icon: ContactMailIcon,
    title: 'Contact Us'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
    marginBottom: 50
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [profile, setProfile] = React.useState({});
  useEffect(() => {
    const currentUser = localStorage.getItem('brainaly_user');
    const userObject = JSON.parse(currentUser);
    setProfile(userObject);
    console.log(profile);
  }, []);
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={`${global.serverUrl}upload/${profile.userAvatar}`}
          to="/app/account"
        />
        <div className="badge-container">
          <div>
            <Typography
              className={classes.name}
              color="textPrimary"
              variant="h5"
            >
              {profile.userName}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {profile.userSchool}
            </Typography>
          </div>
        </div>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        anchor="left"
        classes={{ paper: classes.mobileDrawer }}
        onClose={onMobileClose}
        open={openMobile}
        variant="temporary"
      >
        {content}
      </Drawer>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
