import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { getContactData, getNewContactData } from 'src/utils/Api';
import StoreContext from 'src/context/index';
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

const ContactListView = () => {
  const classes = useStyles();
  const [contactData, setContactData] = useState([]);
  const { store, setStore } = React.useContext(StoreContext);
  React.useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('brainaly_user'));
    if (!userInfo || userInfo.userType !== 'admin') {
      window.location = '/admin/signin';
    } else {
      getContactData().then((res) => {
        console.log(res, 'userResult');
        setContactData([...res.result]);
      }).catch((err) => {
        console.log(err);
      });
      getNewContactData().then((res) => {
        console.log(res, 'userResult');
        setStore({
          ...store,
          alertNum: res.result.length
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  }, []);

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results contacts={contactData} />
        </Box>
      </Container>
    </Page>
  );
};

export default ContactListView;
