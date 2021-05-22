/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';
// import EditIcon from '@material-ui/icons/Edit';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import DeleteIcon from '@material-ui/icons/Delete';
import Zoom from 'react-reveal/Zoom';
import { deleteClass } from 'src/utils/Api';
import humanFriendlyDate from 'src/utils/Timeformat';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(3)
  },
  quAvatar: {
    width: 150,
    borderRadius: 5
  },
  hambergerContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  menuItem: {
    width: 100
  },
  menuIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ProductCard = ({
  className, refresh, product, ...rest
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const open = Boolean(anchorEl);
  const user = JSON.parse(localStorage.getItem('brainaly_user'));
  const navigate = useNavigate();
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const editQu = (id) => {
    console.log(id);
    // window.open(`/teacher/new?id=${id}`, '_blank');
    if (user.userType === 'student') {
      navigate(`/student/edit?id=${id}`, { replace: true });
    } else {
      navigate(`/class/edit?id=${id}`, { replace: true });
    }

    handleMenuClose();
  };
  const deleteQu = (id) => {
    console.log(id);
    setDeleteId(id);
    setDialogOpen(true);
    handleMenuClose();
  };
  function handleClose() {
    setDialogOpen(false);
  }
  async function handleDelete() {
    console.log(deleteId);
    await deleteClass({ cls_uid: deleteId }).then((res) => {
      console.log(res);
      handleClose();
      refresh(1);
    });
  }
  function handleCancel() {
    setConfirmOpen(false);
  }
  function handleJoin() {
    setConfirmOpen(false);
  }
  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Really?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={confirmOpen}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        key={uuid()}
      >
        <DialogTitle id="alert-dialog-title">Are you sure to join this class?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can share all info of your test results with your classmates.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleJoin} color="secondary" variant="contained" autoFocus>
            Join
          </Button>
        </DialogActions>
      </Dialog>
      <Zoom>
        <Card
          className={clsx(classes.root, className)}
          {...rest}
        >
          <CardContent>
            <Grid
              container
              flexDirection="row"
              spacing={2}
            >
              <Grid
                item
                xl={2}
                lg={2}
                md={2}
                xs={12}
              >
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  mb={3}
                >
                  <Avatar
                    alt="Product"
                    src={product.media}
                    variant="square"
                    className={clsx(classes.quAvatar, className)}
                  />
                </Box>
              </Grid>
              <Grid
                item
                xl={10}
                lg={10}
                md={10}
                xs={12}
                container
                justifyContent="space-between"
                flexDirection="row"
              >
                <Grid
                  item
                  xl={11}
                  lg={11}
                  md={11}
                  xs={11}
                >
                  <Typography
                    align="left"
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    align="left"
                    color="textPrimary"
                    variant="body1"
                  >
                    {product.description}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xl={1}
                  lg={1}
                  md={1}
                  xs={1}
                  className={classes.hambergerContainer}
                >
                  <MoreVertIcon
                    onClick={handleMenuClick}
                  />

                  <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleMenuClose}
                  >
                    {
                    user.userType === 'student' ? (
                      <MenuItem
                        key={`${product.id}1`}
                        className={classes.menuItem}
                        onClick={() => { editQu(product.id); }}
                      >
                        <RemoveRedEyeIcon className={classes.menuIcon} />
                        View
                      </MenuItem>
                    )
                      : ([
                        <MenuItem
                          key={product.id}
                          className={classes.menuItem}
                          onClick={() => { editQu(product.id); }}
                        >
                          <RemoveRedEyeIcon className={classes.menuIcon} />
                          {' '}
                          View
                        </MenuItem>,
                        <MenuItem key={`${product.id}1`} className={classes.menuItem} onClick={() => { deleteQu(product.id); }}>
                          <DeleteIcon className={classes.menuIcon} />
                          Delete
                        </MenuItem>
                      ]

                      )
                        }
                  </Menu>

                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Box flexGrow={1} />
          <Divider />
          <Box p={2}>
            <Grid
              container
              justify="space-between"
              spacing={2}
            >
              <Grid
                className={classes.statsItem}
                item
              >
                <AccessTimeIcon
                  className={classes.statsIcon}
                  color="action"
                />
                <Typography
                  color="textSecondary"
                  display="inline"
                  variant="body2"
                >
                  Create at
                  {' '}
                  {humanFriendlyDate(product.created)}
                </Typography>
                <PlayArrowIcon
                  className={classes.statsIcon}
                  color="action"
                />
                <Typography
                  color="textSecondary"
                  display="inline"
                  variant="body2"
                >
                  Student Number
                  {' '}
                  {product.studentNum}
                </Typography>
              </Grid>
              <Grid
                className={classes.statsItem}
                item
              >
                {/* <Button variant="contained" color="primary">
                  Play
                </Button> */}
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Zoom>
    </div>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
  refresh: PropTypes.func
};

export default ProductCard;
