/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Card,
  IconButton,
  TextField,
  FormControl
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import StoreContext from 'src/context/index';

const useStyles = makeStyles({
  container: {
    // backgroundColor: 'white'
  },
  icons: {
    color: '#fff'
  },
  checking: {
    // backgroundColor: 'white'
    transition: 'transform .5s ease',
    '&:hover': {
      transform: 'scale(1.05)'
    },
    cursor: 'pointer'
  },
  textSection: {
    width: '100%',
  },
  root: {
    minHeight: 100,
    padding: 10,
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex'
  }
});
const colors = [
  '#e21b3c',
  '#1368ce',
  '#d89e00',
  '#26890c'
];
export default function Unchecked({ answer, order, check }) {
  const { store, setStore } = React.useContext(StoreContext);
  const classes = useStyles();
  async function updateAnswer(event, pos) {
    const preStore = store;
    const selIndex = preStore.selectedNav[0].id;
    console.log(selIndex, pos);
    const newProv = [...preStore.items];
    const preAnswer = [...store.selectedItem.quizAnswer];
    const newAnswer = {
      sel: preAnswer[pos].sel,
      answer: event.target.value
    };
    preAnswer[pos] = newAnswer;
    const providerArray = {
      href: preStore.items[selIndex].href,
      title: preStore.items[selIndex].title,
      quizType: preStore.items[selIndex].quizType,
      quizAnswer: preAnswer,
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
        quizType: preStore.items[selIndex].quizType,
        quizAnswer: preAnswer,
        quizTime: preStore.items[selIndex].quizTime,
        point: preStore.items[selIndex].point,
        image: preStore.items[selIndex].image
      }
    });
  }
  async function updateCheck(pos, status) {
    const preStore = store;
    const selIndex = preStore.selectedNav[0].id;
    const newProv = [...preStore.items];
    const preAnswer = [...store.selectedItem.quizAnswer];
    const newAnswer = {
      sel: status === 1 ? 0 : 1,
      answer: preAnswer[pos].answer
    };
    preAnswer[pos] = newAnswer;
    const providerArray = {
      href: preStore.items[selIndex].href,
      title: preStore.items[selIndex].title,
      quizType: preStore.items[selIndex].quizType,
      quizAnswer: preAnswer,
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
        quizType: preStore.items[selIndex].quizType,
        quizAnswer: preAnswer,
        quizTime: preStore.items[selIndex].quizTime,
        point: preStore.items[selIndex].point,
        image: preStore.items[selIndex].image
      }
    });
  }
  return (
    <div className={classes.container}>
      <Card className={classes.root} style={{ backgroundColor: colors[order] }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <div className={classes.textSection}>
            <FormControl fullWidth>
              <TextField
                multiline
                id="standard-basic"
                value={answer}
                onChange={(event) => {
                  updateAnswer(event, order);
                }}
                inputProps={{
                  style: {
                    fontSize: 20, alignItems: 'center', color: 'white'
                  }
                }}
              />
            </FormControl>
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <IconButton
              aria-label="delete"
              className={classes.checking}
              onClick={() => { updateCheck(order, check); }}
            >
              {check === 1 ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <RadioButtonUncheckedIcon fontSize="large" className={classes.icons} />}
            </IconButton>
          </div>
        </div>
      </Card>
    </div>
  );
}
Unchecked.propTypes = {
  answer: PropTypes.string,
  order: PropTypes.number,
  check: PropTypes.bool
};
