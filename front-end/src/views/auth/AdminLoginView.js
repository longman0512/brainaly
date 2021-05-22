import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  CircularProgress,
  makeStyles,
  Card
} from '@material-ui/core';
import cogoToast from 'cogo-toast';
import { adminSignIn } from 'src/utils/Api';
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

const AdminLoginView = () => {
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
                email: 'limonovdev@mail.ru',
                password: 'asdwds3210'
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('Password is required')
              })}
              onSubmit={async (values) => {
                setIsLoading(true);
                adminSignIn({
                  userEmail: values.email,
                  userPwd: values.password
                }).then((res) => {
                  if (typeof res === 'undefined') {
                    cogoToast.error('SignIn Failed', { position: 'top-right' });
                  }
                  if (res.flag) {
                    setStore({
                      ...store,
                      userInfo: {
                        userEmail: res.data.u_email,
                        userName: res.data.u_name,
                        userAvatar: res.data.u_avatar
                      }
                    });
                    setTimeout(() => {
                      console.log(res);
                      const userData = {
                        userId: res.data.u_id,
                        userEmail: res.data.u_email,
                        userName: res.data.u_name,
                        userAvatar: res.data.u_avatar,
                        user_birth: res.data.u_birthday,
                        userType: res.data.u_type,
                        userSchool: res.data.u_school,
                        userPhone: res.data.u_phonenumber,
                        userMembership: res.data.u_membership_type,
                        userMemberdate: res.data.u_expire_date,
                        userBadge: userBadgeCal(res.data.u_score)
                      };
                      setIsLoading(false);
                      localStorage.setItem('brainaly_user', JSON.stringify(userData));
                      navigate('/admin/main', { replace: true });
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
                      Admin Panel
                    </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    />
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
                    type="password"
                    value={values.password}
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
                      Sign in now
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

export default AdminLoginView;
