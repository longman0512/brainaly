/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
  Card,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  MenuItem
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Page from 'src/components/Page';
import {
  resetPassword, resendVerifyCode, emailVerifyFP
} from 'src/utils/Api';
import StoreContext from 'src/context/index';
import cogoToast from 'cogo-toast';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100vh',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    width: '100%'
  }
}));

const ForgotPwdView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { store, setStore } = React.useContext(StoreContext);
  const [showPassword, setShowPassword] = React.useState(false);
  const [accountType, setAcctType] = React.useState('teacher');
  const [isLoading, setIsLoading] = React.useState(false);
  const [received, setReceived] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
  const handChangeAccType = (value) => {
    console.log(value.target.value);
    setAcctType(value.target.value);
  };
  const handleClickShowPassword = () => {
    console.log('asdasdasdsd');
  };
  const handleMouseDownPassword = () => {
    console.log('asdasdasd');
  };

  return (
    <Page
      className={classes.root}
      title="Sign Up"
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
                email: '',
                code: '0000',
                password: '0000',
              }}
              validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              })
            }
              onSubmit={async (values) => {
                console.log(values);
                setIsLoading(true);
                if (verified) {
                  resetPassword(values).then((res) => {
                    if (res.flag) {
                      cogoToast.success(res.msg, { position: 'top-right' });
                    } else {
                      cogoToast.warn(res.msg, { position: 'top-right' });
                    }
                    setIsLoading(false);
                  }).catch((err) => {
                    cogoToast.error('Something Error', { position: 'top-right' });
                    setIsLoading(false);
                  });
                } else if (received) {
                  emailVerifyFP(values).then((res) => {
                    if (res.flag) {
                      values.password = '';
                      cogoToast.success(res.msg, { position: 'top-right' });
                      setVerified(true);
                    } else {
                      cogoToast.warn(res.msg, { position: 'top-right' });
                    }
                    setIsLoading(false);
                  }).catch((err) => {
                    cogoToast.error('Something Error', { position: 'top-right' });
                    setIsLoading(false);
                  });
                } else {
                  resendVerifyCode(values).then((res) => {
                    if (res.flag) {
                      values.code = '';
                      cogoToast.success(res.msg, { position: 'top-right' });
                      setReceived(true);
                    } else {
                      cogoToast.warn(res.msg, { position: 'top-right' });
                    }
                    setIsLoading(false);
                  }).catch((err) => {
                    cogoToast.error('Something Error', { position: 'top-right' });
                    setIsLoading(false);
                  });
                }
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
                      Reset Password
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Please insert your Email Address
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    disabled={received}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  {
                    received ? (
                      <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        disabled={verified}
                        helperText={touched.password && errors.password}
                        label="Verify code"
                        margin="normal"
                        name="code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        value={values.code}
                        variant="outlined"
                      />
                    ) : null
                }
                  {
                    verified ? (
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="Password"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type={showPassword ? 'text' : 'password'}
                      value={values.password}
                      variant="outlined"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility" onClick={() => { setShowPassword(true); }} onMouseDown={() => setShowPassword(false)}>
                                              {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                      </InputAdornment>,
                      }}
                    />
                    ) : null
                  }
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      {
                        verified ? 'Reset Password' : received ? 'Send Code' : 'Get Code'
                      }
                      {isLoading && <CircularProgress color="nice" size={20} className="progress" />}
                    </Button>
                  </Box>
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Have an account?
                    {' '}
                    <Link
                      component={RouterLink}
                      to="/signin"
                      variant="h6"
                    >
                      Sign in
                    </Link>
                    {' '}
                    or
                    {' '}
                    <Link
                      component={RouterLink}
                      to="#"
                      onClick={() => {
                        console.log('reset');
                        setReceived(false);
                        setVerified(false);
                        values.email = '';
                        values.code = '';
                      }}
                      variant="h6"
                    >
                      Reset
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

export default ForgotPwdView;
