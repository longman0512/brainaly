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
  Typography,
  Grid
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import StoreContext from 'src/context/index';
import { newQuiz, imageUpload } from 'src/utils/Api';

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
  },
  progressBar: {
    fontSize: 20,
    color: 'purple',
    marginLeft: 10
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
  fileModal: {
    display: 'none'
  },
}));

const Toolbar = ({
  className, searchQuz, schLoading, ...rest
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
  const [searchKey, setSearchKey] = useState('');
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
      setIsLoading(true);
      const item = [{
        href: '',
        title: '',
        quizType: 1,
        image: '',
        quizAnswer: [
          {
            sel: 0,
            answer: ''
          },
          {
            sel: 0,
            answer: ''
          },
          {
            sel: 0,
            answer: ''
          },
          {
            sel: 0,
            answer: ''
          },
        ],
        quizTime: 20,
        point: 2
      }];
      const newData = JSON.stringify(item);
      const user = JSON.parse(localStorage.getItem('brainaly_user'));
      const data = {
        uid: uniqueID(),
        content: newData,
        title: newTitle,
        description,
        userid: user.userId,
        cover: coverImageName
      };
      console.log(data);
      await newQuiz(data).then((res) => {
        console.log('data', res);
        setStore({
          ...store,
          items: item
        });
        navigate(`/student/new?id=${res.data.uid}`, { replace: true });
      });
    }
  };
  async function goAddNewQuiz() {
    setOpen(true);
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
      >
        <DialogTitle id="alert-dialog-title">Create a New Quiz</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} style={{ marginTop: 20 }}>
              <TextField
                variant="outlined"
                className={classes.quizName}
                label="Collection Name"
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
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          color="primary"
          variant="contained"
          onClick={goAddNewQuiz}
        >
          Add QUIZ
        </Button>
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
                placeholder="Search quiz(title or description)"
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
  searchQuz: PropTypes.func,
  schLoading: PropTypes.bool
};

export default Toolbar;
