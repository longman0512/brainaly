/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
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
import { requestContact } from 'src/utils/Api';
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

const Contact = () => {
  const classes = useStyles();
  const navigate = useNavigate();
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
        <Container maxWidth="md">
          <Card maxWidth="md" style={{ padding: 30 }}>
            <Formik
              initialValues={{
                email: '',
                firstName: '',
                title: '',
                message: '',
                policy: false
              }}
              validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                title: Yup.string().max(255).required('Name is required'),
                message: Yup.string().max(255).required('Message is required')
              })
            }
              onSubmit={async (values) => {
                console.log(values);
                setIsLoading(true);
                requestContact({
                  contactEmail: values.email,
                  contactTitle: values.title,
                  contactMessage: values.message,
                  userType: accountType
                }).then((res) => {
                  if (typeof res === 'undefined') cogoToast.error('SignUp Failed', { position: 'top-right' });
                  if (res.flag) {
                    cogoToast.success(res.msg, { position: 'bottom-right' });
                    setTimeout(() => {
                      setIsLoading(false);
                    }, 1500);
                  } else {
                    setIsLoading(false);
                    cogoToast.warn('Sorry, There was a issue, Please contact Admin', { position: 'bottom-right' });
                  }
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
                      Contact Us
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Got a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.title && errors.title)}
                    fullWidth
                    helperText={touched.title && errors.title}
                    label="Title"
                    margin="normal"
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
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
                    error={Boolean(touched.message && errors.message)}
                    fullWidth
                    multiline
                    helperText={touched.message && errors.message}
                    label="Message"
                    margin="normal"
                    name="message"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.message}
                    variant="outlined"
                    rows={12}
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
                      Submit
                      {isLoading && <CircularProgress color="nice" size={20} className="progress" />}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Card>
        </Container>
      </Box>
    </Page>
  );
};

export default Contact;
