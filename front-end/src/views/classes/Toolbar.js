/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
  Divider,
  Typography,
  Grid
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import cogoToast from 'cogo-toast';
import Zoom from 'react-reveal/Zoom';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import StoreContext from 'src/context/index';
import {
  imageUpload,
  newClass,
  getClassList,
  getClassListAll,
  joinMemApi
} from 'src/utils/Api';
import humanFriendlyDate from 'src/utils/Timeformat';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  quizName: {
    width: '100%',
    minWidth: 250
  },
  progressBar: {
    fontSize: 20,
    color: 'purple',
    marginLeft: 10,
    width: 25
  },
  none: {
    display: 'none'
  },
  valid: {
    display: 'block',
    color: 'red'
  },
  quizDesc: {
    marginTop: 15,
    width: '100%'
  },
  coverImage: {
    marginLeft: 20,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: 15
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: 20,
    }
  },
  coverImg: {
    borderRadius: 5,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
      width: 250,
      height: 180,
    }
  },
  cancelImage: {
    position: 'relative',
    marginTop: -50,
    marginLeft: -90
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  fileModal: {
    display: 'none'
  },
  joinModal: {
    width: 'fit-content'
  }
}));

const Toolbar = ({
  refresh, className, schLoading, searchQuz, ...rest
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { store, setStore } = React.useContext(StoreContext);
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [valid, setValid] = useState('none');
  const [newTitle, setNewTitle] = useState('');
  const [briefValid, setBriefValid] = useState('none');
  const [description, setDescription] = useState('');
  const [imageSource, setImageSource] = useState('');
  const [coverImageName, setCoverImageName] = useState('');
  const [classRooms, setClasses] = useState([]);
  const [totalNum, setTotalNum] = useState(0);
  const [cPageNum, setCPageNum] = useState(1);
  const [joinModal, setJoinModal] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const userS = JSON.parse(localStorage.getItem('brainaly_user'));
  const handleClose = () => {
    setOpen(false);
    setIsLoading(false);
  };
  function chr4() {
    return Math.random().toString(16).slice(-4);
  }
  function uniqueID() {
    return `${chr4() + chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;
  }
  function closeSearch() {
    setSearchKey('');
    searchQuz('');
    console.log('refresh');
  }
  const handleNew = async () => {
    if (newTitle.length < 3) {
      setValid('valid');
    } else if (description.length < 10) {
      setBriefValid('valid');
      setValid('none');
    } else {
      setValid('none');
      setBriefValid('none');
      const user = JSON.parse(localStorage.getItem('brainaly_user'));
      const data = {
        uid: uniqueID(),
        title: newTitle,
        description,
        cover: coverImageName,
        students: '[]',
        userid: user.userId
      };
      await newClass(data).then((res) => {
        // console.log(res.data.uid);
        navigate(`/class/edit?id=${res.data.uid}`, { replace: true });
      });
      setOpen(false);
      setNewTitle('');
      setCoverImageName('');
    }
  };
  async function goAddNewQuiz() {
    setOpen(true);
  }
  async function loadMore() {
    console.log('loadmore');
  }
  async function joinMem(classId, joinFlag) {
    console.log(classId, joinFlag);
    setIsLoading(true);
    joinMemApi({
      cls_id: classId,
      join_flag: joinFlag,
      u_id: userS.userId,
      pageNum: cPageNum
    }).then((res) => {
      const productsArray = [];
      setIsLoading(false);
      console.log(res);
      setTotalNum(Math.ceil(res.total / global.pageNationLimit));
      for (let i = 0; i < res.result.length; i++) {
        const createDate = new Date(res.result[i].cl_createdAt);
        const students = JSON.parse(res.result[i].cl_students);
        const newData = {
          title: res.result[i].cl_name,
          media: res.result[i].cl_cover === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].cl_cover}`,
          description: res.result[i].cl_description,
          id: res.result[i].cl_uid,
          studentNum: students.length,
          memStudents: students,
          created: `${createDate.getFullYear()}-${createDate.getMonth() + 1}-${createDate.getDate()}`
        };
        productsArray.push(newData);
        console.log(res.result[i]);
      }
      setClasses(productsArray);
      refresh();
    }).catch(() => {
      cogoToast.warn('There was an error, Please try again', { position: 'bottom-right' });
    });
  }
  async function joinClass() {
    setIsLoading(true);
    await getClassListAll({
      userid: userS.userId,
      pageNum: 1,
      userType: userS?.userType
    }).then((res) => {
      const productsArray = [];
      setIsLoading(false);
      setTotalNum(Math.ceil(res.total / global.pageNationLimit));
      for (let i = 0; i < res.result.length; i++) {
        const createDate = new Date(res.result[i].cl_createdAt);
        const students = JSON.parse(res.result[i].cl_students);
        const newData = {
          title: res.result[i].cl_name,
          media: res.result[i].cl_cover === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].cl_cover}`,
          description: res.result[i].cl_description,
          id: res.result[i].cl_uid,
          studentNum: students.length,
          memStudents: students,
          created: `${createDate.getFullYear()}-${createDate.getMonth() + 1}-${createDate.getDate()}`
        };
        productsArray.push(newData);
        console.log(res.result[i]);
      }
      setClasses(productsArray);
    }).catch((err) => {
      setIsLoading(false);
      console.log(err);
      cogoToast.warn('There was an error, Please try again', { position: 'bottom-right' });
    });
    setJoinModal(true);
  }
  function memCheck(members) {
    console.log(members);
    // return false;
    if (members.indexOf(userS.userId) >= 0) {
      return true;
    }
    return false;
  }
  async function handleImageChange(e) {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      e.preventDefault();
      const reader = URL.createObjectURL(e.target.files[0]);
      setImageSource(reader);
      await imageUpload(e.target.files[0]).then((res) => {
        setCoverImageName(res.data.filename);
      });
    }
  }
  const imageSelect = () => {
    document.getElementById('image_select').click();
  };
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
        disableEscapeKeyDown
        minWidth="lg"
        width="lg"
      >
        <DialogTitle id="alert-dialog-title">Create class</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12}>
              <Grid item xs={12} sm={6} style={{ marginTop: 20 }}>
                <TextField
                  variant="outlined"
                  className={classes.quizName}
                  label="Class Name"
                  value={newTitle}
                  id="outlined-basic"
                  onChange={(event) => {
                    setNewTitle(event.target.value);
                  }}
                />
                <Typography color="warnred" variant="body2" className={classes[valid]}>
                  * Please enter at least 3 characters
                </Typography>
                <TextField
                  variant="outlined"
                  className={classes.quizDesc}
                  label="Description"
                  value={description}
                  id="outlined-basic"
                  multiline
                  rows={4}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
                <Typography color="warnred" variant="body2" className={classes[briefValid]}>
                  * Please enter at least 10 characters
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.coverImage}>
                  <input type="file" id="image_select" onChange={handleImageChange} className={classes.fileModal} />
                  <Typography variant="body1">
                    Cover image
                  </Typography>
                  <img
                    alt="Cover Image"
                    src={imageSource === '' ? '/static/collection.png' : imageSource}
                    className={classes.coverImg}
                  />
                  <Button color="secondary" variant="contained" onClick={imageSelect} className={classes.cancelImage}>Change</Button>
                </div>
              </Grid>
            </Grid>

          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" disabled={isLoading} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleNew} disabled={isLoading} color="secondary" autoFocus>
            Create
            {' '}
            {isLoading && <CircularProgress color="nice" size={20} className={classes.progressBar} />}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={joinModal}
        onClose={() => { setJoinModal(false); }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="alert-dialog-title">Please select the class you hope to join</DialogTitle>
        <DialogContent className={classes.joinModal}>
          <Grid container xs={12}>
            <Grid item xs={12} sm={12} style={{ marginTop: 20 }}>
              {
                  classRooms.map((cls) => {
                    return (
                      <Zoom>
                        <Card
                          className={clsx(classes.root, className)}
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
                                <img
                                  alt="Product"
                                  src={cls.media}
                                  style={{ width: '100%' }}
                                />
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
                                  xl={12}
                                  lg={12}
                                  md={12}
                                  xs={12}
                                >
                                  <Typography
                                    align="left"
                                    color="textPrimary"
                                    gutterBottom
                                    variant="h4"
                                  >
                                    {cls.title}
                                  </Typography>
                                  <Typography
                                    align="left"
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {cls.description}
                                  </Typography>
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
                                xl={12}
                                lg={12}
                                md={12}
                                xs={12}
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
                                  {humanFriendlyDate(cls.created)}
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
                                  {cls.studentNum}
                                </Typography>
                                {
                                  memCheck(cls.memStudents) ? (
                                    <Button variant="contained" onClick={() => { joinMem(cls.id, false); }} disabled={isLoading} color="secondary" style={{ marginLeft: 'auto' }} autoFocus>
                                      Joined
                                      {' '}
                                      {isLoading && <CircularProgress color="nice" size={20} className={classes.progressBar} />}
                                    </Button>
                                  ) : (
                                    <Button variant="contained" onClick={() => { joinMem(cls.id, true); }} disabled={isLoading} color="primary" style={{ marginLeft: 'auto' }} autoFocus>
                                      Join
                                      {' '}
                                      {isLoading && <CircularProgress color="nice" size={20} className="pregress" />}
                                    </Button>
                                  )
                                }

                              </Grid>
                            </Grid>
                          </Box>
                        </Card>
                      </Zoom>
                    );
                  })
                }

            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => { setJoinModal(false); }} color="secondary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        {
          userS?.userType === 'student' ? (
            <Button
              color="primary"
              variant="contained"
              onClick={joinClass}
            >
              Join Class
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              onClick={goAddNewQuiz}
            >
              Create Class
            </Button>
          )
        }
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                value={searchKey}
                onChange={(e) => { setSearchKey(e.target.value); }}
                onKeyPress={(e) => { searchQuz(e); }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {schLoading ? <CircularProgress color="secondary" size={19} className="pregress" /> : (
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      ) }
                    </InputAdornment>
                  ),
                  endAdornment: (
                    searchKey ? (
                      <InputAdornment position="end" onClick={() => { closeSearch(); }} className="endAdornment">
                        <ClearIcon size={19} />
                      </InputAdornment>
                    ) : null
                  )
                }}
                placeholder="Search Class"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  refresh: PropTypes.func,
  searchQuz: PropTypes.func,
  schLoading: PropTypes.bool
};

export default Toolbar;
