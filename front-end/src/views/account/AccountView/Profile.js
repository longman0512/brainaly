/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import ProfileContext from 'src/context/profile';
import { imageUpload } from 'src/utils/Api';
import global from 'src/utils/global';

const user = {
  avatar: `${global.serverUrl}upload/1616034412821-avatar.jpg`,
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  },
  fileModal: {
    display: 'none'
  },
  userName: {
    marginTop: 20,
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const { profile, setProfile } = React.useContext(ProfileContext);
  useEffect(() => {
    const currentUser = localStorage.getItem('brainaly_user');
    const userObject = JSON.parse(currentUser);
    setProfile(userObject);
    console.log(profile);
  }, [localStorage]);

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      e.preventDefault();
      const reader = URL.createObjectURL(e.target.files[0]);
      await imageUpload(e.target.files[0]).then((res) => {
        const localStore = profile;
        const newStore = {
          userAvatar: res.data.filename,
          userEmail: localStore.userEmail,
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
        localStorage.setItem('brainaly_user', JSON.stringify(newStore));
      });
    }
  };
  const clickFileUpload = () => {
    document.getElementById('image_select').click();
  };
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={profile.userAvatar ? `${global.serverUrl}upload/${profile.userAvatar}` : null}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
            className={classes.userName}
          >
            {profile.userName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {profile.userPhone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <input type="file" id="image_select" onChange={(event) => { handleImageChange(event); }} className={classes.fileModal} />
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={clickFileUpload}
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
