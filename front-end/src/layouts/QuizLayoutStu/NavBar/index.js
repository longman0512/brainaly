/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import StoreContext from 'src/context/index';
import global from 'src/utils/global';
import NavItem from './NavItem';

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 200,
  },
  desktopDrawer: {
    width: 200,
    top: 64,
    height: 'calc(100% - 130px)',
    marginBottom: 50
  },
  avatar: {
    cursor: 'pointer',
    width: 70,
    height: 70
  },
  addButton: {
    position: 'fixed',
    bottom: 10,
    width: 160,
    marginLeft: 10,
    marginRight: 10
  },
  listElement: {
    borderRadius: 5,
    margin: 2,
    padding: 3,
    '&:hover': {
      backgroundColor: 'rgba(235, 150, 5, 0.9)'
    }
  },
  selected: {
    borderRadius: 5,
    margin: 2,
    padding: 3,
    backgroundColor: 'orange',
    '&:hover': {
      backgroundColor: 'rgba(235, 150, 5, 0.9)'
    }
  }
}));

const NavBar = ({ onMobileClose, openMobile, items }) => {
  const classes = useStyles();
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [profile, setProfile] = React.useState({});
  const { store, setStore } = React.useContext(StoreContext);
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
  }, [location.pathname]);
  useEffect(() => {
    setSelectedIndex(typeof store?.selectedNav === 'undefined' ? 0 : store?.selectedNav[0]?.id);
  }, [store]);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    const preStore = store;
    setStore({
      items: preStore.items,
      selectedNav: [{ id: index }],
      selectedItem: items[index]
    });
  };
  async function addNewQuiz() {
    const preStore = store;
    const preItems = preStore.items;
    const item = {
      href: '',
      title: '',
      quizType: 1,
      quizAnswer: [
        {
          sel: 0,
          answer: ''
        },
        {
          sel: 0,
          answer: ''
        },
        {
          sel: 0,
          answer: ''
        },
        {
          sel: 0,
          answer: ''
        },
      ],
      quizTime: 20,
      point: 2,
      image: ''
    };
    preItems.push(item);
    setStore({
      items: preItems,
      selectedNav: [{ id: preItems.length - 1 }],
      selectedItem: preItems
    });
    setSelectedIndex(preItems.length - 1);
  }
  const content = (
    <Box
      height="90%"
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
          {items?.map((item, index) => (
            <NavItem
              href={item.href}
              key={index}
              title={item.title}
              type={item.quizType}
              answer={item.quizAnswer}
              image={item.image}
              nomer={index + 1}
              className={selectedIndex === index ? classes.selected : classes.listElement}
              // selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            />
          ))}
        </List>
      </Box>
      <Button color="primary" variant="contained" onClick={addNewQuiz} className={classes.addButton}>Add Questin</Button>
    </Box>
  );

  return (
    <>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  items: PropTypes.array
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
