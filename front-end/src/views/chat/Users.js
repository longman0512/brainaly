/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import { NavLink as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Card,
  Typography,
  makeStyles,
  Button,
  Badge
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import global from 'src/utils/global';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 15
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  item: {
    marginBottom: 20
  },
  userItem: {
    display: 'flex',
    justifyContent: 'left',
    width: '100%'
  },
  selectedItem: {
    display: 'flex',
    justifyContent: 'left',
    width: '100%',
    backgroundColor: 'rgb(199, 237, 252)'
  },
  new_msg_badge: {
    position: 'absolute',
    right: 12,
    bottom: 28
  }
}));

const Users = ({
  read, className, selectedUser, toUser, customers, ...rest
}) => {
  const classes = useStyles();
  const [stCustomers, setStCustomer] = React.useState([]);
  React.useEffect(() => {
    console.log(customers, 'customerdata is changed');
    setStCustomer(customers);
  }, [customers]);
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      {
        stCustomers.map((customer) => {
          return (
            <Button
              activeClassName={classes.active}
              className={selectedUser == customer.u_id ? classes.selectedItem : classes.userItem}
              key={Math.random() * 100}
              onClick={() => { read(); toUser(customer); }}
            >
              <Avatar
                className={classes.avatar}
                src={customer.u_avatar ? `${global.serverUrl}upload/${customer.u_avatar}` : null}
                alt="N"
              >
                {getInitials(customer.u_name)}
              </Avatar>
              <div className={customer.status ? 'user-online' : 'user-offline'} />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {customer.u_name}
              </Typography>
              {
                customer.newMsgNum ? <Badge color="secondary" badgeContent={customer.newMsgNum} className={classes.new_msg_badge} /> : null
              }
            </Button>
          );
        })
      }
    </Card>
  );
};

Users.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
  selectedUser: PropTypes.number,
  toUser: PropTypes.func,
  read: PropTypes.func
};

export default Users;
