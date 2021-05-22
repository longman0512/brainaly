import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Fade,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ProfileContext from 'src/context/profile';
import { updateProfile } from 'src/utils/Api';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  root: {},
  tooltip: {
    color: 'white',
    fontSize: theme.typography.pxToRem(15)
  }
}));

const ProfileDetails = ({ className, ...rest }) => {
  const classes = useStyles();
  const { profile, setProfile } = React.useContext(ProfileContext);
  const localStore = profile;
  useEffect(() => {
    const currentUser = localStorage.getItem('brainaly_user');
    const userObject = JSON.parse(currentUser);
    setProfile(userObject);
  }, [localStorage]);

  const handleChangeName = (event) => {
    const newStore = {
      userAvatar: localStore.userAvatar,
      userEmail: localStore.userEmail,
      userId: localStore.userId,
      userName: event.target.value,
      userPhone: localStore.userPhone,
      userSchool: localStore.userSchool,
      userType: localStore.userType,
      user_birth: localStore.user_birth,
      userMembership: localStore.userMembership,
      userMemberdate: localStore.userMemberdate,
      userBadge: localStore.userBadge
    };
    setProfile(newStore);
  };

  const handleChangeEmail = (event) => {
    const newStore = {
      userAvatar: localStore.userAvatar,
      userEmail: event.target.value,
      userId: localStore.userId,
      userName: localStore.userName,
      userPhone: localStore.userPhone,
      userSchool: localStore.userSchool,
      userType: localStore.userType,
      user_birth: localStore.user_birth,
      userMembership: localStore.userMembership,
      userMemberdate: localStore.userMemberdate,
      userBadge: localStore.userBadge
    };
    setProfile(newStore);
  };
  const handleChangePhone = (event) => {
    const newStore = {
      userAvatar: localStore.userAvatar,
      userEmail: localStore.userEmail,
      userId: localStore.userId,
      userName: localStore.userName,
      userPhone: event.target.value,
      userSchool: localStore.userSchool,
      userType: localStore.userType,
      user_birth: localStore.user_birth,
      userMembership: localStore.userMembership,
      userMemberdate: localStore.userMemberdate,
      userBadge: localStore.userBadge
    };
    setProfile(newStore);
  };
  const handleChangeSchool = (event) => {
    const newStore = {
      userAvatar: localStore.userAvatar,
      userEmail: localStore.userEmail,
      userId: localStore.userId,
      userName: localStore.userName,
      userPhone: localStore.userPhone,
      userSchool: event.target.value,
      userType: localStore.userType,
      user_birth: localStore.user_birth,
      userMembership: localStore.userMembership,
      userMemberdate: localStore.userMemberdate,
      userBadge: localStore.userBadge
    };
    setProfile(newStore);
  };
  const handleDateChange = (date) => {
    const newStore = {
      userAvatar: localStore.userAvatar,
      userEmail: localStore.userEmail,
      userId: localStore.userId,
      userName: localStore.userName,
      userPhone: localStore.userPhone,
      userSchool: localStore.userSchool,
      userType: localStore.userType,
      user_birth: date,
      userMembership: localStore.userMembership,
      userMemberdate: localStore.userMemberdate,
      userBadge: localStore.userBadge
    };
    setProfile(newStore);
  };
  const saveDetail = async () => {
    console.log(profile);
    await updateProfile(profile).then(() => {
      localStorage.setItem('brainaly_user', JSON.stringify(profile));
      setTimeout(() => {
        window.location = `/${profile.userType}/account`;
      }, 1000);
    });
  };
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title={<div className="profile-title">Profile</div>}
          avatar={(
            <Tooltip TransitionComponent={Fade} title={`User Badge: ${profile.userBadge}`} classeName={classes.tooltip} arrow>
              <img src={`../static/${profile.userBadge}.png`} alt="badge" className="badge" />
            </Tooltip>
)}
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Full name"
                name="fullName"
                onChange={handleChangeName}
                required
                value={profile.userName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChangeEmail}
                required
                value={profile.userEmail}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChangePhone}
                type="number"
                value={profile.userPhone}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="School name"
                name="country"
                onChange={handleChangeSchool}
                value={profile.userSchool === null ? '' : profile.userSchool}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  format="MM/dd/yyyy"
                  label="Birthday"
                  value={profile.user_birth === null ? new Date('1970-01-11T00:00:00') : profile.user_birth}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  inputVariant="outlined"
                />
              </MuiPickersUtilsProvider>
            </Grid>
            {
              profile.userMembership !== 'free' ? (
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <img src={`../static/${profile.userMembership}-membership.png`} alt="standard" className="membershipMark" />
                </Grid>
              ) : null
            }

          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={saveDetail}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
