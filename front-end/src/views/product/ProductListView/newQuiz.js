/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable valid-typeof */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import StoreContext from 'src/context/index';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';
import Dropzone from 'react-dropzone';
import {
  makeStyles,
  TextField,
  Typography,
  Grid,
  Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { getQuizById, imageUpload } from 'src/utils/Api';
import global from 'src/utils/global';
import authChecker from 'src/utils/authHelper';
import Unchecked from './answers/unchecked';
import Checked from './answers/checked';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
    height: 'calc(100vh - 64px)',
    overflowY: 'auto',
    [theme.breakpoints.down('md')]: {
      height: 'calc(100vh - 190px)',
    },
    [theme.breakpoints.up('md')]: {
      height: 'calc(100vh - 64px)',
    }
  },
  titleInput: {
    marginTop: 20,
    minwidth: 100,
    width: '80%',
    fontWeight: 400,
    textAlign: 'center'
  },
  hideImageSection: {
    display: 'none'
  },
  showImageSection: {
    width: '100%',
    display: 'block'
  },
  cart: {
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  fileModal: {
    display: 'none'
  },
  cancelImage: {
    fontSize: 20,
    position: 'relative',
    marginTop: -50,
    marginLeft: -110
  },
  image: {
    marginTop: 20,
    width: '50%',
    objectFit: 'cover',
    height: 'auto',
    maxHeight: 300
  },
  previews: {
    marginTop: 50,
    border: '1px dotted #000',
    width: '50%',
    textAlign: 'center',
    marginLeft: '25%',
    marginRight: '25%',
    paddingTop: 20,
    paddingBottom: 10
  },
  answerContainer: {
    marginTop: 10,
    width: '90%',
    marginLeft: '5%',
    padding: 10
  },
  answerSector: {
    padding: 10
    // transition: 'transform .3s ease',
    // '&:hover': {
    //   transform: 'scale(1.02)'
    // },
    // cursor: 'pointer'
  }
}));
export default function NewQuiz() {
  const handle = window.location.search;
  const navigate = useNavigate();
  const id = new URLSearchParams(handle).get('id');
  const classes = useStyle();
  const [imageSource, setImageSource] = useState('');
  const [imageSection, setImageSection] = useState('hideImageSection');
  const { store, setStore } = React.useContext(StoreContext);
  const [imageLetter, setImageLetter] = useState('showImageSection');
  const [titleValue, setTitleValue] = useState('');
  // const [answers, setAnswers] = useState([0, 0, 0, 0]);
  const [imageUrl, setImageUrl] = useState('');
  const [answerGraphic, setAnswerGraphic] = useState(<div className={classes.answerContainer}>{ ' ' }</div>);
  useEffect(() => {
    // get data with
    async function getData() {
      if (!authChecker('authCheck')) {
        navigate('/', { replace: true });
        return;
      }
      const req = { id };
      await getQuizById(req).then((res) => {
        const jsonData = JSON.parse(res[0].q_content);
        console.log(jsonData);
        setStore({
          ...store,
          items: jsonData,
          selectedNav: [
            { id: 0 }
          ],
          selectedItem: jsonData[0]
        });
        console.log(jsonData[0].image);
        setImageSource(typeof jsonData[0].image === 'undifined' ? null : `${global.serverUrl}upload/${jsonData[0]?.image}`);
      });
    }
    getData();
  }, []);
  useEffect(() => {
    const answers = store?.selectedItem?.quizAnswer;
    // if (typeof answers === 'undefined') {
    //   return false;
    // }
    setAnswerGraphic(null);
    if (typeof store?.selectedItem?.image !== 'undefined') {
      if (store?.selectedItem?.image === null || store?.selectedItem?.image === '') {
        setImageSection('hideImageSection');
        setImageLetter('showImageSection');
      } else {
        setImageSection('showImageSection');
        setImageLetter('hideImageSection');
        setImageSource(`${global.serverUrl}upload/${store?.selectedItem?.image}`);
      }
    } else {
      setImageSection('hideImageSection');
      setImageLetter('showImageSection');
    }
    if (store?.selectedItem?.quizType === 1) {
      setAnswerGraphic(
        <Grid container className={classes.answerContainer}>
          <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[0] === 'undefined' ? null : <Unchecked answer={answers[0].answer} order={0} check={answers[0].sel} /> }</Grid>
          <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[1] === 'undefined' ? null : <Unchecked answer={answers[1].answer} order={1} check={answers[1].sel} /> }</Grid>
          <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[2] === 'undefined' ? null : <Unchecked answer={answers[2].answer} order={2} check={answers[2].sel} /> }</Grid>
          <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[3] === 'undefined' ? null : <Unchecked answer={answers[3].answer} order={3} check={answers[3].sel} /> }</Grid>
        </Grid>
      );
    } else {
      setAnswerGraphic(
        <Grid container className={classes.answerContainer}>
          <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers === 'undefined' ? null : <Checked order={0} check={answers === 0 ? 0 : 1} /> }</Grid>
          <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers === 'undefined' ? null : <Checked order={1} check={answers === 0 ? 1 : 0} /> }</Grid>
        </Grid>
      );
    }
  }, [store]);
  async function handleTitle(event) {
    const preStore = store;
    const newStore = [];
    setStore({
      items: newStore
    });
    for (let i = 0; i < preStore.items.length; i++) {
      if (i === store.selectedNav[0].id) {
        newStore.push({
          href: preStore.items[i].href,
          title: event.target.value,
          quizType: preStore.items[i].quizType,
          quizAnswer: preStore.items[i].quizAnswer,
          quizTime: preStore.items[i].quizTime,
          point: preStore.items[i].point,
          image: preStore.items[i].image
        });
        setTitleValue(event.target.value);
      } else {
        newStore.push({
          href: preStore.items[i].href,
          title: preStore.items[i].title,
          quizType: preStore.items[i].quizType,
          quizAnswer: preStore.items[i].quizAnswer,
          quizTime: preStore.items[i].quizTime,
          point: preStore.items[i].point,
          image: preStore.items[i].image
        });
      }
    }
    setStore({
      items: newStore,
      selectedItem: {
        href: preStore.items[store.selectedNav[0].id].href,
        title: event.target.value,
        quizType: preStore.items[store.selectedNav[0].id].quizType,
        quizAnswer: preStore.items[store.selectedNav[0].id].quizAnswer,
        quizTime: preStore.items[store.selectedNav[0].id].quizTime,
        point: preStore.items[store.selectedNav[0].id].point,
        image: preStore.items[store.selectedNav[0].id].image,
      },
      selectedNav: [{ id: store.selectedNav[0].id }]
    });
  }
  useEffect(() => {
    setTitleValue(typeof store.selectedItem?.title === 'undifined' ? null : store.selectedItem?.title === 'Question' ? '' : store.selectedItem?.title);
    // setTitleValue(selectedItem);
  }, [store.selectedNav]);
  const imageSelect = () => {
    document.getElementById('image_select').click();
  };
  async function handleImageChange(e) {
    console.log('handleImageChange', e);
    if (e[0]) {
      console.log(e[0]);
      const reader = URL.createObjectURL(e[0]);
      setImageSource(reader);
      setImageSection('showImageSection');
      setImageLetter('hideImageSection');
      await imageUpload(e[0]).then((res) => {
        const preStore = store;
        const selIndex = preStore.selectedNav[0].id;
        const newProv = [...preStore.items];
        const providerArray = {
          href: preStore.items[selIndex].href,
          title: preStore.items[selIndex].title,
          quizType: preStore.items[selIndex].quizType,
          quizAnswer: preStore.items[selIndex].quizAnswer,
          quizTime: preStore.items[selIndex].quizTime,
          point: preStore.items[selIndex].point,
          image: res.data.filename
        };
        newProv[selIndex] = providerArray;
        setStore({
          items: newProv,
          selectedNav: preStore.selectedNav,
          selectedItem: {
            href: preStore.items[selIndex].href,
            title: preStore.items[selIndex].title,
            quizType: preStore.items[selIndex].quizType,
            quizAnswer: preStore.items[selIndex].quizAnswer,
            quizTime: preStore.items[selIndex].quizTime,
            point: preStore.items[selIndex].point,
            image: res.data.filename
          }
        });
      });
    }
  }
  const cancelImageSelect = () => {
    setImageLetter('showImageSection');
    setImageSection('hideImageSection');
    setImageSource('');
    document.getElementById('image_select').value = '';
  };
  return (
    <div className={classes.root}>
      <TextField
        placeholder="Question Title"
        multiline
        className={classes.titleInput}
        inputProps={{ style: { fontSize: 28, textAlign: 'center' } }}
        onChange={handleTitle}
        value={titleValue}
      />
      <div className={classes.cart}>
        <div className={classes[imageLetter]}>
          <Dropzone onDrop={(acceptedFiles) => handleImageChange(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <div className={classes.previews} {...getRootProps()}>
                <ImageSearchIcon fontSize="large" />
                <section>
                  <div>
                    <input {...getInputProps()} type="file" id="image_select" className={classes.fileModal} />
                    <Typography variant="body1" color="primary" component="h2" style={{ textAlign: 'center' }}>
                      Drag and Drop Event image here
                    </Typography>
                  </div>
                </section>
              </div>
            )}
          </Dropzone>
        </div>
        <div className={classes[imageSection]}>
          <img src={imageSource} alt="Image" className={classes.image} onClick={imageSelect} />
          <Button color="secondary" variant="contained" className={classes.cancelImage} onClick={cancelImageSelect}>Remove</Button>
        </div>
      </div>
      {answerGraphic}
    </div>
  );
}
