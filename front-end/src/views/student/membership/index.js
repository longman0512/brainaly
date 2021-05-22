/* eslint-disable no-useless-return */
/* eslint-disable no-alert */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  makeStyles,
  Grid,
  Button,
  Card,
  Dialog,
  DialogContentText,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import clsx from 'clsx';
import { Flip, Bounce } from 'react-awesome-reveal';
import { Elements } from '@stripe/react-stripe-js';
import cogoToast from 'cogo-toast';
import { loadStripe } from '@stripe/stripe-js';
import global from 'src/utils/global';
import authChecker from 'src/utils/authHelper';
import Page from 'src/components/Page';
import { membershipUpgradeApi } from 'src/utils/Api';
import CheckoutForm from './CheckoutForm';

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

const MembershipStu = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [membershipType, setMembershipType] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [profile, setProfile] = React.useState(JSON.parse(localStorage.getItem('brainaly_user')));
  const stripePromise = loadStripe(global.stripePKey);

  const handleClose = () => {
    setDialogOpen(false);
  };

  React.useEffect(() => {
    if (!authChecker('authCheck')) {
      navigate('/', { replace: true });
      return;
    }
  }, []);

  const userBadgeCal = (score) => {
    if (score < 30) {
      return 'bronze';
    } if (score < 60) {
      return 'silver';
    }
    return 'gold';
  };

  const handleOpen = (type) => {
    setMembershipType(type);
    console.log(membershipType);
    setDialogOpen(true);
  };

  const payNow = (info) => {
    console.log(info);
    setLoading(true);
    const payInfo = {
      token: info.token,
      ...profile,
      payType: membershipType,
    };

    console.log(payInfo);
    membershipUpgradeApi(payInfo).then((res) => {
      console.log(res);
      const userData = {
        userId: res.userInfo.u_id,
        userEmail: res.userInfo.u_email,
        userName: res.userInfo.u_name,
        userAvatar: res.userInfo.u_avatar,
        user_birth: res.userInfo.u_birthday,
        userType: res.userInfo.u_type,
        userSchool: res.userInfo.u_school,
        userPhone: res.userInfo.u_phonenumber,
        userMembership: res.userInfo.u_membership_type,
        userMemberdate: res.userInfo.u_expire_date,
        userBadge: userBadgeCal(res.userInfo.u_score)
      };
      // console.log(setProfile(userData));
      setTimeout(() => {
        setProfile(userData);
        setLoading(false);
      }, 100);
      localStorage.setItem('brainaly_user', JSON.stringify(userData));
      // setProfile(userData);
      console.log(profile);
      cogoToast.success('Your membership is upgraded', { position: 'bottom-right' });
      handleClose();
    }).catch(() => {
      setTimeout(() => {
        setLoading(false);
      }, 100);
      cogoToast.warn('There was a error, Please try again or contact admin', { position: 'bottom-right' });
      handleClose();
    });
  };

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Membership Upgrade</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please insert your payment info. it is not save in the back-end.
          </DialogContentText>
          <Elements stripe={stripePromise}>
            <CheckoutForm payinfo={payNow} isLoading={loading} />
          </Elements>
        </DialogContent>
      </Dialog>
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
            xl={3}
            lg={3}
            md={3}
            xs={3}
          >
            <Flip left cascade duration={700}>
              <Box mt={3}>
                <Card className={clsx(classes.welcome)}>
                  {
                    profile?.userMembership === 'free' ? <div className="ribbon ribbon-top-right"><span>Current</span></div> : null
                  }
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
          <Grid
            item
            xl={3}
            lg={3}
            md={3}
            xs={3}
          >
            <Flip left cascade delay={400} duration={700}>
              <Box mt={3}>
                <Card className={clsx(classes.welcome)}>
                  {
                    profile?.userMembership === 'standard' ? <div className="ribbon ribbon-top-right"><span>Current</span></div> : null
                  }
                  <Bounce delay={1100}>
                    <img src="../static/standard-membership.png" alt="standard" className="membershipMark" />
                  </Bounce>
                  <h1 className="membership-title">Standard</h1>
                  <p className="membership-description">
                    $
                    <span>10</span>
                    .00
                  </p>
                  <p className="membership-description">per month</p>
                  {
                    profile?.userMembership === 'standard' ? <p className="membership-description">{profile.userMemberdate.substring(0, 10)}</p> : null
                  }
                  <Button variant="contained" color="primary" className={classes.membershipBtn} onClick={() => { handleOpen('standard'); }}>Upgrade</Button>
                  <div>
                    <p className="membership-item">20 Questions</p>
                    <p className="membership-item">5 Classes</p>
                    <p className="membership-item">10 Collections</p>
                  </div>
                </Card>
              </Box>
            </Flip>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            md={3}
            xs={3}
          >
            <Flip left cascade delay={800} duration={700}>
              <Box mt={3}>
                <Card className={clsx(classes.welcome)}>
                  {
                    profile?.userMembership === 'pro' ? <div className="ribbon ribbon-top-right"><span>Current</span></div> : null
                  }
                  <Bounce delay={1500}>
                    <img src="../static/pro-membership.png" alt="standard" className="membershipMark" />
                  </Bounce>
                  <h1 className="membership-title">Professional</h1>
                  <p className="membership-description">
                    $
                    <span>15</span>
                    .00
                  </p>
                  <p className="membership-description">per month</p>
                  {
                    profile?.userMembership === 'pro' ? <p className="membership-description">{profile.userMemberdate.substring(0, 10)}</p> : null
                  }
                  <Button variant="contained" color="primary" className={classes.membershipBtn} onClick={() => { handleOpen('pro'); }}>Upgrade</Button>
                  <div>
                    <p className="membership-item">40 Questions</p>
                    <p className="membership-item">20 Classes</p>
                    <p className="membership-item">10 Collections</p>
                  </div>
                </Card>
              </Box>
            </Flip>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default MembershipStu;
