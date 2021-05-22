/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  makeStyles,
  Drawer,
  Hidden,
  Typography
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import StoreContext from 'src/context/index';
import SortIcon from '@material-ui/icons/Sort';
import Divider from '@material-ui/core/Divider';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

const useStyle = makeStyles((theme) => ({
  desktopDrawer: {
    width: 200,
    top: 64,
    height: 'calc(100% - 64px)',
    marginBottom: 50,
    overflow: 'hidden'
  },
  banner: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    width: '100%'
  },
  divider: {
    marginTop: 15,
    marginBottom: 15,
    height: 2,
    textAlign: 'center'
  },
  root: {
    width: '90%',
    marginLeft: '5%',
    overflow: 'hidden'
  }
}));
export default function RightNavBar({ items }) {
  const classes = useStyle();
  const { store, setStore } = React.useContext(StoreContext);
  const [selectedType, setSelectedType] = React.useState(1);
  const [selectedTime, setSelectedTime] = React.useState(5);
  const [selectedPoint, setSelectedPoint] = React.useState(1);
  useEffect(() => {
    setSelectedType(store?.selectedItem?.quizType);
    setSelectedTime(store?.selectedItem?.quizTime);
    setSelectedPoint(store?.selectedItem?.point);
  }, [store]);
  const handleChange = (event) => {
    const preStore = store;
    const selIndex = preStore.selectedNav[0].id;
    let answerTemplate;
    if (event.target.value === 1) {
      answerTemplate = [
        { sel: 0, answer: '' }, { sel: 0, answer: '' }, { sel: 0, answer: '' }, { sel: 0, answer: '' }
      ];
    } else {
      answerTemplate = 0;
    }
    const newProv = [...preStore.items];
    const providerArray = {
      href: preStore.items[selIndex].href,
      title: preStore.items[selIndex].title,
      quizType: event.target.value,
      quizAnswer: answerTemplate,
      quizTime: preStore.items[selIndex].quizTime,
      point: preStore.items[selIndex].point,
      image: preStore.items[selIndex].image
    };
    newProv[selIndex] = providerArray;

    setStore({
      items: newProv,
      selectedNav: preStore.selectedNav,
      selectedItem: {
        href: preStore.items[selIndex].href,
        title: preStore.items[selIndex].title,
        quizType: event.target.value,
        quizAnswer: answerTemplate,
        quizTime: preStore.items[selIndex].quizTime,
        point: preStore.items[selIndex].point,
        image: preStore.items[selIndex].image
      }
    });
  };
  const handleTime = (event) => {
    const preStore = store;
    const selIndex = preStore.selectedNav[0].id;
    const newProv = [...preStore.items];
    const providerArray = {
      href: preStore.items[selIndex].href,
      title: preStore.items[selIndex].title,
      quizType: preStore.items[selIndex].quizType,
      quizAnswer: preStore.items[selIndex].quizAnswer,
      quizTime: event.target.value,
      point: preStore.items[selIndex].point,
      image: preStore.items[selIndex].image
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
        quizTime: event.target.value,
        point: preStore.items[selIndex].point,
        image: preStore.items[selIndex].image
      }
    });
  };
  const handlePoint = (event) => {
    const preStore = store;
    const selIndex = preStore.selectedNav[0].id;
    const newProv = [...preStore.items];
    const providerArray = {
      href: preStore.items[selIndex].href,
      title: preStore.items[selIndex].title,
      quizType: preStore.items[selIndex].quizType,
      quizAnswer: preStore.items[selIndex].quizAnswer,
      quizTime: preStore.items[selIndex].quizTime,
      point: event.target.value,
      image: preStore.items[selIndex].image
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
        point: event.target.value,
        image: preStore.items[selIndex].image
      }
    });
  };
  return (
    <div className={classes.root}>
      <Drawer
        anchor="right"
        variant="persistent"
        classes={{ paper: classes.desktopDrawer }}
        // onClose={onMobileClose}
        open
      >
        <Typography className={classes.banner}>
          <SortIcon style={{ fontSize: 20 }} />
          Question type
          { '  ' }
        </Typography>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">Type select</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={selectedType}
            onChange={handleChange}
          >
            <MenuItem value={1}>Quiz</MenuItem>
            <MenuItem value={2}>True or False</MenuItem>
          </Select>
        </FormControl>
        <Divider className={classes.divider} />
        <Typography className={classes.banner}>
          <AccessAlarmIcon style={{ fontSize: 20 }} />
          { '  ' }
          Time limit
        </Typography>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">Timer</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={selectedTime}
            onChange={handleTime}
          >
            <MenuItem value={5}>5 seconds</MenuItem>
            <MenuItem value={10}>10 seconds</MenuItem>
            <MenuItem value={20}>20 seconds</MenuItem>
            <MenuItem value={30}>30 seconds</MenuItem>
            <MenuItem value={60}>1 minute</MenuItem>
            <MenuItem value={90}>1 minute 30 seconds</MenuItem>
            <MenuItem value={120}>2 minute</MenuItem>
            <MenuItem value={240}>4 minute</MenuItem>
          </Select>
        </FormControl>
        <Divider className={classes.divider} />
        <Typography className={classes.banner}>
          <PlaylistAddCheckIcon style={{ fontSize: 20 }} />
          { '  ' }
          Points
        </Typography>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">Point Eval</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={selectedPoint}
            onChange={handlePoint}
          >
            <MenuItem value={1}>Standard</MenuItem>
            <MenuItem value={2}>Double points</MenuItem>
            <MenuItem value={3}>No points</MenuItem>
          </Select>
        </FormControl>
      </Drawer>
    </div>
  );
}
RightNavBar.propTypes = {
  items: PropTypes.array
};
