import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestOrders = ({ className, latestUsers, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Newest Users" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  User id
                </TableCell>
                <TableCell>
                  User Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  User Type
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {latestUsers.map((user) => (
                <TableRow
                  hover
                  key={user.u_id}
                >
                  <TableCell>
                    {user.u_id}
                  </TableCell>
                  <TableCell>
                    {user.u_name}
                  </TableCell>
                  <TableCell>
                    {user.u_email}
                  </TableCell>
                  <TableCell>
                    {user.u_type}
                  </TableCell>
                  <TableCell>
                    {moment(user.u_created_at ? user.u_created_at : null).format('dddd, MMMM Do YYYY, h:m:ss a')}
                  </TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={user.u_status}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          component={RouterLink}
          to="/admin/users"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string,
  latestUsers: PropTypes.array
};

export default LatestOrders;
