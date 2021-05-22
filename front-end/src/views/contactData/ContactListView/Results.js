/* eslint-disable consistent-return */
import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import cogoToast from 'cogo-toast';
import {
  Box,
  Card,
  Checkbox,
  Table,
  Badge,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  Button,
  TableRow,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core';
import { sendContactAnswer, getNewContactData } from 'src/utils/Api';
import StoreContext from 'src/context/index';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className, contacts, ...rest
}) => {
  const classes = useStyles();
  const { store, setStore } = React.useContext(StoreContext);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [requestEmail, setRequestEmail] = useState('');
  const [requestTitle, setRequestTitle] = useState('');
  const [requestContent, setRequestContent] = useState('');
  const [requestId, setRequestId] = useState('');

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = contacts.map((contact) => contact.u_id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSendEmail = () => {
    console.log(answer, requestEmail, requestContent);
    if (!answer) {
      cogoToast.warn('Please insert response', { position: 'bottom-right' });
      return false;
    }
    sendContactAnswer({
      contactId: requestId,
      adminAnswer: answer,
      emailAddress: requestEmail
    }).then((res) => {
      console.log(res);
      getNewContactData().then((re) => {
        console.log(re, 'userResult');
        setStore({
          ...store,
          alertNum: re.result.length
        });
      }).catch((err) => {
        console.log(err);
      });
      cogoToast.success('Success!', { position: 'bottom-right' });
    }).catch((err) => {
      console.log(err);
      cogoToast.warn('Error', { position: 'bottom-right' });
    });
  };

  const openDialog = (contact) => {
    console.log(contact);
    setRequestContent(contact.description);
    setRequestId(contact.id);
    setRequestEmail(contact.email);
    setRequestTitle(contact.title);
    setDialogOpen(true);
  };
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        key="dialog-answer"
        fullScreen={fullScreen}
      >
        <DialogTitle id="alert-dialog-title">Answer</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ textAlign: 'left' }}>
            <strong>Email:</strong>
            {' '}
            {requestEmail}
            {' '}
            <br />
            <strong>Title:</strong>
            {' '}
            {requestTitle}
            {' '}
            <br />
            <strong>Content:</strong>
            {' '}
            {requestContent}
            {' '}
            <br />
          </DialogContentText>
          <TextField
            autoFocus
            id="standard-multiline-flexible"
            label="Response"
            style={{ width: 450 }}
            fullWidth
            multiline
            rowsMax={5}
            onChange={(e) => { setAnswer(e.target.value); }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSendEmail} color="secondary" variant="contained" autoFocus>
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === contacts.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < contacts.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Request date
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.slice(0, limit).map((contact) => (
                <TableRow
                  hover
                  key={contact.iid}
                  selected={selectedCustomerIds.indexOf(contact.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(contact.id) !== -1}
                      onChange={(event) => handleSelectOne(event, contact.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {contact.title}
                  </TableCell>
                  <TableCell>
                    {contact.description}
                  </TableCell>
                  <TableCell>
                    {contact.email}
                  </TableCell>
                  <TableCell>
                    <Badge color="secondary" badgeContent={contact.contactResponse.length ? null : 'new'}>
                      <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        onClick={() => { openDialog(contact); }}
                      >
                        Answer
                      </Button>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {moment(contact.created_at).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={contacts.length}
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
  contacts: PropTypes.array.isRequired,
};

export default Results;
