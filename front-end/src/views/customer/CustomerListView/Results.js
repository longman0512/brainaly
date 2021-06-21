/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
  Avatar,
  Box,
  Card,
  Table,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableSortLabel,
  Dialog,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { removeUserApi } from 'src/utils/Api';
import global from 'src/utils/global';
import cogoToast from 'cogo-toast';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
}));

const headCells = [
  {
    id: 'u_name', numeric: false, disablePadding: false, label: 'Name', sotable: true
  },
  {
    id: 'u_email', numeric: false, disablePadding: false, label: 'Email', sotable: true
  },
  {
    id: 'u_type', numeric: false, disablePadding: false, label: 'Type', sotable: true
  },
  {
    id: 'u_school', numeric: false, disablePadding: false, label: 'School', sotable: true
  },
  {
    id: 'u_status', numeric: false, disablePadding: false, label: 'Status', sotable: true
  },
  {
    id: 'u_created_at', numeric: false, disablePadding: false, label: 'Registration date', sotable: true
  },
  {
    id: 'action', numeric: false, disablePadding: false, label: 'Action', sotable: false
  },
];

function EnhancedTableHead(props) {
  const {
    classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {
              headCell.sotable ? (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              ) : headCell.label
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const Results = ({
  className, customers, updateStatus, updateD, query, ...rest
}) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [delModal, setDelModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [delUser, setDelUser] = useState({});
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('u_name');
  const [selected, setSelected] = React.useState([]);
  const [users, setUsers] = React.useState(customers);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const ToggleStatus = (event, id) => {
    console.log('toggle status +++++++++');
    console.log(event.target.value);
    updateStatus(event.target.value, id);
  };
  const removeUser = (user) => {
    setDelUser(user);
    console.log(user);
    setDelModal(true);
  };
  const removeUserToggleApi = () => {
    setIsLoading(true);
    console.log(delUser);
    removeUserApi(delUser).then((res) => {
      console.log(res.state);
      if (res.state) {
        setIsLoading(false);
        setDelModal(false);
        cogoToast.success('User is removed!', { position: 'top-right' });
        updateD();
      } else {
        setIsLoading(false);
        setDelModal(false);
        cogoToast.success('Something error, please try again.', { position: 'top-right' });
      }
    }).catch(() => {
      cogoToast.warn('Network issue, Please try again later', { position: 'top-right' });
    });
    setTimeout(() => {
      setIsLoading(false);
      setDelModal(false);
    });
  };

  const handleRequestSort = (event, property) => {
    console.log(property);
    const isAsc = orderBy === property && order === 'asc';
    console.log(isAsc);
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    const tempUsers = users;
    tempUsers.sort((a, b) => {
      const x = a[orderBy] ? a[orderBy].toLowerCase() : '';
      const y = b[orderBy] ? b[orderBy].toLowerCase() : '';
      if (order === 'asc') {
        if (x > y) { return -1; }
        if (x < y) { return 1; }
      } else {
        if (x < y) { return -1; }
        if (x > y) { return 1; }
      }
      return 0;
    });
    setUsers(tempUsers);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  React.useEffect(() => {
    setUsers(customers);
  }, [customers]);
  React.useEffect(() => {
    console.log(query, 'in result view');
    const temp = [];
    customers.map((c, index) => {
      if (query) {
        if (c.u_name.indexOf(query) >= 0) {
          temp.push(c);
        }
      } else {
        temp.push(c);
      }
    });
    setUsers(temp);
  }, [query]);
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Dialog
        open={delModal}
        onClose={() => { setDelModal(false); }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        key="hostModal"
      >
        <DialogTitle id="alert-dialog-title">Really?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure remove user
            {' '}
            <span>{ delUser.u_name }</span>
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={removeUserToggleApi} color="primary" variant="contained">
            Remove
            { isLoading && <CircularProgress color="nice" size={20} className="progress" />}
          </Button>
        </DialogActions>
      </Dialog>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {users.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.u_id}
                  selected={selectedCustomerIds.indexOf(customer.u_id) !== -1}
                >
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        src={`${global.serverUrl}upload/${customer.u_avatar}`}
                      >
                        {getInitials(customer.u_name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.u_name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.u_email}
                  </TableCell>
                  <TableCell>
                    {customer.u_type}
                  </TableCell>
                  <TableCell>
                    {customer.u_school}
                  </TableCell>
                  <TableCell>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={customer.u_status}
                      onChange={(event) => ToggleStatus(event, customer.u_id)}
                    >
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    {moment(customer.u_created_at).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" onClick={() => { removeUser(customer); }}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={users.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired,
  updateStatus: PropTypes.func,
  updateD: PropTypes.func,
  query: PropTypes.string
};

export default Results;
