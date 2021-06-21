import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Card,
  IconButton,
  Typography
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
  '#1368ce',
  '#e21b3c'
];
export default function Unchecked({ order, check }) {
  const { store, setStore } = React.useContext(StoreContext);
  const classes = useStyles();

  async function updateCheck(pos, status) {
    console.log('dfadfasdf', status);
    const preStore = store;
    const selIndex = preStore.selectedNav[0].id;
    const newProv = [...preStore.items];
    const providerArray = {
      href: preStore.items[selIndex].href,
      title: preStore.items[selIndex].title,
      quizType: preStore.items[selIndex].quizType,
      quizAnswer: order === 1 ? 0 : 1,
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
        quizAnswer: order === 1 ? 0 : 1,
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
            <Typography variant="h3" style={{ color: '#fff' }}>
              {order === 0 ? 'True' : 'False'}
            </Typography>
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <IconButton aria-label="delete" className={classes.checking}>
              {check === 1 ? <CheckCircleIcon fontSize="large" className={classes.icons} onClick={() => { updateCheck(order, check); }} /> : <RadioButtonUncheckedIcon fontSize="large" className={classes.icons} onClick={() => { updateCheck(order, check); }} />}
            </IconButton>
          </div>
        </div>
      </Card>
    </div>
  );
}
Unchecked.propTypes = {
  order: PropTypes.number,
  check: PropTypes.bool
};
