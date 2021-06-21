/* eslint-disable prefer-template */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React from 'react';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Avatar
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import parse from 'src/utils/parse';
import humanFriendlyDate from 'src/utils/Timeformat';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },
  avatar: {
    marginLeft: theme.spacing(2),
    alignSelf: 'flex-end'
  },
  item: {
    marginBottom: 20
  },
  userItem: {
    display: 'flex',
    justifyContent: 'left',
  },
  selectedItem: {
    display: 'flex',
    justifyContent: 'left',
    width: '100%',
    backgroundColor: 'rgb(199, 237, 252)'
  }
}));

const MyMsg = ({ content }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('brainaly_user'));

  return (
    <div
      className={clsx(classes.root)}
      key={uuid()}
    >
      <div>
        <div className="my-content">{parse(content.m_content)}</div>
        <div className={humanFriendlyDate(content.m_created_at) == 'just now' ? 'new-msg' : null}>{humanFriendlyDate(content.m_created_at)}</div>
      </div>
      <Avatar
        className={classes.avatar}
        src={content.u_avatar ? `${global.serverUrl}upload/${content.u_avatar}` : null}
        alt="N"
      >
        {getInitials(user.userName)}
      </Avatar>
    </div>
  );
};

MyMsg.propTypes = {
  content: PropTypes.object
};

export default MyMsg;
