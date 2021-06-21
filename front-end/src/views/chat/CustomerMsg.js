/* eslint-disable prefer-template */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Avatar
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import global from 'src/utils/global';
import getInitials from 'src/utils/getInitials';
import parse from 'src/utils/parse';
import humanFriendlyDate from 'src/utils/Timeformat';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 15,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  avatar: {
    marginRight: theme.spacing(2),
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

const CustomerMsg = ({ content, selectUser }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root)}
      key={uuid()}
    >
      <Avatar
        className={classes.avatar}
        src={selectUser.u_avatar ? `${global.serverUrl}upload/${selectUser.u_avatar}` : null}
        alt="N"
      >
        {getInitials(selectUser.u_name)}
      </Avatar>
      <div>
        <div className="customer-content">{parse(content.m_content)}</div>
        <div className={humanFriendlyDate(content.m_created_at) == 'just now' ? 'new-msg' : null}>{humanFriendlyDate(content.m_created_at)}</div>
      </div>
    </div>
  );
};

CustomerMsg.propTypes = {
  content: PropTypes.object,
  selectUser: PropTypes.object,
};

export default CustomerMsg;
