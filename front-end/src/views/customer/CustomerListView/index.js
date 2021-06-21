import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { getUserData, toggleUserStateApi } from 'src/utils/Api';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [schQuery, setSchQuery] = useState('');
  React.useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('brainaly_user'));
    if (!userInfo || userInfo.userType !== 'admin') {
      window.location = '/admin/signin';
    } else {
      getUserData().then((res) => {
        console.log(res, setUsers, 'userResult');
        setUsers([...res.result]);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, []);

  const toggleUserState = (value, id) => {
    console.log(value, id);
    toggleUserStateApi({ state: value, userId: id }).then((res) => {
      console.log(res.result);
      setUsers([...res.result]);
    }).catch((err) => {
      console.log(err);
    });
  };
  const updateUserData = () => {
    getUserData().then((res) => {
      console.log(res, setUsers, 'userResult');
      setUsers([...res.result]);
    }).catch((err) => {
      console.log(err);
    });
  };
  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar
          setSearchQuery={setSchQuery}
        />
        <Box mt={3}>
          <Results
            updateD={updateUserData}
            customers={users}
            updateStatus={toggleUserState}
            query={schQuery}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
