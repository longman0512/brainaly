import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { getTransactionData } from 'src/utils/Api';
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

const TransactionListView = () => {
  const classes = useStyles();
  const [transactionData, setTransactions] = useState([]);
  React.useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('brainaly_user'));
    if (!userInfo || userInfo.userType !== 'admin') {
      window.location = '/admin/signin';
    } else {
      getTransactionData().then((res) => {
        console.log(res, 'userResult');
        setTransactions([...res.result]);
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
          <Results transactions={transactionData} />
        </Box>
      </Container>
    </Page>
  );
};

export default TransactionListView;
