/* eslint-disable eqeqeq */
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
import cogoToast from 'cogo-toast';

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
export default function UncheckedCom({
  answer, order, check, cAnswer, updateAnswer, timeCount
}) {
  const classes = useStyles();
  const [cResult, setCResult] = React.useState(cAnswer);
  async function updateCheck(pos, status) {
    const temp = cAnswer;
    console.log(status, timeCount, order);
    temp[pos] = cAnswer[pos] === 1 ? 0 : 1;
    if (timeCount == 0) {
      cogoToast.warn('Time is up', { position: 'top-right' });
    } else {
      updateAnswer([...temp]);
      // setCResult([...temp]);
    }
  }
  return (
    <div className={classes.container}>
      <Card className={classes.root} style={{ backgroundColor: colors[order] }} onClick={() => { updateCheck(order, check); }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <div className={classes.textSection}>
            <FormControl fullWidth>
              <div
                id="standard-basic"
                className="answer-text"
              >
                {answer}
              </div>
            </FormControl>
          </div>
          <div style={{ alignItems: 'center', display: 'flex' }}>
            <IconButton
              aria-label="delete"
              className={classes.checking}
            >
              {cAnswer[order] == 1 ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <RadioButtonUncheckedIcon fontSize="large" className={classes.icons} />}
            </IconButton>
          </div>
        </div>
      </Card>
    </div>
  );
}
UncheckedCom.propTypes = {
  answer: PropTypes.string,
  order: PropTypes.number,
  check: PropTypes.bool,
  updateAnswer: PropTypes.func,
  cAnswer: PropTypes.array,
  timeCount: PropTypes.number
};
