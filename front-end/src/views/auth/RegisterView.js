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
import { signUp } from 'src/utils/Api';
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

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { store, setStore } = React.useContext(StoreContext);
  const [showPassword, setShowPassword] = React.useState(false);
  const [accountType, setAcctType] = React.useState('teacher');
  const [isLoading, setIsLoading] = React.useState(false);
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
                firstName: '',
                userName: '',
                password: '',
                policy: false
              }}
              validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                userName: Yup.string().max(255).required('User name is required'),
                password: Yup.string().max(255).required('password is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
              onSubmit={async (values) => {
                console.log(values);
                setIsLoading(true);
                signUp({
                  userEmail: values.email,
                  userName: values.userName,
                  userPwd: values.password,
                  userType: accountType
                }).then((res) => {
                  if (typeof res === 'undefined') cogoToast.error('SignUp Failed', { position: 'top-right' });
                  if (res.flag) {
                    setStore({
                      ...store,
                      verifyEmail: values.email
                    });
                    cogoToast.success(res.msg, { position: 'bottom-right' });
                    setTimeout(() => {
                      setIsLoading(false);
                      navigate('/verifyemail', { replace: true });
                    }, 1500);
                  } else {
                    setIsLoading(false);
                    cogoToast.warn(res.msg, { position: 'bottom-right' });
                  }
                  console.log(res, 'in front - end');
                }).catch((res) => {
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
                      Create new account
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Use your email to create new account
                    </Typography>
                  </Box>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel>Select your Account Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={accountType}
                      onChange={handChangeAccType}
                      label="Select your Account Type"
                    >
                      <MenuItem value="teacher">Teacher</MenuItem>
                      <MenuItem value="student">Student</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    error={Boolean(touched.userName && errors.userName)}
                    fullWidth
                    helperText={touched.userName && errors.userName}
                    label="User name"
                    margin="normal"
                    name="userName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.userName}
                    variant="outlined"
                  />
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
                  />
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
                  <Box
                    alignItems="center"
                    display="flex"
                    ml={-1}
                  >
                    <Checkbox
                      checked={values.policy}
                      name="policy"
                      onChange={handleChange}
                    />
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      I have read the
                      {' '}
                      <Link
                        color="primary"
                        component={RouterLink}
                        to="#"
                        underline="always"
                        variant="h6"
                      >
                        Terms and Conditions
                      </Link>
                    </Typography>
                  </Box>
                  {Boolean(touched.policy && errors.policy) && (
                    <FormHelperText error>
                      {errors.policy}
                    </FormHelperText>
                  )}
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign up now
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
                    Or
                    {' '}
                    Have already SignUp?
                    {' '}
                    <Link
                      component={RouterLink}
                      to="/verifyemail"
                      variant="h6"
                    >
                      Verify
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

export default RegisterView;
