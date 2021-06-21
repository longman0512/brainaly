/* eslint-disable object-shorthand */
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
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import HelpIcon from '@material-ui/icons/Help';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Zoom from 'react-reveal/Zoom';
import cogoToast from 'cogo-toast';
import { deleteQuiz, getQuizById } from 'src/utils/Api';
import {
  emitEvent
} from 'src/utils/socket';
import humanFriendlyDate from 'src/utils/Timeformat';
import global from 'src/utils/global';

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
  },
  teach: {
    marginLeft: 20
  }
}));

const ProductCard = ({
  className, product, handleRefresh, ...rest
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [makingGame, setMakingGame] = useState(false);
  const [gamePin, setGamePin] = useState(0);
  const [hostModal, setHostModal] = useState(false);
  const [gameType, setGameType] = useState('');
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const toggleHostModal = (gType) => {
    setGameType(gType);
    setHostModal(!hostModal);
  };
  const createGame = () => {
    setMakingGame(true);
    setTimeout(async () => {
      console.log(product);
      await getQuizById({ id: product.id }).then((res) => {
        if (res.length) {
          const user = JSON.parse(localStorage.getItem('brainaly_user'));
          const gameInfo = {
            ownerId: user.userId,
            ownerType: user.userType,
            gameType: gameType,
            gameQuizNum: JSON.parse(res[0].q_content).length,
            gameContent: JSON.parse(res[0].q_content),
            gameStatus: 'ready',
            gameId: Math.random().toString(16).slice(-4),
            sourceType: 'quiz',
            sourceId: product.id
          };
          const gameUser = {
            userId: user.userId,
            userNickName: user.userName,
            currentNum: 0,
            userScore: 0,
            userStatus: 'ready',
            gameId: gameInfo.gameId,
            userAnswers: []
          };
          emitEvent('createGame', gameInfo);
          setGamePin(gameInfo.gameId);
          localStorage.setItem('brainaly_game', JSON.stringify(gameUser));
        } else {
          cogoToast.warn('There was an erro, Please try again', { position: 'top-right' });
        }
        console.log(gameType);
      });
      setMakingGame(false);
      toggleHostModal();
    }, 500);
  };
  const editQu = (id) => {
    console.log(id);
    // window.open(`/teacher/new?id=${id}`, '_blank');
    navigate(`/student/new?id=${id}`, { replace: true });
    handleMenuClose();
  };
  const deleteQu = (id) => {
    setDeleteId(id);
    setDialogOpen(true);
    handleMenuClose();
  };
  const gotoGamePanel = () => {
    console.log(gamePin);
    setGamePin(false);
    setHostModal(false);
    window.open(global.gamePageUrl, '_black');
  };
  function handleClose() {
    setDeleteId('');
    setDialogOpen(false);
  }
  async function handleDelete() {
    console.log(deleteId);
    await deleteQuiz({ uid: deleteId }).then((res) => {
      console.log(res);
      handleRefresh();
      setDialogOpen(false);
    });
  }

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        key={product.id}
      >
        <DialogTitle id="alert-dialog-title">Really?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this quiz?
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
        open={hostModal}
        onClose={toggleHostModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        key="hostModal"
      >
        <DialogTitle id="alert-dialog-title">Really?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you ready to share the game with your friends?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={createGame} color="primary" variant="contained">
            Host
            {makingGame && <CircularProgress color="nice" size={20} className="progress" />}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={gamePin}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        key="hostModal"
      >
        <DialogTitle id="alert-dialog-title">Game is Created</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please share this PIN with your friends
            <p style={{ fontSize: 18 }}>{ gamePin }</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={gotoGamePanel} color="primary" variant="contained">
            Go Game
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
                    <MenuItem
                      key={product.id}
                      className={classes.menuItem}
                      onClick={() => { editQu(product.id); }}
                    >
                      <EditIcon className={classes.menuIcon} />
                      {' '}
                      Edit
                    </MenuItem>
                    <MenuItem key={`${product.id}1`} className={classes.menuItem} onClick={() => { deleteQu(product.id); }}>
                      <DeleteIcon className={classes.menuIcon} />
                      Delete
                    </MenuItem>
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
                  Created at
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
                  {product.played ? product.played : 0}
                  {' '}
                  Plays
                </Typography>
                <HelpIcon
                  className={classes.statsIcon}
                  color="action"
                />
                <Typography
                  color="textSecondary"
                  display="inline"
                  variant="body2"
                >
                  {product.length}
                  {' '}
                  Questions
                </Typography>
              </Grid>
              <Grid
                className={classes.statsItem}
                item
              >
                <Button variant="contained" color="primary" onClick={() => { toggleHostModal('play'); }}>
                  Play
                </Button>
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
  handleRefresh: PropTypes.func
};

export default ProductCard;
