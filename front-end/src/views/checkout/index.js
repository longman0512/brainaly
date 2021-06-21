import React from 'react';
import {
  Box,
  Container,
  makeStyles,
  Grid,
  Card,
} from '@material-ui/core';
import clsx from 'clsx';
import { Flip } from 'react-awesome-reveal';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  rootChat: {
    padding: 15,
    marginTop: 9,
    marginBottom: 70,
    height: 600,
    overflowY: 'scroll'
  },
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  welcome: {
    backgroundColor: 'white',
    minHeight: '100%',
    padding: theme.spacing(3),
    height: 600,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  msgInputContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: -50
  },
  membershipBtn: {
    marginTop: 20
  }
}));

const Checkout = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
          alignContent="space-around"
          direction="row"
          justify="center"
        >
          <Grid
            item
            xl={7}
            lg={7}
            md={12}
            xs={12}
          >
            <Flip left cascade>
              <Box mt={3}>
                <Card className={clsx(classes.welcome)}>
                  <h1>Free</h1>
                  <p className="membership-description">
                    $
                    <span>0</span>
                    .00
                  </p>
                  <p className="membership-description">for 7 days</p>
                </Card>
              </Box>
            </Flip>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Checkout;
