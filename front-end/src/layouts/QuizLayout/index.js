import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Outlet } from 'react-router-dom';
import StoreContext from 'src/context/index';
import TopBar from './TopBar';
import NavBar from './NavBar';
import BottomBar from './BottomBar';
import RightNavBar from './RightNavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    paddingLeft: 10,
    paddingRight: '200px',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 210,
      marginBottom: 200
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    [theme.breakpoints.up('md')]: {
      marginBottom: 200
    },
  }
}));

export default function QuizLayout() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { store } = React.useContext(StoreContext);
  const classes = useStyles();
  const { items } = store;
  return (
    <div style={{ height: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        items={typeof items === 'undefined' ? [] : items}
      />
      <RightNavBar items={typeof items === 'undefined' ? [] : items} />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
      <BottomBar
        openMobile={!isMobileNavOpen}
        items={typeof items === 'undefined' ? [] : items}
      />
    </div>
  );
}
