import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Link,
  Typography,
  CircularProgress,
  makeStyles,
  Card
} from '@material-ui/core';
import cogoToast from 'cogo-toast';
import { emailVerify, resendVerifyCode } from 'src/utils/Api';
import Page from 'src/components/Page';
import StoreContext from 'src/context/index';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100vh',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const VerifyForm = () => {
  const { store, setStore } = React.useContext(StoreContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const userBadgeCal = (score) => {
    if (score < 30) {
      return 'bronze';
    } if (score < 60) {
      return 'silver';
    }
    return 'gold';
  };
  const resend = () => {
    console.log('resend');
    resendVerifyCode({
      userEmail: document.getElementById('email').value
    }).then((res) => {
      cogoToast.success(res.msg, { position: 'top-right' });
    });
  };
  return (
    <Page
      className={classes.root}
      title="Sign In"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Card maxWidth="sm" style={{ padding: 30 }}>
            <Formik
              initialValues={{
                email: store.verifyEmail,
                verifyCode: ''
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                verifyCode: Yup.string().max(255).required('VerifyCode is required')
              })}
              onSubmit={async (values) => {
                setIsLoading(true);
                emailVerify({
                  userEmail: values.email,
                  code: values.verifyCode
                }).then((res) => {
                  if (typeof res === 'undefined') {
                    cogoToast.error('Failed, Please try again', { position: 'top-right' });
                  }
                  if (res.flag) {
                    console.log(res);
                    cogoToast.success('Success', { position: 'top-right' });
                    setStore({
                      ...store,
                      userInfo: {
                        userEmail: res.result[0].u_email,
                        userName: res.result[0].u_name,
                        userAvatar: res.result[0].u_avatar
                      }
                    });
                    setTimeout(() => {
                      console.log(res);
                      const userData = {
                        userId: res.result[0].u_id,
                        userEmail: res.result[0].u_email,
                        userName: res.result[0].u_name,
                        userAvatar: res.result[0].u_avatar,
                        user_birth: res.result[0].u_birthday,
                        userType: res.result[0].u_type,
                        userSchool: res.result[0].u_school,
                        userPhone: res.result[0].u_phonenumber,
                        userMembership: res.result[0].u_membership_type,
                        userMemberdate: res.result[0].u_expire_date,
                        userBadge: userBadgeCal(res.result[0].u_score)
                      };
                      setIsLoading(false);
                      localStorage.setItem('brainaly_user', JSON.stringify(userData));
                      if (res.result[0].u_type === 'teacher') {
                        navigate('/teacher/home', { replace: true });
                      } else if (res.result[0].u_type === 'student') {
                        navigate('/student/home', { replace: true });
                      } else {
                        // navigate('/', { replace: true });
                      }
                    }, 1500);
                  } else {
                    setIsLoading(false);
                    cogoToast.warn(res.msg, { position: 'top-right' });
                  }
                }).catch(() => {
                  setIsLoading(false);
                });
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography
                      color="textPrimary"
                      variant="h2"
                    >
                      Verify your Email
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    />
                  </Box>
                  <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      We have sent the verify code into your email, Please insert it
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                    id="email"
                  />
                  <TextField
                    error={Boolean(touched.verifyCode && errors.verifyCode)}
                    fullWidth
                    helperText={touched.verifyCode && errors.verifyCode}
                    label="Verify Code"
                    margin="normal"
                    name="verifyCode"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.verifyCode}
                    variant="outlined"
                  />
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Verify
                      {isLoading && <CircularProgress color="nice" size={20} className="progress" />}
                    </Button>
                  </Box>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Don&apos;t receive the code?
                    {' '}
                    <span
                      variant="h6"
                      className="resendBtn"
                      onClick={resend}
                    >
                      Resend
                    </span>
                    {' '}
                    Or
                    {' '}
                    <Link
                      component={RouterLink}
                      to="/signup"
                      variant="h6"
                    >
                      Back
                    </Link>
                  </Typography>
                </form>
              )}
            </Formik>
          </Card>
        </Container>
      </Box>
    </Page>
  );
};

export default VerifyForm;
